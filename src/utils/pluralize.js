/**
 * Склонение для русских числительных.
 * @param {number} n — число
 * @param {[string, string, string]} forms — [1, 2-4, 5+] например ['товар', 'товара', 'товаров']
 * @returns {string}
 */
export function pluralize(n, [one, few, many]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}

export const productCount = (n) => pluralize(n, ['товар', 'товара', 'товаров']);
export const brandCount = (n) => pluralize(n, ['бренд', 'бренда', 'брендов']);
