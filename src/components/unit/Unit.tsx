import { DataSheet } from '@/src/schemas/data-sheet.schema';
import AbilitiesBlocks from './AbilitiesBlocks';
import MeleeWeaponsContent from './MeleeWeaponsContent';
import RangedWeaponsContent from './RangedWeaponsContent';
import UnitBaseBlock from './UnitBaseBlock';
import UnitCompositionBlock from './UnitCompositionBlock';
import UnitInvulnerableBlock from './UnitInvulnerableBlock';
import UnitStats from './UnitStats';

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
      <hr />
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
          <UnitBaseBlock name="Degradation">
            <p>
              While this model has {dataSheet.degradation.woundsRemaining} wounds remaining,{' '}
              {dataSheet.degradation.effect}
            </p>
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
