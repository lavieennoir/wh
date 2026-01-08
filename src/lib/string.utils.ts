import pluralize from 'pluralize';

export function kebabCaseToTitleCase(kebabCase: string): string {
  return kebabCase.replace(/-/g, ' ');
}

export function capitalize(string: string): string {
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Groups items by their name and returns an array of strings with the amount of times the item was encountered.
 * @param items - The items to group.
 * @param formatter - A function to format the amount and item. Defaults to pluralizing the item.
 * @returns An array of strings with the amount of times the item was encountered.
 *
 * @example
 * groupItems(['apple', 'banana', 'apple', 'orange', 'banana', 'apple']) // ['3 apples', '2 bananas', '1 orange']
 * groupItems(['apple', 'banana', 'apple', 'orange', 'banana', 'apple'], (amount, item) => `${amount} x ${item}`) // ['3 x apples', '2 x bananas', '1 x orange']
 * groupItems(['apple', 'banana', 'apple', 'orange', 'banana', 'apple'], (amount, item) => `${amount} ${item}s`) // ['3 apples', '2 bananas', '1 orange']
 * groupItems(['apple', 'banana', 'apple', 'orange', 'banana', 'apple'], (amount, item) => `${amount} ${item}s`) // ['3 apples', '2 bananas', '1 orange']
 */
export function groupItems(
  items: string[],
  formatter: (amount: number, item: string) => string = (amount, item) =>
    amount > 1 ? `${amount} ${pluralize(item, amount)}` : item,
): string[] {
  const itemsEncounteredMap = new Map<string, number>();
  for (const item of items) {
    const itemEncounteredTimes = itemsEncounteredMap.get(item) ?? 0;
    itemsEncounteredMap.set(item, itemEncounteredTimes + 1);
  }
  return Array.from(itemsEncounteredMap.entries()).map(([item, amount]) => formatter(amount, item));
}
