import { Sauce, Side, Formula } from './types'

export const pesto: Sauce = {
  title: 'Pesto',
  include: true,
  serving: 50,
  unit: 'g'
}

export const arrabiata: Sauce = {
  title: 'Arrabiata',
  include: true,
  serving: 50,
  unit: 'g',
  spicy: 'low'
}

export const tomatoSauce: Sauce = {
  title: 'Tomato',
  serving: 50,
  unit: 'g',
  include: true
}

export const pasta: Side = {
  title: 'Pasta',
  include: true,
  serving: 125,
  unit: 'g',
  sauces: { pesto, arrabiata, tomato: tomatoSauce }
}

export const rice: Side = {
  title: 'Rice',
  include: true,
  serving: 125,
  unit: 'g'
}

export const chickpeas: Side = {
  title: 'Chickpeas',
  include: true,
  serving: 125,
  unit: 'g'
}

export const bulgur: Side = {
  title: 'Bulgur',
  include: false,
  serving: 125,
  unit: 'g'
}

export const lentils: Side = {
  title: 'Lentils',
  include: true,
  serving: 125,
  unit: 'g'
}

export const couscous: Side = {
  title: 'Couscous',
  include: true,
  serving: 125,
  unit: 'g'
}

export const buckwheat: Side = {
  title: 'Buckwheat',
  include: false,
  serving: 125,
  unit: 'g'
}

export const potato: Side = {
  title: 'Potato',
  include: false,
  serving: 125,
  unit: 'g'
}

export const defaultFormula: Formula = {
  system: 'metric',
  days: 14,
  adults: 3,
  kids: 0,
  kidsModifier: 0.5,

  items: {
    toiletPaper: {
      title: 'Toilet paper',
      include: true,
      serving: 1 / 7,
      unit: 'number',
      unitTitle: 'roll'
    }
  },

  breakfast: {
    eggs: {
      title: 'Eggs',
      include: true,
      serving: 2,
      unit: 'number'
    },

    oatmeal: {
      title: 'Oatmeal',
      include: true,
      serving: 100,
      unit: 'g'
    },

    cereals: {
      title: 'Cereals',
      include: true,
      serving: 50,
      unit: 'g'
    },

    cheesePancakes: {
      title: 'Cheese pancakes',
      include: true,
      ingredients: {
        eggs: { title: 'Eggs', quantity: 1, unit: 'number' },
        cottageCheese: {
          title: 'Cottage cheese',
          quantity: 125,
          unit: 'g'
        }
      },
      serving: 1,
      unit: 'serving'
    }
  },

  meals: {
    veggie: {
      title: 'Veggie',
      include: true,
      serving: 125,
      unit: 'g',
      sides: { pasta, rice, couscous, potato, bulgur, lentils, buckwheat }
    },

    ravioli: {
      title: 'Ravioli',
      include: true,
      serving: 125,
      unit: 'g',
      sauces: { pesto, arrabiata, tomato: tomatoSauce }
    },

    fish: {
      title: 'Fish',
      include: true,
      serving: 150,
      unit: 'g',
      sides: { pasta, rice, couscous, potato, bulgur, buckwheat }
    },

    chicken: {
      title: 'Chicken',
      include: true,
      serving: 125,
      unit: 'g',
      sides: { pasta, rice, couscous, potato, bulgur, buckwheat }
    },

    meat: {
      title: 'Meat',
      include: true,
      serving: 125,
      unit: 'g',
      sides: { pasta, rice, couscous, potato, bulgur, buckwheat }
    }
  },

  drinks: {
    tea: {
      title: 'Tea',
      include: true,
      serving: 2,
      unit: 'g'
    },

    coffee: {
      title: 'Coffee',
      include: true,
      serving: 20,
      unit: 'g'
    }
  }
}
