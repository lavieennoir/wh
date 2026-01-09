'use client';
import { Ability } from '@/src/schemas/data-sheet.schema';
import { Fragment } from 'react/jsx-runtime';
import Markdown from '../common/Markdown';
import { useExpandAllUnitsByDefault } from '../settings/ExpandAllUnitsByDefaultControl';

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
        <Markdown>{description}</Markdown>
        {abilities && (
          <div className="flex flex-col gap-4">
            {abilities.map((ability) => (
              <Fragment key={ability.name}>
                <h2>{ability.name}</h2>
                <Markdown>{ability.description}</Markdown>
                {ability.subAbilities && (
                  <div className="flex flex-col gap-2">
                    {ability.subAbilities.map((subAbility) => (
                      <Fragment key={subAbility.name}>
                        <span className="badge badge-base-content font-bold">
                          {subAbility.name}
                        </span>
                        <Markdown>{subAbility.description}</Markdown>
                      </Fragment>
                    ))}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}
