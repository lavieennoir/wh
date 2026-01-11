import { formatStatValue } from '@/src/lib/stat.utils';
import { capitalize } from '@/src/lib/string.utils';
import { DemonicAllegiance, Stats, ValueOverride } from '@/src/schemas/data-sheet.schema';
import { Fragment } from 'react/jsx-runtime';
import WargearOptionsContent from './WargearOptionsContent';

export interface DemonicAllegianceContentProps {
  allegiance: {
    khorne?: DemonicAllegiance;
    tzeentch?: DemonicAllegiance;
    nurgle?: DemonicAllegiance;
    slaanesh?: DemonicAllegiance;
  };
}

const statOverrideText = (stat: keyof Stats, { value, modifier }: ValueOverride) => {
  if (modifier === 'set') {
    return `Set this model's ${stat} characteristic to ${value}`;
  }
  return `${capitalize(modifier)} ${formatStatValue(Number(value), stat)} ${
    modifier === 'add' ? 'to' : 'from'
  } this model's ${capitalize(stat)} characteristic`;
};

const weaponOverrideText = (
  weaponName: string,
  characteristicName: string,
  { value, modifier }: ValueOverride,
) => {
  if (modifier === 'set') {
    return `Set this model's ${weaponName} weapon's ${characteristicName} to ${value}`;
  }
  return `${capitalize(
    modifier,
  )} ${value} to the ${characteristicName} of this model's ${weaponName} weapon.`;
};

function FactionAllegianceContent({
  overrides,
  wargearOptions,
}: Pick<DemonicAllegiance, 'overrides' | 'wargearOptions'>) {
  const hasStatOverrides = Object.keys(overrides?.stats ?? {}).length > 0;
  return (
    <>
      {hasStatOverrides && (
        <ul>
          {Object.entries(overrides?.stats ?? {}).map(([stat, value]) => (
            <li key={stat}>- {statOverrideText(stat as keyof Stats, value)}</li>
          ))}
        </ul>
      )}
      {overrides?.rangedWeapons && (
        <ul>
          {overrides.rangedWeapons.map((weapon, i) => (
            <Fragment key={i}>
              {weapon.range && <li>- {weaponOverrideText(weapon.name, 'range', weapon.range)}</li>}
              {weapon.attacks && (
                <li>- {weaponOverrideText(weapon.name, 'Attacks', weapon.attacks)}</li>
              )}
              {weapon.ballisticSkill && (
                <li>
                  - {weaponOverrideText(weapon.name, 'Ballistic Skill', weapon.ballisticSkill)}
                </li>
              )}
              {weapon.strength && (
                <li>- {weaponOverrideText(weapon.name, 'Strength', weapon.strength)}</li>
              )}
              {weapon.armourPenetration && (
                <li>
                  -{' '}
                  {weaponOverrideText(weapon.name, 'Armour Penetration', weapon.armourPenetration)}
                </li>
              )}
              {weapon.damage && (
                <li>- {weaponOverrideText(weapon.name, 'Damage', weapon.damage)}</li>
              )}
            </Fragment>
          ))}
        </ul>
      )}
      {overrides?.meleeWeapons && (
        <ul>
          {overrides.meleeWeapons.map((weapon, i) => (
            <Fragment key={i}>
              {weapon.attacks && (
                <li>- {weaponOverrideText(weapon.name, 'Attacks', weapon.attacks)}</li>
              )}
              {weapon.weaponSkill && (
                <li>- {weaponOverrideText(weapon.name, 'Weapon Skill', weapon.weaponSkill)}</li>
              )}
              {weapon.strength && (
                <li>- {weaponOverrideText(weapon.name, 'Strength', weapon.strength)}</li>
              )}
              {weapon.armourPenetration && (
                <li>
                  -{' '}
                  {weaponOverrideText(weapon.name, 'Armour Penetration', weapon.armourPenetration)}
                </li>
              )}
              {weapon.damage && (
                <li>- {weaponOverrideText(weapon.name, 'Damage', weapon.damage)}</li>
              )}
            </Fragment>
          ))}
        </ul>
      )}
      {wargearOptions && <WargearOptionsContent wargearOptions={wargearOptions} />}
    </>
  );
}

export default function DemonicAllegianceContent({ allegiance }: DemonicAllegianceContentProps) {
  return (
    <div className="flex flex-col gap-2">
      <p>
        When you select this model to include in your army, you must select one of the following
        keywords to gain:
      </p>
      <ul className="font-bold list-disc list-inside">
        {Object.keys(allegiance ?? {}).map((key) => (
          <li key={key}>{capitalize(key)}</li>
        ))}
      </ul>
      <p>The keyword you select will also affect some of this model&apos;s characteristics.</p>
      {allegiance.khorne && (
        <>
          <p className="font-bold">{allegiance.khorne.name ?? 'Khorne'}</p>
          <FactionAllegianceContent
            overrides={allegiance.khorne.overrides}
            wargearOptions={allegiance.khorne.wargearOptions}
          />
        </>
      )}
      {allegiance.tzeentch && (
        <>
          <p className="font-bold">{allegiance.tzeentch.name ?? 'Tzeentch'}</p>
          <FactionAllegianceContent
            overrides={allegiance.tzeentch.overrides}
            wargearOptions={allegiance.tzeentch.wargearOptions}
          />
        </>
      )}
      {allegiance.nurgle && (
        <>
          <p className="font-bold">{allegiance.nurgle.name ?? 'Nurgle'}</p>
          <FactionAllegianceContent
            overrides={allegiance.nurgle.overrides}
            wargearOptions={allegiance.nurgle.wargearOptions}
          />
        </>
      )}
      {allegiance.slaanesh && (
        <>
          <p className="font-bold">{allegiance.slaanesh.name ?? 'Slaanesh'}</p>
          <FactionAllegianceContent
            overrides={allegiance.slaanesh.overrides}
            wargearOptions={allegiance.slaanesh.wargearOptions}
          />
        </>
      )}
    </div>
  );
}
