import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import {
  cloneElement,
  createContext,
  ElementType,
  forwardRef,
  HTMLProps,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  Ref,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    'data-state'?: string;
  }
}

interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function usePopover({
  initialOpen = false,
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'end',
        padding: 64, // do not overlap bottom navigation
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [
      open,
      setOpen,
      interactions,
      data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    ],
  );
}

type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
    })
  | null;

const PopoverContext = createContext<ContextType>(null);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
};

// Reusable popover component from https://floating-ui.com/docs/popover example
export interface PopoverProps extends PropsWithChildren<PopoverOptions>, HTMLProps<HTMLDivElement> {
  popoverContent?: ReactNode;
  /** component to render the popover content. Defaults to div. */
  component?: ElementType;
  /** Automatically close the popover when the user clicks inside of it. Defaults to true. */
  closeOnClick?: boolean;
}
export function Popover({
  children,
  component,
  popoverContent,
  closeOnClick,
  initialOpen,
  placement,
  modal,
  open,
  onOpenChange,
  ...props
}: PopoverProps) {
  return (
    <PopoverProvider
      initialOpen={initialOpen}
      placement={placement}
      modal={modal}
      open={open}
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent component={component} closeOnClick={closeOnClick} {...props}>
        {popoverContent}
      </PopoverContent>
    </PopoverProvider>
  );
}

export function PopoverProvider({
  children,
  modal = false,
  ...restOptions
}: PropsWithChildren<PopoverOptions>) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
}

export const PopoverTrigger = forwardRef<HTMLElement, HTMLProps<HTMLElement> & PopoverTriggerProps>(
  function PopoverTrigger({ children, ...props }, propRef) {
    const context = usePopoverContext();
    const childrenRef =
      children && typeof children === 'object' && 'ref' in children
        ? (children.ref as Ref<unknown>)
        : undefined;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    // allows the user to pass any element as the anchor
    if (isValidElement(children)) {
      return cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...(typeof children.props === 'object' ? children.props : {}),
          'data-state': context.open ? 'open' : 'closed',
        }),
      );
    } else {
      console.warn('PopoverTrigger children must be a valid element. Got:', children);
      return children;
    }
  },
);

export const PopoverContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & Pick<PopoverProps, 'component' | 'closeOnClick'>
>(function PopoverContent(
  { component: Component = 'div', closeOnClick = true, style, ...props },
  propRef,
) {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} modal={context.modal}>
        <Component
          ref={ref}
          style={{ ...context.floatingStyles, ...style }}
          aria-labelledby={context.labelId}
          aria-describedby={context.descriptionId}
          {...context.getFloatingProps(props)}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            if (closeOnClick) {
              context.setOpen(false);
            }
            props.onClick?.(event);
          }}
        >
          {props.children}
        </Component>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

export const PopoverHeading = forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
  function PopoverHeading(props, ref) {
    const { setLabelId } = usePopoverContext();
    const id = useId();

    // Only sets `aria-labelledby` on the Popover root element
    // if this component is mounted inside it.
    useLayoutEffect(() => {
      setLabelId(id);
      return () => setLabelId(undefined);
    }, [id, setLabelId]);

    return (
      <h2 {...props} ref={ref} id={id}>
        {props.children}
      </h2>
    );
  },
);

export const PopoverDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLProps<HTMLParagraphElement>
>(function PopoverDescription(props, ref) {
  const { setDescriptionId } = usePopoverContext();
  const id = useId();

  // Only sets `aria-describedby` on the Popover root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return <p {...props} ref={ref} id={id} />;
});

export const PopoverClose = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function PopoverClose(props, ref) {
  const { setOpen } = usePopoverContext();
  return (
    <button
      type="button"
      ref={ref}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        setOpen(false);
      }}
    />
  );
});
