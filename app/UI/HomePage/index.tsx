import { ContentWrapper } from '#GECK/UI/Layout'
import { V, H } from '#GECK/UI/Spacing'
import { Header, Text } from '#GECK/UI/Text'
import { Size, Color } from '#GECK/UI/types'
import { h } from 'preact'
import { Select } from '#GECK/form/Select'
import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { cloneUpdate } from '#GECK/fns'

type QuantityUnit = 'g' | 'number'

type Item = {
  title: string
  include: boolean
  serving: number
  kidsModifier: number
  unit: QuantityUnit
}

type Meal = Item

type MealCategory = 'breakfast' | 'meals'

type Formula = Record<MealCategory, { [mealId: string]: Meal }> & {
  items: { [itemId: string]: Item }
  adults: number
  kids: number
  days: number
}

type FormulaInfo = {
  options: Record<MealCategory, number>
}

export default function HomePage() {
  const [formula, setFormula] = useState<Formula>({
    adults: 3,
    kids: 0,
    days: 14,

    items: {
      toiletPaper: {
        title: 'Toilet paper',
        include: true,
        serving: 1 / 7,
        kidsModifier: 0.5,
        unit: 'number'
      }
    },

    breakfast: {
      eggs: {
        title: 'Eggs',
        include: true,
        serving: 2,
        kidsModifier: 0.5,
        unit: 'number'
      },

      oatmeal: {
        title: 'Oatmeal',
        include: true,
        serving: 100,
        kidsModifier: 0.5,
        unit: 'g'
      },

      cereals: {
        title: 'Cereals',
        include: true,
        serving: 50,
        kidsModifier: 0.5,
        unit: 'g'
      }
    },

    meals: {
      pasta: {
        title: 'Pasta',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g'
      },

      rice: {
        title: 'Rice',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g'
      },

      chickpeas: {
        title: 'Chickpeas',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g'
      },

      bulgur: {
        title: 'Bulgur',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g'
      },

      lentils: {
        title: 'Lentils',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g'
      },

      couscous: {
        title: 'Couscous',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g'
      },

      buckwheat: {
        title: 'Buckwheat',
        include: false,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g'
      }
    }
  })

  const info: FormulaInfo = {
    options: {
      breakfast: Object.values(formula.breakfast).filter(v => v.include).length,
      meals: Object.values(formula.meals).filter(v => v.include).length
    }
  }

  return (
    <ContentWrapper size={Size.Large} aligned>
      <V>
        <Header>The Coronavirus shopping list generator</Header>

        <V>
          <V size={Size.Small}>
            <H>
              <H tag="label" size={Size.Small}>
                <Text>Number of adults</Text>
                <Select
                  tag="select"
                  name="adults"
                  size={Size.Small}
                  value={formula.adults}
                  onChange={(e: JSX.TargetedEvent) => {
                    const target = e.target as HTMLSelectElement
                    setFormula(
                      cloneUpdate(formula, ['adults'], () =>
                        parseInt(target.value)
                      )
                    )
                  }}
                >
                  {new Array(11).fill(null).map((_, num) => (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  ))}
                </Select>
              </H>

              <H tag="label" size={Size.Small}>
                <Text>kids</Text>
                <Select
                  tag="select"
                  name="kids"
                  size={Size.Small}
                  value={formula.kids}
                  onChange={(e: JSX.TargetedEvent) => {
                    const target = e.target as HTMLSelectElement
                    setFormula(
                      cloneUpdate(formula, ['kids'], () =>
                        parseInt(target.value)
                      )
                    )
                  }}
                >
                  {new Array(11).fill(null).map((_, num) => (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  ))}
                </Select>
              </H>
            </H>

            <H tag="label" size={Size.Small}>
              <Text>Number of days</Text>
              <Select
                tag="select"
                name="kids"
                size={Size.Small}
                value={formula.days}
                onChange={(e: JSX.TargetedEvent) => {
                  const target = e.target as HTMLSelectElement
                  setFormula(
                    cloneUpdate(formula, ['days'], () => parseInt(target.value))
                  )
                }}
              >
                {new Array(32).fill(null).map((_, num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}{' '}
              </Select>
            </H>
          </V>

          <V>
            <V size={Size.Small}>
              <Header size={Size.XSmall}>Items</Header>

              {Object.keys(formula.items).map(key => (
                <ItemFields
                  formula={formula}
                  setFormula={setFormula}
                  itemKey={key}
                  key={key}
                />
              ))}
            </V>

            <V size={Size.Small}>
              <Header size={Size.XSmall}>Breakfast</Header>

              {Object.keys(formula.breakfast).map(key => (
                <MealFields
                  formula={formula}
                  setFormula={setFormula}
                  info={info}
                  category="breakfast"
                  mealKey={key}
                  key={key}
                />
              ))}
            </V>

            <V size={Size.Small}>
              <Header size={Size.XSmall}>Meals</Header>

              {Object.keys(formula.meals).map(key => (
                <MealFields
                  formula={formula}
                  setFormula={setFormula}
                  info={info}
                  category="meals"
                  mealKey={key}
                  key={key}
                />
              ))}
            </V>
          </V>
        </V>
      </V>
    </ContentWrapper>
  )
}

function ItemFields({
  formula,
  setFormula,
  itemKey
}: {
  formula: Formula
  setFormula: (f: Formula) => void
  itemKey: keyof Formula['items']
}) {
  const item = formula.items[itemKey]

  return (
    <H tag="label" size={Size.Small} adjusted>
      <input
        type="checkbox"
        checked={item.include}
        onChange={(e: JSX.TargetedEvent) => {
          const target = e.target as HTMLInputElement
          setFormula(
            cloneUpdate(
              formula,
              ['items', itemKey, 'include'],
              () => target.checked
            )
          )
        }}
      />

      <Text color={item.include ? Color.Ink : Color.Secondary}>
        {item.title}
        {item.include
          ? `: ${formatQuantity(calculateItem(formula, item), item.unit)}`
          : ''}
      </Text>
    </H>
  )
}

function MealFields<
  Category extends keyof Pick<Formula, 'breakfast' | 'meals'>
>({
  formula,
  setFormula,
  info,
  category,
  mealKey
}: {
  formula: Formula
  setFormula: (f: Formula) => void
  info: FormulaInfo
  category: Category
  mealKey: keyof Formula[Category]
}) {
  const meal = formula[category][mealKey]

  return (
    <H tag="label" size={Size.Small} adjusted>
      <input
        type="checkbox"
        checked={meal.include}
        onChange={(e: JSX.TargetedEvent) => {
          const target = e.target as HTMLInputElement
          setFormula(
            cloneUpdate(
              formula,
              [category, mealKey, 'include'],
              () => target.checked
            )
          )
        }}
      />

      <Text color={meal.include ? Color.Ink : Color.Secondary}>
        {meal.title}
        {meal.include
          ? `: ${formatQuantity(calculateItem(formula, meal), meal.unit)}`
          : ''}
      </Text>
    </H>
  )
}

function calculateItem(formula: Formula, item: Item, options = 1) {
  return Math.ceil(
    (formula.days *
      (formula.adults * item.serving +
        formula.kids * item.serving * item.kidsModifier)) /
      options
  )
}

function formatQuantity(quantity: number, unit: QuantityUnit) {
  switch (unit) {
    case 'g':
      return `${quantity}g`

    case 'number':
      return quantity.toString()
  }
}
