import { Card, CopyButton, Illustration } from "@web3uikit/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AcronymWord } from "../../../utils/AcronymWord";
import { requestMarket } from "../../../utils/request";
import { handleMoneyUnit } from "../../../utils/handleMoneyUnit";
import { useWallet } from "@suiet/wallet-kit";

const Views = styled.h2`
  font-size: 1.25rem;
  background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: maskedAnimation 3s infinite linear;
  background-size: 200% 100%;
  @keyframes maskedAnimation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
 `
const NFT_Back1 = styled.div`
    width:100%;
    height:100%;
    background-size: cover;
    img {
        width:100%;
        position:fixed;
        z-index:-10;
    }
    div {
        width:100%;
        height:100%;
        top:0;
        position:fixed;
        background:rgba(0,0,0,0.5);
        z-index:-1;
    }
`
const NFT_Card = styled.div`
    width:30%;
    display:flex;
    margin-top:6.25rem;
    padding-top:1.25rem;
    > div {
        width:40%;
        display:flex;
        > img {
            box-shadow:0 0 0.9375rem -1px white;
            width:12.5rem;
            height:12.5rem;
            object-fit:cover;
            border-radius:0.75rem;
            margin:1% 0.625rem 0 50%;
            aspect-ratio:1/1;
        }
        > div {
            margin:1% 0 0 0.625rem;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            white-space:nowrap;
            height:12.5rem;
        }
    }
`
const NFT_Iamge = styled.div`
    display:flex;
    justify-content: start;
    align-items: center;
    .first{
        width: 2.1875rem;
        margin: 0.4375rem;
        cursor: pointer;
    }
    .second{
        width: 2.1875rem;
        margin: 0.625rem ;
        cursor: pointer;                                                
    }
    .three{
        width: 1.875rem;
        margin: 0.625rem ;
        cursor: pointer;                                                
    }
  .fourth{
    width: 2.25rem;
    margin: 0.625rem ;
    cursor: pointer;
  }
`
const NFT_Illu = styled.div`
    display:flex;
    flex-direction:row;
    margin:0.625rem 4% 3.125rem 6%;
    @media (max-width: 500px) {
        display: grid;
        gap: 1.25rem 0;
        grid-template-columns: 1fr 1fr;
    }
`
const NFT_IlluContext = styled.div`
    margin:0.5rem 0.75rem 0 0;
    padding:0;
    border-radius:0.5rem;
    min-width:9.375rem;
`
export const ExhibitCard = (props: any) => {
    const { logo, bgImage, data, onSale, CollectionType } = props
    const [balance, setBalance] = useState(0)
    const { address } = useWallet()

    const collectionDetailsList = [
        { key: "FLOOR PRICE", value: (handleMoneyUnit(data.floor_price)).toString(), tip: "", svg: "token" },
        { key: "ON SELL", value: (onSale).toString(), tip: "", svg: "marketplace" },
        { key: "TOTAL VOLUME", value: (handleMoneyUnit(data?.total_volume)).toString(), tip: "", svg: "pack" },
        { key: "ITEMS", value: data?.item?.length ?? 0, tip: "", svg: "looking" },
    ]

    if (address === data.create_address) {
        collectionDetailsList.push({ key: "Balance", value: handleMoneyUnit(balance).toString(), tip: "", svg: "chest" })
    }
    useEffect(() => {
        // data.collection_id && requestMarket(data.collection_id).then(e => setBalance((e.details as any).data.fields.balance.fields.balance))
    }, [data])


    return (
        <div style={{ width: "100vw" }}>
            {/**@Background*/}
            <NFT_Back1>
                <img src={`https://${bgImage?.substring(7)}.ipfs.nftstorage.link`} alt="" />
                <div />
            </NFT_Back1>



            {/** @CardContent*/}
            <div style={{ minHeight: "35vh" }}>
                <NFT_Card>
                    <div>

                        <img src={`https://${logo && logo?.substring(7)}.ipfs.nftstorage.link`} style={{ boxShadow: "0 0 0.9375rem -1px white", width: "12.5rem", height: "12.5rem", objectFit: "cover", borderRadius: "0.75rem", margin: "1% 0.625rem 0 50%", aspectRatio: "1/1" }} alt="" />

                        <div>
                            <h1>{data?.name}</h1>
                            <Views>{data.description}</Views>

                            <p>Type：<span style={{ color: "#ccc" }}>{CollectionType ? CollectionType.slice(CollectionType.indexOf('<') + 1, CollectionType.indexOf(">")) : "wait ..."}</span>
                                <CopyButton
                                    text={CollectionType}
                                    revertIn={65200}
                                    onCopy={() => { }}
                                />
                            </p>
                            <p>Collection ID：<span style={{ color: "#ccc" }}>{AcronymWord(data.collection_id, 7)}</span>


                                <CopyButton
                                    text={data.collection_id}
                                    revertIn={65200}
                                    onCopy={() => { }}
                                />
                            </p>
                            <p>Created by：
                                <span style={{ color: "#ccc" }}>{AcronymWord(data.create_address, 7)}
                                    <CopyButton
                                        text={data.create_address}
                                        revertIn={65200}
                                        onCopy={() => { }}
                                    /></span></p>


                            <NFT_Iamge>
                                {data.tw && <a href={data.tw}><img className="first" src="/assets/twitter.svg" alt="" /></a>}
                                {data.discord && <a href={data.discord}><img className="second" src="/assets/discord.svg" alt="" /></a>}
                                {data.website && <a href={data.website}><img className="three" src="/assets/website1.svg" alt="" /></a>}
                                <a href={`https://explorer.sui.io/object/${data.collection_id}`}><img className="fourth" src="/assets/sui.svg" alt="" /></a>
                            </NFT_Iamge>
                        </div>
                    </div>
                </NFT_Card>

                <NFT_Illu>
                    {collectionDetailsList.map((t, i) => {
                        // @ts-ignore
                        return <NFT_IlluContext>
                            <Card
                                description={t.value}
                                onClick={function noRefCheck() { }}
                                setIsSelected={function noRefCheck() { }}
                                title={t.key}
                                tooltipText={t.key}
                            >
                                <div>
                                    {/*@ts-ignore*/}
                                    <Illustration height="3.125rem" logo={t.svg} width="100%"
                                    />

                                </div>
                            </Card>
                        </NFT_IlluContext>
                    })}
                </NFT_Illu>


                {/*<div style={{margin:"-4% 0 0 4%"}}>*/}
                {/*    <h4 style={{color:"grey",margin:"5px 0",fontWeight:500}}>Be fully aware of NFT Marketplace conditions from here</h4>*/}
                {/*    <h4 style={{color:"grey",margin:"5px 0",fontWeight:500}}>Providing more efficient and funny NFT dealing experience</h4>*/}
                {/*    <h4 style={{color:"white",margin:"5px 0"}}>Perfect combination of NFT and Defi Fragment Borrowing and Others</h4>*/}
                {/*</div>*/}
            </div>



        </div>
    )
}