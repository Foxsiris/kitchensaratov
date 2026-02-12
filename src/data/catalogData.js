// Централизованный каталог товаров
// Данные из: rimi-mebel.ru, viva-kitchen.com, lider-mebel.ru

// =============== КУХНИ ===============

const rimiModernKitchens = [
  { id: 'rimi-luna', name: 'Луна', price: 'от 286 350 ₽', description: 'На пике современности и трендовых идей – новая модель LUNA. Уникальная особенность модели – профиль со встроенным световым потоком. Контурная подсветка привносит легкость и чистоту линий.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-ferrata', name: 'Феррата', price: 'от 232 918 ₽', description: 'Кухня Ferrata - современная модель в которой детали выходят на первый план. Интегрированная ручка Gola золотого цвета выступает ярким акцентом и придаёт интерьеру неповторимый дизайн.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-progma', name: 'Прогма', price: 'от 198 413 ₽', description: 'Кухня Progma выполнена на пике последних современных модных тенденций мировой мебельной индустрии с использованием лучших материалов и комплектующих.', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-primavera', name: 'Примавера', price: 'от 203 596 ₽', description: 'Кухня Primavera создана для людей современных и динамичных. Блики на глянцевой рельефной поверхности фасадов напоминают волны, создаваемые легким морским бризом.', image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-magna', name: 'Магна', price: 'от 200 000 ₽', description: 'Модель «Магна» — это стремление к функциональности и элегантности без излишеств. Сочетание гладких и матовых поверхностей с рельефными текстурами добавляет динамику.', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-arona', name: 'Арона', price: 'от 345 000 ₽', description: 'Высокое качество определяет согласованность дизайна и функциональности. Четкая геометрия всех линий и использование самых современных материалов.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-konkretta', name: 'Конкретта', price: 'от 312 434 ₽', description: 'Конкретта - современная, строгая, но в тоже время изысканная модель. В абсолютной гармонии сочетаются чистые геометрические формы и инновационные материалы.', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-esenta', name: 'Эсента', price: 'от 396 748 ₽', description: 'Отличительной чертой модели «Эсента» являются матовые остекленные фасады в алюминиевом профиле. Широкий спектр цветовых решений для создания индивидуального пространства.', image: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-novara', name: 'Новара', price: 'от 240 301 ₽', description: 'Модель «Новара» - это сочетание простых линий и форм. Глубокий и объемный цвет фасадов достигается сочетанием эмали и стекла.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-shika', name: 'Шика', price: 'от 331 386 ₽', description: 'Кухня «Шика» – это эстетика и неповторимый стиль в каждой детали. Тонкая, элегантная рамка фасада и интегрированная невидимая ручка.', image: 'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-florida', name: 'Флорида', price: 'от 263 213 ₽', description: 'Флорида воплощает актуальные тенденции архитектуры и дизайна. Особенностью является фрезерованная по всей ширине фасада ручка «J».', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-miami', name: 'Майами', price: 'от 258 201 ₽', description: 'Модель «Майами» - инновационное решение для современного жилья. Лаконичность и продуманность дизайна с обилием возможностей сочетания материалов.', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-miami-curv', name: 'Майами (криволинейные)', price: 'от 258 201 ₽', description: 'Модель Майами с криволинейными фасадами - инновационное решение с обилием возможностей по сочетанию материалов, цветов и фактур.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-ora', name: 'Ора', price: 'от 203 596 ₽', description: 'Кухня «Ора» воплощает современные тенденции мировой мебельной индустрии. Доступна в матовой и глянцевой отделке в различных цветовых оттенках.', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-kristali', name: 'Кристали', price: 'от 364 595 ₽', description: 'Модель Кристали идеально подойдёт для ценителей современных направлений в дизайне. Фасады из просветлённого стекла создают эффект «техно».', image: 'https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-kanti', name: 'Канти', price: 'от 203 596 ₽', description: 'В прямых линиях, строгой элегантности и разнообразии дизайнерских решений отражаются тонкий вкус. Фасад с тонкой рамкой производит завораживающее впечатление.', image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-nizza', name: 'Ницца NEW', price: 'от 288 875 ₽', description: 'Модель «НИЦЦА» выполнена в ярком ультрасовременном дизайне. Фасады могут быть облицованы акриловым, глянцевым или матовым пластиком широкой палитры оттенков.', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-time', name: 'Тайм', price: 'от 198 413 ₽', description: 'Кухня «ТАЙМ» — оптимальное сочетание минимализма и изящества, при этом является очень доступной. Множество цветовых вариантов декоров.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-nicole', name: 'Николь', price: 'от 203 596 ₽', description: 'Модель «Николь» — стильная кухня с фрезерованными фасадами в стиле неоклассика, современная интерпретация многовековых традиций.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-avenue', name: 'Авеню', price: 'от 305 649 ₽', description: 'Кухня Avenue — выбор современных людей, предпочитающих элегантную практичность. Прямые рамочные фасады и открытые стеллажи.', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
];

const rimiClassicKitchens = [
  { id: 'rimi-monticheli', name: 'Монтичели', price: 'от 353 467 ₽', description: 'Воплощение традиций английского стиля. Лицевые панели из МДФ толщиной 24 мм с воздушной фрезеровкой. Пилястра с объёмным декором и высокие карнизы.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-fabiana', name: 'Фабиана', price: 'от 375 737 ₽', description: 'Фабиана выполнена в утонченном неформальном стиле — гармония между современным изяществом и грубоватой индустриальной красотой.', image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-lanzhe', name: 'Ланже', price: 'от 315 832 ₽', description: 'Великолепная кухня Ланже переносит в Золотую эпоху Голливуда. Сияние глянцевых фасадов декорированных стеклом с фрезеровкой в стиле ар-деко.', image: 'https://images.unsplash.com/photo-1600573472572-8aba140f3eae?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-maranella', name: 'Маранелла', price: 'от 353 449 ₽', description: 'Вдохновленная легендарной моделью Maranello от Ferrari. Классика, опережающая время. Элегантные формы и завораживающая отделка ANTIQ.', image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-barona', name: 'Барона', price: 'от 305 131 ₽', description: 'Новое прочтение итальянской классики — современное, модное и элегантное. Роскошный декор, высокие резные карнизы, патина вручную.', image: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-devenport', name: 'Девенпорт', price: 'от 203 596 ₽', description: 'Благородные фасады во всём блеске Викторианской Эпохи. Портал с «колониальными нотками», обилие резных элементов, витражи и колонны.', image: 'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-tivoli', name: 'Тиволи', price: 'от 312 434 ₽', description: 'Кухня «Тиволи» — элегантный, роскошный и инновационный стиль. Фасады с вогнутой поверхностью и декоративным фрезерованным молдингом.', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
];

const vivaKitchens = [
  { id: 'viva-egna', name: 'EGNA', price: 'По запросу', description: 'Современная кухня с уникальным итальянским дизайном. Высококачественные материалы и безупречное исполнение.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-milano', name: 'MILANO', price: 'По запросу', description: 'Элегантная модель в лучших традициях итальянского дизайна, сочетающая стиль и функциональность.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-goldline', name: 'GOLD LINE', price: 'По запросу', description: 'Премиальная линейка с золотыми акцентами. Роскошь в каждой детали.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-linea', name: 'LINEA DI MARCA', price: 'По запросу', description: 'Линейная композиция с отточенными формами и выразительным характером.', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-brennero', name: 'BRENNERO', price: 'По запросу', description: 'Стильная модель вдохновлённая альпийской архитектурой. Натуральные текстуры и тёплые оттенки.', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-primavera', name: 'PRIMAVERA ITALY', price: 'По запросу', description: 'Весеннее вдохновение в каждой детали. Лёгкость форм и свежесть цветовых решений.', image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-diamante', name: 'DIAMANTE', price: 'По запросу', description: 'Бриллиантовая огранка дизайна. Чёткие грани и сверкающие поверхности.', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-urbano', name: 'URBANO', price: 'По запросу', description: 'Городской стиль для современного интерьера. Сочетание индустриальных акцентов и домашнего уюта.', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-sorrento', name: 'SORRENTO', price: 'По запросу', description: 'Средиземноморская элегантность в вашем доме. Мягкие формы и светлые тона.', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-grande-gold', name: 'GRANDE GOLD', price: 'По запросу', description: 'Грандиозный дизайн с золотыми элементами. Максимум пространства и роскоши.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-piano', name: 'PIANO ALLEGRA', price: 'По запросу', description: 'Музыкальная гармония в интерьере. Плавные линии и ритмичный дизайн.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-norma', name: 'NORMA', price: 'По запросу', description: 'Классическая элегантность в современном исполнении. Безупречные пропорции.', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-norma-lux', name: 'NORMA LUX', price: 'По запросу', description: 'Премиальная версия модели Norma с улучшенными материалами и отделкой.', image: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-premium', name: 'VIVA PREMIUM', price: 'По запросу', description: 'Флагманская модель коллекции. Максимальное качество материалов и фурнитуры.', image: 'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-della-luce', name: 'DELLA LUCE', price: 'По запросу', description: 'Кухня света — продуманная подсветка и светлые тона создают ощущение простора.', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-venetta-lusso', name: 'VENETTA LUSSO', price: 'По запросу', description: 'Венецианская роскошь в современном прочтении. Богатая палитра и изысканные детали.', image: 'https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-melbourne', name: 'MELBOURNE', price: 'По запросу', description: 'Австралийский минимализм — открытые пространства и натуральные материалы.', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-fortezza', name: 'FORTEZZA', price: 'По запросу', description: 'Крепость стиля. Массивные формы и надёжные материалы для тех, кто ценит основательность.', image: 'https://images.unsplash.com/photo-1600573472572-8aba140f3eae?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-marre', name: 'MARRE', price: 'По запросу', description: 'Морское вдохновение в каждой линии. Свежесть и лёгкость прибрежного стиля.', image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-mirella', name: 'MIRELLA', price: 'По запросу', description: 'Изящная и утончённая модель с вниманием к каждой детали и комфорту.', image: 'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-giovanni-maria', name: 'GIOVANNI MARIA', price: 'По запросу', description: 'Классический итальянский дизайн с современными технологиями производства.', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-giovanni-rossi', name: 'GIOVANNI ROSSI', price: 'По запросу', description: 'Элегантная модель с красными акцентами и итальянским характером.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-venetta-italy', name: 'VENETTA ITALY', price: 'По запросу', description: 'Подлинный итальянский стиль — тёплые тона и безупречное качество.', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-villa-maria', name: 'VILLA MARIA', price: 'По запросу', description: 'Загородная роскошь итальянской виллы. Просторные решения для больших кухонь.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-lucido-pro', name: 'LUCIDO PRO', price: 'По запросу', description: 'Профессиональная линейка с глянцевыми фасадами и функциональными решениями.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-linea-lux', name: 'LINEA PERFETTA LUX', price: 'По запросу', description: 'Совершенство линий в премиальном исполнении. Идеальная геометрия и материалы.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-grande', name: 'GRANDE', price: 'По запросу', description: 'Масштабный дизайн для просторных помещений. Впечатляющие размеры и пропорции.', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-delfi', name: 'DELFI', price: 'По запросу', description: 'Греческое вдохновение — белоснежные фасады и средиземноморский шарм.', image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-mix', name: 'MIX', price: 'По запросу', description: 'Смелое сочетание стилей и материалов. Для тех, кто не боится экспериментов.', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-bianca-maria', name: 'BIANCA MARIA', price: 'По запросу', description: 'Белоснежная классика с итальянским характером. Чистота и элегантность.', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-viva', name: 'VIVA', price: 'По запросу', description: 'Яркая и жизнерадостная модель — визитная карточка бренда Vivakitchen.', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-benita-lux', name: 'BENITA LUX', price: 'По запросу', description: 'Утончённая модель премиум-класса с вниманием к деталям и комфорту.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-fortezza-arte', name: "FORTEZZA D'ARTE", price: 'По запросу', description: 'Художественная версия Fortezza с декоративными элементами и уникальной отделкой.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-benita', name: 'BENITA', price: 'По запросу', description: 'Элегантная модель для ценителей итальянского стиля и качества.', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-lorenzo', name: 'LORENZO', price: 'По запросу', description: 'Классический итальянский дизайн с акцентом на натуральные материалы.', image: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-linea-perfetta', name: 'LINEA PERFETTA', price: 'По запросу', description: 'Совершенство линий в каждой детали. Минимализм и функциональность.', image: 'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
];

// =============== ГАРДЕРОБНЫЕ ===============

const rimiWardrobes = [
  { id: 'rimi-neo-long', name: 'Нео LONG', price: 'от 380 000 ₽', description: 'Гардеробная с интегрированной ручкой Нео LONG. Максимум удобства и минимум деталей. Отделка фасадов: МДФ, покраска в цвет RIMI Eucalipto.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-open', name: 'Система OPEN', price: 'от 380 000 ₽', description: 'Утонченные линии, ощущение света и воздуха. Уменьшенные боковины делают гардеробную лёгкой, но функциональной. Широкий выбор аксессуаров.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-gard-primavera', name: 'Фасад Примавера', price: 'от 172 000 ₽', description: 'Воздушная элегантность и строгость линий. Алюминиевая рамка Elegance и удобные системы хранения.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-gard-kanti', name: 'Фасад Канти', price: 'от 170 000 ₽', description: 'Изысканная утонченность. Фасады с тонкой рамкой — легкость и изящество, актуальные в настоящее время.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-gard-progma', name: 'Фасад Прогма', price: 'от 168 000 ₽', description: 'Визуальная строгость и практичность. Эргономичные системы хранения с алюминиевой рамкой Elegance и стеклом Флоренс.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-gard-novara', name: 'Фасад Новара', price: 'от 382 000 ₽', description: 'Строгие и рациональные линии. Длинные распашные двери с врезной завершающей ручкой в золотом цвете.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-gard-florida', name: 'Фасад Флорида', price: 'от 292 000 ₽', description: 'Функциональность и минимализм. Интегрированная ручка J-handle поднимается до середины дверей.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-gard-progma-ruchka', name: 'Фасад Прогма с ручкой', price: 'от 382 000 ₽', description: 'Накладная ручка на торец — максимальная практичность. Лаконичный образ современного интерьера.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-gard-barona', name: 'Барона', price: 'от 326 000 ₽', description: 'Легкая и утонченная классика. 5-ти составной классический рамочный фасад с фрезерованной филенкой.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-gard-lanzhe', name: 'Ланже', price: 'от 341 000 ₽', description: 'Совершенство и шик. Цельный фасад с фрезеровкой имитирует элегантный рамочный фасад. Стиль ар-деко.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
];

// =============== ШКАФЫ (Рими гостиные как шкафы/стенки) ===============

const rimiCabinets = [
  { id: 'rimi-cab-maranella', name: 'Маранелла', price: 'от 158 000 ₽', description: 'Неповторимые и элегантные формы вдохновленные Ferrari. Классика, опережающая время. Завораживающая отделка ANTIQ.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-barona', name: 'Барона', price: 'от 135 000 ₽', description: 'Новое прочтение итальянской классики. Проверенные временем формы, роскошный декор, патина вручную.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-shika', name: 'Шика', price: 'от 118 000 ₽', description: 'Эстетика и неповторимый стиль в каждой детали. Тонкая рамка фасада и интегрированная ручка.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-miami', name: 'Майами', price: 'от 111 000 ₽', description: 'Инновационное решение с алюминиевым профилем GOLA. Лаконичность и обилие цветовых возможностей.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-ora', name: 'Ора', price: 'от 83 000 ₽', description: 'Современные тенденции мировой мебельной индустрии. Матовая и глянцевая отделка в различных оттенках.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-giovane', name: 'Джоване', price: 'от 143 000 ₽', description: 'Современная классика с ярко выраженной индивидуальностью. Накладки в неоклассическом духе и колонны.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-konkretta', name: 'Конкретта', price: 'от 150 000 ₽', description: 'Строгая и изысканная. Чистые геометрические формы с ручкой, встроенной в створку.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-lanzhe', name: 'Ланже', price: 'от 160 000 ₽', description: 'Атмосфера роскоши и шика в стиле ар-деко. Глянцевые фасады с фрезеровкой и ромбообразным декором.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-monticheli', name: 'Монтичели', price: 'от 170 000 ₽', description: 'Воплощение английского стиля. МДФ 24 мм с воздушной фрезеровкой, карнизы с подкарнизником.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-time', name: 'Тайм', price: 'от 80 000 ₽', description: 'Минимализм и изящество. Собирается как «тетрис» из комбинации различных фасадов.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-cab-fabiana', name: 'Фабиана', price: 'от 140 000 ₽', description: 'Утончённый неформальный стиль. Грациозный многоступенчатый фасад с интегрированной ручкой.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
];

// =============== КОМОДЫ ===============

const rimiDressers = [
  { id: 'rimi-dr-barona', name: 'Барона', price: 'от 85 000 ₽', description: 'Комод в стиле итальянской классики. Роскошный декор, проверенные временем формы, патина нанесенная вручную.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-dr-maranella', name: 'Маранелла', price: 'от 95 000 ₽', description: 'Элегантные формы вдохновленные Ferrari. Завораживающая отделка ANTIQ придаёт благородство.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-dr-shika', name: 'Шика', price: 'от 72 000 ₽', description: 'Эстетика в каждой детали. Тонкая рамка фасада и невидимая ручка. Множество вариантов покраски.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-dr-konkretta', name: 'Конкретта', price: 'от 88 000 ₽', description: 'Строгая и изысканная модель. Чистые геометрические формы и инновационные материалы.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-dr-monticheli', name: 'Монтичели', price: 'от 110 000 ₽', description: 'Традиции английского стиля. Сложная фрезеровка придаёт воздушный вид, карнизы подчеркивают красоту.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
  { id: 'rimi-dr-lanzhe', name: 'Ланже', price: 'от 98 000 ₽', description: 'Роскошь Золотой эпохи Голливуда. Глянцевые фасады с фрезеровкой в стиле ар-деко.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'rimi-mebel.ru' },
];

const vivaDressers = [
  { id: 'viva-dr-norma', name: 'NORMA', price: 'По запросу', description: 'Комод в стиле Vivakitchen. Классическая элегантность и безупречные пропорции.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-dr-diamante', name: 'DIAMANTE', price: 'По запросу', description: 'Бриллиантовая огранка дизайна. Изысканные формы и сверкающие поверхности.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
  { id: 'viva-dr-grande', name: 'GRANDE', price: 'По запросу', description: 'Масштабный комод для просторных помещений. Максимум пространства для хранения.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', source: 'viva-kitchen.com' },
];

// =============== СТОЛЫ (Лидер Мебель) ===============

const liderTables = [
  { id: 'lider-renzo-140-shn', name: 'РЕНЦО 140/90-ШН', price: '46 095 ₽', description: 'Стол с нераздвижной прямоугольной столешницей из шпона ясеня. Каркас из массива бука. 140×90 см.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '140 см', width: '90 см', height: '77 см', material: 'шпон ясеня', frame: 'массив бука' } },
  { id: 'lider-renzo-140-sh', name: 'РЕНЦО 140/90-Ш', price: '68 145 ₽', description: 'Раздвижной стол с прямоугольной столешницей из шпона ясеня. До 240 см в разложенном виде. 6-12 мест.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '140-240 см', width: '90 см', height: '77 см', material: 'шпон ясеня', frame: 'массив бука' } },
  { id: 'lider-renzo-140-kg', name: 'РЕНЦО 140/90-КГ', price: '94 900 ₽', description: 'Раздвижной стол с прямоугольной столешницей из керамогранита. Бесцарговый механизм. 6-12 мест.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '140-240 см', width: '90 см', height: '77 см', material: 'керамогранит', frame: 'массив бука' } },
  { id: 'lider-siti-140-ovkg', name: 'СИТИ 140/90-ОВКГ', price: '65 800 ₽', description: 'Раздвижной стол с овальной столешницей из керамогранита. Бесцарговый механизм. 4-8 мест.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '140-200 см', width: '90 см', height: '75 см', material: 'керамогранит', frame: 'массив бука' } },
  { id: 'lider-siti-100-kg', name: 'СИТИ 100-КГ', price: '58 800 ₽', description: 'Раздвижной стол с круглой столешницей из керамогранита. Бесцарговый механизм. 4-8 мест.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '100-158 см', width: '100 см', height: '75 см', material: 'керамогранит', frame: 'массив бука' } },
  { id: 'lider-monti-85', name: 'МОНТИ 85/85', price: '33 406 ₽', description: 'Квадратный стол с царговым механизмом раскладывания. Столешница из шпона ясеня. 4-8 мест.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '85-125 см', width: '85 см', height: '77 см', material: 'шпон ясеня', frame: 'массив бука' } },
  { id: 'lider-verona-1100-cc', name: 'VERONA 1100 CC', price: '59 516 ₽', description: 'Раздвижной стол с круглой столешницей из керамогранита. Хит продаж. 4-8 мест.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '110-151 см', width: '110 см', height: '76 см', material: 'керамогранит', frame: 'массив бука' } },
  { id: 'lider-bezzo-1400', name: 'BEZZO 1400 RRC', price: '94 900 ₽', description: 'Раздвижной прямоугольный стол с столешницей из керамогранита. Царговый механизм. 4-8 мест.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '140-188 см', width: '90 см', height: '76.5 см', material: 'керамогранит', frame: 'массив бука' } },
  { id: 'lider-verona-1100-cv', name: 'VERONA 1100 CV', price: '42 567 ₽', description: 'Раздвижной стол с круглой столешницей из шпона. Хит продаж. 4-8 мест.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '110-151 см', width: '110 см', height: '76 см', material: 'шпон', frame: 'массив бука' } },
  { id: 'lider-vasto-1400-ev', name: 'VASTO 1400 EV', price: '63 063 ₽', description: 'Раздвижной овальный стол со столешницей из шпона. Рекомендуем. 4-8 мест.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '140-188 см', width: '80 см', height: '77 см', material: 'шпон', frame: 'массив бука' } },
  { id: 'lider-vasto-1300-rv', name: 'VASTO 1300 RV', price: '48 648 ₽', description: 'Раздвижной прямоугольный стол со столешницей из шпона. Рекомендуем.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '130-178 см', width: '80 см', height: '77 см', material: 'шпон', frame: 'массив бука' } },
  { id: 'lider-vasto-1100-cv', name: 'VASTO 1100 CV', price: '44 490 ₽', description: 'Раздвижной овальный стол со столешницей из шпона. Рекомендуем.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { length: '115-145 см', width: '107 см', height: '77 см', material: 'шпон', frame: 'массив бука' } },
];

// =============== СТУЛЬЯ (Лидер Мебель) ===============

const liderChairs = [
  { id: 'lider-borgo', name: 'BORGO', price: '12 573 ₽', description: 'Стул с мягким сиденьем и мягкой спинкой. Массив бука, допустимая нагрузка до 120 кг. Более 200 вариантов цвета дерева.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
  { id: 'lider-lucca-fsw', name: 'LUCCA-FSW', price: 'от 15 000 ₽', description: 'Вращающийся стул с мягкой вставкой в деревянной спинке. Массив бука, более 1000 видов обивок.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
  { id: 'lider-silver', name: 'SILVER', price: 'от 14 000 ₽', description: 'Стул с гнутой мягкой спинкой. Элегантный дизайн из массива бука. Более 200 цветов дерева.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
  { id: 'lider-vasto-f', name: 'VASTO-F', price: 'от 13 500 ₽', description: 'Стул с мягкой вставкой в деревянной спинке. Коллекция Moderno. Массив бука.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
  { id: 'lider-dendi-25', name: 'Денди-25-11', price: '11 500 ₽', description: 'Классический стул из массива бука с мягким сиденьем. Более 200 вариантов цвета дерева.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
  { id: 'lider-dendi-32', name: 'Денди-32-11', price: '13 200 ₽', description: 'Стул с улучшенной спинкой из массива бука. Широкий выбор обивок и цветов дерева.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
  { id: 'lider-dendi-50', name: 'Денди-50-11', price: '15 800 ₽', description: 'Полукресло из массива бука с комфортной спинкой и мягким сиденьем.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
  { id: 'lider-dendi-56', name: 'Денди-56-11', price: '17 400 ₽', description: 'Стул повышенной комфортности с мягкой спинкой и сиденьем. Массив бука.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
  { id: 'lider-dendi-78', name: 'Денди-78-12', price: '21 600 ₽', description: 'Премиальный стул-кресло из массива бука. Улучшенная эргономика и дизайн.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
  { id: 'lider-dendi-39', name: 'Денди-39-11', price: '14 200 ₽', description: 'Элегантный стул из массива бука. Более 1000 видов обивок на выбор.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', source: 'lider-mebel.ru', specs: { material: 'массив бука', load: 'до 120 кг', warranty: '10 лет' } },
];

// =============== СТРУКТУРА КАТАЛОГА ===============

export const categories = [
  {
    id: 'kitchens',
    name: 'Кухни',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    brands: [
      {
        id: 'rimi',
        name: 'В стиле «Рими»',
        subcategories: [
          { id: 'modern', name: 'Современные кухни', products: rimiModernKitchens },
          { id: 'classic', name: 'Классические кухни', products: rimiClassicKitchens },
        ],
      },
      {
        id: 'vivakitchen',
        name: 'В стиле «Vivakitchen»',
        subcategories: [
          { id: 'all', name: 'Все модели', products: vivaKitchens },
        ],
      },
    ],
  },
  {
    id: 'wardrobes',
    name: 'Гардеробные',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    brands: [
      {
        id: 'rimi',
        name: 'В стиле «Рими»',
        subcategories: [
          { id: 'all', name: 'Все модели', products: rimiWardrobes },
        ],
      },
    ],
  },
  {
    id: 'cabinets',
    name: 'Шкафы',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    brands: [
      {
        id: 'rimi',
        name: 'В стиле «Рими»',
        subcategories: [
          { id: 'all', name: 'Все модели', products: rimiCabinets },
        ],
      },
    ],
  },
  {
    id: 'dressers',
    name: 'Комоды',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    brands: [
      {
        id: 'rimi',
        name: 'В стиле «Рими»',
        subcategories: [
          { id: 'all', name: 'Все модели', products: rimiDressers },
        ],
      },
      {
        id: 'vivakitchen',
        name: 'В стиле «Vivakitchen»',
        subcategories: [
          { id: 'all', name: 'Все модели', products: vivaDressers },
        ],
      },
    ],
  },
  {
    id: 'tables',
    name: 'Столы',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
    brands: [
      {
        id: 'lider',
        name: 'Фабрика «Лидер»',
        subcategories: [
          { id: 'all', name: 'Все модели', products: liderTables },
        ],
      },
    ],
  },
  {
    id: 'chairs',
    name: 'Стулья',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    brands: [
      {
        id: 'lider',
        name: 'Фабрика «Лидер»',
        subcategories: [
          { id: 'all', name: 'Все модели', products: liderChairs },
        ],
      },
    ],
  },
];

// Вспомогательная функция: найти товар по ID
export const findProductById = (productId) => {
  for (const category of categories) {
    for (const brand of category.brands) {
      for (const sub of brand.subcategories) {
        const product = sub.products.find(p => p.id === productId);
        if (product) {
          return {
            ...product,
            categoryId: category.id,
            categoryName: category.name,
            brandId: brand.id,
            brandName: brand.name,
            subcategoryName: sub.name,
          };
        }
      }
    }
  }
  return null;
};

// Вспомогательная функция: получить все товары из категории
export const getProductsByCategory = (categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return [];
  const products = [];
  for (const brand of category.brands) {
    for (const sub of brand.subcategories) {
      products.push(...sub.products.map(p => ({
        ...p,
        brandName: brand.name,
        subcategoryName: sub.name,
      })));
    }
  }
  return products;
};

// Вспомогательная функция: получить все товары
export const getAllProducts = () => {
  const products = [];
  for (const category of categories) {
    for (const brand of category.brands) {
      for (const sub of brand.subcategories) {
        products.push(...sub.products.map(p => ({
          ...p,
          categoryId: category.id,
          categoryName: category.name,
          brandName: brand.name,
        })));
      }
    }
  }
  return products;
};
