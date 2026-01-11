import { formatStatValue } from '@/src/lib/stat.utils';
import { Stats } from '@/src/schemas/data-sheet.schema';

export interface UnitStatsProps {
  stats: Stats;
}

const statValueClassName =
  'bg-base-content text-base-300 rounded-md h-10 w-10 mx-auto text-lg font-bold flex items-center justify-center';

export default function UnitStats({ stats }: UnitStatsProps) {
  return (
    <table className="border-spacing-2 w-full [&_td]:p-2">
      <thead>
        <tr>
          <th>M</th>
          <th>T</th>
          <th>S</th>
          <th>W</th>
          <th>L</th>
          <th>OC</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className={statValueClassName}>{formatStatValue(stats.movement, 'movement')}</div>
          </td>
          <td>
            <div className={statValueClassName}>
              {formatStatValue(stats.toughness, 'toughness')}
            </div>
          </td>
          <td>
            <div className={statValueClassName}>{formatStatValue(stats.save, 'save')}</div>
          </td>
          <td>
            <div className={statValueClassName}>{formatStatValue(stats.wounds, 'wounds')}</div>
          </td>
          <td>
            <div className={statValueClassName}>
              {formatStatValue(stats.leadership, 'leadership')}
            </div>
          </td>
          <td>
            <div className={statValueClassName}>
              {formatStatValue(stats.objectiveControl, 'objectiveControl')}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
