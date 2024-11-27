/*
 * @Author: qiancheng12 wancheng@storswift.com
 * @Date: 2023-02-20 11:42:56
 * @LastEditors: qiancheng12 wancheng@storswift.com
 * @LastEditTime: 2023-04-23 17:25:06
 * @FilePath: \Nft\nft-trading-website\src\hooks\useGetMoney.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { useWallet } from "@suiet/wallet-kit";
import { useEffect, useState } from "react";
import { requestUserBalance } from "../utils/request";

export const useGetMoney = () => {
    const { address, connected } = useWallet()

    const [money, setMoney] = useState<any>()
    // useEffect(() => {
    //     address && requestUserBalance(address).then(e => setMoney(e.map(t => {
    //         return {price: (t.details as any).data.fields.balance, id: (t.details as any).data.fields.id.id}
    //     })))
    // }, [connected])
    return { money }

}
