/** @format */

import {
  JsonRpcProvider,
  MoveCallTransaction,
  SuiJsonValue,
  devnetConnection,
  Ed25519Keypair,
  RawSigner,
  testnetConnection,
  TransactionBlock,
  Connection,
} from "@mysten/sui.js";

import { NFTStorage } from "nft.storage";

export const LinkSuiWallet = () => {
  if (window.suiWallet) {
    return window.suiWallet;
  } else {
    alert("Please Download SUI Wallet Plugin");
    window.location.replace("https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil");
  }
};
export const LinkSuietWallet = () => {
  if (window.suietWallet) {
    return window.suietWallet;
  } else {
    alert("Please Download SUI Wallet Plugin");
    window.location.replace("https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil");
  }
};
const mainNet = new Connection({fullnode:"https://mainnet.sui.wav3.net/"});

export const requestProvider = ():JsonRpcProvider => {
  // if(window.sessionStorage.getItem("net")==="testnet"){
  // return new JsonRpcProvider(testnetConnection);
  // }else if(window.sessionStorage.getItem("net")==="mainnet"){
  //   return new JsonRpcProvider(mainNet);
  // }
  return new JsonRpcProvider(testnetConnection);
};

export const requestMarket = async (collection?: string) => {
  if (collection) {
    return await requestProvider().getObject({
      id: collection,
      // fetch the object content field and display
      options: {
        showContent: true,
        showDisplay: true,
        showType: true,
        showBcs: true,
        showOwner: true,
        showPreviousTransaction:true,
        showStorageRebate: true,
      },
    });
  } else {
    return await requestProvider().getObject({
      id: marketID,
      // fetch the object content field and display
      options: {
        showContent: true,
        showDisplay: true,
      },
    });
  }
};

/*
showContent： 如果设置为 true，则返回对象的内容。
showDisplay：如果设置为 true，则返回对象的显示名称。
showType：如果设置为 true，则返回对象类型。
showBcs：如果设置为 true，则返回区块链公共存储中某一账户对该对象进行的交易的哈希值字符串。
showOwner：如果设置为 true，则返回对象所有者的地址或密钥标识符。
showPreviousTransaction：如果设置为 true，则返回上一笔交易的哈希值字符串。
showStorageRebate：如果设置为 true，则返回存储折扣。
*/

export const getObjectList = async (ids: string[]) => {
  return await requestProvider().multiGetObjects({
    ids,
    options: {
      showContent: true,
      showDisplay: true,
    },
  });
};
export const getDynamicFields = async (ids: string) => {
  return await requestProvider().getDynamicFields({parentId:ids});
};
export const getGasPrice = async () => {
  //  返回地址拥有的所有 Coin 对象。
  return Number(await requestProvider().getReferenceGasPrice())/1e9
};
export const requestUserObject = async (id: string) => {
  //  返回地址拥有的所有 Coin 对象。
  return await requestProvider().getAllCoins({ owner: id });
};
export const requestUserBalance = async (id: string) => {
  // 返回地址所有者拥有的一种硬币类型的硬币总余额。
  return await requestProvider().getBalance({ owner: id });
};
export const requestGetCoinMetaData=async (coinType:string)=>{
  return await requestProvider().getCoinMetadata({coinType})
}
export const requestUserAllObject = async (owner: string,cursor?:string) => {
  // 返回一个地址所拥有的对象的列表。
  return await requestProvider().getOwnedObjects({ owner:owner,options:{"showType":true,"showDisplay":true,"showContent":true,"showOwner":true},cursor}); 
};
export const requestCollectionsNFTList = async (collection: string) => {
  return await requestProvider().getDynamicFields({ parentId: collection });
};
//获取交易 从事务摘要中获取事务详细信息：
export const getTransactionBlockApi = async (digest: string) => {
  const tx = await requestProvider().getTransactionBlock({
    digest,
    // only fetch the effects field
    options: { showEffects: true },
  });
  return tx;
};

export const packageObjectId = "0x18937c03721dc5c511662a07da923f371d7917639bec7c5833ef1e405aa41358";

export const marketID = "0x39bcf96316a2766eebb86e32b618582c623ddf3d0cb0a5dcac23aac1c9f41065"; 

export const launchpadAdminCap = "0xcd6accb7f8472291327ad8143ff3afc0f7ec6bfb44f8c30a50dc6bcc76e9ef9d";

export const adminPermission = "0xb46d1e0d05a755bddce14354050d97c2a3a322dcd34d637d46c5b39dbb825b72";

export const RoyaltyCollection = "0x281cdaebdfc7239c917303e3652cb3424abf51e2c3cf67a06b9a0055341c8d6d";

export const collectionListOnChain = "0xbd20244ad020f951906cb7af23c9fd68d1568d92c61bdcd0ad164ac0594f2573";

export const LaunchpadListActivityList = "0xeff232d09a79326804cec9e8038f1d46f77ac7de0f0462e5eaf080b57bcad15d";

export const nftStorageToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJjMmY2Y0Q5M0I5OGFjRThjODI1YjMyOTZENWQwNjBkMmM5NTJkRkIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NjI0ODMyNjQ3NiwibmFtZSI6Im5mdCJ9.N_sziKxQQffH4pjPl36J_AkJEKPwgPOCT9vhPtbLpJc";

export const endpoint = "https://api.nft.storage";

// @ts-ignore
export const storage = new NFTStorage({ endpoint, token: nftStorageToken });

