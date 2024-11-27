/** @format */

import * as React from "react";
import { useWallet } from "@suiet/wallet-kit";
import { userObjectApi } from "../../../utils/api";
import { useEffect, useState } from "react";
import { Input, OptionProps, Select } from "@web3uikit/core";
import { usePreview } from "../../../stores/useTheme";


/**
 * @tangs
 * 页面详情页信息
 * 显示版本相关内容或相关合作伙伴、相关联网页跳转标签等
 * */


// 定义框内数据  请求框内数据
interface DataType {
    // key: string;
    objectId: string
    type: string
    nftid: string
}


const SelectObj = (props: any) => {
    const { nftid } = props
    const { connected, address } = useWallet();
    const [userCollection, setUserCollection] = useState<DataType[]>([]);
    const has = usePreview((s: any) => s.has)
    const init = usePreview((s: any) => s.init)
    const [arr, setArr] = useState([])
    // useEffect(() => {
    //     (async function () {
    //         setUserCollection(await userObjectApi(address))
    //     })()

    // }, [connected])


    const res = userCollection && userCollection.map((t, i) => {
        return {
            id: t.objectId,
            label: t.objectId,
            type: userCollection[i].type
        }
    }) as OptionProps[]

    let handleRes = res.filter((t: any) => t.type !== "0x2::coin::Coin<0x2::sui::SUI>" && t)

    useEffect(() => {
        if (handleRes.length > 0) {
            if (init === "") {
                has(handleRes[0])
            }
        }
    })

    if (init !== "") {
        const a = handleRes.filter((t: any) => t.id === init.id && t)
        const b = handleRes.filter((t: any) => t.id !== init.id && t)
        handleRes = [...a, ...b]
    }

    return (
        <>
            <div className="Component NftObjectId" id="Fixed">
                <h2 style={{ margin: "15px 0" }}>Object Id</h2>
                <Input
                    style={{ height: "50px", border: "1px solid #c0c0c0", color: "#fff" }}
                    width='100%'
                    disabled={true}
                    labelBgColor={'background: "rgba(0,0,0,0.5)"'}
                    label={init.type && <p style={{ color: "lightblue", background: "rgba(0,0,0,0.5)" }}>😁 {init.type}</p>}
                    name="Test text Input"
                    onBlur={function noRefCheck() { }}
                    onChange={function noRefCheck() { }}
                    value={nftid}
                />
            </div>
        </>
    )

}
export default SelectObj;
