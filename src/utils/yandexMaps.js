/** Поиск точки на Яндекс.Картах по строке адреса */
export function yandexMapsSearchUrl(query) {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(query)}`;
}

/** Салоны: запросы для геопоиска в Саратове */
export const SALON_YANDEX_MAPS_URL = {
  moskovskaya117a: yandexMapsSearchUrl('Саратов, Московская улица, 117А'),
  chapaeva65: yandexMapsSearchUrl('Саратов, улица Чапаева, 65'),
};
