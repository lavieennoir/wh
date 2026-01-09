import Markdown from '@/src/components/common/Markdown';
import Navbar from '@/src/components/layout/Navbar';
import UnitBaseBlock from '@/src/components/unit/UnitBaseBlock';
import { Army, getArmyOrNotFound } from '@/src/lib/army';
import { armyRules } from '@/src/lib/army-rules';
import { assertAllDataSheetsAreUsed } from '@/src/lib/assert-data-sheets-loader';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';
import { Fragment } from 'react/jsx-runtime';

export default async function ArmyRulesPage(props: PageProps<'/[army]/army-rules'>) {
  const { army } = await props.params;
  const armyEnum = getArmyOrNotFound(army);

  const rules = armyRules[armyEnum];
  return (
    <>
      <Navbar title="Datasheets" backButtonHref={`/${army}`} />
      <main className="p-2 pb-16">
        {rules.map((rule) => (
          <Fragment key={rule.name}>
            <UnitBaseBlock name={rule.name}>
              <Markdown>{rule.description}</Markdown>
              {rule.abilities && (
                <div className="flex flex-col gap-4 pt-4">
                  {rule.abilities.map((ability) => (
                    <Fragment key={ability.name}>
                      <h2>{ability.name}</h2>
                      <Markdown>{ability.description}</Markdown>
                      {ability.subAbilities && (
                        <div className="flex flex-col gap-2">
                          {ability.subAbilities.map((subAbility) => (
                            <Fragment key={subAbility.name}>
                              <span className="badge badge-base-content font-bold">
                                {subAbility.name}
                              </span>
                              <Markdown>{subAbility.description}</Markdown>
                            </Fragment>
                          ))}
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              )}
            </UnitBaseBlock>
            <hr />
          </Fragment>
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
  assertAllDataSheetsAreUsed();

  return Object.values(Army).map((army) => ({
    army,
  }));
}
