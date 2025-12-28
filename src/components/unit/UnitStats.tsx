import { Stats } from '@/src/schemas/data-sheet.schema';

export interface UnitStatsProps {
  stats: Stats;
}

const statValueClassName =
  'bg-base-300 rounded-md h-10 w-10 mx-auto text-lg font-bold flex items-center justify-center';

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
            <div className={statValueClassName}>{stats.movement}&quot;</div>
          </td>
          <td>
            <div className={statValueClassName}>{stats.toughness}</div>
          </td>
          <td>
            <div className={statValueClassName}>{stats.save}+</div>
          </td>
          <td>
            <div className={statValueClassName}>{stats.wounds}</div>
          </td>
          <td>
            <div className={statValueClassName}>{stats.leadership}+</div>
          </td>
          <td>
            <div className={statValueClassName}>{stats.objectiveControl}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
