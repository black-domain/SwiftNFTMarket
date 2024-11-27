/** @format */

import * as React from "react";
import styled from "styled-components";
import { collectionListOnChain, packageObjectId, requestMarket, requestUserAllObject } from "../../utils/request";

import { useWallet } from "@suiet/wallet-kit";
import { useEffect, useRef, useState } from "react";
import { SuiJsonValue, TransactionBlock } from "@mysten/sui.js";
import SelectObj from "./components/NftListSelect";
import { CreateInput } from "../../components/CreateInput";
import { WiredButton, WiredCard } from "wired-elements-react";
import { usePreview } from "../../stores/useTheme";
import { HandleImagePrefixe } from "../../utils/handleImagePrefixe";
import { useLocation, useNavigate } from "react-router-dom";
import { client } from "../../utils/api";
import { Select } from "@web3uikit/core";
import { ScrollTop } from "../../utils/scrollTop";
import { useHandleNotify } from "../../hooks/useNotify";
import NftcollectionId from "./components/NftcollectionId";


/**
 * @tangs
 * 页面详情页信息
 * 显示版本相关内容或相关合作伙伴、相关联网页跳转标签等
 * */


/**
 * styled component 样式
 * 头部背景 BG
 */
const BG = styled.div`
  min-width: 100%;
  height: 200px;
  position: absolute;
  top: 0;
  z-index: -1;
  -webkit-filter: blur(35px);
  background-image: url('/assets/6.png');
  background-repeat: no-repeat ;
  background-position: center;
  background-size: cover;
`
const Title = styled.div`
  //background-image: url("/assets/bg1.jpg");
  height: 250px;
  margin-top: -55px;
  display: flex;
  justify-content: center;
  align-items: end;
  h1 {
    color: white;
    font-weight: 900;
    font-size: 50px;
    margin-bottom: 20px;
  }
`
const Preview = styled.div`
  margin: 20px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .preImg {
    width: 250px;
    padding-top: 20px;
  }
`
const SelectL = styled.div`
  margin-left: 10vw;
  width: 500px;
  // border: #099 solid 1px;
  .title-list-item {
    line-height: 26px;
    margin-bottom: 20px;
  }
  @media (max-width:500px){
    width: 400px;
    
  }
`
const NFT_Back1 = styled.div`
    width: 100%;
    height: 100%;
    // background-image: url('/assets/6.png');
    background-repeat: no-repeat ;
    background-position: center;
    background-size: cover;
    position: absolute;
    z-index: -2;
`
const NFT_Back2 = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,1));
    position: absolute;
    z-index: -1;
`
const Main = styled.div`
    margin: 10px auto 100px auto;
    color: white;
    display:flex;
    justify-content:center;
    @media (max-width:500px){
        width: 100%;
        display:flex;
        justify-content:start;
    }
`
const NFT_Content = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width:500px){
        flex-direction: column;
    }
`
const ListNFT = () => {
    const { connected, address } = useWallet();
    const init = usePreview((s: any) => s.init)
    const [selectRes, setSelectRes] = useState<any>([])
    const { handleNewNotification } = useHandleNotify()
    const location = useLocation() as any
    const [listDetails, setListDetails] = useState<any>(null)
    const navigate = useNavigate()
    useEffect(() => {
        ScrollTop()
        if (!location) {
            navigate("/")
        }
        if (!connected) {
            (document.querySelector('#connectWalletButton') as any)?.click()
        }

        requestMarket(location.state.id).then((t: any) => {

            // setListDetails(t.data.content.type)
            requestMarket(collectionListOnChain).then((e: any) => {

                const xx = e.data.content.fields.collection.fields.contents
                xx.forEach((t1: any) => {
                    const Obj_type = t1.fields.key
                    if (Obj_type.indexOf("<") >= 0) {
                        return ("0x" + Obj_type.slice(0, Obj_type.indexOf("<") + 1) + "0x" + Obj_type.slice(Obj_type.indexOf("<") + 1)) === t.data.content.type && setListDetails(t1.fields)
                    } else {
                        "0x".concat(Obj_type) === t.data.content.type && setListDetails(t1.fields)

                    }

                })

            })
        })

    }, [])

    useEffect(() => {
        // address && client.query({
        //     query: GET_CREATE_COLLECTION_ALL("")
        // }).then(e => {
        //     setSelectRes(e.data.getCollection)
        // })
    }, [address])




    const Fixed = (props: any) => {
        const { selectP } = props
        const navigator = useNavigate()
        const { connected, address, signAndExecuteTransactionBlock } = useWallet();
        const [postParam, setPostParam] = useState({
            collection: "",
            nft: "",
            amount: "0"
        })



        const listNftHandle = async () => {


            if (parseInt(postParam.amount) <= 0) { return handleNewNotification('error', 'Please enter the correct money', 'Error') }
            if (connected) {
                const tx = new TransactionBlock() as any;
                tx.moveCall({
                    target: `${packageObjectId}::market::list`,
                    typeArguments: [listDetails.key],
                    arguments: Object.values(postParam).map((item) => {
                        return tx.pure(item);
                    })
                })
                signAndExecuteTransactionBlock({
                    transactionBlock: tx, options: {
                        showInput: true,
                        showEffects: true,
                        showEvents: true,
                        showObjectChanges: true,
                        showBalanceChanges: true
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.effects?.status.status === "success") {
                        handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')
                    } else {
                        handleNewNotification('error', JSON.stringify("err"), "Error");

                    }

                }).catch((err) => {
                    console.log(err);

                    handleNewNotification('error', `${err}`, "Error");
                })
                console.log(tx, 'transactionBlock Param');

            } else {
                handleNewNotification('error', 'Please conection Wallet', 'Error')
            }
        }
        const select_res = selectRes && selectRes.map((t: any, i: number) => {
            return {
                id: t.collection_id,
                label: t.collection_id,
                type: t.type_
            }

        })


        const handleSelectRes = select_res && select_res.filter((t: any, i: number) => t.type.slice(t.type.indexOf('<') + 1, t.type.indexOf('>')) === init.type ? t : null)


        useEffect(() => {

            if (init !== "" || selectRes.length > 0) {
                setPostParam({ ...postParam, nft: init.id })
            }

            if (handleSelectRes.length > 0) {
                setPostParam({ ...postParam, nft: init.id, collection: handleSelectRes && handleSelectRes[0].id })
            }
        }, [init])
        // console.log(handleSelectRes, 'handleSelectRes');


        return (
            <>
                <div className="Component" id="Fixed" style={{ marginLeft: '-50px' }}>
                    <SelectObj nftid={location.state.id} />
                    <NftcollectionId nftid={listDetails?.key !== undefined ? "0x".concat(listDetails?.key) : "MARKET NO COLLECTION"} />
                    {/* <h2 style={{ margin: '15px 0' }}>Collection Id</h2>
                    <Select
                        name={''}
                        defaultOptionIndex={0}
                        description={init ? "" : "Please select object id first"}
                        id="Select"
                        label={init.type && <p style={{ color: "lightblue", background: "rgba(0,0,0,0.5)" }}>😁 {init.type}</p>}
                        onBlurTraditional={function noRefCheck() { }}
                        onChange={function noRefCheck(e: any) { setPostParam({ ...postParam, collection: e.id }) }}
                        onChangeTraditional={function noRefCheck(e) { console.log(e, '22') }}
                        options={hand}
                        width="100%"
                    /> */}
                    {/*<CreateInput placeholder={'Enter Collection Id'} onChange={(e:any)=>{ setPostParam({...postParam,collection: e.replace(/\"/g,'')})}}/>*/}

                    <h2 style={{ margin: '15px 0' }}>Price</h2>
                    <CreateInput placeholder={'Enter price for one NFT(SUI)'} onChange={(e: any) => { setPostParam({ ...postParam, collection: listDetails.value, nft: location.state.id, amount: (e * 1000000000).toString() }) }} />
                    {/*<Button text={"List It!"} onClick={() => createCollection()}/>*/}

                    <br />
                    <br />
                    <br />
                    {listDetails ?
                        <WiredButton elevation={2} onClick={listNftHandle}>
                            {/*@ts-ignore*/}
                            {"Submit"}
                        </WiredButton> :
                        <h3 style={{ color: "grey" }}>MARKET NO COLLECTION</h3>
                    }

                </div>
            </>
        )

    };

    function PreViewImg() {
        const [imgData, setImgData] = useState<any>()
        useEffect(() => {
            // TODO:GetObjectDataResponse
            // requestMarket(init.id).then((e: GetObjectDataResponse | any) => setImgData(e.details && e.details?.data.fields))
        }, [init])

        return (
            <>
                <Preview style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h2 style={{ textAlign: 'center' }}>Preview NFT</h2>
                    <h2 style={{ textAlign: 'center', fontSize: 16, color: "grey" }}>Name：{location.state.name.length > 10 ? location.state.name.slice(0, 15) + "..." : location.state.name}</h2>
                    <div style={{ width: "280px", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                        <img style={{ width: "100%" }} src={location.state.img ? location.state.img.indexOf("https://") > -1 ? location.state.img : `https://ipfs.io/ipfs/${location.state.img.substring(7).split('?')[0]}` : "/assets/suilogo.svg"}
                            alt="" className="preImg" />
                    </div>
                </Preview>
            </>
        )
    }

    return (
        <>
            <NFT_Back1 />
            <NFT_Back2 />

            {/* <BG/> */}
            <Title>
                <h1>List NFT</h1>
            </Title>
            <Main>
                {/*@ts-ignore*/}

                <WiredCard style={{ padding: "24px", height: "100%", margin: "0 auto" }} elevation={5}>
                    {/*@ts-ignore*/}

                    <NFT_Content>
                        <PreViewImg />
                        <SelectL>
                            <div style={{ width: "100%" }}>

                                <Fixed />

                            </div>
                        </SelectL>
                    </NFT_Content>
                </WiredCard>
            </Main>

        </>
    )
};
export default ListNFT;
