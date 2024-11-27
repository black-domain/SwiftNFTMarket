/** @format */

import { gql } from "@apollo/client";
import { packageObjectId } from "./request";
import { CollectionAnalysisQuery, CollectionQuery, ItemQuery, ItemTransactionQuery, RotationChart, UserTransactionQuery } from "./queryApi";

// export const GET_COLLECTION_ALL = gql`
//   query {
//     getCollection(collection_query: { name: "", collection_id: "", create_address: "", limit: 10, sort_type: floor_price, reversed: false, cursor: 0 }) {
//       collection_id
//       name
//       floor_price
//       logo_image
//       description
//       featured_image
//       total_volume
//       item
//       website
//       tw
//       discord
//       receiver
//       create_address
//       fee
//     }
//   }
// `;
// export const GET_CREATE_COLLECTION_ALL = (address: string) => gql`
//   query{
//     getCollection(collection_query:{name:"",collection_id:"",create_address:"${address}",limit:10,sort_type:floor_price,reversed:false,cursor:0}){
//         collection_id
//         type_
//         name
//         floor_price
//         logo_image
//         description
//         featured_image
//         total_volume
//         item
//         website
//         tw
//         discord
//         receiver
//         create_address
//         fee
//     }
// }
// `;

// export const GET_COLLECTION_ONE = (collection: string) => gql`
//   query{
//     getCollection(collection_query:{name:"",collection_id:"${collection}",create_address:"",limit:10,sort_type:floor_price,reversed:false,cursor:0}){
//         collection_id
//         name
//         floor_price
//         logo_image
//         description
//         featured_image
//         total_volume
//         item
//         website
//         tw
//         discord
//         receiver
//         create_address
//         fee
//         type_
//     }
// }
// `;
// export const GET_COLLECTION_IMAGE = (collection: string) => gql`
//   query{
//     getCollection(collection_query:{name:"",collection_id:"${collection}",create_address:"",limit:10,sort_type:floor_price,reversed:false,cursor:0}){
//         logo_image
//         featured_image
//         type_
//         item
//         floor_price

//     }
// }
// `;

// export const GET_ITEM_ENEVT = (item_id = "") => gql`
//     query{
//     getItemEvent(item:{type_:"${packageObjectId}::market::BuyEvent",item_id:"${item_id}",limit:10,cursor:0}){
//         sender
//         collection_id
//         item_id
//         listing_id
//         price
//         buyer
//         seller
//     }
// }
// `;
// interface ITEM_NFT {
//   collection_id: string;
//   seller: string;
//   limit: number;
//   sort_type: string;
//   reversed: boolean;
//   cursor: number;
//   item_id: string;
// }

// export const GET_ITEM_NFT = (data: any) => gql`
//     query{
//         getItem(item_query:${data}){
//             collection_id
//             item_id
//             seller
//             price
//             properties
//             on_sale
//             type_
//         }
// }
// `;
// export const GET_ITEM_NFT_AND_COLLECTION = (data: any, collection: string) => gql`
//     query{
//         getItem(item_query:${data}){
//             collection_id
//             item_id
//             seller
//             price
//             properties
//             on_sale
//             type_
//         }
//         getCollection(collection_query:{name:"",collection_id:"${collection}",create_address:"",limit:10,sort_type:floor_price,reversed:false,cursor:0}){
//         name
//         fee

//     }
// }
// `;

// 获取 collection 合集
export const GET_COLLECTION = (data: CollectionQuery) => gql`
  query{
    getCollection(collection_query: { collection_id: "${data.collection_id}",ft_type:"${data.ft_type}",nft_type:"${data.nft_type}",is_certification:${data.is_certification} , name: "${data.name}", owner: "${data.owner}",both_type:${data.both_type}, limit: ${data.limit}, cursor: ${data.cursor}, sort_type: ${data.sort_type}, reversed: ${data.reversed} ,type: [${data.type.map((t) => `"${t}"`)}] }){
      collection{
        collection_id
        name
        description
        logo_image
        featured_image
        fee
        owner
        total_volume
        item_count
        ft_type
        nft_type
        on_sale_count
        floor_price
        view_count
        favorite_count
        twitter
        telegram
        github
        website
        is_certification
        create_time
        last_update_time
      }
      total_collection 
    }
}
`;

// 获取 collection 分析记录
export const GET_COLLECTION_ANALYSIS = (data: CollectionAnalysisQuery) => gql`
  query{
    getCollectionAnalysis(collection_query: { collection_id: "${data.collection_id}", limit: ${data.limit}, cursor: ${data.cursor}, sort_type: ${data.sort_type}, reversed: ${data.reversed} }){
      collection_analysis{
        collection_id
        symbol
        day_trading_volume
        thirty_day_trading_volume
        daily_trading_volume
        last_update_time
    }
    total_collection
    }
  }
`;

// 获取 nft 信息
export const GET_ITEM = (data: ItemQuery) => gql`
  query {
    getItem(item_query: {
      collection_id:"${data.collection_id}",
      nft_type: "${data.nft_type}",
      ft_type:"${data.ft_type}",
      item_id:"${data.item_id}",
      limit: ${data.limit},
      cursor: ${data.cursor},
      on_sale: ${data.on_sale||0}, 
      operator: "${data.operator || ""}", 
      sort_type: ${data.sort_type}, 
      reversed: ${data.reversed}
    }) {
      item {
        collection_id
        item_id
        listing_id
        price
        on_sale
        nft_type
        ft_type
        listed_address
        likes
      }
      total_item
    }
  }
`;

// 获取NFT交易记录
// export const GET_ITEM_TRANSACTION = (data: ItemTransactionQuery) => gql`
//     query{
//       getItemTransaction(item_query: { collection_id: "${data.collection_id}", item_id: "${data.item_id}",  limit: ${data.limit}, cursor: ${data.cursor},reversed: ${data.reversed}, sort_type: ${data.sort_type} }){
//         item_transaction{
//           item_id
//           collection_id
//           seller
//           buyer
//           symbol_decimal
//           symbol
//           price
//           timestamp
//         }
//         total_item_transaction
//       }
//
//     }
// `;

// 获取用户交易记录
export const GET_USER_TRANSACTION = (data: UserTransactionQuery) => gql`
    query{
      getUserTransaction(user_query: { user_address: "${data.user_address}",item_id:"${data.item_id}", nft_type: "${data.nft_type}",  operation: [], limit: ${data.limit},cursor: ${data.cursor},reversed: ${data.reversed},sort_type: ${data.sort_type} }){
        transaction_entry{
              operation
              item_id
              user_address
              price
              from
              to
              ft_type
              nft_type
              timestamp
            }  
        total_transactions
        }
    }
`;

// 获取轮播图信息
export const GET_ROTATION_CHART = gql`
  query {
    getRotationChart{
      website
      name
      description
      start_time
      image_url
    }
  }
`;

export const GET_SLINGSHOT_DATA = (admin?: string,slingshot?:string) => gql`
query{
  getSlingshot(slingshot_query: { admin: "${admin}", slingshot_id: "${slingshot}",  live: 0, limit: 10,cursor:0,reversed:true, sort_type: slingshot_id }){
    total_slingshot
    slingshot{
        slingshot_id
        admin
        live
        market_fee
        sales
        create_time
        last_update_time
        metadata{
          name
        }
    }
  }
}
`;
