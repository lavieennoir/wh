import { UnitComposition } from '@/src/schemas/data-sheet.schema';
import pluralize from 'pluralize';
import UnitBaseBlock from './UnitBaseBlock';

export interface UnitCompositionBlockProps {
  composition: UnitComposition;
  baseSize: string;
}

function getModelCount(minCount: number, maxCount: number) {
  return minCount === maxCount ? minCount : `${minCount}-${maxCount}`;
}

export default function UnitCompositionBlock({ composition, baseSize }: UnitCompositionBlockProps) {
  return (
    <UnitBaseBlock name="Unit Composition">
      <div className="flex flex-col gap-4">
        <ul className="font-bold">
          {composition.models.map((model) => (
            <li key={model.model}>
              - {getModelCount(model.minCount, model.maxCount)}{' '}
              {pluralize(model.model, model.maxCount)}
            </li>
          ))}
        </ul>
        <p>
          <strong>Every model is equipped with:</strong> {composition.equipment.join('; ')}
        </p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-base-300">
              <th className="text-left p-3">Model Name</th>
              <th className="text-center p-3">Count</th>
              <th className="text-center p-3">Points</th>
            </tr>
          </thead>
          <tbody>
            {composition.cost.map((costItem, costIndex) => {
              const modelEntries = Object.entries(costItem.models);
              return modelEntries.map(([modelName, counts], modelIndex) => (
                <tr
                  key={`${costItem.points}-${modelName}`}
                  className={costIndex % 2 === 1 ? 'bg-base-200' : ''}
                >
                  <td className="p-3">{modelName}</td>
                  <td className="text-center p-3">
                    {getModelCount(counts.minCount, counts.maxCount)}
                  </td>
                  {modelIndex === 0 && (
                    <td className="text-center p-3 align-middle" rowSpan={modelEntries.length}>
                      {costItem.points}
                    </td>
                  )}
                </tr>
              ));
            })}
          </tbody>
        </table>
        <p>
          <strong>Base size:</strong> {baseSize}
        </p>
      </div>
    </UnitBaseBlock>
  );
}
