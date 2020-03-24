import { I18nLocale } from '.'

const pluralizeForms: Record<string, string[]> = {
  serving: ['porce', 'porce', 'porcí'],
  day: ['den', 'dny', 'dní'],
  adult: ['dospělý', 'dospělí', 'dospělých'],
  kid: ['dítě', 'děti', 'dětí'],
  roll: ['role', 'role', 'rolí']
}

const csLocale: I18nLocale = {
  localeName: 'Česky',

  title: 'Nakupni generátor v koronavirové karantene',
  description:
    'Co nakupovat a vařit za pandemii? Uveďte, jak je velka vaše domacnost a jaké chcete jídlo;  vytvoříme pro vás nákupní seznam.',

  about: {
    collapsed: `<strong>Účel webu?</strong>`,
    expanded: `
<p>
  <strong>Účel webu?</strong> Použijte generator pro plánování nákupu v době karantény. Uveďte dobu, počet lidí, jídlo a dostanete seznam produktu.
</p>

<p>
  Pomoci tlačítka "Sdílet seznam s rodinou" můžete seznam sdílet nebo ho poslat na telefon.
</p>

<p>
  Mate feedback? <a href="mailto:koss@nocorp.me">Napište mi</a>.
</p>
`
  },

  measurement: {
    system: 'Soustava',
    metric: 'Metrická',
    imperial: 'Angloamerická'
  },
  numberOfDays: 'Počet dní',
  numberOfAdults: 'Počet dospělých',
  numberOfKids: 'dětí',
  kidsServing: {
    title: 'Velikost porce pro děti se počítá jako',
    adult: 'porce pro dospělého'
  },

  sections: {
    essentials: {
      title: 'Předměty denní potřeby'
    },

    breakfast: {
      title: 'Snídaně'
    },

    meals: {
      title: 'Obědy a večeře',
      formula: {
        intro: '2 jídla denně'
      }
    },

    drinks: {
      title: 'Nápoje',
      description: '3 nápoje denně na osobu: snídaně, oběd a večeře'
    },

    preview: {
      title: 'Nákupní seznam',
      share: 'Sdílet seznam s rodinou'
    },

    list: {
      title: 'Nákupní seznam',
      description:
        'Sdílení seznamu s rodinou. Nové označené položky se automaticke objeví na všech zařízeních, kde je seznam otevřen.',
      generated: {
        intro: 'Seznam je vytvořen pomocí',
        link: 'generatoru nákupního seznamu pro dobu pandemie koronaviru.'
      },
      addToList: 'Přidat do seznamu',
      remove: 'Smazat'
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
