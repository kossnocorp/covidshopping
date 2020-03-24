import { I18nLocale } from '.'

const pluralizeForms: Record<string, string[]> = {
  serving: ['порция', 'порции', 'порций'],
  day: ['день', 'дня', 'дней'],
  adult: ['взрослый', 'взрослых', 'взрослых'],
  kid: ['ребенок', 'ребенка', 'детей'],
  roll: ['рулон', 'рулона', 'рулонов']
}

const ruLocale: I18nLocale = {
  localeName: 'Русский',

  title: 'Генератор списка покупок во время пандемии коронавируса',
  description:
    'Что покупать и готовить во время пандемии коронавируса? Как пережить карантин? Укажите, насколько большая ваша семья, что вы предпочитаете есть и мы составим для вас рациональный список покупок.',

  about: {
    collapsed: `<strong>Для чего это приложение?</strong>`,
    expanded: `
<p>
  <strong>Для чего это приложение?</strong> Используйте генератор для планирования покупок во время пандемии коронавируса. Выберите продолжительность пребывания, количество человек, меню и получите список продуктов для покупки.
</p>

<p>
  Используйте функцию «Поделиться списком», чтобы создать список задач и поделиться им со своей семьей или отправить на телефон.
</p>

<p>
  <a href="mailto:koss@nocorp.me">Напишите мне</a>, если у вас есть какие-либо отзывы!
</p>
`
  },

  measurement: {
    system: 'Система мер',
    metric: 'Метрическая',
    imperial: 'Имперская'
  },
  numberOfDays: 'Продолжительность в днях',
  numberOfAdults: 'Кол-во взрослых',
  numberOfKids: 'детей',
  kidsServing: {
    title: 'Детская порция рассчитывается как',
    adult: 'взрослая порция'
  },

  sections: {
    essentials: {
      title: 'Предметы первой необходимости'
    },

    breakfast: {
      title: 'Завтрак'
    },

    meals: {
      title: 'Обеды и ужины',
      formula: {
        intro: '2 блюда в день'
      }
    },

    drinks: {
      title: 'Напитки',
      description: 'Три напитка в день на человека. На завтрак, обед и ужин.'
    },

    preview: {
      title: 'Список покупок',
      share: 'Поделиться списком'
    },

    list: {
      title: 'Список покупок',
      description:
        'Поделитесь этой страницей со своей семьей. Когда вы отмечаете пункт как купленный, список автоматически обновляется на всех устройствах с открытой страницей.',
      generated: {
        intro: 'Этот список сгенерировать с помощью',
        link: 'генератора списка покупок во время пандемии коронавируса'
      }
    }
  },

  translate: (str: string) => {
    switch (str) {
      case 'Sauce':
        return 'Соус'

      case 'Meat':
        return 'Мясо'

      case 'Meat':
        return 'Мясо'

      case 'Pesto':
        return 'Песто'

      case 'Arrabiata':
        return 'Арабиата'

      case 'Tomato sauce':
        return 'Томатный'

      case 'Pasta':
        return 'Макароны'

      case 'Rice':
        return 'Рис'

      case 'Chickpeas':
        return 'Нут'

      case 'Bulgur':
        return 'Булгур'

      case 'Lentils':
        return 'Чечевица'

      case 'Couscous':
        return 'Кускус'

      case 'Buckwheat':
        return 'Гречка'

      case 'Potato':
        return 'Картошка'

      case 'Veggie':
        return 'Овощи'

      case 'Ravioli':
        return 'Равиоли'

      case 'Fish':
        return 'Рыба'

      case 'Chicken':
        return 'Курица'

      case 'Ingredients':
        return 'Ингредиенты'

      case 'Side':
        return 'Гарнир'

      case 'Eggs':
        return 'Яйца'

      case 'Oatmeal':
        return 'Каша'

      case 'Cereals':
        return 'Хлопья'

      case 'Cheese pancakes':
        return 'Сырники'

      case 'Cottage cheese':
        return 'Творог'

      case 'Toilet paper':
        return 'Туалетная бумага'

      case 'Paper towels':
        return 'Бумажные полотенца'

      case 'Tea':
        return 'Чай'

      case 'Coffee':
        return 'Кофе'

      default:
        return str
    }
  },

  pluralize: (str: string, num: number) => {
    const mod = num % 10
    const form = (num >= 10 && num <= 20) || mod > 4 ? 2 : mod === 1 ? 0 : 1
    return pluralizeForms[str][form]
  }
}
export default ruLocale
