import { useWallet } from "@suiet/wallet-kit";

import { SuiJsonValue } from "@mysten/sui.js";
import { marketID } from "../utils/request";
import { useHandleNotify } from "./useNotify";

export const useHandleBuyNft = () => {
    const { } = useWallet()
    const { handleNewNotification } = useHandleNotify()

    const buyNft = (itemData: any, money: any[]) => {

        // handle money
        let mo = 0
        const result = []
        money.sort((a, b) => b.price - a.price)
        for (let i = 0; i < money.length; i++) {
            if (mo > itemData.price) {
                break
            }
            if (mo < itemData.price) {
                mo += money[i].price;
                result.push(money[i].id)
            }
        }
        if (mo < itemData.price) {
            handleNewNotification('error', "MONEY NOT ENOUGH", "Error")
            return
        }
        const param = [marketID, itemData?.collection_id, itemData?.item_id, result] as SuiJsonValue[]
        // const p = requestBuyNFT(param, itemData.type_)


        // executeMoveCall(p).then((e:any)=>{
        // if (e.effects.status.status==="failure"){
        //     handleNewNotification('error',e.effects.status.error,"Error")
        // }else {
        //     handleNewNotification('success','Success Buy NFT','')
        // }
        // },(e)=>{
        //     console.log(e,'fail');
        //     handleNewNotification('error',e.effects.status.error,"Error")
        // })
    }
    return { buyNft }
}