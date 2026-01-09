import chaosDaemonsArmyRules from '@/assets/chaos-daemons/army-rules.json';
import deathGuardArmyRules from '@/assets/death-guard/army-rules.json';
import { ArmyRule, armyRuleArrayValidationSchema } from '../schemas/army-rule.schema';
import { Army } from './army';

// Validate data sheets at build time to ensure they are valid,
// Additionally use `satisfies` validate them at compile time
export const armyRules: Record<Army, ArmyRule[]> = {
  [Army.ChaosDaemons]: armyRuleArrayValidationSchema.parse(
    chaosDaemonsArmyRules satisfies ArmyRule[],
  ),
  [Army.DeathGuard]: armyRuleArrayValidationSchema.parse(deathGuardArmyRules satisfies ArmyRule[]),
};
