import RosterDetails from '@/src/components/rosters/RosterDetails';
import { Suspense } from 'react';

export default function RosterDetailsPage() {
  return (
    <Suspense>
      <RosterDetails />
    </Suspense>
  );
}
