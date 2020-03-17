import { h } from 'preact'
import { Background } from '#GECK/UI/Background'
import { El, H, V } from '#GECK/UI/Spacing'
import { Size } from '#GECK/UI/types'
import { Header, Text } from '#GECK/UI/Text'
import { Button } from '#GECK/UI/Button'
import { ShoppingList } from '../../../data/types'
import { formatQuantity } from '#app/data/utils'

export default function ShoppingList({ list }: { list: ShoppingList }) {
  return (
    <Background>
      <El padded size={Size.XLarge}>
        <V size={Size.Large}>
          <H expanded adjusted>
            <Header size={Size.Small}>Shopping list</Header>

            {false && (
              <H size={Size.Small}>
                <Button tag="button" size={Size.Small} transparent>
                  Print
                </Button>

                <Button tag="button" size={Size.Small}>
                  Share with family
                </Button>
              </H>
            )}
          </H>

          <V>
            {Object.entries(list).map(([itemKey, item]) => {
              return (
                <H key={itemKey} size={Size.Small} adjusted>
                  {item.title}{' '}
                  <Text bold>
                    {formatQuantity(item.quantity, item.unit, item.unitTitle)}
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
