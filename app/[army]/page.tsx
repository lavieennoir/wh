import ListItemLink from '@/src/components/ListItemLink';
import Navbar from '@/src/components/Navbar';
import { Army } from '@/src/lib/army';
import { assertAllDataSheetsAreUsed } from '@/src/lib/assert-data-sheets-loaded';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';

export default async function ArmyPage(props: PageProps<'/[army]'>) {
  const { army } = await props.params;

  return (
    <>
      <Navbar title={capitalize(kebabCaseToTitleCase(army))} />
      <main className="p-2 pb-16">
        <ul className="list gap-2">
          <li>
            <ListItemLink href={`/${army}/datasheets`}>Datasheets</ListItemLink>
          </li>
          <li>
            <ListItemLink href="#">
              Army Rules
              <span className="badge badge-soft badge-info ml-2">Coming Soon</span>
            </ListItemLink>
          </li>
          <li>
            <ListItemLink href="#">
              Detachments
              <span className="badge badge-soft badge-info ml-2">Coming Soon</span>
            </ListItemLink>
          </li>
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
    title: capitalize(kebabCaseToTitleCase(army)),
  };
}

export async function generateStaticParams() {
  assertAllDataSheetsAreUsed();

  return Object.values(Army).map((army) => ({
    army,
  }));
}
