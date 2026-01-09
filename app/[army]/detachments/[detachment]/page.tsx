import ListItemLink from '@/src/components/common/ListItemLink';
import Markdown from '@/src/components/common/Markdown';
import Navbar from '@/src/components/layout/Navbar';
import AbilitiesBlock from '@/src/components/rules/AbilitiesBlock';
import { Army } from '@/src/lib/army';
import { armyDetachments } from '@/src/lib/detachments';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function DetachmentPage(props: PageProps<'/[army]/detachments/[detachment]'>) {
  const { army, detachment: detachmentSlug } = await props.params;
  const detachment = armyDetachments[army as Army]?.find(
    (detachment) => detachment.slug === detachmentSlug,
  );

  if (!detachment) {
    notFound();
  }

  return (
    <>
      <Navbar title={detachment.name} backButtonHref={`/${army}`} />
      <main className="p-2 pb-16">
        <ul className="list gap-2">
          <li>
            <ListItemLink href={`/${army}/detachments/${detachment.slug}/enchantments`}>
              Enchantments
            </ListItemLink>
          </li>
          <li>
            <ListItemLink href={`/${army}/detachments/${detachment.slug}/stratagems`}>
              Stratagems
            </ListItemLink>
          </li>
        </ul>
        <hr className="my-4 border-dashed border-base-content/50" />
        <div className="flex flex-col gap-2">
          <h2 className="px-5">Detachment Rules</h2>
          <Markdown>{detachment.description}</Markdown>
          {detachment.rules?.map((rule) => (
            <AbilitiesBlock
              key={rule.name}
              name={rule.name}
              description={rule.description}
              abilities={rule.subAbilities}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: Pick<PageProps<'/[army]/detachments/[detachment]'>, 'params'>): Promise<Metadata> {
  const { army, detachment: detachmentSlug } = await params;
  const detachmentName = armyDetachments[army as Army]?.find(
    (detachment) => detachment.slug === detachmentSlug,
  )?.name;

  return {
    title: `${capitalize(kebabCaseToTitleCase(army))} - ${detachmentName}`,
  };
}

export async function generateStaticParams() {
  return Object.entries(armyDetachments).flatMap(([army, detachmentDataSheets]) =>
    detachmentDataSheets.map((detachment) => ({ army, detachment: detachment.slug })),
  );
}
