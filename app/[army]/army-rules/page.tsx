import Navbar from '@/src/components/layout/Navbar';
import AbilitiesBlock from '@/src/components/rules/AbilitiesBlock';
import { Army, getArmyOrNotFound } from '@/src/lib/army';
import { armyRules } from '@/src/lib/army-rules';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';

export default async function ArmyRulesPage(props: PageProps<'/[army]/army-rules'>) {
  const { army } = await props.params;
  const armyEnum = getArmyOrNotFound(army);

  const rules = armyRules[armyEnum];
  return (
    <>
      <Navbar title="Datasheets" backButtonHref={`/${army}`} />
      <main className="p-2 pb-16 flex flex-col gap-4">
        {rules.map((rule) => (
          <AbilitiesBlock
            key={rule.name}
            name={rule.name}
            description={rule.description}
            abilities={rule.abilities}
          />
        ))}
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
    title: `Army Rules - ${capitalize(kebabCaseToTitleCase(army))}`,
  };
}

export async function generateStaticParams() {
  return Object.values(Army).map((army) => ({
    army,
  }));
}
