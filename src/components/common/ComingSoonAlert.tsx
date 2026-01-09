import InformationCircleIcon from '@/public/icons/information-circle.svg';

export interface ComingSoonAlertProps {
  subtitle?: string;
}

export default function ComingSoonAlert({ subtitle }: ComingSoonAlertProps) {
  return (
    <div role="alert" className="alert alert-vertical sm:alert-horizontal">
      <InformationCircleIcon className="size-6 shrink-0 stroke-info" />
      <div>
        <h3 className="font-bold">This feature is coming soon!</h3>
        <div className="text-xs">{subtitle ?? 'Nothing to see here yet.'}</div>
      </div>
    </div>
  );
}
