import { Stats } from '../schemas/data-sheet.schema';

export const formatStatValue = (value: number, stat: keyof Stats): string => {
  switch (stat) {
    case 'movement':
      return `${value}"`;
    case 'save':
    case 'leadership':
      return `${value}+`;
    default:
      return value.toString();
  }
};
