import { describe, expect, it } from 'vitest';
import { UnitComposition } from '../schemas/data-sheet.schema';
import { RosterUnit } from '../schemas/roster.schema';
import { getUnitCost } from './roster';

describe('roster', () => {
  describe('getUnitCost', () => {
    it('should return the cost of the single model unit', () => {
      const unit: RosterUnit = {
        id: '1',
        name: 'Test Unit',
        dataSheetSlug: 'test-unit',
        models: [
          {
            name: 'Test Model',
            amount: 1,
            isWarlord: false,
            wargear: [],
          },
        ],
      };
      const unitComposition: UnitComposition = {
        cost: [{ points: 100, models: { 'Test Model': { minCount: 1, maxCount: 1 } } }],
        equipment: [],
        models: [{ model: 'Test Model', minCount: 1, maxCount: 1 }],
      };
      expect(getUnitCost(unit, unitComposition)).toBe(100);
    });

    it('should return the cost of the multiple model unit', () => {
      const unit: RosterUnit = {
        id: '1',
        name: 'Test Unit',
        dataSheetSlug: 'test-unit',
        models: [
          { name: 'Test Model', amount: 2, isWarlord: false, wargear: [] },
          { name: 'Test Model 2', amount: 1, isWarlord: false, wargear: [] },
        ],
      };
      const unitComposition: UnitComposition = {
        cost: [
          {
            points: 100,
            models: {
              'Test Model': { minCount: 2, maxCount: 2 },
              'Test Model 2': { minCount: 1, maxCount: 1 },
            },
          },
        ],
        equipment: [],
        models: [
          { model: 'Test Model', minCount: 2, maxCount: 2 },
          { model: 'Test Model 2', minCount: 1, maxCount: 1 },
        ],
      };
      expect(getUnitCost(unit, unitComposition)).toBe(100);
    });

    it('should return proper cost if there are multiple cost items', () => {
      const cheapestUnit: RosterUnit = {
        id: '1',
        name: 'Test Unit',
        dataSheetSlug: 'test-unit',
        models: [{ name: 'Test Model', amount: 1, isWarlord: false, wargear: [] }],
      };
      const mostExpensiveUnit: RosterUnit = {
        id: '2',
        name: 'Test Unit 2',
        dataSheetSlug: 'test-unit-2',
        models: [{ name: 'Test Model', amount: 3, isWarlord: false, wargear: [] }],
      };
      const unitComposition: UnitComposition = {
        cost: [
          { points: 100, models: { 'Test Model': { minCount: 1, maxCount: 2 } } },
          { points: 200, models: { 'Test Model': { minCount: 3, maxCount: 4 } } },
        ],
        equipment: [],
        models: [{ model: 'Test Model', minCount: 1, maxCount: 4 }],
      };

      expect(getUnitCost(cheapestUnit, unitComposition)).toBe(100);
      expect(getUnitCost(mostExpensiveUnit, unitComposition)).toBe(200);
    });

    it('should return proper cost if unit have multiple models with different costs', () => {
      const cheapestUnit: RosterUnit = {
        id: '1',
        name: 'Test Unit',
        dataSheetSlug: 'test-unit',
        models: [
          { name: 'Test Model', amount: 1, isWarlord: false, wargear: [] },
          { name: 'Test Model 2', amount: 1, isWarlord: false, wargear: [] },
        ],
      };
      const mostExpensiveUnit: RosterUnit = {
        id: '2',
        name: 'Test Unit',
        dataSheetSlug: 'test-unit',
        models: [
          { name: 'Test Model', amount: 4, isWarlord: false, wargear: [] },
          { name: 'Test Model 2', amount: 10, isWarlord: false, wargear: [] },
        ],
      };
      const mediumUnit1: RosterUnit = {
        id: '3',
        name: 'Test Unit',
        dataSheetSlug: 'test-unit',
        models: [
          { name: 'Test Model', amount: 1, isWarlord: false, wargear: [] },
          { name: 'Test Model 2', amount: 8, isWarlord: false, wargear: [] },
        ],
      };
      const mediumUnit2: RosterUnit = {
        id: '4',
        name: 'Test Unit',
        dataSheetSlug: 'test-unit',
        models: [
          { name: 'Test Model', amount: 4, isWarlord: false, wargear: [] },
          { name: 'Test Model 2', amount: 1, isWarlord: false, wargear: [] },
        ],
      };
      const mediumUnit3: RosterUnit = {
        id: '2',
        name: 'Test Unit',
        dataSheetSlug: 'test-unit',
        models: [
          { name: 'Test Model', amount: 4, isWarlord: false, wargear: [] },
          { name: 'Test Model 2', amount: 8, isWarlord: false, wargear: [] },
        ],
      };
      const mostExpensiveUnit2: RosterUnit = {
        id: '2',
        name: 'Test Unit',
        dataSheetSlug: 'test-unit',
        models: [
          { name: 'Test Model', amount: 4, isWarlord: false, wargear: [] },
          { name: 'Test Model 2', amount: 9, isWarlord: false, wargear: [] },
        ],
      };
      const unitComposition: UnitComposition = {
        cost: [
          {
            points: 100,
            models: {
              'Test Model': { minCount: 1, maxCount: 2 },
              'Test Model 2': { minCount: 1, maxCount: 4 },
            },
          },
          {
            points: 200,
            models: {
              'Test Model': { minCount: 3, maxCount: 4 },
              'Test Model 2': { minCount: 5, maxCount: 8 },
            },
          },
          {
            points: 300,
            models: {
              'Test Model': { minCount: 3, maxCount: 4 },
              'Test Model 2': { minCount: 9, maxCount: 10 },
            },
          },
        ],
        equipment: [],
        models: [
          { model: 'Test Model', minCount: 1, maxCount: 4 },
          { model: 'Test Model 2', minCount: 1, maxCount: 10 },
        ],
      };
      expect(getUnitCost(cheapestUnit, unitComposition)).toBe(100);
      expect(getUnitCost(mostExpensiveUnit, unitComposition)).toBe(300);
      expect(getUnitCost(mostExpensiveUnit2, unitComposition)).toBe(300);
      expect(getUnitCost(mediumUnit1, unitComposition)).toBe(200);
      expect(getUnitCost(mediumUnit2, unitComposition)).toBe(200);
      expect(getUnitCost(mediumUnit3, unitComposition)).toBe(200);
    });
  });
});
