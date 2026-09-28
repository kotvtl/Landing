const CATEGORIES = [
  { id: 'coffee',    label: 'Кофе' },
  { id: 'desserts',  label: 'Десерты' },
  { id: 'breakfast', label: 'Завтраки' }
];
const PARAM_PRESETS = {
  coffee: [
    {
      id: 'size',
      label: 'Объём',
      options: [
        { value: 's', label: '30 мл',     priceDelta: 0   },
        { value: 'm', label: '250 мл',    priceDelta: 60  },
        { value: 'l', label: '400 мл',    priceDelta: 110 }
      ]
    },
    {
      id: 'milk',
      label: 'Молоко',
      options: [
        { value: 'none',    label: 'Без молока',  priceDelta: 0  },
        { value: 'regular', label: 'Обычное',     priceDelta: 30 },
        { value: 'oat',     label: 'Овсяное',     priceDelta: 60 },
        { value: 'almond',  label: 'Миндальное',  priceDelta: 70 }
      ]
    }
  ],
  desserts: [
    {
      id: 'size',
      label: 'Размер',
      options: [
        { value: 'small',  label: 'Маленький', priceDelta: 0   },
        { value: 'medium', label: 'Средний',   priceDelta: 90  },
        { value: 'large',  label: 'Большой',   priceDelta: 180 }
      ]
    },
    {
      id: 'topping',
      label: 'Топпинг',
      options: [
        { value: 'none',      label: 'Без топпинга', priceDelta: 0  },
        { value: 'chocolate', label: 'Шоколад',      priceDelta: 40 },
        { value: 'caramel',   label: 'Карамель',     priceDelta: 50 },
        { value: 'berries',   label: 'Ягоды',        priceDelta: 80 }
      ]
    }
  ],
  breakfast: [
    {
      id: 'portion',
      label: 'Порция',
      options: [
        { value: 'standard', label: 'Стандарт', priceDelta: 0   },
        { value: 'large',    label: 'Большая',  priceDelta: 120 }
      ]
    },
    {
      id: 'extra',
      label: 'Добавка',
      options: [
        { value: 'none',    label: 'Без добавки', priceDelta: 0   },
        { value: 'egg',     label: 'Яйцо пашот',  priceDelta: 70  },
        { value: 'avocado', label: 'Авокадо',     priceDelta: 110 },
        { value: 'salmon',  label: 'Лосось',      priceDelta: 220 }
      ]
    }
  ]
};
const PRODUCTS = [
    { id: 'c01', category: 'coffee', title: 'Эспрессо',        basePrice: 150, params: 'coffee',
    short: 'Плотный шот с нотками тёмного шоколада.',
    full: 'Классический эспрессо из бленда Бразилия + Колумбия. Плотное тело, ноты тёмного шоколада и жареного ореха.',
    image: 'https://placehold.co/600x450/8b5e3c/ffffff?text=Espresso' },
  { id: 'c02', category: 'coffee', title: 'Американо',       basePrice: 190, params: 'coffee',
    short: 'Эспрессо с горячей водой — чистый вкус зерна.',
    full: 'Двойной эспрессо, разбавленный горячей водой. Мягкий, но насыщенный вкус.',
    image: 'https://placehold.co/600x450/6f4a2f/ffffff?text=Americano' },
  { id: 'c03', category: 'coffee', title: 'Капучино',        basePrice: 240, params: 'coffee',
    short: 'Бархатное молоко и густая молочная пенка.',
    full: 'Эспрессо и взбитое до 65 °C молоко. Классика на каждый день.',
    image: 'https://placehold.co/600x450/a97c50/ffffff?text=Cappuccino' },
  { id: 'c04', category: 'coffee', title: 'Латте',           basePrice: 260, params: 'coffee',
    short: 'Мягкий напиток с рисунком на пенке.',
    full: 'Больше молока, меньше кофе. Идеально для тех, кто только знакомится со вкусом.',
    image: 'https://placehold.co/600x450/5c4033/ffffff?text=Latte' },
  { id: 'c05', category: 'coffee', title: 'Флэт уайт',       basePrice: 270, params: 'coffee',
    short: 'Двойной эспрессо и тонкий слой микропенки.',
    full: 'Плотный, кофейный, без лишнего молока. Для тех, кто любит покрепче.',
    image: 'https://placehold.co/600x450/c98b5e/ffffff?text=Flat+White' },
  { id: 'c06', category: 'coffee', title: 'Фильтр-кофе',     basePrice: 220, params: 'coffee',
    short: 'Эфиопия, промытая обработка, яркая кислотность.',
    full: 'Альтернатива через V60. Яркие цветочные ноты и лёгкое тело.',
    image: 'https://placehold.co/600x450/7b4b2a/ffffff?text=Filter' },
  { id: 'c07', category: 'coffee', title: 'Колд брю',        basePrice: 280, params: 'coffee',
    short: 'Настаивается 14 часов, подаётся со льдом.',
    full: 'Холодная экстракция, мягкая кислотность и лёгкая сладость.',
    image: 'https://placehold.co/600x450/4a3427/ffffff?text=Cold+Brew' },
  { id: 'c08', category: 'coffee', title: 'Раф ванильный',   basePrice: 290, params: 'coffee',
    short: 'Сливки, ваниль и щепотка соли.',
    full: 'Нежный десертный напиток. Подаётся горячим, с ванильным сахаром.',
    image: 'https://placehold.co/600x450/b08968/ffffff?text=Raf' },
  { id: 'c09', category: 'coffee', title: 'Мокка',           basePrice: 300, params: 'coffee',
    short: 'Эспрессо, шоколад и молоко.',
    full: 'Для сладкоежек: тёмный шоколад, эспрессо и вспененное молоко.',
    image: 'https://placehold.co/600x450/6b4226/ffffff?text=Mocha' },
  { id: 'c10', category: 'coffee', title: 'Эспрессо-тоник',  basePrice: 290, params: 'coffee',
    short: 'Освежающий напиток с цитрусом и тоником.',
    full: 'Холодный тоник, эспрессо и ломтик апельсина. Летняя классика.',
    image: 'https://placehold.co/600x450/3f2d21/ffffff?text=Espresso+Tonic' },
{ id: 'd01', category: 'desserts', title: 'Чизкейк Нью-Йорк', basePrice: 320, params: 'desserts',
    short: 'Плотный сливочный чизкейк на песочной основе.',
    full: 'Классический рецепт: сливочный сыр, сливки, ваниль и песочная основа.',
    image: 'https://placehold.co/600x450/e8d5c4/3a2416?text=Cheesecake' },
  { id: 'd02', category: 'desserts', title: 'Круассан',         basePrice: 180, params: 'desserts',
    short: 'Слоёный круассан на французском масле.',
    full: 'Готовим каждое утро. Подаём с джемом или просто так.',
    image: 'https://placehold.co/600x450/d9b48b/3a2416?text=Croissant' },
  { id: 'd03', category: 'desserts', title: 'Тирамису',         basePrice: 340, params: 'desserts',
    short: 'Савоярди, маскарпоне и эспрессо.',
    full: 'Классический итальянский десерт с эспрессо и какао сверху.',
    image: 'https://placehold.co/600x450/8b6f4e/ffffff?text=Tiramisu' },
  { id: 'd04', category: 'desserts', title: 'Брауни',           basePrice: 220, params: 'desserts',
    short: 'Тёплый шоколадный брауни с морской солью.',
    full: 'Плотный, влажный, с хрустящей корочкой. Идеален с эспрессо.',
    image: 'https://placehold.co/600x450/4a2c1a/ffffff?text=Brownie' },
  { id: 'd05', category: 'desserts', title: 'Медовик',          basePrice: 260, params: 'desserts',
    short: 'Тонкие коржи и сметанный крем.',
    full: 'Домашний медовик по классическому рецепту.',
    image: 'https://placehold.co/600x450/d8b070/3a2416?text=Honey+Cake' },
  { id: 'd06', category: 'desserts', title: 'Наполеон',         basePrice: 280, params: 'desserts',
    short: 'Хрустящие коржи и заварной крем.',
    full: 'Готовим слои вручную, крем варим на месте.',
    image: 'https://placehold.co/600x450/f0d9b5/3a2416?text=Napoleon' },
  { id: 'd07', category: 'desserts', title: 'Панна-котта',      basePrice: 240, params: 'desserts',
    short: 'Сливочная панна-котта с ягодным соусом.',
    full: 'Ванильная основа и сезонный ягодный соус.',
    image: 'https://placehold.co/600x450/f3e0d0/3a2416?text=Panna+Cotta' },
  { id: 'd08', category: 'desserts', title: 'Маффин шоколадный',basePrice: 190, params: 'desserts',
    short: 'Мягкий маффин с кусочками шоколада.',
    full: 'Подаём тёплым — шоколад внутри немного тает.',
    image: 'https://placehold.co/600x450/6b4226/ffffff?text=Muffin' },
{ id: 'b01', category: 'breakfast', title: 'Сырники',         basePrice: 320, params: 'breakfast',
    short: 'Домашние сырники со сметаной и джемом.',
    full: 'Готовим из свежего творога, подаём со сметаной и ягодным джемом.',
    image: 'https://placehold.co/600x450/f5e6c8/3a2416?text=Syrniki' },
  { id: 'b02', category: 'breakfast', title: 'Овсяноблин',      basePrice: 260, params: 'breakfast',
    short: 'Овсяный блин с начинкой на выбор.',
    full: 'Овсянка, яйцо и начинка: творожный сыр, лосось или авокадо.',
    image: 'https://placehold.co/600x450/e8d5b0/3a2416?text=Oat+Pancake' },
  { id: 'b03', category: 'breakfast', title: 'Авокадо-тост',    basePrice: 340, params: 'breakfast',
    short: 'Тост с авокадо, яйцом пашот и семенами.',
    full: 'Ржаной хлеб, гуакамоле, яйцо пашот и кунжут.',
    image: 'https://placehold.co/600x450/a8b87a/ffffff?text=Avocado+Toast' },
  { id: 'b04', category: 'breakfast', title: 'Омлет с овощами', basePrice: 280, params: 'breakfast',
    short: 'Пышный омлет с сезонными овощами.',
    full: 'Три яйца, сливки и обжаренные овощи на выбор.',
    image: 'https://placehold.co/600x450/f0c060/3a2416?text=Omelette' },
  { id: 'b05', category: 'breakfast', title: 'Каша на молоке',  basePrice: 220, params: 'breakfast',
    short: 'Овсяная каша с ягодами и мёдом.',
    full: 'Медленные углеводы, свежие ягоды и ложка мёда.',
    image: 'https://placehold.co/600x450/e8cfa0/3a2416?text=Porridge' },
  { id: 'b06', category: 'breakfast', title: 'Круассан-сэндвич',basePrice: 360, params: 'breakfast',
    short: 'Круассан с лососем и сливочным сыром.',
    full: 'Наш круассан, сливочный сыр, лосось и руккола.',
    image: 'https://placehold.co/600x450/d9b48b/3a2416?text=Croissant+Sandwich' }
];
