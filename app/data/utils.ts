import pluralize from 'pluralize'
import {
  Formula,
  Item,
  QuantityUnit,
  ShoppingList,
  FormulaInfo,
  MealCategory,
  Ingredient
} from './types'

export function calculateServings(formula: Formula, item: Item, options = 1) {
  return Math.ceil(
    (formula.days * (formula.adults + formula.kids * item.kidsModifier)) /
      options
  )
}

export function calculateQuantity(formula: Formula, item: Item, options = 1) {
  return Math.ceil(
    (formula.days *
      (formula.adults * item.serving +
        formula.kids * item.serving * item.kidsModifier)) /
      options
  )
}

export function calculateServingsTotal(formula: Formula) {
  return Math.ceil(
    formula.days * (formula.adults + formula.kids * formula.kidsModifier)
  )
}

export function formatQuantity(
  quantity: number,
  unit: QuantityUnit,
  unitTitle?: string
) {
  if (unitTitle) {
    return pluralize(unitTitle, quantity, true)
  }

  switch (unit) {
    case 'g':
      return `${quantity}g`

    case 'number':
    case 'serving':
      return `${quantity}x`
  }
}

export function generateShoppingList(formula: Formula, info: FormulaInfo) {
  const list: ShoppingList = {}
  const categories: MealCategory[] = ['breakfast', 'meals']

  Object.entries(formula.items).forEach(([itemKey, item]) => {
    if (!item.include) return
    const quantity = calculateQuantity(formula, item)
    pushShoppingItem(list, itemKey, item, quantity)
  })

  categories.forEach(category => {
    Object.entries(formula[category]).forEach(([mealKey, meal]) => {
      if (!meal.include) return

      const mealServings =
        calculateServings(formula, meal, info.options[category]) *
        (category === 'meals' ? 2 : 1)

      if (meal.unit !== 'serving') {
        const quantity = Math.ceil(mealServings * meal.serving)
        pushShoppingItem(list, mealKey, meal, quantity)
      }

      if (meal.ingredients) {
        Object.entries(meal.ingredients).forEach(
          ([ingredientKey, ingredient]) => {
            const quantity = Math.ceil(mealServings * ingredient.quantity)
            pushShoppingItem(list, ingredientKey, ingredient, quantity)
          }
        )
      }

      if (meal.sauces) {
        const mealSaucesOptions = Object.values(meal.sauces || {}).filter(
          s => s.include
        ).length

        Object.entries(meal.sauces).forEach(([sauceKey, sauce]) => {
          if (!sauce.include) return
          const quantity = Math.ceil(
            (mealServings / mealSaucesOptions) * sauce.serving
          )
          pushShoppingItem(list, sauceKey, sauce, quantity)
        })
      }

      if (meal.sides) {
        const sidesOptions = Object.values(meal.sides || {}).filter(
          s => s.include
        ).length
        Object.entries(meal.sides).forEach(([sideKey, side]) => {
          if (!side.include) return
          const quantity = Math.ceil(
            (mealServings / sidesOptions) * side.serving
          )
          pushShoppingItem(list, sideKey, side, quantity)

          if (side.sauces) {
            const sideSaucesOptions = Object.values(side.sauces || {}).filter(
              s => s.include
            ).length
            Object.entries(side.sauces).forEach(([sauceKey, sauce]) => {
              if (!sauce.include) return
              const quantity = Math.ceil(
                (mealServings / sidesOptions / sideSaucesOptions) *
                  sauce.serving
              )
              pushShoppingItem(list, sauceKey, sauce, quantity)
            })
          }
        })
      }
    })
  })

  Object.entries(formula.drinks).forEach(([drinkKey, drink]) => {
    if (!drink.include) return
    const quantity = calculateQuantity(formula, drink, info.options.drinks) * 3
    pushShoppingItem(list, drinkKey, drink, quantity)
  })

  return list
}

function pushShoppingItem(
  list: ShoppingList,
  itemKey: string,
  item: Item | Ingredient,
  quantity: number
) {
  const { title, unit, unitTitle } = item
  list[itemKey] = list[itemKey] || { title, unit, unitTitle, quantity: 0 }
  if (quantity) list[itemKey].quantity += quantity
}
