import ListItemLink from '@/src/components/common/ListItemLink';
import Navbar from '@/src/components/layout/Navbar';
import { Army, getArmyOrNotFound } from '@/src/lib/army';
import { armyDetachments } from '@/src/lib/detachments';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';

export default async function ArmyPage(props: PageProps<'/[army]'>) {
  const { army } = await props.params;
  const armyEnum = getArmyOrNotFound(army);

  const detachments = armyDetachments[armyEnum];

  return (
    <>
      <Navbar title={capitalize(kebabCaseToTitleCase(army))} backButtonHref="/" />
      <main className="p-2 pb-16">
        <ul className="list gap-2">
          <li>
            <ListItemLink href={`/${army}/datasheets`}>Datasheets</ListItemLink>
          </li>
          <li>
            <ListItemLink href={`/${army}/army-rules`}>Army Rules</ListItemLink>
          </li>
        </ul>
        <hr className="my-4 border-dashed border-base-content/50" />
        <h2 className="my-2 px-5">Detachments</h2>
        <ul className="list gap-2">
          {detachments.map((detachment) => (
            <li key={detachment.slug}>
              <ListItemLink href={`/${army}/detachments/${detachment.slug}`}>
                {detachment.name}
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
    title: capitalize(kebabCaseToTitleCase(army)),
  };
}

export async function generateStaticParams() {
  return Object.values(Army).map((army) => ({
    army,
  }));
}
