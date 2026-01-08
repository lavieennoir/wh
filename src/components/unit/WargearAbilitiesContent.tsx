import { WargearAbility } from '@/src/schemas/data-sheet.schema';
import { Fragment } from 'react/jsx-runtime';

export interface WargearAbilitiesContentProps {
  abilities: WargearAbility[];
}

export default function WargearAbilitiesContent({ abilities }: WargearAbilitiesContentProps) {
  return (
    <div className="flex flex-col gap-2">
      {abilities.map((ability) => (
        <Fragment key={ability.name}>
          <div className="rounded-md bg-base-content text-base-100 font-bold p-2">
            {ability.name}
          </div>
          <div className="px-2 pb-2">{ability.description}</div>
        </Fragment>
      ))}
    </div>
  );
}
