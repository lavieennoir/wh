import { RangedWeapon } from '@/src/schemas/data-sheet.schema';
import { Fragment } from 'react/jsx-runtime';

export interface RangedWeaponsContentProps {
  weapons: RangedWeapon[];
}

export default function RangedWeaponsContent({ weapons }: RangedWeaponsContentProps) {
  return (
    <table className="border-spacing-2 w-full [&_th]:p-2 font-bold">
      <thead>
        <tr>
          <th className="text-left">Range</th>
          <th>A</th>
          <th>BS</th>
          <th>S</th>
          <th>AP</th>
          <th>D</th>
        </tr>
      </thead>
      <tbody>
        {weapons.map((weapon) => (
          <Fragment key={weapon.name}>
            <tr>
              <td colSpan={6} className="rounded-md bg-base-content text-base-100 p-2">
                {weapon.name}
              </td>
            </tr>
            <tr>
              <td className="p-2">{weapon.range}&quot;</td>
              <td className="text-center p-2">{weapon.attacks}</td>
              <td className="text-center p-2">
                {weapon.ballisticSkill ? `${weapon.ballisticSkill}+` : 'N/A'}
              </td>
              <td className="text-center p-2">{weapon.strength}</td>
              <td className="text-center p-2">{weapon.armourPenetration}</td>
              <td className="text-center p-2">{weapon.damage}</td>
            </tr>
            {weapon.abilities && (
              <tr>
                <td colSpan={6} className="px-2 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {weapon.abilities.map((ability) => (
                      <span key={ability} className="badge badge-dash badge-base-content">
                        {ability}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
