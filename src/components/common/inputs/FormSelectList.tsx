import { ReactNode, useEffect, useRef, useState } from 'react';
import { FieldError, InternalFieldName, UseFormRegisterReturn } from 'react-hook-form';

export interface FormSelectListProps<TFieldName extends InternalFieldName = InternalFieldName>
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onBlur' | 'onChange'>,
    UseFormRegisterReturn<TFieldName> {
  error?: FieldError;
  options: { label: ReactNode; value: string }[];
  emptyOptionLabel?: ReactNode;
  defaultValue?: string;
}
export default function FormSelectList<TFieldName extends InternalFieldName = InternalFieldName>({
  error,
  options,
  emptyOptionLabel,
  defaultValue,
  onChange,
  onBlur,
  ref,
  name,
  min,
  max,
  maxLength,
  minLength,
  pattern,
  required,
  disabled,
  ...props
}: FormSelectListProps<TFieldName>) {
  const [value, setValue] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {
    if (!disabled && inputRef.current) {
      setValue(value);
      inputRef.current.value = value;
      onChange?.({
        target: inputRef.current,
        type: 'change',
      });
      onBlur?.({ target: inputRef.current, type: 'blur' });
    }
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <input
        type="hidden"
        ref={(el) => {
          inputRef.current = el;
          ref?.(el);
        }}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        min={min}
        max={max}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        required={required}
        disabled={disabled}
      />
      <ul {...props} className={['flex flex-col gap-2', ...(props.className ?? [])].join(' ')}>
        {emptyOptionLabel && options.length === 0 && <li>{emptyOptionLabel}</li>}
        {options.map((option) => (
          <li
            key={option.value}
            className={['group', option.value === value ? 'is-active' : ''].join(' ')}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <p className={['validator-hint text-error', error ? 'visible' : ''].join(' ')}>
        {error?.message}
      </p>
    </>
  );
}
