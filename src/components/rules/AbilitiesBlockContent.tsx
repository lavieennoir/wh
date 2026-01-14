import { Ability } from '@/src/schemas/data-sheet.schema';
import { Fragment } from 'react/jsx-runtime';
import Markdown from '../common/Markdown';

export interface AbilitiesBlockContentProps {
  description?: string;
  abilities?: Ability[];
}

export default function AbilitiesBlockContent({
  description,
  abilities,
}: AbilitiesBlockContentProps) {
  return (
    <>
      {description && <Markdown>{description}</Markdown>}
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
                      <span className="badge badge-base-content font-bold">{subAbility.name}</span>
                      <Markdown>{subAbility.description}</Markdown>
                    </Fragment>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
