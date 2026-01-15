'use client';
import FileIcon from '@/public/icons/file.svg';
import { useFullRosterFromUrl } from '@/src/hooks/useFullRosterFromUrl';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import ComingSoonAlert from '../common/ComingSoonAlert';
import Navbar from '../layout/Navbar';

export default function EditRosterUnit() {
  const searchParams = useSearchParams();
  const { roster, isLoading } = useFullRosterFromUrl();

  if (isLoading) {
    return null;
  }

  if (!roster) {
    return notFound();
  }

  const unitId = searchParams.get('unitId');
  const unit = roster.units.find((unit) => unit.id === unitId);

  if (!unit) {
    return notFound();
  }

  return (
    <>
      <Navbar
        title={unit.name}
        backButtonHref={`/rosters/details?rosterId=${encodeURIComponent(roster.id)}`}
        actions={
          <>
            <span className="badge badge-info font-bold ml-auto">{unit.points} Points</span>
            <Link
              href={`/${roster.army}/datasheets/${unit.dataSheetSlug}`}
              className="btn btn-circle btn-ghost"
            >
              <FileIcon className="size-6" />
            </Link>
          </>
        }
      />
      <main className="p-2 pb-16">
        <ComingSoonAlert />
      </main>
    </>
  );
}
