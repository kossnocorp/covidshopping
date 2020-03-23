import { defaultFormula } from '#app/data'
import { Formula, FormulaInfo, MeasurementSystem } from '#app/data/types'
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
import { Header, Text, Italic } from '#GECK/UI/Text'
import { Color, Size } from '#GECK/UI/types'
import pluralize from 'pluralize'
import { h, JSX } from 'preact'
import { useState } from 'preact/hooks'
import ShoppingListPreview from './ShoppingListPreview'
import merge from 'lodash/merge'
import { lsSet, lsGet } from '#GECK/browser'
import Input from '#GECK/form/Input'
import Note from '#GECK/UI/Note'
import ExpandIcon from '#GECK/UI/Icon/angle-down'
import CollapseIcon from '#GECK/UI/Icon/angle-up'

export default function HomePage() {
  const [formula, setFormulaState] = useState<Formula>(
    merge(defaultFormula, lsGet('formula'))
  )

  const setFormula = (newFormula: Formula) => {
    lsSet('formula', newFormula)
    setFormulaState(newFormula)
  }

  const info: FormulaInfo = {
    options: {
      breakfast: Object.values(formula.breakfast).filter(v => v.include).length,
      meals: Object.values(formula.meals).filter(v => v.include).length,
      drinks: Object.values(formula.drinks).filter(v => v.include).length
    }
  }

  const list = generateShoppingList(formula, info)

  const [aboutCollapsed, setAboutCollapsedState] = useState<boolean>(
    lsGet('aboutCollapsed') || false
  )
  const setAboutCollapsed = (collapsed: boolean) => {
    lsSet('aboutCollapsed', collapsed)
    setAboutCollapsedState(collapsed)
  }

  return (
    <H distributed>
      <El padded size={Size.XLarge}>
        <V size={Size.Large}>
          <V>
            <Header>The Coronavirus shopping list generator</Header>

            <Note>
              <H expanded>
                {aboutCollapsed ? (
                  <Text content>
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
                  </Text>
                ) : (
                  <Text content>
                    <strong>What is this app for?</strong>
                  </Text>
                )}

                {aboutCollapsed ? (
                  <CollapseIcon
                    trigger
                    onClick={() => setAboutCollapsed(false)}
                    size={Size.Large}
                  />
                ) : (
                  <ExpandIcon
                    trigger
                    onClick={() => setAboutCollapsed(true)}
                    size={Size.Large}
                  />
                )}
              </H>
            </Note>
          </V>

          <V>
            <H tag="label" size={Size.Small}>
              <Text>Measurement system</Text>
              <Select
                tag="select"
                name="system"
                size={Size.Small}
                value={formula.system}
                onChange={(e: JSX.TargetedEvent) => {
                  const target = e.target as HTMLSelectElement
                  setFormula(
                    cloneUpdate(
                      formula,
                      ['system'],
                      () => target.value as MeasurementSystem
                    )
                  )
                }}
              >
                <option value="metric">Metric (g)</option>
                <option value="imperial">Imperial (oz)</option>
              </Select>
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

              <Text color={Color.Secondary}>
                Children serving size is calculated as{' '}
                <Italic tag="span">
                  adult ×{' '}
                  <Input
                    tag="input"
                    name=""
                    size={Size.XSmall}
                    type="number"
                    value={formula.kidsModifier}
                    step="0.1"
                    max="1"
                    min="0.1"
                    style="width: 3rem; font-style: italic"
                    onChange={(e: JSX.TargetedEvent) => {
                      const target = e.target as HTMLSelectElement
                      const parsedValue = parseFloat(target.value)
                      const value =
                        parsedValue < 0.1
                          ? 0.1
                          : parsedValue > 1
                          ? 1
                          : parsedValue
                      setFormula(
                        cloneUpdate(formula, ['kidsModifier'], () => value)
                      )
                    }}
                  />
                </Italic>
              </Text>
            </V>
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
              <Italic tag="span">
                {pluralize('day', formula.days, true)} ×{' '}
                {formula.kids ? `(` : ''}
                {pluralize('adult', formula.adults, true)}
                {formula.kids
                  ? ` + ${pluralize('kid', formula.kids, true)} × ${
                      formula.kidsModifier
                    }`
                  : ''}
                {formula.kids ? `)` : ''}
              </Italic>
              )
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
              {calculateServingsTotal(formula) * 2} servings (
              <Italic tag="span">
                2 meals per day × {pluralize('day', formula.days, true)} ×{' '}
                {formula.kids ? `(` : ''}
                {pluralize('adult', formula.adults, true)}
                {formula.kids
                  ? ` + ${pluralize('kid', formula.kids, true)} × ${
                      formula.kidsModifier
                    }`
                  : ''}
                {formula.kids ? `)` : ''}
              </Italic>
              )
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

      <ShoppingListPreview system={formula.system} list={list} />
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
            formula.system,
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
            {formatQuantity(
              formula.system,
              quantity,
              meal.unit,
              meal.unitTitle
            )}
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
                        formula.system,
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
                        formula.system,
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
                            formula.system,
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
                                    formula.system,
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
            formula.system,
            calculateQuantity(formula, item, info.options.drinks) * 3,
            item.unit,
            item.unitTitle
          )}
        </Text>
      )}
    </H>
  )
}
