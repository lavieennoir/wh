import Navbar from '@/src/components/layout/Navbar';
import StratagemBlock from '@/src/components/rules/StratagemBlock';
import { Army } from '@/src/lib/army';
import { armyDetachments } from '@/src/lib/detachments';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function StratagemsPage(
  props: PageProps<'/[army]/detachments/[detachment]/stratagems'>,
) {
  const { army, detachment: detachmentSlug } = await props.params;
  const detachment = armyDetachments[army as Army]?.find(
    (detachment) => detachment.slug === detachmentSlug,
  );

  if (!detachment) {
    notFound();
  }

  return (
    <>
      <Navbar title="Stratagems" backButtonHref={`/${army}/detachments/${detachment.slug}`} />
      <main className="p-2 pb-16 flex flex-col gap-2">
        {detachment.stratagems?.map((stratagem) => (
          <StratagemBlock
            key={stratagem.name}
            name={stratagem.name}
            cost={stratagem.cost}
            turn={stratagem.turn}
            content={stratagem.content}
          />
        ))}
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: Pick<PageProps<'/[army]/detachments/[detachment]/stratagems'>, 'params'>): Promise<Metadata> {
  const { army, detachment: detachmentSlug } = await params;
  const detachmentName = armyDetachments[army as Army]?.find(
    (detachment) => detachment.slug === detachmentSlug,
  )?.name;

  return {
    title: `${capitalize(kebabCaseToTitleCase(army))} - ${detachmentName} Stratagems`,
  };
}

export async function generateStaticParams() {
  return Object.entries(armyDetachments).flatMap(([army, detachmentDataSheets]) =>
    detachmentDataSheets.map((detachment) => ({ army, detachment: detachment.slug })),
  );
}
