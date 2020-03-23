import { collection } from 'typesaurus'
import { ShoppingListProducts, MeasurementSystem } from '#app/data/types'

export type ShoppingList = {
  system: MeasurementSystem
  products: ShoppingListProducts
  bought: Record<string, boolean>
}

const db = {
  lists: collection<ShoppingList>('lists')
}
export default db
