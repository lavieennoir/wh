import MarkdownBase, { Components, Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const remarkPlugins = [remarkGfm];

export interface MarkdownProps extends Omit<Options, 'remarkPlugins'> {
  className?: string;
}

const components: Components = {
  img: ({ node, ...props }) => {
    const alt = props.alt ?? `image ${node?.position ?? 0}`;
    const className = ['my-2', props.className].filter(Boolean).join(' ');
    return <img {...props} alt={alt} className={className} loading="lazy" />;
  },
};

export default function Markdown({
  children,
  ...props
}: Omit<Options, 'remarkPlugins' | 'components'>) {
  return (
    <MarkdownBase {...props} components={components} remarkPlugins={remarkPlugins}>
      {children}
    </MarkdownBase>
  );
}
