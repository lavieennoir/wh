'use client';
import { Enchantment } from '@/src/schemas/detachment.schema';
import Markdown from '../common/Markdown';
import { useExpandAllUnitsByDefault } from '../settings/ExpandAllUnitsByDefaultControl';

export default function EnchantmentBlock({
  name,
  cost,
  description,
}: Pick<Enchantment, 'name' | 'cost' | 'description'>) {
  const [expandAllUnitsByDefault] = useExpandAllUnitsByDefault();

  return (
    <details
      className="collapse collapse-arrow border border-primary"
      name={name}
      open={expandAllUnitsByDefault}
    >
      <summary className="collapse-title bg-primary text-neutral-content py-2">
        <h2 className="flex justify-between">
          <span className="truncate">{name}</span>
          <span>{cost} Points</span>
        </h2>
      </summary>
      <div className="collapse-content py-2 px-0 *:px-4 [&>table]:px-0">
        <Markdown>{description}</Markdown>
      </div>
    </details>
  );
}
