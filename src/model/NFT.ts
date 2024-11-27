/** @format */

export interface Id {
  id: string;
}

export interface Properties {
  description: string;
  id: Id;
  name: string;
  url: string;
}

export interface NFTCardType {
  __typename: string;
  collection_id: string;
  item_id: string;
  seller: string;
  price: number;
  properties: Properties;
  on_sale: boolean;
  type_: string;
}

export interface getObjectNftType {
  details: getObjectNftTypeDetails;
  status: string;
}

export interface getObjectNftTypeDetails {
  data: getObjectNftDetailsData;
  owner: getObjectNftDetailsOwner;
  previousTransaction: string;
  reference: getObjectNftDetailsReference;
  storageRebate: number;
}

export interface getObjectNftDetailsData {
  dataType: string;
  fields: DetailsDataFields;
  has_public_transfer: boolean;
  type: string;
}
export interface getObjectNftDetailsOwner {
  Shared: DetailsOwnerShared;
}
export interface getObjectNftDetailsReference {
  digest: string;
  objectId: string;
  version: number;
}
export interface DetailsDataFields {
  balance: DetailsDataFieldsBalance;
  collection: DetailsDataFieldsCollection;
  fee: string;
  id: DetailsDataFieldsId;
}
export interface DetailsOwnerShared {
  initial_shared_version: number;
}
export interface DetailsDataFieldsBalance {
  fields: DetailsDataFieldsBalanceFields;
  type: string;
}
export interface DetailsDataFieldsCollection {
  type: string;
  fields: DetailsDataFieldsCollectionFields;
}
export interface DetailsDataFieldsId {
  id: string;
}

export interface DetailsDataFieldsBalanceFields {
  balance: string;
  id: DetailsDataFieldsBalanceFieldsId;
}
export interface DetailsDataFieldsBalanceFieldsId {
  id: string;
}
export interface DetailsDataFieldsCollectionFields {
  contents: any[];
}

export interface ImageCardData {
  collection_id:  string
  create_address: string
  description: string
  discord: string
  featured_image: string
  fee: string
  floor_price: string
  item:string
  logo_image: string
  name: string
  receiver:string
  total_volume:string
  tw: string
  website: string
  __typename: string
}