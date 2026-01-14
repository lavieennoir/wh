import { FieldError } from 'react-hook-form';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}
export default function FormInput({ error, ...props }: FormInputProps) {
  return (
    <>
      <input
        className={[
          'input input-bordered w-full',
          error ? 'input-error' : '',
          ...(props.className ?? []),
        ].join(' ')}
        {...props}
      />
      <p className={['validator-hint text-error', error ? 'visible' : ''].join(' ')}>
        {error?.message}
      </p>
    </>
  );
}
