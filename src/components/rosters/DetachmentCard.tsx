import CheckIcon from '@/public/icons/check.svg';
import { Detachment } from '@/src/schemas/detachment.schema';
import AbilitiesBlockContent from '../rules/AbilitiesBlockContent';
import DetachmentChangesBlock from '../rules/DetachmentChangesBlock';

export interface DetachmentCardProps {
  detachment: Detachment;
  defaultArmyFaction: string;
  /** User to group accordions by */
  name?: string;
}

export default function DetachmentCard({
  detachment,
  defaultArmyFaction,
  name,
}: DetachmentCardProps) {
  return (
    <details
      name={name}
      className="collapse collapse-arrow border border-base-300 group-[.is-active]:outline-2 outline-(--input-color) outline-offset-2 isolate"
    >
      <summary className="collapse-title px-4 py-2 flex gap-4 bg-base-300">
        <div className="opacity-0 group-[.is-active]:opacity-100 transition-opacity duration-200">
          <CheckIcon className="size-6" />
        </div>
        <h3>{detachment.name}</h3>
      </summary>
      <div className="collapse-content p-4 flex flex-col gap-4">
        {detachment.changes?.length && (
          <DetachmentChangesBlock
            changes={detachment.changes}
            defaultArmyFaction={defaultArmyFaction}
          />
        )}
        {detachment.rules?.length && <AbilitiesBlockContent abilities={detachment.rules} />}
      </div>
    </details>
  );
}
