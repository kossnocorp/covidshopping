import { ContentWrapper } from '#GECK/UI/Layout'
import { V, H } from '#GECK/UI/Spacing'
import { Header, Text } from '#GECK/UI/Text'
import { Size, Color } from '#GECK/UI/types'
import { h, Fragment } from 'preact'
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

type Side = Item & {
  sauces?: {
    [sauceKey: string]: Sauce
  }
}

type Ingredient = {
  title: string
  quantity: number
  unit: QuantityUnit
  unitTitle?: string
}

type Meal = Item & {
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

const pesto: Sauce = {
  title: 'Pesto',
  include: true,
  serving: 50,
  kidsModifier: 0.5,
  unit: 'g'
}

const arrabiata: Sauce = {
  title: 'Arrabiata',
  include: true,
  serving: 50,
  kidsModifier: 0.5,
  unit: 'g',
  spicy: 'low'
}

const tomato: Sauce = {
  title: 'Tomato',
  serving: 50,
  kidsModifier: 0.5,
  unit: 'g',
  include: true
}

const pasta: Side = {
  title: 'Pasta',
  include: true,
  serving: 125,
  kidsModifier: 0.5,
  unit: 'g',
  sauces: { pesto, arrabiata, tomato }
}

const rice: Side = {
  title: 'Rice',
  include: true,
  serving: 125,
  kidsModifier: 0.5,
  unit: 'g'
}

const chickpeas: Side = {
  title: 'Chickpeas',
  include: true,
  serving: 125,
  kidsModifier: 0.5,
  unit: 'g'
}

const bulgur: Side = {
  title: 'Bulgur',
  include: true,
  serving: 125,
  kidsModifier: 0.5,
  unit: 'g'
}

const lentils: Side = {
  title: 'Lentils',
  include: true,
  serving: 125,
  kidsModifier: 0.5,
  unit: 'g'
}

const couscous: Side = {
  title: 'Couscous',
  include: true,
  serving: 125,
  kidsModifier: 0.5,
  unit: 'g'
}

const buckwheat: Side = {
  title: 'Buckwheat',
  include: false,
  serving: 125,
  kidsModifier: 0.5,
  unit: 'g'
}

const potato: Side = {
  title: 'Potato',
  include: false,
  serving: 125,
  kidsModifier: 0.5,
  unit: 'g'
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
      veggie: {
        title: 'Veggie',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g',
        sides: { pasta, rice, bulgur, lentils, couscous, potato, buckwheat }
      },

      ravioli: {
        title: 'Ravioli',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g',
        sauces: { pesto, arrabiata, tomato }
      },

      chicken: {
        title: 'Chicken',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g',
        sides: { pasta, rice, bulgur, couscous, potato, buckwheat }
      },

      meat: {
        title: 'Meat',
        include: true,
        serving: 125,
        kidsModifier: 0.5,
        unit: 'g',
        sides: { pasta, rice, bulgur, couscous, potato, buckwheat }
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

        <Header>Essentials</Header>

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
          <Header>Breakfast</Header>

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
          <Header>Meals</Header>

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
          <Header>Drinks</Header>

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
  const servings =
    calculateServings(formula, meal, info.options[category]) *
    (category === 'meals' ? 2 : 1)
  const quantity = Math.ceil(servings * meal.serving)
  const sidesOptions = Object.values(meal.sides || {}).filter(s => s.include)
    .length

  return (
    <V size={Size.Small}>
      <H size={Size.Small} adjusted>
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

          <Header
            color={meal.include ? Color.Ink : Color.Secondary}
            size={Size.XSmall}
          >
            {meal.title}
          </Header>
        </H>

        {meal.include && (
          <Text bold>
            {formatQuantity(quantity, meal.unit, meal.unitTitle)}
          </Text>
        )}
      </H>

      {meal.include && (meal.sides || meal.ingredients || meal.sauces) && (
        <H>
          {meal.ingredients && (
            <H size={Size.Small} adjusted>
              <Text color={Color.Secondary} bold>
                Ingredients
              </Text>

              <Text color={Color.Secondary}>
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
              </Text>
            </H>
          )}

          {meal.sauces && (
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

          {meal.sides && (
            <V size={Size.Small} adjusted>
              <Text color={Color.Secondary} bold>
                Sides
              </Text>

              {Object.entries(meal.sides).map(([sideKey, side]) => {
                const sideSaucesOptions = Object.values(
                  side.sauces || {}
                ).filter(s => s.include).length

                return (
                  <H adjusted>
                    <H size={Size.Small} adjusted>
                      <H tag="label" size={Size.XSmall} adjusted>
                        <input
                          type="checkbox"
                          checked={side.include}
                          onChange={(e: JSX.TargetedEvent) => {
                            const target = e.target as HTMLInputElement
                            setFormula(
                              cloneUpdate(
                                formula,
                                [
                                  category,
                                  // @ts-ignore
                                  mealKey,
                                  // @ts-ignore
                                  'sides',
                                  sideKey,
                                  'include'
                                ],
                                () => target.checked
                              )
                            )
                          }}
                        />

                        <Text color={Color.Secondary}>{side.title}</Text>
                      </H>

                      {side.include && (
                        <Text color={Color.Secondary} bold>
                          {formatQuantity(
                            Math.ceil((servings / sidesOptions) * side.serving),
                            side.unit,
                            side.unitTitle
                          )}
                        </Text>
                      )}
                    </H>

                    {side.include && side.sauces && (
                      <H size={Size.Small} adjusted>
                        <Text color={Color.Secondary} bold>
                          Sauces
                        </Text>

                        {Object.entries(side.sauces).map(
                          ([sauceKey, sauce]) => (
                            <H size={Size.Small} adjusted>
                              <H tag="label" size={Size.XSmall} adjusted>
                                <input
                                  type="checkbox"
                                  checked={sauce.include}
                                  onChange={(e: JSX.TargetedEvent) => {
                                    const target = e.target as HTMLInputElement
                                    setFormula(
                                      cloneUpdate(
                                        formula,
                                        [
                                          category,
                                          // @ts-ignore
                                          mealKey,
                                          // @ts-ignore
                                          'sides',
                                          sideKey,
                                          'sauces',
                                          sauceKey,
                                          'include'
                                        ],
                                        () => target.checked
                                      )
                                    )
                                  }}
                                />

                                <Text color={Color.Secondary}>
                                  {sauce.title}
                                </Text>
                              </H>

                              {sauce.include && (
                                <Text color={Color.Secondary} bold>
                                  {formatQuantity(
                                    Math.ceil(
                                      (servings /
                                        sidesOptions /
                                        sideSaucesOptions) *
                                        sauce.serving
                                    ),
                                    sauce.unit,
                                    sauce.unitTitle
                                  )}
                                </Text>
                              )}
                            </H>
                          )
                        )}
                      </H>
                    )}
                  </H>
                )
              })}
            </V>
          )}
        </H>
      )}

      {meal.include && (
        <Text color={Color.Secondary} size={Size.Small}>
          {pluralize('serving', servings, true)}
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
    case 'serving':
      return `${quantity}x`
  }
}
