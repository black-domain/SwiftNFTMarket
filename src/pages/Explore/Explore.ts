/** @format */

export interface ExploreType {
  __typename: string;
  collection_id: string;
  name: string;
  description: string;
  logo_image: string;
  featured_image: string;
  fee: string;
  symbol: string;
  symbol_decimal: number;
  type: any[];
  owner: string;
  total_volume: number;
  item_count: number;
  on_sale_count: number;
  floor_price: number;
  view_count: number;
  favorite_count: number;
  twitter: string;
  telegram: string;
  github: string;
  website: string;
  is_certification: boolean;
  create_time: string;
  last_update_time: string;
}

export type Root = Root2[]

export interface Root2 {
  data: Data
}

export interface Data {
  objectId: string
  version: string
  digest: string
  display: Display
  content: Content
}

export interface Display {
  data: any
  error: any
}

export interface Content {
  dataType: string
  type: string
  hasPublicTransfer: boolean
  fields: Fields
}

export interface Fields {
  balance: Balance
  description: string
  discord: string
  featured_image: string
  fee: string
  id: Id2
  logo_image: string
  name: string
  receiver: string
  tags: string[]
  twitter: string
  website: string
}

export interface Balance {
  type: string
  fields: Fields2
}

export interface Fields2 {
  balance: string
  id: Id
}

export interface Id {
  id: string
}

export interface Id2 {
  id: string
}
