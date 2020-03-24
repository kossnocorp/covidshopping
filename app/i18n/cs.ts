import { I18nLocale } from '.'

const pluralizeForms: Record<string, string[]> = {
  serving: ['porce', 'porce', 'porcí'],
  day: ['den', 'dny', 'dní'],
  adult: ['dospělý', 'dospělí', 'dospělých'],
  kid: ['dítě', 'děti', 'dětí'],
  roll: ['role', 'role', 'rolí']
}

const ruLocale: I18nLocale = {
  localeName: 'Česky',

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
        return 'Omáčka'

      case 'Meat':
        return 'Maso'

      case 'Pesto':
        return 'Pesto'

      case 'Arrabiata':
        return 'Arrabiata'

      case 'Tomato sauce':
        return 'Rajčatová'

      case 'Tomato':
        return 'Rajčatová'

      case 'Pasta':
        return 'Těstoviny'

      case 'Rice':
        return 'Rýže'

      case 'Chickpeas':
        return 'Cizrna'

      case 'Bulgur':
        return 'Bulgur'

      case 'Lentils':
        return 'Čočka'

      case 'Couscous':
        return 'Kuskus'

      case 'Buckwheat':
        return 'Pohanka'

      case 'Potato':
        return 'Brambory'

      case 'Veggie':
        return 'Zelenina'

      case 'Ravioli':
        return 'Ravioli'

      case 'Fish':
        return 'Ryba'

      case 'Chicken':
        return 'Kuřecí'

      case 'Ingredients':
        return 'Ingredience'

      case 'Side':
        return 'Příloha'

      case 'Eggs':
        return 'Vejce'

      case 'Oatmeal':
        return 'Ovesné vločky'

      case 'Cereals':
        return 'Cereálie'

      case 'Cheese pancakes':
        return 'Tvarohové lívance'

      case 'Cottage cheese':
        return 'Tvaroh'

      case 'Toilet paper':
        return 'Toaletní papír'

      case 'Paper towels':
        return 'Papírové utěrky'

      case 'Tea':
        return 'Čaj'

      case 'Coffee':
        return 'Káva'

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
export default csLocale
