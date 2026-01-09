import Navbar from '@/src/components/layout/Navbar';
import Unit from '@/src/components/unit/Unit';
import { Army } from '@/src/lib/army';
import { armyDataSheets } from '@/src/lib/data-sheets';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function UnitDataSheetPage(props: PageProps<'/[army]/datasheets/[unit]'>) {
  const { army, unit: unitSlug } = await props.params;
  const unit = armyDataSheets[army as Army]?.find((dataSheet) => dataSheet.slug === unitSlug);

  if (!unit) {
    notFound();
  }

  return (
    <>
      <Navbar title={unit.name} backButtonHref={`/${army}/datasheets`} />
      <main className="pb-16">
        <Unit dataSheet={unit} />
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: Pick<PageProps<'/[army]/datasheets/[unit]'>, 'params'>): Promise<Metadata> {
  const { army, unit: unitSlug } = await params;
  const unitName = armyDataSheets[army as Army]?.find(
    (dataSheet) => dataSheet.slug === unitSlug,
  )?.name;

  return {
    title: `${unitName} - ${capitalize(kebabCaseToTitleCase(army))}`,
  };
}

export async function generateStaticParams() {
  return Object.entries(armyDataSheets).flatMap(([army, unitDataSheets]) =>
    unitDataSheets.map((unit) => ({ army, unit: unit.slug })),
  );
}
