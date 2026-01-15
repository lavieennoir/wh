import EditRosterUnit from '@/src/components/rosters/EditRosterUnit';
import { Suspense } from 'react';

export default function EditRosterUnitPage() {
  return (
    <>
      <Suspense>
        <EditRosterUnit />
      </Suspense>
    </>
  );
}
