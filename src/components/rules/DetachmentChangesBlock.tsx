import { Change } from '@/src/schemas/detachment.schema';
import pluralize from 'pluralize';
import { Fragment } from 'react/jsx-runtime';

export interface DetachmentChangesBlockProps {
  changes: Change[];
  defaultArmyFaction: string;
}

interface GainKeywordBlockProps {
  change: Extract<Change, { type: 'gain-keyword' }>;
}

interface AllowExtraFactionKeywordsBlockProps {
  change: Extract<Change, { type: 'allow-extra-faction-keywords' }>;
  defaultArmyFaction: string;
}

interface ForbidUnitsBlockProps {
  change: Extract<Change, { type: 'forbid-units' }>;
}

function GainKeywordBlock({ change }: GainKeywordBlockProps) {
  return (
    <>
      <p className="font-bold">Keywords</p>
      <p>
        {change.target.map((target, idx) => (
          <Fragment key={target}>
            <strong>{target.toUpperCase()}</strong>
            {idx < change.target.length - 1 ? ' and ' : ''}
          </Fragment>
        ))}{' '}
        units from your army gain the{' '}
        {change.keywords.map((keyword, idx) => (
          <Fragment key={keyword}>
            <strong>{keyword.toUpperCase()}</strong>
            {idx < change.keywords.length - 1 ? ' and ' : ''}
          </Fragment>
        ))}{' '}
        {pluralize('keyword', change.keywords.length)}.
      </p>
    </>
  );
}

function AllowExtraFactionKeywordsBlock({
  change,
  defaultArmyFaction,
}: AllowExtraFactionKeywordsBlockProps) {
  const factionString = change.faction.map((faction, idx) => (
    <Fragment key={faction}>
      <strong>{faction.toUpperCase()}</strong>
      {idx < change.faction.length - 1 ? ' and ' : ''}
    </Fragment>
  ));
  return (
    <>
      <p className="font-bold">{change.faction.join(', ')}</p>
      <p>
        You can include {factionString} units in your army, even though they do not have the{' '}
        <strong>{defaultArmyFaction.toUpperCase()}</strong> Faction keyword.{' '}
        {change.units && <>You can only include the following {factionString} units:</>}
      </p>
      {change.units && (
        <ul className="list-disc list-inside">
          {change.units.map((unit) => (
            <li key={unit}>{unit}</li>
          ))}
        </ul>
      )}
      {change.limits && (
        <p>The combined points cost of such units you can include in your army is:</p>
      )}
      {change.limits && (
        <ul className="list-disc list-inside">
          <li>
            <strong>Incursion:</strong> {change.limits.incursion} points
          </li>
          <li>
            <strong>Strike Force:</strong> {change.limits.strikeForce} points
          </li>
          <li>
            <strong>Onslaught:</strong> {change.limits.onslaught} points
          </li>
        </ul>
      )}
      {change.allowExtraFactionWarlord === false && (
        <p>
          No {factionString} models from your army can be your <strong>WARLORD</strong>.
        </p>
      )}
    </>
  );
}

function ForbidUnitsBlock({ change }: ForbidUnitsBlockProps) {
  const ensureExcept = change.except ?? [];
  return (
    <>
      {change.name && <p className="font-bold">{change.name}</p>}
      <p>
        When mustering your army, you cannot include any{' '}
        {change.units.map((unit, idx) => (
          <Fragment key={unit}>
            <strong>{unit.toUpperCase()}</strong>
            {idx < change.units.length - 2 ? ', ' : idx === change.units.length - 2 ? ' or ' : ''}
          </Fragment>
        ))}{' '}
        units
        {ensureExcept.length > 0 && (
          <>
            {' '}
            (excluding{' '}
            {ensureExcept.map((except, idx) => (
              <Fragment key={except}>
                <strong>{except.toUpperCase()}</strong>
                {idx < ensureExcept.length - 1 ? ' and ' : ''}
              </Fragment>
            ))}
            )
          </>
        )}
        .
      </p>
    </>
  );
}

export default function DetachmentChangesBlock({
  changes,
  defaultArmyFaction,
}: DetachmentChangesBlockProps) {
  return (
    <>
      {changes.map((change, idx) => {
        switch (change.type) {
          case 'gain-keyword':
            return <GainKeywordBlock key={idx} change={change} />;
          case 'allow-extra-faction-keywords':
            return (
              <AllowExtraFactionKeywordsBlock
                key={idx}
                change={change}
                defaultArmyFaction={defaultArmyFaction}
              />
            );
          case 'forbid-units':
            return <ForbidUnitsBlock key={idx} change={change} />;
          default:
            return null;
        }
      })}
    </>
  );
}
