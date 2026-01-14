import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface FormSelectOption {
  label: ReactNode;
  value: string;
}
export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  emptyOptionLabel?: ReactNode;
  error?: FieldError;
  options: FormSelectOption[];
}
export default function FormSelect({
  error,
  options,
  emptyOptionLabel,
  ...props
}: FormSelectProps) {
  return (
    <>
      <select
        className={['select w-full', error ? 'select-error' : '', ...(props.className ?? [])].join(
          ' ',
        )}
        defaultValue={emptyOptionLabel ? '##empty-option-label##' : undefined}
        {...props}
      >
        {emptyOptionLabel && (
          <option disabled value="##empty-option-label##">
            {emptyOptionLabel}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className={['validator-hint text-error', error ? 'visible' : ''].join(' ')}>
        {error?.message}
      </p>
    </>
  );
}
