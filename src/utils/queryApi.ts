/** @format */

import { number } from "echarts";

// 获取用户交易几率
export interface TransactionHistory {
  operation: OperationType;
  collection_id: string;
  item_id: string;
  user_address: string;
  price: string;
  number: number;
  from: string;
  to: string;
  timestamp: string;
}

export enum OperationType {
  BUY = "BUY",
  LISTING = "LISTING",
  ADJUST_PRICE = "ADJUST_PRICE",
  DE_LIST = "DE_LIST",
}
export interface UserTransactionQuery {
  // 输出
  item_id:string;
  user_address: string;
  nft_type: string;
  operation: [OperationType];
  limit: number;
  cursor: number;
  reversed: Boolean;
  sort_type: UserTransactionSortType;
}

export enum UserTransactionSortType {
  price = "price",
  number = "number",
  timestamp = "timestamp",
}
// 获取nft交易记录
export interface ItemTransaction {
  item_id: string;
  collection_id: string;
  seller: string;
  buyer: string;
  price: string;
  timestamp: string;
}

export interface ItemTransactionQuery {
  // 输出
  collection_id: number | string;
  item_id: string;
  limit: number;
  cursor: number;
  reversed: Boolean;
  sort_type: ItemTransactionSortType;
}

export enum ItemTransactionSortType {
  price = "price",
  timestamp = "timestamp",
}

// 获取轮播图信息
export interface RotationChart {
  name: string;
  description: string;
  start_time: string;
  image_url: string;
  website: string;
}

// 获取nft信息
export interface ItemResp {
  collection_id: string | number;
  item_id: string | number;
  listing_id: string;
  operator: string;
  price: string;
  on_sale: Boolean;
}

export enum ItemSortType {
  price = "price",
}

export interface ItemQuery {
  collection_id:string|undefined;
  item_id: string | number;
  operator: string | undefined;
  limit: number;
  cursor: number;
  on_sale: number;
  sort_type: ItemSortType;
  reversed: Boolean;
  nft_type:string;
  ft_type:string;
}

export interface CollectionResp{
  collection: Collection[]
  total_collection: number

}
// 获取合集
export interface Collection {
  collection_id: string;
  name: string;
  description: string;
  logo_image: string;
  featured_image: string;
  fee: string;
  symbol: string;
  type: string;
  owner: string;
  total_volume: string;
  item_count: number;
  on_sale_count: number;
  floor_price: string;
  view_count: number;
  favorite_count: number;
  twitter: string;
  telegram: string;
  github: string;
  website: string;
  is_certification: Boolean;
  create_time: number;
  last_update_time: number;
  symbol_decimal:number
}
export interface CollectionResp{
  collection:Collection[];
  total_collection:number;
}
export enum CollectionSortType {
  floor_price = "floor_price",
  total_volume = "total_volume",
  view_count = "view_count",
  favorite_count = "favorite_count",
}

export interface CollectionQuery {
  // 输出
  collection_id: number | string;
  name: string;
  owner: string;
  limit: number;
  cursor: number;
  sort_type: CollectionSortType;
  reversed: Boolean;
  type: string[];
  both_type:boolean;
  ft_type:string
  nft_type:string
  is_certification:number
}

// 获取合集分析记录
export interface CollectionAnalysisReqResult {
  collection_analysis: CollectionAnalysis[],
  total_collection: number,
  __typename: string
}
export interface CollectionAnalysis {
  collection_id: string;
  symbol: string;
  day_trading_volume: string;
  thirty_day_trading_volume: string;
  daily_trading_volume: [string];
  last_update_time: number;
  __typename: string;
}

export interface CollectionAnalysisQuery {
  collection_id: number | string;
  limit: number;
  cursor: number;
  sort_type: CollectionAnalysisSortType;
  reversed: Boolean;
}

export enum CollectionAnalysisSortType {
  day_trading_volume = "day_trading_volume", //当天的交易量
  thirty_day_trading_volume = "thirty_day_trading_volume", //过去30天的交易量
  last_update_time = "last_update_time", //最后更新时间
}

