/** @format */

import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import Button from '@mui/material/Button';
import { useWallet } from "@suiet/wallet-kit";
import { client } from "../../utils/api";
import './index.less'
import { TransactionBlock } from "@mysten/sui.js";
import { SimpleAccordion } from "../../components/Accordion";
import { useHandleNotify } from "../../hooks/useNotify";
import { NFT_Button } from "../../components/NFT_Button";
import { useGetMoney } from "../../hooks/useGetMoney";
import { useHandleBuyNft } from "../../hooks/useBuyNft";
import { Card, Input, Modal } from "@web3uikit/core";
import ActiveDetails from "./ActiveDetails";
import { MyShopCard } from "../../components/MyShopCard";
import { ImageGrid, ImageItem } from "../../components/PictureGridList";
import { Box, Stack, } from "@mui/material";
import { RoyaltyCollection, getObjectList, marketID, packageObjectId, requestCollectionsNFTList, requestMarket } from "../../utils/request";
import {GET_USER_TRANSACTION} from "../../utils/graphql";
import EllipsisMiddle from "../../components/EllipsisMiddle";
import ReactDOM from "react-dom";
import { Skeleton } from "@mui/material";
import { LoadingInComponents } from "../../components/LoadingDialog";
import { NoData } from "../../components/NoData";
import { AcronymWord } from "../../utils/AcronymWord";
import { Tooltip } from "@arco-design/web-react";
import copy from "copy-to-clipboard";
import CssHoverEffect from "../../components/CssHoverEffect";
import Borders from "../../components/CssHoverEffect/Borders";

/**
 * @tangs
 * 页面详情页信息
 * 显示版本相关内容或相关合作伙伴、相关联网页跳转标签等
 * */

/**
 * styled component 样式
 * 头部背景 BG
 * 内框样式 Ocreated
 */


const NftName = styled.p`
  width: 100%;
  height: 3.125rem;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
    overflow: hidden;

> span {
  font-size: 1rem;
  letter-spacing: 1px;
  transition: top 0.5s;
}

.btn-text-one {
  position: absolute;
  width: 100%;
  font-size: 1.125rem;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.btn-text-two {
  position: absolute;
  width: 100%;
  font-size: 1rem;
  top: 150%;
  left: 0;
  transform: translateY(-60%);
}

&:hover .btn-text-one {
  top: -100%;
}

&:hover .btn-text-two {
  top: 60%;
}

`

const NFT_A = styled.a`
	transition: all 300ms;
	margin: 0.75rem;
	font-size: 1.25rem;
    font-weight: 600;
    transition: all 300ms;
		background: linear-gradient(
			96deg,
			rgba(243, 110, 236, 1) 0%,
			rgba(207, 126, 236, 1) 53%,
			rgba(211, 210, 224, 1) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: hue 3s linear infinite;
	&:hover {
        transition: all 300ms;
        animation-play-state: paused;
	}
	@keyframes hue {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(360deg);
		}
	}
`;


interface ITEMLIST {
    __typename: string
    collection_id: string
    item_id: string
    seller: string
    price: number
    on_sale: boolean
    properties: any
    type_: string
}

const Index = () => {
    const { state } = useLocation() as any
    const navigator = useNavigate()

    const { address, connected, signAndExecuteTransactionBlock } = useWallet()
    const { handleNewNotification } = useHandleNotify()
    const [itemList, setItemList] = useState<any>()
    const [isItemLoading, setItemLoading] = useState(false)
    const [sellerId, setSellerId] = useState()
    const { objectId: nftId,listingId } = useParams()

    const [nftImgInfo, setNftImgInfo] = useState<any>({
        image_url: "",
        name: "",
        nftData: {},
        isLoading: true
    })

    const [txnData, setTxnData] = useState({ data: [] as object[], isLoading: false })

    const [nftPrice,setNftPrice]=useState<any>(null)
    const [itemData, setItemData] = useState<ITEMLIST>({
        on_sale: false,
        __typename: "",
        collection_id: "",
        item_id: "",
        price: 0,
        properties: {},
        seller: "",
        type_: ""
    })

    function fetchItemTxn() {
        const params: any = {
            nft_type: "",
            user_address:"",
            item_id: nftId || "",
            limit: 10,
            cursor: 0,
            reversed: true,
            sort_type: "timestamp"
        }
        setItemLoading(true)
        client.query({
            query: GET_USER_TRANSACTION(params)
        }).then((result) => {
            setItemLoading(false)
            setItemList(result.data.getUserTransaction.transaction_entry)
        }).catch((err) => {
            console.log(err, "error");
            setItemLoading(false)
        })
    }
    const getNftData = async () => {
        const _id = nftId as string
        try {
            const res = (await getObjectList([_id])) as any
            setNftImgInfo({
                image_url: res[0].data?.display?.data.image_url,
                name: res[0].data?.display?.data.name || "",
                nftData: res[0].data,
                isLoading: false
            })
        } catch (error) {
            setNftImgInfo({
                ...nftImgInfo,
                isLoading: false,
            })
        }
    }
    useEffect(() => {
        getNftData()
        fetchItemTxn()
        if (!state) {
            // navigator('/')
            requestMarket(listingId).then(e=>setNftPrice((e as any)))

        }
        if (!connected) {
            (document.querySelector('#connectWalletButton') as any)?.click()
        }

        if (state?.CollectionId) {
        }
        nftId && getObjectList([state?.nftListId?.objectId]).then((e: any) => setSellerId(e[0]?.data?.content?.fields.seller))

    }, [])

    const collectionDetailsList = nftImgInfo?.nftData?.content && Object.keys(nftImgInfo?.nftData?.content?.fields).map(t => {
        return { key: t, value: nftImgInfo?.nftData?.content?.fields[t], tip: "", svg: "looking" }
    })
    console.log(collectionDetailsList)

    const onClickBuyNFT = async () => {

        const tx = new TransactionBlock() as any;

        const [coin] = tx.splitCoins(tx.gas, [tx.pure(state?.price??nftPrice?.data?.content?.fields.price)]);

        const arr = [
            marketID,
            RoyaltyCollection,
            nftId,
            coin,
            address,
        ]
        tx.moveCall({
            target: `${packageObjectId}::market::buy_and_take_script`,
            typeArguments: [nftImgInfo?.nftData?.content.type,"0x2::sui::SUI"],
            arguments: arr.map((item: any, i: number) => i === 3 ? item : tx.pure(item))
        })

        tx.transferObjects([coin], tx.pure(address))
        console.log(tx);

        signAndExecuteTransactionBlock({
            transactionBlock: tx, options: {
                showInput: true,
                showEffects: true,
                showEvents: true,
                showObjectChanges: true,
                showBalanceChanges: true
            }
        }).then((res) => {
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Execute', 'Success')

        }).catch((err) => {
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })

    }

    const handleTakeOffNFT = async () => {
        const tx = new TransactionBlock() as any;
        const arr = [
            marketID,
            nftId
        ]

        tx.moveCall({
            target: `${packageObjectId}::market::delist_take`,
            typeArguments: [nftImgInfo?.nftData?.content.type,"0x2::sui::SUI"],
            arguments: arr.map((item: any) => tx.pure(item))
        })


        signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })

    }
    const handleAdjust = async () => {
        const tx = new TransactionBlock() as any;
        console.log(tx)
        const arr = [
            marketID,
            nftId,
            Number(changeAdjustValue)*1e9
        ]

        tx.moveCall({
            target: `${packageObjectId}::market::adjust_price`,
            typeArguments: [nftImgInfo?.nftData?.content.type, "0x2::sui::SUI"],
            arguments: arr.map((item: any) => tx.pure(item))
        })


        signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
            console.log(res, 'success transaction');
            setIsAdjustPriceVisible(false)
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')
            setTimeout(() => {
                window.location.reload()
            },3000)
        }).catch((err) => {
            console.log(err, 'fail transaction');
            setIsAdjustPriceVisible(false)
            handleNewNotification('error', `${err}`, "Error");
        })

    }
    const onClickMakeOffer = async () => {
        const tx = new TransactionBlock() as any;
        const [coin] = tx.splitCoins(tx.gas, [tx.pure(Number(changeOfferValue)*1e9)]);

        tx.moveCall({
            target: `${packageObjectId}::bid::new_bid`,
            typeArguments: ["0x2::sui::SUI"],
            arguments: [
                tx.pure(nftId),
                coin
            ]
        })


        signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
            console.log(res, 'success transaction');
            setTimeout(() => {
                window.location.reload()
            },3000)
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })

    }

    const localImage = 'https://i.seadn.io/gae/fevOWJMFf3Kv-knvsWvS76GADLxt9O6Hkdex17vh03d9zLGQ-8SfVLEcl5CDRb58i4AMh-a3kpOe-YMSzzcqZDGjbJZR_9mZkjDBgg?auto=format&w=1000'

    const [popoverOpen, setPopoverOpen] = useState(1);

    const PopoverContent = ({ popoverId, data }: any) => {
        const a = document.querySelector("#popover" + popoverId)
        const r: any = a && a.getBoundingClientRect()

        return ReactDOM.createPortal(<>
            {r && <div style={{ position: "fixed", display: popoverOpen === popoverId ? "block" : "none", top: r?.y - 50, left: r?.left, background: "#151919", border: "1px solid #333", borderRadius: 12, padding: 12 }}>{data}</div>}
        </>, document.querySelector('#root') as any)
    }

    const [isMakeOfferVisible, setIsMakeOfferVisible] = useState(false)
    const [isAdjustPriceVisible, setIsAdjustPriceVisible] = useState(false)
    const [changeOfferValue, setChangeOfferValue] = useState("")
    const [changeAdjustValue, setChangeAdjustValue] = useState("")
    const handleAdjustPrice=()=>{
        setIsAdjustPriceVisible(true)
    }
    return (
        <>
            <div style={{  width: "100vw",position:"fixed",top:0,left:0,height:"100vh",zIndex:-2, justifyContent: "center",backgroundImage:`url(${"/assets/default_featured_img.jpg"})`,backgroundPosition:"center",backgroundSize:"cover",filter:"blur(5px)",backgroundRepeat:"no-repeat" }} />
            <div style={{  width: "100vw",position:"fixed",top:0,left:0,height:"100%",zIndex:-1, justifyContent: "center",background:"rgba(0,0,0,0.7)" }} />

            {/* <BG /> */}
            <div className="ItemDetails detailsImg">
            
                <Stack direction={"column"} sx={{ mr: 4 }}>
                    {nftImgInfo.isLoading ?
                        <Box sx={{ width: "31.875rem", height: "31.1875rem", mb: 4, }}>
                            <Skeleton sx={{ bgcolor: "grey.800", height: "31.1875rem", borderRadius: "1rem" }}
                                variant="rectangular"
                                width={"31.875rem"}
                                height={"31.1875rem"}
                            />
                        </Box>
                        :
                        <ImageItem
                            sx={{ mb: 4 }}
                            imagePath={nftImgInfo.image_url}

                            noItembar>
                        </ImageItem>
                    }

                    <Box className='boxDiv' sx={{ mb: 1 }}>
                        <SimpleAccordion title={"NFT Type"} card={[nftImgInfo?.nftData?.content?.type ? nftImgInfo.nftData.content.type : ""]} />
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <SimpleAccordion title={"Description"} card={[nftImgInfo.nftData?.display?.data?.description]} />
                    </Box>
                    <Box  className='box-div-2'>
                        <SimpleAccordion title={"Display"} card={[""]} Div={
                            <Box width={"100%"} marginBottom={0}>
                                <ImageGrid columnGap={8} cols={3} sx={{ maxHeight: "10.5rem" }}>
                                    {collectionDetailsList?.map((t: any, i: number) => {
                                        return !(t.value instanceof Object) ? <Card

                                            style={{ background: "#161919", height: "4.875rem", borderRadius: "0.5rem" }}
                                            description={<div style={{ color: "#b6b6b6" }}>{t?.key}</div>}
                                            onClick={function noRefCheck() { }}
                                            setIsSelected={function noRefCheck() { }}
                                            title={<div style={{ color: "#ffffff" }}>
                                                <PopoverContent popoverId={i} />
                                                <Tooltip content={t.value}>
                                                    {t.value.length > 8 ? AcronymWord(t.value, 8) : t.value}
                                                </Tooltip>
                                            </div>}
                                        >
                                        </Card> :
                                            t.value.type === "0x2::vec_map::VecMap<0x1::string::String, 0x1::string::String>" && t.value?.fields?.contents?.map((t: any) => <Card
                                                style={{ background: "#161919", height: "4.875rem", borderRadius: "0.5rem" }}
                                                description={<div style={{ color: "#b6b6b6" }}>{t?.fields?.key}</div>}
                                                onClick={function noRefCheck() { }}
                                                setIsSelected={function noRefCheck() { }}
                                                title={<div style={{ color: "#ffffff" }}>
                                                    <PopoverContent popoverId={i} />
                                                    <EllipsisMiddle suffixCount={3}>{t?.fields?.value}</EllipsisMiddle>
                                                </div>}
                                            >
                                            </Card>)
                                    })}
                                </ImageGrid>
                            </Box>
                        } />
                    </Box>



                </Stack>
                <Stack className="Akuch" style={{ width: "100%" }}>
                    <div >
                        <div style={{ display: "flex", borderRadius: 0, position: "relative", justifyContent: "space-between", alignItems: "center" }}>
                            <NftName>
                                <span className="btn-text-one">{state?.CollectionName}</span>
                                <span onClick={() => { copy(state?.CollectionId); handleNewNotification('success', 'Copy CollectionId', 'Success') }} className="btn-text-two">{state?.CollectionId}</span>
                            </NftName>
                            <NFT_A href={"https://explorer.sui.io/object/" + nftId} target="blank"><div style={{ cursor: 'pointer', whiteSpace: "nowrap" }}>View SuiExplorer <img style={{ width: "0.5rem", height: "0.5rem" }} src="/assets/xiangyou.svg" alt="" /></div></NFT_A>
                        </div>
                    </div>


                    <div style={{ fontSize: "3rem", marginBottom: "0.875rem" }}>

                        <CssHoverEffect NFT_A={NFT_A} text={nftImgInfo.name || "--"} />
                    </div>

                    <div style={{ marginBottom: "0.8175rem", color: "white", background: "rgb(23, 24, 26)", height: "12.5rem", borderRadius: '1rem', paddingTop: "1.5rem", paddingLeft: "2rem" }}>
                        <p style={{ fontSize: "1rem", marginBottom: "0.875rem" }}>Current Price</p>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                            <img src="/assets/suipng.png" style={{width:"2rem",height:"2rem"}} alt=""/><div style={{ fontSize: "2rem", marginRight: "1.375rem" }}>&nbsp;{nftPrice?nftPrice?.data?.content?.fields.price/1e9 : state?.price / 1e9} </div>
                            {/* <div style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.7)", }}>
                                <p>2% Creator Fee</p>
                                <p>1.5% Market Fee</p>
                            </div> */}
                        </div>
                        {connected ? sellerId !== address
                            ?
                            <>
                            <Button
                                    sx={{
                                        fontSize: "1.5rem",
                                        fontWeight:"bold",
                                        bgcolor: "rgb(255, 163, 97)",
                                        color: "rgb(0, 0, 0)",
                                        width: '14.1875',
                                        height: '3rem',
                                        borderRadius: '1rem',
                                        '&:hover': { bgcolor: "rgb(235, 163, 97)" }
                                    }}
                                    variant="contained" onClick={onClickBuyNFT}
                                    disableRipple>Buy Now</Button>
                                <Button
                                sx={{
                                    fontSize: "1.5rem",
                                    fontWeight:"bold",
                                    bgcolor: "rgb(255, 163, 97)",
                                    color: "rgb(0, 0, 0)",
                                    width: '17.1875',
                                    height: '3rem',
                                    marginLeft:1,
                                    borderRadius: '1rem',
                                    '&:hover': { bgcolor: "rgb(235, 163, 97)" }
                                }}
                                variant="contained" onClick={()=>setIsMakeOfferVisible(true)}
                                disableRipple>Make Offer</Button>
                            </>

                            :
                            // <Button
                            //     sx={{
                            //         fontSize: "2.5rem",
                            //         bgcolor: "rgb(215, 263, 227)",
                            //         color: "rgb(0, 0, 0)",
                            //         width: '17.1875',
                            //         height: '5rem',
                            //         borderRadius: '1rem',
                            //         '&:hover': { bgcolor: "rgb(235, 163, 97)" }
                            //     }}
                            //     variant="contained"
                            //     onClick={takeOffNFT}
                            //     disableRipple>Take OFF</Button>
                            <div style={{display:"flex"}}>
                            <Borders handleEvent={handleTakeOffNFT} text={"Delist"}/>&nbsp;
                            <Borders handleEvent={handleAdjustPrice}  text={"Adjust"}/>
                            </div>
                            :null
                                
                        }
                    </div>
                    {itemData && <ActiveDetails isLoading={isItemLoading} data={itemList} />}
                </Stack>
            </div >


        {/*@ts-ignore*/}
            <Modal  style={{paddingTop:"200px"}}
                id="width"
                isVisible={isMakeOfferVisible}
                onCancel={function noRefCheck(){setIsMakeOfferVisible(false)}}
                onCloseButtonPressed={function noRefCheck(){setIsMakeOfferVisible(false)}}
                onOk={function noRefCheck(){onClickMakeOffer()}}
                title="Offer NFT"
                width="400px"
                customize={{
                    backgroundColor: '#041836',
                    border: '1px solid white',
                    borderRadius: '10px',
                    color: '#DCEEFE',
                    fontSize: '32px',
                    fontWeight: '600',
                    margin: '10px',
                    padding: '24px'
                    
                  }}
                >
                <div>
                    <h3>Offer</h3>
                    <p>Are you sure you want to offer ?</p>
                    <br />
                    <h3>Price:</h3>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Input onChange={e=>setChangeOfferValue(e.currentTarget.value)}></Input>&nbsp;&nbsp;
                    <h1>
                    SUI

                    </h1>
                    </div>
                </div>
            </Modal>


        {/*@ts-ignore*/}
            <Modal  style={{paddingTop:"200px"}}
                id="width"
                isVisible={isAdjustPriceVisible}
                onCancel={function noRefCheck(){setIsAdjustPriceVisible(false)}}
                onCloseButtonPressed={function noRefCheck(){setIsAdjustPriceVisible(false)}}
                onOk={function noRefCheck(){handleAdjust()}}
                title="Offer NFT"
                width="400px"
                customize={{
                    backgroundColor: '#041836',
                    border: '1px solid white',
                    borderRadius: '10px',
                    color: '#DCEEFE',
                    fontSize: '32px',
                    fontWeight: '600',
                    margin: '10px',
                    padding: '24px'
                    
                  }}
                >
                <div>
                    <h3>Offer</h3>
                    <p>Are you sure you want to offer ?</p>
                    <br />
                    <h3>Price:</h3>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Input onChange={e=>setChangeAdjustValue(e.currentTarget.value)}></Input>&nbsp;&nbsp;
                    <h1>
                    SUI

                    </h1>
                    </div>
                </div>
            </Modal>
            {/* <h2 className='NFT-List-h2'>NFT List</h2>
            {!txnData.isLoading ?
                txnData.data.length > 0 ?
                    <ImageGrid cols={5}>
                        {
                            txnData.data.map((t: any, i: number) => {
                                console.log(txnData.data);

                                return <MyShopCard key={i} data={t} />
                            })
                        }
                    </ImageGrid>
                    : <NoData sx={{ mb: "3.75rem" }} />
                : <LoadingInComponents />
            } */}
            {/* <NFT_Wapper>
                <div style={{ position: "absolute", top: 100, right: "16%" }}>
                    {itemData.seller === address ? <button style={{
                        padding: "20px 10px",
                        borderRadius: "50px",
                        width: "200px",
                        background: itemData.on_sale ? "#0668da" : "#ccc",
                        margin: "12px 0",
                        cursor: "pointer",
                        fontWeight: 900,
                        color: "white",
                        fontSize: 20
                    }} onClick={() => itemData.on_sale && onClickDeletNFT()}>TAKE OFF</button> : null}
                </div>

                <NFT_Content>
                    <div style={{ width: "28vw", display: "flex", flexDirection: 'column', justifyContent: "space-between" }}>
                        <div className="pictureShadow">

                            X                            {itemData ?
                                <img
                                    style={{ minHeight: "200px" }}
                                    src={itemData && HandleImagePrefixe(itemData?.properties?.url, "forward") || "/assets/a2.jpg"}
                                    alt="" />
                                : <CardLoading />}

                        </div>
                        <br />
                        <SimpleAccordion card={itemData.properties?.attributes ?? []} />
                    </div>

                    <div style={{ width: '40vw', marginLeft: "100px", display: "flex", flexDirection: 'column', justifyContent: "space-between" }}>

                        <ViewColl>
                            <div className="collectionName">
                                <p>{'collectionName' || 'Item Details'}</p>
                                <p style={{ fontSize: 16, color: "grey" }}>{'state.data.item_id'}</p>

                            </div>
                            <div className="view"><a style={{ whiteSpace: "nowrap" }}
                                href={`https://explorer.devnet.sui.io/objects/${'state.data.item_id'}`}
                                target='_black'>View on SuiExplorer</a></div>
                        </ViewColl>

                        <NFT_ViewName>
                            <h1>{'itemData.properties?.name'}</h1>
                        </NFT_ViewName>
                        <NFT_ViewDesc>{'itemData.properties?.description'}</NFT_ViewDesc>

                        <NFT_ViewContent>
                            <br />
                            <div style={{ color: "#747c83" }}>{'itemData.on_sale ' ? "CURRENT" : "LAST"} PRICE</div>
                            <div className="viewPrice">
                                <span>{price} </span>
                                <span> SUI</span>
                                <div>
                                    <div>
                                        {'fee ' && 100 / 100}% Creater Fee

                                    </div>
                                    <div>
                                        1.5% Market Fee

                                    </div>
                                </div>

                            </div>

                            {itemData.on_sale ?
                                <NFT_AdapterBtn onClick={() => buyNft('itemData', [123])}>BUY</NFT_AdapterBtn> : null}

                            <br />

                        </NFT_ViewContent>
                        <SimpleAccordion data={itemEvent} />
                    </div>
                </NFT_Content>

            </NFT_Wapper>

            <div style={{ color: "white", margin: "0 8rem" }}>
                <h1>MORE NFT</h1>
                <CardWrapper>
                    {nftData && nftData.map((t: NFTCardType) => <ShopCard data={t} />)}


                </CardWrapper>

            </div>

            <div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogContent style={{ width: '600px' }}>
                        <DialogContentText>
                            Please enter the number of fragments
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Number"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={changge}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={noRefCheck}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div> */}

        </>
    );

};
export default Index;
