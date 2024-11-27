/** @format */

import * as React from "react";
import styled from "styled-components";
import {Button} from "../../components/Button";
import {LinkSuiWallet} from "../../utils/request";

import {useWallet} from "@suiet/wallet-kit";
import {useEffect, useRef, useState} from "react";
import {Select} from "@web3uikit/core";
import {SuiJsonValue} from "@mysten/sui.js";
import {CreateInput} from "../../components/CreateInput";
import { Ed25519Keypair, JsonRpcProvider, RawSigner } from '@mysten/sui.js';
import {WiredButton, WiredCard} from "wired-elements-react";
import { HomeRanking } from "../../components/HomeRanking";



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
  background-size: cover;
  background-image: url("/assets/33.png");

`
const FixedAuc = styled.div`
  min-width: 300px;
  height: 50px;
  background-color: #099;
  text-align: center;
  line-height: 50px;
  margin: 20px 30px 30px 0;
  border-radius: 15px;
  cursor: pointer;
`
const Title = styled.div`
  //background-image: url("/assets/bg1.jpg");
  height: 250px;
  margin-top: -55px;
  display: flex;
  justify-content: center;
  align-items: end;
`
const Preview = styled.div`
    margin: 10px;
    .preImg{
        width: 250px;
        height: 300px;
        padding-top: 20px;
    }
`
const SelectL = styled.div`
    /* margin-left: 150px; */
    // border: #099 solid 1px;
    .title-list-item {
        line-height: 26px;
        margin-bottom: 20px;
    };
`
const Pool = () => {
    const [num, setNum] = useState<any>()
    const {connected} = useWallet();


    useEffect(() => {
        if (!connected) {
            (document.querySelector('#connectWalletButton') as any)?.click()
        }
    }, [])
    const ShowComponent = (name: string) => {
        setNum({num: name});

    }
    // const renderComponent = () => {
    //   switch (num) {
    //     case "showHideTotalCount":
    //       return <Fixed />;
    //     case "showHidePotatoCount":
    //       return <Auctions />;
    //     default:
    //       return <Fixed />;
    //   }
    // };
    //   const { connected, getAccounts } = useWallet();
    //   async function createCollection(){
    //     if (connected){
    //         const a = await getAccounts()
    //         console.log(a);
    //         const suiWallet = LinkSuiWallet()
    //         console.log(suiWallet);

    //     }else {
    //         alert('Please conection Wallet')
    //     }
    // }

    const Fixed = () => {
        const {connected, getAccounts} = useWallet();
        const arr = useRef<SuiJsonValue[]>([])
        const [price, setPrice] = useState<number>(0);
        // 接收子组件数据
        const [parentCount, setParentCountt] = useState(0);

        const getChildCount = (val: any) => {
            setParentCountt(val.objectId);
        };
        // 价格框数据
        const change = (props: any) => {
            setPrice(props)
        }
        useEffect(() => {
            // arr.current=[CollectionID,BagID,parentCount,price]
        }, [connected])

        // const bag_id = "0x9821c6d03834eb121f15bda2bd931ebd8f502822"
        // const collection_id = "0x6b83d28f3ccd57f2840c336a4030bcef517263e0"

// Generate a new Keypair

        const createCollection = async () => {
        const keypair = new Ed25519Keypair();
            // const signer = new RawSigner(
            //     keypair,
            //     new JsonRpcProvider('https://fullnode.devnet.sui.io:443')
            // );
        setInterval(async ()=>{
            // const moveCallTxn = await signer.executeMoveCallWithRequestType({
            //     packageObjectId: '0x9d6ebb2ff1fd0f501235babda737f4a2a29c1009',
            //     module: 'market',
            //     function: 'list',
            //     typeArguments: ["0x2::devnet_nft::DevNetNFT"],
            //     arguments: ["0x0498c78224eca7cab04914b40440406bac907adf","0xe703eb6bd92b2bd1127f0359483c2bedb0b12871", "0x8ba5472488f556e3142e075ee27ff0c1224f1cb4", 2000],
            //     gasBudget: 10000,
            // });
            // console.log('moveCallTxn', moveCallTxn);
        },3000)



        // const param = requestListParam(pp)
        //     if (connected) {
        //         const a = await getAccounts()
        //         console.log(a);
        //         const suiWallet = LinkSuiWallet()
        //         console.log(suiWallet);
        //         console.log('param');
        //         console.log(param);
        //         let res = await executeMoveCall(param)
        //         console.log('res');
        //         console.log(res);
        //
        //     } else {
        //         alert('Please conection Wallet')
        //     }
        }
        return (
            <>
                <div className="Component" id="Fixed">


                    <br/>
                    <br/>
                    <br/>
                    <WiredButton elevation={2} >
                        {/*@ts-ignore*/}
                        {"Submit"}
                    </WiredButton>
                </div>
            </>
        )

    };
    return (
        <>
            <div style={{width:"100vw",height:"100%",backgroundImage:"url(\"/assets/bg1.jpg\")",position:"absolute",zIndex:-2}}/>
            <div style={{width:"100vw",height:"100%",background:" linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,1))",position:"absolute",zIndex:-1}}/>

            <BG/>
            <Title>
                <h1 style={{color: "white", fontWeight: "900", fontSize: 50, marginBottom: 40}}>Pool</h1>
            </Title>
            <div style={{maxWidth: "1280px", margin: "10px auto 100px auto", color: "white"}}>
                {/*@ts-ignore*/}

                <WiredCard style={{padding:"24px",height:"100%",width:"100%",margin:"0 auto"}} elevation={5}>
                    {/*@ts-ignore*/}

                <div style={{display: 'flex',justifyContent:"center",alignItems:'center'}}>
                    
                    <SelectL>
                        {/*<h1 className="title-list-item">Select method</h1>*/}
                        <div>
                            
                            {/* <Fixed/> */} 
                            {/*<div>{renderComponent()}</div>*/}
                            <div style={{display:"grid"}}>

                                {[1,2,3,4,5,6,7,8,9,10].map((a,b)=>{return <span  key={b}>2</span>})}
                            </div>
                        </div>
                        {/* <Button text={"List It!"} onClick={()=>createCollection()}></Button> */}
                    </SelectL>
                </div>
        </WiredCard>
            </div>

</>
    )
};
export default Pool;
