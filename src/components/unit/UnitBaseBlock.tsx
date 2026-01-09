'use client';

import { useExpandAllUnitsByDefault } from '../settings/ExpandAllUnitsByDefaultControl';

export interface UnitBaseBlockProps {
  name: string;
  children: React.ReactNode;
}

export default function UnitBaseBlock({ name, children }: UnitBaseBlockProps) {
  const [expandAllUnitsByDefault] = useExpandAllUnitsByDefault();
  return (
    <details
      className="collapse collapse-arrow bg-base-100 rounded-none border-none"
      name={name}
      open={expandAllUnitsByDefault}
    >
      <summary className="collapse-title p-2 py-3 bg-primary text-neutral-content">
        <h2>{name}</h2>
      </summary>
      <div className="collapse-content p-2">{children}</div>
    </details>
  );
}
