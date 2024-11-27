/** @format */

export type ChainStructure = Root2[];

export type Root = {
  data: Root2;
};

export interface Root2 {
  amount?: any;
  collectionId?: string;
  objectId: string;
  version: string;
  digest: string;
  type: string;
  owner: Owner;
  display: Display;
  content: Content;
  kioskId?: string

}

export interface Owner {
  AddressOwner: string;
}

export interface Display {
  data: Data;
  error: any;
}

export interface Data {
  creator: string;
  description: string;
  image_url: string;
  link: string;
  name: string;
  project_url: string;
}

export interface Content {
  dataType: string;
  type: string;
  hasPublicTransfer: boolean;
  fields: Fields;
}

export interface Fields {
  id: Id;
  img_url: string;
  name: string;
}

export interface Id {
  id: string;
}

export interface ShotRoot {
  data: Data;
  loading: boolean;
  networkStatus: number;
}

export interface DataShot {
  getSlingshot: GetSlingshot;
}

export interface GetSlingshot {
  __typename: string;
  total_slingshot: number;
  slingshot: Slingshot[];
}

export interface Slingshot {
  __typename: string;
  slingshot_id: string;
  admin: string;
  live: boolean;
  market_fee: string;
  sales: string[];
  create_time: string;
  last_update_time: string;
  metadata: any;
}
