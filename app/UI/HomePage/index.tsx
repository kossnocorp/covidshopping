import { ContentWrapper } from '#GECK/UI/Layout'
import { V, H } from '#GECK/UI/Spacing'
import { Header, Text } from '#GECK/UI/Text'
import { Size, Color } from '#GECK/UI/types'
import { h } from 'preact'
import { Select } from '#GECK/form/Select'
import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { cloneUpdate } from '#GECK/fns'
import pluralize from 'pluralize'

type QuantityUnit = 'g' | 'number' | 'serving'

type Item = {
  title: string
  include: boolean
  serving: number
  kidsModifier: number
  unit: QuantityUnit
  unitTitle?: string
}

type Drink = Item & {}

type Sauce = Item & {
  spicy?: 'low' | 'mild' | 'hot' | 'extreme'
}

type Ingredient = {
  title: string
  quantity: number
  unit: QuantityUnit
  unitTitle?: string
}

type Meal = Item & {
  sauces?: {
    [sauceKey: string]: Sauce
  }

  courses?: {
    [coursesKey: string]: Item
  }

  ingredients?: {
    [ingredientKey: string]: Ingredient
  }
}

type MealCategory = 'breakfast' | 'meals'

type Formula = Record<MealCategory, { [mealId: string]: Meal }> & {
  drinks: Record<string, Drink>
  items: Record<string, Item>
  adults: number
  kids: number
  kidsModifier: number
  days: number
}

type FormulaInfo = {
  options: Record<MealCategory | 'drinks', number>
}

export default function HomePage() {
  const [formula, setFormula] = useState<Formula>({
    days: 14,
    adults: 3,
    kids: 0,
    kidsModifier: 0.5,

    items: {
      toiletPaper: {
        title: 'Toilet paper',
        include: true,
        serving: 1 / 7,
        kidsModifier: 0.5,
        unit: 'number',
        unitTitle: 'roll'
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
        kidsModifier: 0.5,
        unit: 'serving'
      }
    },

    meals: {
      pasta: {
        title: 'Pasta',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g',

        sauces: {
          pesto: {
            title: 'Pesto',
            include: true,
            serving: 0.5,
            kidsModifier: 0.5,
            unit: 'number'
          },

          arrabiata: {
            title: 'Arrabiata',
            include: true,
            serving: 0.5,
            kidsModifier: 0.5,
            unit: 'number',
            spicy: 'low'
          },

          tomato: {
            title: 'Tomato',
            serving: 0.5,
            kidsModifier: 0.5,
            unit: 'number',
            include: true
          }
        },

        courses: {
          veggie: {
            title: 'Veggie',
            include: true,
            serving: 125,
            kidsModifier: 0.5,
            unit: 'g'
          },

          chicken: {
            title: 'Chicken',
            include: true,
            serving: 125,
            kidsModifier: 0.5,
            unit: 'g'
          }
        }
      },

      ravioli: {
        title: 'Ravioli',
        include: true,
        serving: 150,
        kidsModifier: 0.5,
        unit: 'g',
        sauces: {
          pesto: {
            title: 'Pesto',
            include: true,
            serving: 0.5,
            kidsModifier: 0.5,
            unit: 'number'
          },

          arrabiata: {
            title: 'Arrabiata',
            include: true,
            serving: 0.5,
            kidsModifier: 0.5,
            unit: 'number',
            spicy: 'low'
          },

          tomato: {
            title: 'Tomato',
            serving: 0.5,
            kidsModifier: 0.5,
            unit: 'number',
            include: true
          }
        }
      },

      rice: {
        title: 'Rice',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g',

        courses: {
          veggie: {
            title: 'Veggie',
            include: true,
            serving: 125,
            kidsModifier: 0.5,
            unit: 'g'
          },

          chicken: {
            title: 'Chicken',
            include: true,
            serving: 125,
            kidsModifier: 0.5,
            unit: 'g'
          }
        }
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
    },

    drinks: {
      tea: {
        title: 'Tea',
        include: true,
        serving: 2,
        kidsModifier: 0.5,
        unit: 'g'
      },

      coffee: {
        title: 'Coffee',
        include: true,
        serving: 20,
        kidsModifier: 0.5,
        unit: 'g'
      }
    }
  })

  const info: FormulaInfo = {
    options: {
      breakfast: Object.values(formula.breakfast).filter(v => v.include).length,
      meals: Object.values(formula.meals).filter(v => v.include).length,
      drinks: Object.values(formula.drinks).filter(v => v.include).length
    }
  }

  return (
    <ContentWrapper size={Size.Large} aligned>
      <V size={Size.Large}>
        <Header>The Coronavirus shopping list generator</Header>

        <V>
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
                    cloneUpdate(formula, ['kids'], () => parseInt(target.value))
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
          <Header size={Size.XSmall}>Essentials</Header>

          <V size={Size.Small}>
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

            <Text color={Color.Secondary}>
              {calculateServingsTotal(formula)} servings (
              {pluralize('day', formula.days, true)} × {formula.kids ? `(` : ''}
              {pluralize('adult', formula.adults, true)}
              {formula.kids
                ? ` + ${pluralize('kid', formula.kids, true)} × ${
                    formula.kidsModifier
                  }`
                : ''}
              {formula.kids ? `)` : ''})
            </Text>
          </V>

          <V size={Size.Small}>
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

            <Text color={Color.Secondary}>
              {calculateServingsTotal(formula) * 2} servings (2 meals per day ×{' '}
              {pluralize('day', formula.days, true)} × {formula.kids ? `(` : ''}
              {pluralize('adult', formula.adults, true)}
              {formula.kids
                ? ` + ${pluralize('kid', formula.kids, true)} × ${
                    formula.kidsModifier
                  }`
                : ''}
              {formula.kids ? `)` : ''})
            </Text>
          </V>

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

          <V size={Size.Small}>
            <Header size={Size.XSmall}>Drinks</Header>

            <Text color={Color.Secondary}>
              Three drinks per day per person. At breakfast, lunch, and dinner.
            </Text>
          </V>

          {Object.keys(formula.drinks).map(key => (
            <DrinkFields
              formula={formula}
              setFormula={setFormula}
              info={info}
              itemKey={key}
              key={key}
            />
          ))}
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
    <H size={Size.Small} adjusted>
      <H tag="label" size={Size.XSmall} adjusted>
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
        </Text>
      </H>

      {item.include && (
        <Text bold>
          {formatQuantity(
            calculateQuantity(formula, item),
            item.unit,
            item.unitTitle
          )}
        </Text>
      )}
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
  const servings = calculateServings(formula, meal, info.options[category])
  const quantity = Math.ceil(servings * meal.serving)

  return (
    <V size={Size.XSmall}>
      <H size={Size.Small} adjusted>
        <H tag="label" size={Size.XSmall} adjusted>
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
          </Text>
        </H>

        {meal.include && (
          <Text bold>
            {formatQuantity(quantity, meal.unit, meal.unitTitle)}
          </Text>
        )}
      </H>

      <H>
        {meal.include && meal.ingredients && (
          <Text color={Color.Secondary}>
            Ingredients: (
            {Object.values(meal.ingredients)
              .map(
                ingredient =>
                  `${ingredient.title} ${formatQuantity(
                    ingredient.quantity * quantity,
                    ingredient.unit,
                    ingredient.unitTitle
                  )}`
              )
              .join(', ')}
            )
          </Text>
        )}

        {meal.include && meal.sauces && (
          <H size={Size.Small} adjusted>
            <Text color={Color.Secondary} bold>
              Sauce
            </Text>

            {Object.entries(meal.sauces).map(([sauceKey, sauce]) => (
              <H tag="label" size={Size.XSmall} adjusted>
                <input
                  type="checkbox"
                  checked={sauce.include}
                  onChange={(e: JSX.TargetedEvent) => {
                    const target = e.target as HTMLInputElement
                    setFormula(
                      cloneUpdate(
                        formula,
                        // @ts-ignore
                        [category, mealKey, 'sauces', sauceKey, 'include'],
                        () => target.checked
                      )
                    )
                  }}
                />

                <Text color={Color.Secondary}>{sauce.title}</Text>
              </H>
            ))}
          </H>
        )}

        {meal.include && meal.courses && (
          <H size={Size.Small} adjusted>
            <Text color={Color.Secondary} bold>
              Course
            </Text>

            {Object.entries(meal.courses).map(([courseKey, course]) => (
              <H tag="label" size={Size.XSmall} adjusted>
                <input
                  type="checkbox"
                  checked={course.include}
                  onChange={(e: JSX.TargetedEvent) => {
                    const target = e.target as HTMLInputElement
                    setFormula(
                      cloneUpdate(
                        formula,
                        // @ts-ignore
                        [category, mealKey, 'courses', courseKey, 'include'],
                        () => target.checked
                      )
                    )
                  }}
                />

                <Text color={Color.Secondary}>{course.title}</Text>
              </H>
            ))}
          </H>
        )}
      </H>

      {meal.include && (
        <Text color={Color.Secondary} size={Size.Small}>
          {servings} servings
        </Text>
      )}
    </V>
  )
}

function DrinkFields({
  formula,
  setFormula,
  info,
  itemKey
}: {
  formula: Formula
  setFormula: (f: Formula) => void
  info: FormulaInfo
  itemKey: keyof Formula['drinks']
}) {
  const item = formula.drinks[itemKey]

  return (
    <H size={Size.Small} adjusted>
      <H tag="label" size={Size.XSmall} adjusted>
        <input
          type="checkbox"
          checked={item.include}
          onChange={(e: JSX.TargetedEvent) => {
            const target = e.target as HTMLInputElement
            setFormula(
              cloneUpdate(
                formula,
                ['drinks', itemKey, 'include'],
                () => target.checked
              )
            )
          }}
        />

        <Text color={item.include ? Color.Ink : Color.Secondary}>
          {item.title}
        </Text>
      </H>

      {item.include && (
        <Text bold>
          {formatQuantity(
            calculateQuantity(formula, item, info.options.drinks) * 3,
            item.unit,
            item.unitTitle
          )}
        </Text>
      )}
    </H>
  )
}

function calculateServings(formula: Formula, item: Item, options = 1) {
  return Math.ceil(
    (formula.days * (formula.adults + formula.kids * item.kidsModifier)) /
      options
  )
}

function calculateQuantity(formula: Formula, item: Item, options = 1) {
  return Math.ceil(
    (formula.days *
      (formula.adults * item.serving +
        formula.kids * item.serving * item.kidsModifier)) /
      options
  )
}

function calculateServingsTotal(formula: Formula) {
  return Math.ceil(
    formula.days * (formula.adults + formula.kids * formula.kidsModifier)
  )
}

function formatQuantity(
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
      return quantity.toString()

    case 'serving':
      return `${quantity}x`
  }
}
