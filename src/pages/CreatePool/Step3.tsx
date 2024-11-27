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
import { useLocation, useNavigate } from 'react-router-dom'


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
const Title = styled.div`
  //background-image: url("/assets/bg1.jpg");
  height: 250px;
  margin-top: -55px;
  display: flex;
  justify-content: center;
  align-items: end;
`
const Card = styled.div`
    /* height: 400px; */
    width:90%;
    border: 1px solid rgb(100, 100, 100) !important;
    margin:  10px 0;
`
const Content = styled.div`
    text-align:center;
    margin:10px;
`
const P = styled.p`
    font-size:20px;
    margin:15px 0;
    transform: translateX(30%);
`
const Driver = styled.div`
    border: .5px solid rgb(100, 100, 100);
    width: 90%;
    margin: 30px auto;
    
`
const Step2 = () => {
    const {connected} = useWallet();
    const navigator = useNavigate()
    // const location = useLocation()
    // const {state} =location
    // console.log(state);
    
    useEffect(() => {
        if (!connected) {
            (document.querySelector('#connectWalletButton') as any)?.click()
        }
    }, [])

    const handleClick = () => {
        navigator('/Step2', { state: { name: 'zhou' } }) 
    }
    const approve = () =>{
        window.alert('approve')
    }
    return (
        <>
            <div style={{width:"100vw",height:"100%",backgroundImage:"url(\"/assets/bg1.jpg\")",position:"absolute",zIndex:-2}}/>
            <div style={{width:"100vw",height:"100%",background:" linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,1))",position:"absolute",zIndex:-1}}/>

            <BG/>
            <Title>
                <h1 style={{color: "white", fontWeight: "900", fontSize: 50, marginBottom: 40}}>Create Pool</h1>
            </Title>
            <div style={{maxWidth: "1280px", margin: "10px auto 100px auto", color: "white"}}>
                {/*@ts-ignore*/} 
                <WiredCard style={{padding:"24px",height:"100%",width:"100%",margin:"0 auto"}} elevation={5}>
                    {/*@ts-ignore*/}
                    <div>
                        <p>Step 3/3:Finalizing Deposit</p>
                        <div style={{marginTop:'30px',display:'flex',justifyContent:'center'}}>
                            <Card>
                                <Content style={{fontSize:'25px',fontWeight:'600'}}>Your Pool Details</Content>
                                <P>You are depositing 3 SUIP to sell up to 15 ETH.</P>
                                <P>Your pool will have a starting price of 3 ETH.</P>
                                <P>Each time your pool sells an NFT, your price will adjust up by 2 ETH.</P>
                                <Driver/>
                                <Content>Deposit 3 NFTS</Content>
                                <div style={{border:'1px solid rgb(100, 100, 100',width:'200px',height:'300px',textAlign:'center',margin:'0 auto'}}>
                                    <img style={{width:'200px',height:'300px'}} src="/assets/a3.jpg" alt="" />
                                </div>
                                <div style={{textAlign:'center',margin:'20px 0'}}>
                                    <WiredButton elevation={3} onClick={approve}>{/*@ts-ignore*/}
                                        {"APPROVE"}
                                    </WiredButton>
                                </div>
                                
                            </Card>
                            
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <WiredButton elevation={3} onClick={handleClick}>{/*@ts-ignore*/}
                                {"Prev Step"}
                            </WiredButton>
                        </div>
                    </div>
                </WiredCard>
            </div>

</>
    )
};
export default Step2;
