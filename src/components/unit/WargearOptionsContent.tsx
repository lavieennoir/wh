import pluralize from '@/src/lib/pluralize';
import { groupItems } from '@/src/lib/string.utils';
import { WargearOption } from '@/src/schemas/data-sheet.schema';
import { Fragment } from 'react/jsx-runtime';

export interface WargearOptionsContentProps {
  wargearOptions: WargearOption[];
}

const buildWargearBaseText = (wargearOption: WargearOption): string => {
  const eachXModelsText =
    wargearOption.target.eachXModels && wargearOption.target.eachXModels > 1
      ? `for every ${wargearOption.target.eachXModels} models in the unit,`
      : '';
  const maxAmountText = !wargearOption.target.maxAmount
    ? 'the'
    : wargearOption.target.maxAmount > 1
    ? `up to ${wargearOption.target.maxAmount}`
    : `1`;
  const wargearToReplaceText = wargearOption.target.wargearToReplace
    ? `${wargearOption.target.model}'s ${groupItems(wargearOption.target.wargearToReplace).join(
        ' and ',
      )} can be replaced with`
    : wargearOption.target.requiredWargear
    ? `${pluralize(
        wargearOption.target.model,
        wargearOption.target.maxAmount ?? 1,
      )} equipped with ${groupItems(wargearOption.target.requiredWargear).join(
        ' and ',
      )} can be equipped with`
    : wargearOption.target.forbiddenWargear
    ? `${pluralize(
        wargearOption.target.model,
        wargearOption.target.maxAmount ?? 1,
      )} that is not equipped with ${groupItems(wargearOption.target.forbiddenWargear).join(
        ' and ',
      )} can be equipped with`
    : `${pluralize(
        wargearOption.target.model,
        wargearOption.target.maxAmount ?? 1,
      )} can be equipped with`;
  const text = `${eachXModelsText} ${maxAmountText} ${wargearToReplaceText}`.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function WargearOptionsContent({ wargearOptions }: WargearOptionsContentProps) {
  return (
    <div className="flex flex-col gap-4">
      {wargearOptions.map((wargearOption, i) => (
        <Fragment key={i}>
          <ul>
            <li>
              - {buildWargearBaseText(wargearOption)}
              {wargearOption.options.length === 1 ? (
                ` ${wargearOption.options[0].amount} ${pluralize(
                  wargearOption.options[0].wargear,
                  wargearOption.options[0].amount,
                )}`
              ) : (
                <>
                  {' '}
                  one of the following:
                  <ul className="list-disc list-inside pl-2">
                    {wargearOption.options.map((option, j) => (
                      <li key={j}>
                        {option.amount} {pluralize(option.wargear, option.amount)}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          </ul>
          {i < wargearOptions.length - 1 && <hr className="border-dashed" />}
        </Fragment>
      ))}
    </div>
  );
}
