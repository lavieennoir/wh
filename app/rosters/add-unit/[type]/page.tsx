import AddUnitList from '@/src/components/rosters/AddUnitList';
import { RosterUnitType } from '@/src/lib/roster';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';
import { Suspense } from 'react';

export default async function AddRosterUnitPage({ params }: PageProps<'/rosters/add-unit/[type]'>) {
  const { type } = await params;
  return (
    <Suspense>
      <AddUnitList type={type as RosterUnitType} />
    </Suspense>
  );
}

export function generateStaticParams() {
  return Object.values(RosterUnitType).map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: PageProps<'/rosters/add-unit/[type]'>): Promise<Metadata> {
  const { type } = await params;
  return {
    title: `${capitalize(kebabCaseToTitleCase(type))} - Add Unit`,
  };
}
