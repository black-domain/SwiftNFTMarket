/** @format */

export interface Root {
  getItem: GetItem;
}

export interface GetItem {
  item: Item[];
  __typename: string;
}

export interface Item {
  __typename: string;
  collection_id: string;
  item_id: string;
  from: string;
  to: string;
  listing_id: string;
  price: number;
  on_sale: boolean;
  name: string;
  image_url: string;
}
