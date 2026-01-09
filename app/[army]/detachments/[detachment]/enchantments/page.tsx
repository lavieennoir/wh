import Navbar from '@/src/components/layout/Navbar';
import EnchantmentBlock from '@/src/components/rules/EnchantmentBlock';
import { Army } from '@/src/lib/army';
import { armyDetachments } from '@/src/lib/detachments';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function EnchantmentsPage(
  props: PageProps<'/[army]/detachments/[detachment]/enchantments'>,
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
      <Navbar title="Enchantments" backButtonHref={`/${army}/detachments/${detachment.slug}`} />
      <main className="p-2 pb-16 flex flex-col gap-2">
        {detachment.enchantments?.map((enchantment) => (
          <EnchantmentBlock
            key={enchantment.name}
            name={enchantment.name}
            cost={enchantment.cost}
            description={enchantment.description}
          />
        ))}
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: Pick<PageProps<'/[army]/detachments/[detachment]/enchantments'>, 'params'>): Promise<Metadata> {
  const { army, detachment: detachmentSlug } = await params;
  const detachmentName = armyDetachments[army as Army]?.find(
    (detachment) => detachment.slug === detachmentSlug,
  )?.name;

  return {
    title: `${capitalize(kebabCaseToTitleCase(army))} - ${detachmentName} Enchantments`,
  };
}

export async function generateStaticParams() {
  return Object.entries(armyDetachments).flatMap(([army, detachmentDataSheets]) =>
    detachmentDataSheets.map((detachment) => ({ army, detachment: detachment.slug })),
  );
}
