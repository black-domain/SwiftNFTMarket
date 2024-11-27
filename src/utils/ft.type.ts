import {requestGetCoinMetaData} from "./request";

export const FtType=async (coinType:string)=>{
    if (coinType==="0000000000000000000000000000000000000000000000000000000000000002::sui::SUI"){
        return 9
    }
    return await requestGetCoinMetaData(coinType)
}