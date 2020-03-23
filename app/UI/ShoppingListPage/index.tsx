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

export default function ShoppingListPage({ listId }: { listId: string }) {
  const list = useOnGet(db.lists, listId)

  return (
    <El size={Size.XLarge} padded>
      <ContentWrapper size={Size.Small} aligned>
        {list ? (
          <V size={Size.Large}>
            <V size={Size.Small}>
              <Header size={Size.Small}>Shopping list</Header>

              <Text size={Size.Large} color={Color.Secondary}>
                Share this page with your family. When you check an item, the
                list updates automatically on all devices that have this page
                open.
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
                        <H adjusted size={Size.Small}>
                          {product.title}

                          <Strong>
                            {formatQuantity(
                              list.data.system,
                              product.quantity,
                              product.unit,
                              product.unitTitle
                            )}
                          </Strong>
                        </H>
                      </Text>
                    </H>
                  )
                }
              )}
            </V>

            <Text color={Color.Secondary}>
              The shopping list is generated using{' '}
              <TextLink to={{ name: 'home' }}>
                The Coronavirus shopping list
              </TextLink>{' '}
              generator
            </Text>
          </V>
        ) : (
          <div>Loading...</div>
        )}
      </ContentWrapper>
    </El>
  )
}
