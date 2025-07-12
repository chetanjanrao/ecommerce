import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { productType } from "./productType"; 
//import { ordersType } from './ordersType'
import { salesType } from './salesType'
import { ordersType } from './ordersType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType,blockContentType, categoryType, postType, authorType,ordersType,salesType],
}
