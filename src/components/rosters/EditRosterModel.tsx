'use client';
import { capitalize } from '@/src/lib/string.utils';
import { DataSheet } from '@/src/schemas/data-sheet.schema';
import { RosterUnit } from '@/src/schemas/roster.schema';
import clsx from 'clsx';

export interface EditRosterModelProps {
  model: RosterUnit['models'][number];
  updateModel: (model: RosterUnit['models'][number]) => void;
  dataSheet: DataSheet;
}
export default function EditRosterModel({ model, updateModel, dataSheet }: EditRosterModelProps) {
  // show model header if there are multiple models in the unit or model count can be modified
  const modelComposition = dataSheet.unitComposition.models.find(
    (unitModel) => model.name === unitModel.model,
  );
  const isCharacterUnit = dataSheet.keywords.includes('Character');
  if (!modelComposition) {
    throw new Error(`Model ${model.name} not found in data sheet ${dataSheet.name}`);
  }
  const shouldShowModelHeader =
    dataSheet.unitComposition.models.length > 1 ||
    modelComposition?.minCount !== modelComposition?.maxCount;

  const canIncreaseAmount = model.amount < modelComposition.maxCount;
  const canDecreaseAmount = model.amount > modelComposition.minCount;

  const handleWarlordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateModel({ ...model, isWarlord: e.target.checked });
  };
  const handleAmountIncrease = () => {
    updateModel({ ...model, amount: Math.min(model.amount + 1, modelComposition.maxCount) });
  };
  const handleAmountDecrease = () => {
    updateModel({ ...model, amount: Math.max(model.amount - 1, modelComposition.minCount) });
  };
  return (
    <>
      {shouldShowModelHeader && (
        <div className="flex justify-between items-center bg-base-content text-base-300 gap-2 p-2 font-bold">
          <h2 className="mr-auto">{model.name}</h2>
          <button
            className={clsx(
              'btn btn-sm ml-auto btn-outline',
              !canDecreaseAmount && 'border-base-300/50 text-base-300/50',
            )}
            onClick={handleAmountDecrease}
            disabled={!canDecreaseAmount}
          >
            -
          </button>
          <span className="inline-block w-4 text-center">{model.amount}</span>
          <button
            className={clsx(
              'btn btn-sm btn-outline',
              !canIncreaseAmount && 'border-base-300/50 text-base-300/50',
            )}
            onClick={handleAmountIncrease}
            disabled={!canIncreaseAmount}
          >
            +
          </button>
        </div>
      )}
      {isCharacterUnit && (
        <div className="flex items-center gap-2 pl-5 pr-4">
          <h3>Warlord</h3>
          <input
            type="checkbox"
            checked={model.isWarlord}
            onChange={handleWarlordChange}
            className="checkbox checkbox-xl ml-auto"
          />
        </div>
      )}
      <div className="px-2">
        <details className="collapse collapse-arrow">
          <summary className="collapse-title px-3 py-2 flex gap-4 bg-base-300 rounded-lg">
            <h3>Wargear Options</h3>
          </summary>
          <div className="collapse-content py-4 px-0 flex flex-col gap-4">
            <h4 className="font-bold border-b border-base-300 pb-2 px-3">Default Wargear</h4>
            {dataSheet.unitComposition.equipment.map((wargear) => (
              <div key={wargear} className="card card-border px-3 py-2">
                <div className="flex items-center justify-between">
                  {capitalize(wargear)}{' '}
                  <input type="checkbox" className="checkbox checkbox-xl ml-auto" />
                </div>
                <div>
                  <p className="text-sm text-base-content/50">
                    Weapon attributes will be shown here.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </>
  );
}
