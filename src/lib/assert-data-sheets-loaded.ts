import { globSync } from 'glob';
import { armyDataSheets } from './data-sheets';

// We import data sheet json files statically to ensure type safety
// But additionally check if we read data sheets from assets folder
// If not, throw an error
export function assertAllDataSheetsAreUsed() {
  const dataSheetFileNames = globSync(process.cwd() + '/assets/**/datasheets.json');

  const dataSheetFileNamesSet = new Set(
    dataSheetFileNames.map((fileName) => fileName.split('/').at(-2)),
  );

  const loadedDataSheets = new Set(Object.keys(armyDataSheets));

  const unusedDataSheetFileNames = dataSheetFileNamesSet.difference(loadedDataSheets);

  if (unusedDataSheetFileNames.size > 0) {
    throw new Error(
      `Unused data sheet files found in assets folder:\n${Array.from(unusedDataSheetFileNames).join(
        '\n',
      )}`,
    );
  }
}
