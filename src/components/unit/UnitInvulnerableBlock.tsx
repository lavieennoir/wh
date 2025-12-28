import ShieldFilledIcon from '@/public/icons/shield-filled.svg';
export interface UnitInvulnerableBlockProps {
  invulnerableSave: number;
}
export default function UnitInvulnerableBlock({ invulnerableSave }: UnitInvulnerableBlockProps) {
  return (
    <div className="flex items-center py-1.5 px-2 gap-2 justify-between bg-primary text-neutral-content">
      <h2>Invulnerable Save</h2>{' '}
      <span className="grid size-10 text-base-300">
        <ShieldFilledIcon className="size-10 col-start-1 row-start-1" fill="currentColor" />
        <span className="text-base-content col-start-1 row-start-1 place-self-center text-lg font-bold text-">
          {invulnerableSave}+
        </span>
      </span>
    </div>
  );
}
