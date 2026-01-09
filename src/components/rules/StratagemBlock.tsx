'use client';
import { Stratagem, Turn } from '@/src/schemas/detachment.schema';
import Markdown from '../common/Markdown';
import { useExpandAllUnitsByDefault } from '../settings/ExpandAllUnitsByDefaultControl';

const turnToBgColor: Record<Turn, string> = {
  [Turn.Your]: 'bg-blue-900 text-base-300 dark:text-base-content',
  [Turn.Opponent]: 'bg-red-900 text-base-300 dark:text-base-content',
  [Turn.Any]: 'bg-green-900 text-base-300 dark:text-base-content',
};

const turnToBorderColor: Record<Turn, string> = {
  [Turn.Your]: 'border-blue-900',
  [Turn.Opponent]: 'border-red-900',
  [Turn.Any]: 'border-green-900',
};

const turnToBeforeColor: Record<Turn, string> = {
  [Turn.Your]: '*:before:text-blue-900 dark:*:before:text-blue-100',
  [Turn.Opponent]: '*:before:text-red-900 dark:*:before:text-red-100',
  [Turn.Any]: '*:before:text-green-900 dark:*:before:text-green-100',
};

export default function StratagemBlock({
  name,
  cost,
  turn,
  content,
}: Pick<Stratagem, 'name' | 'cost' | 'turn' | 'content'>) {
  const [expandAllUnitsByDefault] = useExpandAllUnitsByDefault();

  return (
    <details
      className={`collapse collapse-arrow border ${turnToBorderColor[turn]}`}
      name={name}
      open={expandAllUnitsByDefault}
    >
      <summary className={`collapse-title ${turnToBgColor[turn]} py-2`}>
        <h2 className="flex justify-between">
          <span className="truncate">{name}</span>
          <span>{cost}CP</span>
        </h2>
      </summary>
      <div
        className={[
          'collapse-content py-2 px-0 *:px-4 [&>table]:px-0 flex flex-col gap-2',
          "[&>*:first-child]:before:content-['When:']",
          "[&>*:nth-child(2)]:before:content-['Target:']",
          "[&>*:nth-child(3)]:before:content-['Effect:']",
          "[&>*:nth-child(4)]:before:content-['Restrictions:']",
          '*:before:inline *:before:pr-0.5 *:before:font-bold',
          turnToBeforeColor[turn],
        ].join(' ')}
      >
        <Markdown>{content.when}</Markdown>
        <Markdown>{content.target}</Markdown>
        <Markdown>{content.effect}</Markdown>
        {content.restrictions && <Markdown>{content.restrictions}</Markdown>}
      </div>
    </details>
  );
}
