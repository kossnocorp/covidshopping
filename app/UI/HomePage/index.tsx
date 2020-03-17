import { defaultFormula } from '#app/data'
import { Formula, FormulaInfo } from '#app/data/types'
import {
  calculateQuantity,
  calculateServings,
  calculateServingsTotal,
  formatQuantity,
  generateShoppingList
} from '#app/data/utils'
import { cloneUpdate } from '#GECK/fns'
import { Select } from '#GECK/form/Select'
import { El, H, V } from '#GECK/UI/Spacing'
import { Header, Text } from '#GECK/UI/Text'
import { Color, Size } from '#GECK/UI/types'
import pluralize from 'pluralize'
import { h, JSX } from 'preact'
import { useState } from 'preact/hooks'
import ShoppingList from './ShoppingList'

export default function HomePage() {
  const [formula, setFormula] = useState<Formula>(defaultFormula)

  const info: FormulaInfo = {
    options: {
      breakfast: Object.values(formula.breakfast).filter(v => v.include).length,
      meals: Object.values(formula.meals).filter(v => v.include).length,
      drinks: Object.values(formula.drinks).filter(v => v.include).length
    }
  }

  const list = generateShoppingList(formula, info)

  return (
    <H distributed>
      <El padded size={Size.XLarge}>
        <V size={Size.Large}>
          <Header>The Coronavirus shopping list generator</Header>

          <V>
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
      </El>

      <ShoppingList list={list} />
    </H>
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
  const saucesOptions = Object.values(meal.sauces || {}).filter(s => s.include)
    .length
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
                            // @ts-ignore
                            [category, mealKey, 'sauces', sauceKey, 'include'],
                            () => target.checked
                          )
                        )
                      }}
                    />

                    <Text color={Color.Secondary}>{sauce.title}</Text>
                  </H>

                  {sauce.include && (
                    <Text color={Color.Secondary} bold>
                      {formatQuantity(
                        Math.ceil((servings / saucesOptions) * sauce.serving),
                        sauce.unit,
                        sauce.unitTitle
                      )}
                    </Text>
                  )}
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
