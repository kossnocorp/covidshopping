export type MeasurementSystem = 'metric' | 'imperial'

export type QuantityUnit = 'g' | 'number' | 'serving'

export type Item = {
  title: string
  include: boolean
  serving: number
  kidsModifier: number
  unit: QuantityUnit
  unitTitle?: string
}

export type Drink = Item & {}

export type Sauce = Item & {
  spicy?: 'low' | 'mild' | 'hot' | 'extreme'
}

export type Side = Item & {
  sauces?: {
    [sauceKey: string]: Sauce
  }
}

export type Ingredient = {
  title: string
  quantity: number
  unit: QuantityUnit
  unitTitle?: string
}

export type Meal = Item & {
  sides?: {
    [sideKey: string]: Side
  }

  sauces?: {
    [sauceKey: string]: Sauce
  }

  ingredients?: {
    [ingredientKey: string]: Ingredient
  }
}

export type MealCategory = 'breakfast' | 'meals'

export type Formula = Record<MealCategory, { [mealId: string]: Meal }> & {
  system: MeasurementSystem
  drinks: Record<string, Drink>
  items: Record<string, Item>
  adults: number
  kids: number
  kidsModifier: number
  days: number
}

export type FormulaInfo = {
  options: Record<MealCategory | 'drinks', number>
}

export type ShoppingItem = {
  title: string
  quantity: number
  unit: QuantityUnit
  unitTitle?: string
}

export type ShoppingList = Record<string, ShoppingItem>
