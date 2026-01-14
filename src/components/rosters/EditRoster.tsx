import { useRosterFromUrl } from '@/src/hooks/useRosterFromUrl';
import { notFound } from 'next/navigation';
import RosterForm from './RosterForm';

export default function EditRoster() {
  const { roster, isLoading } = useRosterFromUrl();
  if (isLoading) {
    return null;
  }
  if (!roster) {
    return notFound();
  }
  return <RosterForm id={roster.id} defaultValues={roster} />;
}
