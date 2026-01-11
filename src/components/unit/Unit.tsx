import pluralize from '@/src/lib/pluralize';
import { DataSheet } from '@/src/schemas/data-sheet.schema';
import AbilitiesBlocks from './AbilitiesBlocks';
import DemonicAllegianceContent from './DemonicAllegianceContent';
import MeleeWeaponsContent from './MeleeWeaponsContent';
import RangedWeaponsContent from './RangedWeaponsContent';
import UnitBaseBlock from './UnitBaseBlock';
import UnitCompositionBlock from './UnitCompositionBlock';
import UnitInvulnerableBlock from './UnitInvulnerableBlock';
import UnitStats from './UnitStats';
import WargearAbilitiesContent from './WargearAbilitiesContent';
import WargearOptionsContent from './WargearOptionsContent';

export interface UnitProps {
  dataSheet: DataSheet;
}

export default function Unit({ dataSheet }: UnitProps) {
  return (
    <div className="pt-2">
      <UnitStats stats={dataSheet.stats} />
      <hr />
      {dataSheet.stats.invulnerableSave && (
        <>
          <UnitInvulnerableBlock invulnerableSave={dataSheet.stats.invulnerableSave} />
          <hr />
        </>
      )}
      {dataSheet.rangedWeapons && (
        <>
          <UnitBaseBlock name="Ranged Weapons">
            <RangedWeaponsContent weapons={dataSheet.rangedWeapons} />
          </UnitBaseBlock>
          <hr />
        </>
      )}
      {dataSheet.meleeWeapons && (
        <>
          <UnitBaseBlock name="Melee Weapons">
            <MeleeWeaponsContent weapons={dataSheet.meleeWeapons} />
          </UnitBaseBlock>
          <hr />
        </>
      )}
      <AbilitiesBlocks
        coreAbilities={dataSheet.coreAbilities}
        factionAbility={dataSheet.factionAbility}
        abilities={dataSheet.abilities}
      />
      {dataSheet.demonicAllegiance && (
        <>
          <UnitBaseBlock name="Demonic Allegiance">
            <DemonicAllegianceContent allegiance={dataSheet.demonicAllegiance} />
          </UnitBaseBlock>
          <hr />
        </>
      )}
      <hr />
      {dataSheet.leader && (
        <>
          <UnitBaseBlock name="Leader">
            <div className="flex flex-col gap-4">
              <p>
                This model can be attached to the following{' '}
                {pluralize('unit', dataSheet.leader.attachableTo.length)}:
              </p>
              <ul className="font-bold">
                {dataSheet.leader.attachableTo.map((unit) => (
                  <li key={unit}>- {unit}</li>
                ))}
              </ul>
              {dataSheet.leader.note && <p>{dataSheet.leader.note}</p>}
            </div>
          </UnitBaseBlock>
          <hr />
        </>
      )}
      {dataSheet.transport && (
        <>
          <UnitBaseBlock name="Transport">
            <p>{dataSheet.transport.note}</p>
          </UnitBaseBlock>
          <hr />
        </>
      )}
      {dataSheet.supremeCommander && (
        <>
          <UnitBaseBlock name="Supreme Commander">
            <p>{dataSheet.supremeCommander}</p>
          </UnitBaseBlock>
          <hr />
        </>
      )}
      {dataSheet.degradation && (
        <>
          <UnitBaseBlock
            name={`Damaged: ${dataSheet.degradation.woundsRemaining} wounds remaining`}
          >
            <p>
              While this model has {dataSheet.degradation.woundsRemaining} wounds remaining,{' '}
              {dataSheet.degradation.effect}
            </p>
          </UnitBaseBlock>
          <hr />
        </>
      )}
      {dataSheet.wargearAbilities && (
        <>
          <UnitBaseBlock name="Wargear Abilities">
            <WargearAbilitiesContent abilities={dataSheet.wargearAbilities} />
          </UnitBaseBlock>
          <hr />
        </>
      )}
      {dataSheet.wargearOptions && (
        <>
          <UnitBaseBlock name="Wargear Options">
            <WargearOptionsContent wargearOptions={dataSheet.wargearOptions} />
          </UnitBaseBlock>
          <hr />
        </>
      )}
      <UnitCompositionBlock composition={dataSheet.unitComposition} baseSize={dataSheet.baseSize} />
      <hr />
      <UnitBaseBlock name="Keywords">
        <p className="font-bold">{dataSheet.keywords.join(', ')}</p>
      </UnitBaseBlock>
      <hr />
      <p className="text-sm text-base-content/50 text-center py-2 mt-auto">
        Updated on: {dataSheet.updatedAt}
      </p>
    </div>
  );
}
