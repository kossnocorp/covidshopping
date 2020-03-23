import { defaultFormula } from '#app/data'
import { Formula, FormulaInfo, MeasurementSystem } from '#app/data/types'
import {
  calculateQuantity,
  calculateServings,
  calculateServingsTotal,
  formatQuantity,
  generateShoppingList
} from '#app/data/utils'
import { I18nContext, locales } from '#app/i18n'
import { lsGet, lsSet } from '#GECK/browser'
import { cloneUpdate } from '#GECK/fns'
import Input from '#GECK/form/Input'
import { Select } from '#GECK/form/Select'
import ExpandIcon from '#GECK/UI/Icon/angle-down'
import CollapseIcon from '#GECK/UI/Icon/angle-up'
import Note from '#GECK/UI/Note'
import { El, H, V } from '#GECK/UI/Spacing'
import { Header, Italic, Text } from '#GECK/UI/Text'
import { TextLink } from '#GECK/UI/TextLink'
import { Color, Size } from '#GECK/UI/types'
import merge from 'lodash/merge'
import { h, JSX } from 'preact'
import { useContext, useState } from 'preact/hooks'
import ShoppingListPreview from './ShoppingListPreview'

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

  const showAboutFromLS = lsGet('showAbout')
  const [showAbout, setShowAboutState] = useState<boolean>(
    typeof showAboutFromLS === 'boolean' ? showAboutFromLS : true
  )
  const setShowAbout = (show: boolean) => {
    lsSet('showAbout', show)
    setShowAboutState(show)
  }

  const { localeKey, locale } = useContext(I18nContext)

  const totalServings = calculateServingsTotal(formula)

  return (
    <H distributed>
      <El padded size={Size.XLarge}>
        <V size={Size.Large}>
          <V>
            <H>
              <TextLink to={{ name: 'home' }} active={localeKey === 'en'}>
                {locales.en.localeName}
              </TextLink>

              <TextLink
                to={{ name: 'localized-home', params: { localeKey: 'ru' } }}
                active={localeKey === 'ru'}
              >
                {locales.ru.localeName}
              </TextLink>
            </H>

            <Header>{locale.title}</Header>

            <Note>
              <H expanded>
                <Text
                  content
                  dangerouslySetInnerHTML={{
                    __html: showAbout
                      ? locale.about.expanded
                      : locale.about.collapsed
                  }}
                />

                {showAbout ? (
                  <CollapseIcon
                    trigger
                    onClick={() => setShowAbout(false)}
                    size={Size.Large}
                  />
                ) : (
                  <ExpandIcon
                    trigger
                    onClick={() => setShowAbout(true)}
                    size={Size.Large}
                  />
                )}
              </H>
            </Note>
          </V>

          <V>
            <H tag="label" size={Size.Small}>
              <Text>{locale.measurement.system}</Text>

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
                <option value="metric">{locale.measurement.metric} (g)</option>
                <option value="imperial">
                  {locale.measurement.imperial} (oz)
                </option>
              </Select>
            </H>

            <H tag="label" size={Size.Small}>
              <Text>{locale.numberOfDays}</Text>
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
                  <Text>{locale.numberOfAdults}</Text>

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
                  <Text>{locale.numberOfKids}</Text>
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
                {locale.kidsServing.title}{' '}
                <Italic tag="span">
                  {locale.kidsServing.adult} ×{' '}
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

          <Header>{locale.sections.essentials.title}</Header>

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
            <Header>{locale.sections.breakfast.title}</Header>

            <Text color={Color.Secondary}>
              {totalServings} {locale.pluralize('serving', totalServings)} (
              <Italic tag="span">
                {formula.days} {locale.pluralize('day', formula.days)} ×{' '}
                {formula.kids ? `(` : ''}
                {formula.adults} {locale.pluralize('adult', formula.adults)}
                {formula.kids
                  ? ` + ${formula.kids} ${locale.pluralize(
                      'kid',
                      formula.kids
                    )} × ${formula.kidsModifier}`
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
            <Header>{locale.sections.meals.title}</Header>

            <Text color={Color.Secondary}>
              {totalServings * 2}{' '}
              {locale.pluralize('serving', totalServings * 2)} (
              <Italic tag="span">
                {locale.sections.meals.formula.intro} × {formula.days}{' '}
                {locale.pluralize('day', formula.days)} ×{' '}
                {formula.kids ? `(` : ''}
                {formula.adults} {locale.pluralize('adult', formula.adults)}
                {formula.kids
                  ? ` + ${formula.kids} ${locale.pluralize(
                      'kid',
                      formula.kids
                    )} × ${formula.kidsModifier}`
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
            <Header>{locale.sections.drinks.title}</Header>

            <Text color={Color.Secondary}>
              {locale.sections.drinks.description}
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
  const { locale } = useContext(I18nContext)

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
          {locale.translate(item.title)}
        </Text>
      </H>

      {item.include && (
        <Text bold>
          {formatQuantity(
            locale,
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
  const { locale } = useContext(I18nContext)

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
            {locale.translate(meal.title)}
          </Header>
        </H>

        {meal.include && (
          <Text bold>
            {formatQuantity(
              locale,
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
                {locale.translate('Ingredients')}
              </Text>

              <Text color={Color.Secondary}>
                {Object.values(meal.ingredients)
                  .map(
                    ingredient =>
                      `${locale.translate(ingredient.title)} ${formatQuantity(
                        locale,
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
                {locale.translate('Sauce')}
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

                    <Text color={Color.Secondary}>
                      {locale.translate(sauce.title)}
                    </Text>
                  </H>

                  {sauce.include && (
                    <Text color={Color.Secondary} bold>
                      {formatQuantity(
                        locale,
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
                {locale.translate('Side')}
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

                        <Text color={Color.Secondary}>
                          {locale.translate(side.title)}
                        </Text>
                      </H>

                      {side.include && (
                        <Text color={Color.Secondary} bold>
                          {formatQuantity(
                            locale,
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
                          {locale.translate('Sauce')}
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
                                  {locale.translate(sauce.title)}
                                </Text>
                              </H>

                              {sauce.include && (
                                <Text color={Color.Secondary} bold>
                                  {formatQuantity(
                                    locale,
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
          {servings} {locale.pluralize('serving', servings)}
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
  const { locale } = useContext(I18nContext)

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
          {locale.translate(item.title)}
        </Text>
      </H>

      {item.include && (
        <Text bold>
          {formatQuantity(
            locale,
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
