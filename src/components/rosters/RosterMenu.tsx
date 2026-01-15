import { ShortRoster } from '@/src/hooks/useRostersList';
import { cloneRosterDetails } from '@/src/lib/roster';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

export interface RosterMenuProps {
  roster: ShortRoster;
  enabledOptions?: Array<'edit' | 'duplicate' | 'delete'>;
  onEditClick?: (roster: ShortRoster) => void;
  onDuplicateClick?: (roster: ShortRoster) => void;
  onDeleteClick?: (id: string) => void;
  removeRoster: (id: string) => void;
  addRoster: (roster: ShortRoster) => void;
}

const defaultEnabledOptions: RosterMenuProps['enabledOptions'] = ['edit', 'duplicate', 'delete'];
export default function RosterMenu({
  roster,
  enabledOptions = defaultEnabledOptions,
  onEditClick,
  onDuplicateClick,
  onDeleteClick,
  removeRoster,
  addRoster,
}: RosterMenuProps) {
  const handleDeleteRoster = () => {
    removeRoster(roster.id);
    onDeleteClick?.(roster.id);
  };

  const handleDuplicateRoster = () => {
    const newRosterId = uuidv4();
    if (!roster) {
      return;
    }

    addRoster({
      ...roster,
      id: newRosterId,
      name: `${roster.name} (Copy)`,
    });

    cloneRosterDetails(roster.id, newRosterId);

    onDuplicateClick?.(roster);

    // scroll down to the new roster
    requestAnimationFrame(() => {
      const rosterElement = document.querySelector<HTMLAnchorElement>(
        `a[data-roster-id="${newRosterId}"]`,
      );
      if (!rosterElement) {
        console.warn(`Roster element with id ${newRosterId} not found`);
        return;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        // contentEditable is a hack to apply focus-visible to the 'a' element
        (rosterElement as HTMLElement as HTMLInputElement).contentEditable = 'true';
        rosterElement.focus();
        (rosterElement as HTMLElement as HTMLInputElement).contentEditable = 'false';
      }, 100);
    });
  };

  return (
    <>
      {enabledOptions?.includes('edit') && (
        <li>
          <Link
            href={`/rosters/edit?rosterId=${encodeURIComponent(roster.id)}`}
            onClick={() => onEditClick?.(roster)}
          >
            Edit Roster
          </Link>
        </li>
      )}
      {enabledOptions?.includes('duplicate') && (
        <li>
          <button type="button" onClick={handleDuplicateRoster}>
            Duplicate Roster
          </button>
        </li>
      )}
      {enabledOptions?.includes('delete') && (
        <li>
          <button type="button" onClick={handleDeleteRoster}>
            Delete
          </button>
        </li>
      )}
    </>
  );
}
