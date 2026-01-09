import ComingSoonAlert from '@/src/components/common/ComingSoonAlert';
import ListItemLink from '@/src/components/common/ListItemLink';
import Navbar from '@/src/components/layout/Navbar';
import { Army, getArmyOrNotFound } from '@/src/lib/army';
import { armyDataSheets } from '@/src/lib/data-sheets';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';

export default async function DataSheetsPage(props: PageProps<'/[army]/datasheets'>) {
  const { army } = await props.params;
  const armyEnum = getArmyOrNotFound(army);

  const dataSheets = armyDataSheets[armyEnum];

  return (
    <>
      <Navbar title="Datasheets" backButtonHref={`/${army}`} />
      <main className="p-2 pb-16">
        <ul className="list">
          {dataSheets.length === 0 && (
            <ComingSoonAlert subtitle="Datasheets are not yet available" />
          )}
          {dataSheets.map((dataSheet) => (
            <li key={dataSheet.slug}>
              <ListItemLink href={`/${army}/datasheets/${dataSheet.slug}`}>
                {dataSheet.name}
              </ListItemLink>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ army: string }>;
}): Promise<Metadata> {
  const { army } = await params;
  return {
    title: `${capitalize(kebabCaseToTitleCase(army))} - Datasheets`,
  };
}

export async function generateStaticParams() {
  return Object.values(Army).map((army) => ({
    army,
  }));
}
