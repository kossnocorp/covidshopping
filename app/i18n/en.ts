import pluralize from 'pluralize'

const enLocale = {
  localeName: 'English',

  title: 'The Coronavirus shopping list generator',
  description:
    "What to buy and what to cook during the coronavirus? How to survive quarantine? Tell us how big your family is, your diet, and we'll generate you a rational shopping list.",

  about: {
    collapsed: `<strong>What is this app for?</strong>`,
    expanded: `
<p>
  <strong>What is this app for?</strong> Use the generator
  to plan shopping for COVID-19 quarantine. Select the
  length of stay, number of people, menu, and get the list
  of products to buy.
</p>

<p>
  Use the "Share with family" feature to generate a todo
  list and share it with your household or send it to your
  phone.
</p>

<p>
  <a href="mailto:koss@nocorp.me">Email me</a> if you have
  any feedback!
</p>
`
  },

  measurement: {
    system: 'Measurement system',
    metric: 'Metric',
    imperial: 'Imperial'
  },

  numberOfDays: 'Number of days',
  numberOfAdults: 'Number of adults',
  numberOfKids: 'kids',

  kidsServing: {
    title: 'Children serving size is calculated as',
    adult: 'adult'
  },

  sections: {
    essentials: {
      title: 'Essentials'
    },

    breakfast: {
      title: 'Breakfast'
    },

    meals: {
      title: 'Meals',
      formula: {
        intro: '2 meals per day'
      }
    },

    drinks: {
      title: 'Drinks',
      description:
        'Three drinks per day per person. At breakfast, lunch, and dinner.'
    },

    preview: {
      title: 'Shopping list',
      share: 'Share with family'
    },

    list: {
      title: 'Shopping list',
      description:
        'Share this page with your family. When you check an item, the list updates automatically on all devices that have this page open.',
      generated: {
        intro: 'The shopping list is generated using',
        link: 'The Coronavirus shopping list generator'
      },
      addToList: 'Add to list',
      remove: 'Remove'
    }
  },

  translate: (str: string) => str,

  pluralize: (str: string, num: number) => pluralize(str, num)
}
export default enLocale
