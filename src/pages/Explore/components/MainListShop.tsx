import styled from "styled-components";
import { collectionListOnChain, requestMarket } from "../../../utils/request";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CollectionCard } from "../../../components/CollectionCard";
import { client } from "../../../utils/api";
import { ScrollTop } from "../../../utils/scrollTop";
import { useHandleNotify } from "../../../hooks/useNotify";
import { CollectionCardWrapper } from "../../../components/CollectionCardWrapper";


const Card = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div:last-child {
    margin-right: clac();
  }

`
const Wapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #14141f;
`


export const MainListShop = () => {
    const navigate = useNavigate()
    const data = useRef<any>([])
    const [list, setList] = useState<any>(1)
    const [idList, setIdList] = useState([] as string[])
    const [marketList, setMarketIdList] = useState<any>([])
    const { handleNewNotification } = useHandleNotify()
    const [visable, setVisable] = useState(false)
    const [MainListShopList, setMainListShopList] = useState([] as any)

    const { state } = useLocation() as any
    const nav = useNavigate()



    if (state && state.type && (state.type === "createCollection" || state.type === "listNFT" || state.type === "Search")) {
        // @ts-ignore
        // console.log('search', state.type);
        marketList.forEach((t: any) => t.collection_id === state.id && nav(`/collection/${state.id}`, { state: t }))

    } else{
        navigate("/")
    }


    function getId() {
        setVisable(true)
        requestMarket(collectionListOnChain)
            .then(async (e: any) => {
                setVisable(false)
                if (e) {
                    const idList = e.data.content.fields.collection.fields.contents as any[];
                    const arr: any = []

                    for (let i = 0; i < idList.length; i++) {
                        const result = await Promise.all([getMarket(idList[i].fields.value)])
                        arr[i] = result[0]
                        arr[i]['collection'] = idList[i]
                    }

                    const idData = [] as any
                    const mydata = [] as any

                    arr.forEach((item: any) => { // 链上获取数据 使用
                        idData.push(item.data.content.fields.id.id)
                        mydata.push({
                            collection_id: item.collection,
                            create_address: item.data.content.fields.receiver,
                            description: item.data.content.fields.description,
                            discord: item.data.content.fields.discord,
                            featured_image: item.data.content.fields.featured_image,
                            fee: item.data.content.fields.fee,
                            floor_price: 2,
                            item: idData,
                            logo_image: item.data.content.fields.logo_image,
                            name: item.data.content.fields.name,
                            receiver: item.data.content.fields.receiver,
                            total_volume: 2,
                            tw: item.data.content.fields.twitter,
                            website: item.data.content.fields.website,
                            __typename: 'Collection' // 暂时没用,摆上
                        })
                    })

                    setMainListShopList(mydata)

                } else {
                    throw new Error('Failed Response')
                }
            }).catch((error) => {
                setVisable(false)
            })
    }

    async function getMarket(id: string) {
        let res = await requestMarket(id)
        // if (res.status != "Exists") {
        //     return null
        // }
        return res
    }

    const onClick = (x: any) => {
        navigate(`/collection/${x.data.fields.id.id}`, { state: x })
    }
    useEffect(() => {
        getId()
    }, [])


    return (
        <>
            <Wapper>
                <CollectionCardWrapper>
                    {!visable ? MainListShopList.map((t: any, i: number) => {
                        return <span key={i}><CollectionCard width={600} height={300} data={t} /></span>
                    }) : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((t: any, i: number) => {
                        return <span key={i}><CollectionCard width={600} height={300} data={t} toggle /></span>
                    })}
                </CollectionCardWrapper>
            </Wapper>
        </>
    )
}