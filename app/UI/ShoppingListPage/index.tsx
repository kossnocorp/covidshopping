import { h } from 'preact'
import { Size, Color } from '#GECK/UI/types'
import { El, V, H } from '#GECK/UI/Spacing'
import db from '#app/db'
import { useOnGet } from '@typesaurus/preact'
import { Text, Header, Strong } from '#GECK/UI/Text'
import { formatQuantity } from '#app/data/utils'
import { update } from 'typesaurus'
import { TextLink } from '#GECK/UI/TextLink'
import { ContentWrapper } from '#GECK/UI/Layout'
import { useContext } from 'preact/hooks'
import { I18nContext } from '#app/i18n'
import Input from '#GECK/form/Input'
import { Button } from '#GECK/UI/Button'
import omit from 'lodash/omit'

export default function ShoppingListPage({ listId }: { listId: string }) {
  const list = useOnGet(db.lists, listId)
  const { localeKey, locale } = useContext(I18nContext)

  return (
    <El size={Size.XLarge} padded>
      <ContentWrapper size={Size.Small} aligned>
        {list ? (
          <V size={Size.Large}>
            <V size={Size.Small}>
              <Header size={Size.Small}>{locale.sections.list.title}</Header>

              <Text size={Size.Large} color={Color.Secondary}>
                {locale.sections.list.description}
              </Text>
            </V>

            <V>
              {Object.entries(list.data.products).map(
                ([productKey, product]) => {
                  const bought = list.data.bought[productKey] || false
                  return (
                    <H tag="label" key={productKey} size={Size.Small} adjusted>
                      <input
                        type="checkbox"
                        checked={bought}
                        onChange={e => {
                          const target = e.target as HTMLInputElement
                          update(db.lists, list.ref.id, {
                            bought: Object.assign({}, list.data.bought, {
                              [productKey]: target.checked
                            })
                          })
                        }}
                      />

                      <Text
                        strikethrough={bought}
                        color={bought ? Color.Secondary : Color.Ink}
                      >
                        {'custom' in product ? (
                          <H adjusted size={Size.Small}>
                            <div>{product.title}</div>
                            <Button
                              size={Size.XSmall}
                              color={Color.Ink}
                              transparent
                              onClick={() => {
                                update(db.lists, list.ref.id, {
                                  products: omit(list.data.products, productKey)
                                })
                              }}
                            >
                              {locale.sections.list.remove}
                            </Button>
                          </H>
                        ) : (
                          <H adjusted size={Size.Small}>
                            {locale.translate(product.title)}

                            <Strong>
                              {formatQuantity(
                                locale,
                                list.data.system,
                                product.quantity,
                                product.unit,
                                product.unitTitle
                              )}
                            </Strong>
                          </H>
                        )}
                      </Text>
                    </H>
                  )
                }
              )}
            </V>

            <H
              tag="form"
              size={Size.Small}
              onSubmit={(e: Event) => {
                e.preventDefault()
                const target = e.target as HTMLFormElement
                const title = (target.product as HTMLInputElement).value
                // NOTE: Firestore object keys are sorted by alphabet,
                // so this hack allows to add custom items to the end.
                const id = `zzz${Date.now()}`
                update(db.lists, list.ref.id, {
                  products: Object.assign({}, list.data.products, {
                    [id]: { custom: true, title }
                  })
                })
                target.reset()
              }}
            >
              <Input name="product" size={Size.Medium} required />
              <Button tag="button" type="submit" transparent>
                {locale.sections.list.addToList}
              </Button>
            </H>

            <Text color={Color.Secondary}>
              {locale.sections.list.generated.intro}{' '}
              <TextLink
                to={
                  localeKey === 'en'
                    ? { name: 'home' }
                    : { name: 'localized-home', params: { localeKey } }
                }
              >
                {locale.sections.list.generated.link}
              </TextLink>
            </Text>
          </V>
        ) : (
          <div>Loading...</div>
        )}
      </ContentWrapper>
    </El>
  )
}
