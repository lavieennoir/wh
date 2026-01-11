import Markdown from '@/src/components/common/Markdown';
import { Ability } from '@/src/schemas/data-sheet.schema';
import { Fragment } from 'react/jsx-runtime';
import UnitBaseBlock from './UnitBaseBlock';

export interface AbilitiesBlocksProps {
  coreAbilities?: string[];
  factionAbility?: string;
  abilities: Ability[];
}

export default function AbilitiesBlocks({
  coreAbilities,
  factionAbility,
  abilities,
}: AbilitiesBlocksProps) {
  const subAbilityBlocks = abilities
    .filter((ability) => ability.subAbilities)
    .map((ability) => (
      <Fragment key={ability.name}>
        <hr />
        <UnitBaseBlock name={ability.name}>
          <div className="flex flex-col gap-4">
            {ability.subAbilities?.map((subAbility) => (
              <Fragment key={subAbility.name}>
                <span className="badge badge-base-content font-bold">{subAbility.name}</span>
                <Markdown>{subAbility.description}</Markdown>
              </Fragment>
            ))}
          </div>
        </UnitBaseBlock>
      </Fragment>
    ));

  return (
    <>
      <UnitBaseBlock name="Abilities">
        <div className="flex flex-col gap-4">
          {coreAbilities && (
            <>
              <p className="text-sm text-base-content/50">Core:</p>
              <div className="flex flex-wrap gap-2">
                {coreAbilities.map((ability) => (
                  <span key={ability} className="badge badge-base-content badge-dash font-bold">
                    {ability}
                  </span>
                ))}
              </div>
              <hr className="border-dashed" />
            </>
          )}
          {factionAbility && (
            <>
              <p className="text-sm text-base-content/50">Faction Ability:</p>
              <span className="badge badge-base-content badge-dash font-bold">
                {factionAbility}
              </span>
              <hr className="border-dashed" />
            </>
          )}
          <p className="text-sm text-base-content/50">Datasheet Abilities:</p>
          {abilities.map((ability) => (
            <Fragment key={ability.name}>
              <span className="badge badge-base-content font-bold">{ability.name}</span>
              <Markdown>{ability.description}</Markdown>
            </Fragment>
          ))}
        </div>
      </UnitBaseBlock>
      {subAbilityBlocks}
    </>
  );
}
