import { useWallet } from '@suiet/wallet-kit';
import {Avatar, Card, Illustration, Table, Tag } from '@web3uikit/core';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { handleMoneyUnit } from '../../../../utils/handleMoneyUnit';
import { getObjectList, requestCollectionsNFTList, requestMarket } from '../../../../utils/request';
import { AcronymWord } from '../../../../utils/AcronymWord';
import BasicRadarChart from './BasicRadarChart';
import './index.less'
import { MyShopCard } from '../../../../components/MyShopCard';
import Tooltip from '@mui/material/Tooltip';
import { client } from '../../../../utils/api';
import {GET_COLLECTION, GET_COLLECTION_ANALYSIS, GET_ITEM, GET_USER_TRANSACTION} from '../../../../utils/graphql';
import {
    CollectionAnalysis,
    CollectionAnalysisQuery,
    CollectionAnalysisReqResult,
    CollectionAnalysisSortType,
    CollectionSortType,
    ItemSortType
} from '../../../../utils/queryApi';
import { Box, Skeleton } from '@mui/material';
import { ImageLoading } from '../../../../components/ImageLoading'
import { ImageGrid } from '../../../../components/PictureGridList';
import { CopyButton } from '../../../../components/CopyButton';
import EllipsisMiddle from '../../../../components/EllipsisMiddle';
import copy from 'copy-to-clipboard';
import { useHandleNotify } from '../../../../hooks/useNotify';
import {useNavigate, useParams} from 'react-router-dom';
import Sidebar from '../Sidebar';
import {FtType} from "../../../../utils/ft.type";
import SvgMoreVert from '@web3uikit/icons/dist/lib/icons/MoreVert';
import DateUtil from "../../../../utils/formatData";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


const NFT_Illu = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    @media (max-width: 500px) {
        display: grid;
        gap: 1.25rem 0;
        grid-template-columns: 1fr 1fr;
    }
`
const NFT_IlluContext = styled.div`
    padding:0;
    border-radius:0.5rem;
    min-width:9.375rem;
`
const NftBadge = styled.button`
    padding: .9rem 1.5rem;
    border: .2rem solid #fff;
    border-radius: 95% 4% 97% 5% / 4% 94% 3% 95%;
    color: #999;
    background: none;
    cursor: pointer;
    margin-top: 1rem;
    font-size: 1.1rem;
    transition: all .2s linear;
    &:hover {
        border-radius: 4% 95% 6% 95% / 95% 4% 92% 5%;
        border: .2rem dashed #443;
    }
`
const ActivityTable = styled(Table)`
  div{
    border: none;
  }
   div:nth-child(1){
      border: none;
      background: rgba(0,0,0,0.2);
  }
   .gAZLDU{
    background: none;
  }
  .yXsHM{
    div{
      padding: 4px;
      border-radius: 8px;
    }
    .fOBrQW{
      background-color: #FFA631;
    }
  }
    
`
const InformationCard = (props: any) => {

    const { logo, bgImage, data, onSale, CollectionType, state, nftListData } = props
    const { name, description, receiver, twitter, website, discord } = state
    const [balance, setBalance] = useState(0)
    const [nftData, setnftData] = useState([] as any[])
    const [nftLoading, setnftLoading] = useState(false)
    const [collectionAnalysisData, setCollectionAnalysisData] = useState<CollectionAnalysisReqResult>({} as CollectionAnalysisReqResult)
    const [nftPrice, setNftPrice] = useState([] as any[])
    const [nftObjIdList, setNftObjIdList] = useState([] as any[])
    const { address } = useWallet()
    const [collectionData, setCollectionData] = useState<any>()
    const [coinDecimal,setCoinDecimal] = useState<any>(1)
    const { handleNewNotification } = useHandleNotify()
    const navigate = useNavigate()

    const [timeAgo,setTimeAgo] = useState()

    const { id: collectionId } = useParams();


    useEffect(() => {
        data.collection_id && requestMarket(collectionId).then((e: any) => setBalance((e.details as any).data.fields.balance.fields.balance))
    }, [data])


    useEffect(() => {
        setnftLoading(true)

        client.query({
            query: GET_ITEM({
                collection_id:collectionId,
                item_id: '',
                operator: "",
                limit: 10,
                cursor: 0,
                on_sale: 0,
                sort_type: ItemSortType.price,
                reversed: false,
                ft_type:"",
                nft_type:""
            })
        }).then(e=>
            getObjectList(e.data.getItem.item.map((t:any)=>t.item_id)).then(async (res) => {
                const nftDf = res.map((item: any, index: number) => {
                    item.data.content.fields.price = e.data.getItem.item[index].price
                    item.data.content.fields.listingId = e.data.getItem.item[index].listing_id
                    return item
                })
                setnftData(nftDf)
                setnftLoading(false)
        }).catch((err) => {
            setnftLoading(false)
        }))

    }, [state.objectId])

    useEffect(() => {
        client.query({
            query: GET_COLLECTION({
                collection_id: collectionId as string,
                name: "",
                owner: "",
                limit: 1,
                cursor: 0,
                sort_type: CollectionSortType.floor_price,
                reversed: true,
                type: [],
                both_type: false,
                ft_type: '',
                is_certification:0,
                nft_type:""
            })
        }).then((result) => {
            const d = result.data.getCollection.collection[0]
            setCollectionData(d)
        }).catch((err) => {
            console.error("request collectionAnalysis error: ", err)
        })

    }, [])

    const [activityData,setActivityData] = useState([])
    useEffect(()=>{
        const params: any = {
            nft_type: collectionData?.nft_type||"",
            user_address:"",
            item_id: "",
            limit: 10,
            cursor: 0,
            reversed: false,
            sort_type: "timestamp"
        }
        client.query({
            query: GET_USER_TRANSACTION(params)
        }).then(e => {setActivityData(e.data.getUserTransaction.transaction_entry)})
    },[collectionData])



    useEffect(()=>{
        (async function (){
            setCoinDecimal(await FtType(collectionData?.ft_type))
        })()

    },[collectionData])

    const collectionDetailsList = [
        { key: "Floor Price", value: (Number(collectionData?.floor_price) / Number(10 ** coinDecimal)).toFixed(2), tip: "", svg: "token" },
        { key: "On Sell", value: collectionData?.on_sale_count, tip: "", svg: "marketplace" },
        { key: "Total Volume", value: (Number(collectionData?.total_volume) / Number(10 ** coinDecimal)).toFixed(2), tip: "", svg: "pack" },
        { key: "Items", value: collectionData?.item_count, tip: "", svg: "looking" },
    ]
    if (address === data.create_address) {
        collectionDetailsList.push({ key: "Balance", value: handleMoneyUnit(balance).toString(), tip: "", svg: "chest" })
    }

    const ProductShowcase = (name: string, id: string) => {
        return <p onClick={() => {
            copy(id); handleNewNotification('success', `Successful Replication ${name}`, 'Success')
        }} className='cursorDiv' style={{ whiteSpace: 'nowrap', display: "flex", alignItems: "center" }}>{name}：
            <Box sx={{
                transition: "transform 0.4s ease-in-out",
                marginRight: "0.5rem",
                '&:hover': { transform: "translateX(1.4rem) scale(1.2)" }
            }}>
                <EllipsisMiddle disableHoverListener={true} suffixCount={18}>
                    {id}
                </EllipsisMiddle>
            </Box>
        </p>
    }
    console.log(nftData)

    const [showItemsOrActivity,setShowItemsOrActivity] = useState(1)
    const handleOperationColor =(tag?:string)=>{
        switch (true){
            case tag==="BUY":
                return "blue"
            case tag==="CREATE_COLLECTION":
                return "yellow"
            case tag==="DE_LIST":
                return "red"
            case tag==="LISTING":
                return "purple"
            case tag==="ADJUST_PRICE":
                return "green"
            default:
                return "pink"
        }
    }
    const handleOperationBGColor =(tag?:string)=>{
        switch (true){
            case tag==="BUY":
                return "#e1244f"
            case tag==="CREATE_COLLECTION":
                return "#fb85ad"
            case tag==="DE_LIST":
                return "#3b49ff"
            case tag==="LISTING":
                return "#2626b3"
            case tag==="ADJUST_PRICE":
                return "green"
            default:
                return "pink"
        }
    }
    const handleOperationText =(tag?:string)=> {
        switch (true) {
            case tag === "BUY":
                return "Buy"
            case tag === "CREATE_COLLECTION":
                return "Create"
            case tag === "DE_LIST":
                return "Delist"
            case tag === "LISTING":
                return "Listing"
            case tag === "ADJUST_PRICE":
                return "Adjust"
            default:
                return " "
        }
    }

    TimeAgo.addDefaultLocale(en)
    function isGreaterThanThreeDaysAgo(timestamp:number) {
        const now:number = Number(new Date());
        const pastDate = new Date(timestamp * 1);
        const timeDiffInMs:number = now - timestamp;
        const timeDiffInDays = timeDiffInMs / (1000 * 60 * 60 * 24);
        return timeDiffInDays > 3;
    }
// Create formatter (English).
    const timeAgo2 = new TimeAgo('en-US')

    return (
        <div>
            <div className='NFT-List-body'>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4rem" }}>
                    <div>
                        <div style={{ display: "flex", marginBottom: "1.25rem" }}>
                            <div style={{width:"40vw",height:"20vw",boxShadow:"0 0 10px #a8a8a8",position:"relative",borderRadius:10,backgroundImage:`url(${bgImage?bgImage:"/assets/default_featured_img.jpg"})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
                            <img className='NFT-List-head-img' style={{}} src={logo?logo:"/assets/default_logo_img.jpg"} alt="" />

                            </div>
                            <div className='NFT-List-head-card'>
                                <div>
                                    <h2 style={{ fontSize: "3rem",fontFamily:"Gasoek One", width: "35.9375rem",fontWeight:1200, overflow: "hidden",display:"flex",alignItems:"center" }}>
                                        {name}&nbsp;
                                        {state.is_certification&&<span><img style={{width:"2rem",height:"2rem"}} src="/assets/verify_office.svg" alt=""/></span>}
                                    </h2>

                                    <Tooltip title={description} placement="top">
                                        <h4 style={{fontSize:"1.1rem",  width: "35.9375rem",marginTop:10, color:"#f2f2f2", overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                             {description}
                                            {/*Help us keep running*/}
                                            {/*If you don't mind tech-related ads (no tracking or remarketing), and want to keep us running, please whitelist MUI in your blocker.*/}
                                            {/*picocolors. The tiniest and the fastest library for terminal output formatting with ANSI colors. import pc from "picocolors" console.log( pc.green(`How are ...*/}
                                            {/*Thank you! ❤️*/}
                                            
                                        </h4>
                                    </Tooltip>


                                   

                                    {/* <div className='NFT-List-head-card-cion' style={{ display: "flex" }}>
                                        {twitter && <a href={twitter} target='blank'> <img src='/assets/twitter.svg' ></img ></a>}
                                        {website && <a href={website} target='blank'><img style={{ padding: "0.125rem" }} src='/assets/github.svg' ></img ></a>}
                                        {discord && <a href={discord} target='blank'><img style={{ padding: "0.125rem 0" }} src='/assets/discord.svg' ></img ></a>}
                                        {state.objectId && <a href={"https://explorer.sui.io/object/" + state.objectId} target='blank'><img style={{ padding: "0.125rem" }} src='/assets/suilogo.svg' ></img ></a>}
                                    </div> */}
                                   
                                </div>

                                <NFT_Illu>
                                    <div className='NFT-List-head-card-cion' style={{ display: "flex" ,margin:"18px 0"}}>
                                        { <a href={twitter} target='blank'> <img src='/assets/twitter.svg' ></img ></a>}
                                        {<a href={website} target='blank'><img style={{ padding: "0.125rem" }} src='/assets/github.svg' ></img ></a>}
                                        {<a href={discord} target='blank'><img style={{ padding: "0.125rem 0" }} src='/assets/discord.svg' ></img ></a>}
                                        {<a href={"https://explorer.sui.io/object/" + state.objectId} target='blank'><img style={{ padding: "0.125rem" }} src='/assets/flavors.svg' ></img ></a>}
                                        {<a href={"https://explorer.sui.io/object/" + state.objectId} target='blank'><img style={{ padding: "0.125rem" }} src='/assets/suilogo.svg' ></img ></a>}

                                    </div>
                                    <div style={{display:"flex",flexDirection:"row"}}>

                                    {collectionDetailsList.map((t, i) => {
                                        return <NFT_IlluContext>
                                            {t.value || t.value === "" || t.value === 0 ?
                                                <Card
                                                    //@ts-ignore
                                                    style={{ whiteSpace: "nowrap", background: "rgba(0,0,0,0.2)", height: "5.875rem", width: "8.75rem", borderRadius: "0.5rem" }}
                                                    description={<div style={{ color: "#b6b6b6"}}>{t.key}</div>}
                                                    onClick={function noRefCheck() { }}
                                                    setIsSelected={function noRefCheck() { }}
                                                    title={<div style={{ color: "#ffffff",fontWeight:"bold", fontSize: "1.25rem" }}>{t.value}</div>}
                                                >
                                                </Card> :
                                                <Card
                                                    style={{ background: "#161919", height: "4.875rem",fontWeight:"bold", width: "8.75rem", borderRadius: "0.5rem" }}
                                                    description={<div style={{ color: "#b6b6b6",fontWeight:1200 }}>{t.key}</div>}
                                                    title={<Skeleton sx={{ bgcolor: "grey.900", margin: "auto" }} variant='text' width={36} height={24} />}>
                                                </Card>
                                            }

                                        </NFT_IlluContext>
                                    })}
                                    </div>

                                </NFT_Illu>
                            </div>
                        </div>
                       
                    </div>

                    {/* 图表 */}
                    {/* <div className='NFT-List-head-chart'>
                        <div className='NFT-List-head-chart-span'>
                            <span >
                                Comprehensive score:
                            </span>
                            <span>23.0</span>
                        </div>
                        <BasicRadarChart />
                    </div> */}

                </div>

            </div>
            <br/>
            <br/>


            <div style={{display:"flex"}}>
                <h2 className='NFT-List-h2' style={{border:showItemsOrActivity===1?"1px solid orange":"",color:showItemsOrActivity===1?"orange":"",borderRadius:8,padding:4,cursor:"pointer"}} onClick={()=>{setShowItemsOrActivity(1)}}>Items</h2>
                <h2 className='NFT-List-h2' style={{border:showItemsOrActivity===2?"1px solid orange":"",color:showItemsOrActivity===2?"orange":"",borderRadius:8,padding:4,cursor:"pointer"}} onClick={()=>{setShowItemsOrActivity(2)}}>Activity</h2>
            </div>
            {showItemsOrActivity===1?
            <div className='NFT-List collection-nft-1'>
                {!nftLoading ?
                    nftData.length > 0 ? nftData.map((t: any, i: number) => {
                        return <MyShopCard
                            CollectionType={t.data.content.type}
                            CollectionId={collectionId}
                            CollectionName={name}
                            nftListId={nftListData[i]}
                            nftObjId={t.data.objectId}
                            key={i}
                            data={t}
                        />
                    }) : 'No Data'

                    :
                    [0, 1, 2, 3, 4].map((item) => {
                        return <ImageLoading type='buy' height={"16rem"} key={item} />
                    })

                }
            </div>:<div>
                    <ActivityTable
                        columnsConfig=".5fr 1fr 2fr 2fr 1fr"
                        data={activityData?.map((t:any)=>{
                                return [
                                    <span style={{cursor:"pointer"}} onClick={()=>navigate(`/item-details/${nftData.filter(x=>x.data.content.fields.id.id===t.item_id&&x)[0]?.data.content.fields.listingId}/object/`+t.item_id)}><img style={{width:"3rem",borderRadius:8}} src={nftData.filter(x=>x.data.content.fields.id.id===t.item_id&&x)[0]?.data.display.data.image_url} alt=""/></span>,
                                    // @ts-ignore
                                    <Tag style={{background:handleOperationBGColor(t?.operation),marginTop:"4%",color:"white"}}  text={handleOperationText(t?.operation)}/>,
                                    <a href={"https://suiexplorer.com/address/"+t?.from} target="_blank"><span style={{color:"white",fontWeight:900}}><EllipsisMiddle suffixCount={12}>{t?.from}</EllipsisMiddle></span></a>,
                                    <a href={"https://suiexplorer.com/address/"+t?.to} target="_blank"><span style={{color:"white",fontWeight:900}}><EllipsisMiddle suffixCount={12}>{t?.to}</EllipsisMiddle></span></a>,
                                    <span style={{color:"white",fontWeight:900}}>{isGreaterThanThreeDaysAgo(t.timestamp)?DateUtil.formatDate((Number(t.timestamp) / 1000), "yyyy/MM/dd HH:mm:ss"):timeAgo2.format(Number(t.timestamp))}</span>,
                                ]
                            })
                        }
                        header={[
                            <span>NFT</span>,
                            <span>ACTION</span>,
                            <span>FROM</span>,
                            <span>TO</span>,
                            <span>TIME</span>,
                        ]}
                        isColumnSortable={[
                            false,
                            true,
                            true,
                            true,
                            true,
                        ]}
                        maxPages={10}
                        onPageNumberChanged={function noRefCheck(){}}
                        onRowClick={function noRefCheck(){}}
                        pageSize={10}
                    />
                </div>}

        </div>
    )

}


export default InformationCard

