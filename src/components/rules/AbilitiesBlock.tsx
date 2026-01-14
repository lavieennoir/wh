'use client';
import { Ability } from '@/src/schemas/data-sheet.schema';
import { useExpandAllUnitsByDefault } from '../settings/ExpandAllUnitsByDefaultControl';
import AbilitiesBlockContent from './AbilitiesBlockContent';

export interface AbilitiesBlockProps {
  name: string;
  description?: string;
  abilities?: Ability[];
}

export default function AbilitiesBlock({ name, description, abilities }: AbilitiesBlockProps) {
  const [expandAllUnitsByDefault] = useExpandAllUnitsByDefault();

  return (
    <details
      className="collapse collapse-arrow border border-primary"
      name={name}
      open={expandAllUnitsByDefault ?? true}
    >
      <summary className="collapse-title bg-primary text-neutral-content py-2">
        <h2 className="truncate">{name}</h2>
      </summary>
      <div className="collapse-content flex flex-col gap-4 py-2 px-0 *:px-4 [&>table]:px-0">
        <AbilitiesBlockContent description={description} abilities={abilities} />
      </div>
    </details>
  );
}
