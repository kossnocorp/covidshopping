import { h } from 'preact'
import { Background } from '#GECK/UI/Background'
import { El, H, V } from '#GECK/UI/Spacing'
import { Size } from '#GECK/UI/types'
import { Header, Text } from '#GECK/UI/Text'
import { Button } from '#GECK/UI/Button'
import { ShoppingListProducts, MeasurementSystem } from '../../../data/types'
import { formatQuantity } from '#app/data/utils'
import ActionButton from '#GECK/UI/ActionButton'
import db from '#app/db'
import { add } from 'typesaurus'
import { useContext } from 'preact/hooks'
import { RouterContext } from '#app/router'
import { I18nContext } from '#app/i18n'

export default function ShoppingListPreview({
  system,
  list
}: {
  system: MeasurementSystem
  list: ShoppingListProducts
}) {
  const { localeKey, locale } = useContext(I18nContext)

  const { navigate } = useContext(RouterContext)
  return (
    <Background>
      <El padded size={Size.XLarge}>
        <V size={Size.Large}>
          <H expanded adjusted>
            <Header size={Size.Small}>{locale.sections.preview.title}</Header>

            <H size={Size.Small}>
              {false && (
                <Button tag="button" size={Size.Small} transparent>
                  Print
                </Button>
              )}

              <ActionButton
                tag="button"
                onClick={async () => {
                  const addedList = await add(db.lists, {
                    system,
                    products: list,
                    bought: {}
                  })
                  if (localeKey === 'en') {
                    navigate({
                      name: 'list',
                      params: { listId: addedList.ref.id }
                    })
                  } else {
                    navigate({
                      name: 'localized-list',
                      params: { listId: addedList.ref.id, localeKey }
                    })
                  }
                }}
              >
                {locale.sections.preview.share}
              </ActionButton>
            </H>
          </H>

          <V>
            {Object.entries(list).map(([itemKey, item]) => {
              return (
                <H key={itemKey} size={Size.Small} adjusted>
                  {locale.translate(item.title)}{' '}
                  <Text bold>
                    {formatQuantity(
                      locale,
                      system,
                      item.quantity,
                      item.unit,
                      item.unitTitle
                    )}
                  </Text>
                </H>
              )
            })}
          </V>
        </V>
      </El>
    </Background>
  )
}
