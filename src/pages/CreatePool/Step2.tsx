/** @format */

import * as React from "react";
import styled from "styled-components";
import {Button} from "../../components/Button";
import {LinkSuiWallet} from "../../utils/request";
import {useWallet} from "@suiet/wallet-kit";
import {useEffect, useRef, useState} from "react";
import { Slider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {SuiJsonValue} from "@mysten/sui.js";
import {CreateInput} from "../../components/CreateInput";
import { Ed25519Keypair, JsonRpcProvider, RawSigner } from '@mysten/sui.js';
import {WiredButton, WiredCard} from "wired-elements-react";
import { useLocation, useNavigate } from 'react-router-dom'
import '../../index.css'

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
    height: 400px;
    width:45%;
    border: 1px solid rgb(100, 100, 100) !important;
    margin: 0 10px;
`
const Graph = styled.div`
    border:1px solid rgb(100, 100, 100);
    margin:20px auto;
    width:92%;
`
const Content = styled.div`
    text-align:center;
    margin:10px;
`
const Sinput = styled.input`
    height: 40px;
    width: 80%;
    margin: 5px 30px;
    padding: 0 10px;
    color:#fff;
    background-color: transparent;
    /* background-clip: padding-box; */
    border: 1px solid rgb(100, 100, 100);
    border-radius: 5px;
    /* transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; */
`
const Sinput2 = styled.input`
    display: inline-block;
    height: 40px;
    width: 50%;
    /* margin: 5px 30px; */
    padding: 0 8px;
    color:#fff;
    background-color: transparent;
    /* background-clip: padding-box; */
    border: 1px solid rgb(100, 100, 100);
    border-radius: 5px;
    /* transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; */
`
const Driver = styled.div`
    border: .5px solid rgb(100, 100, 100);
    width: 90%;
    margin: 30px auto;
    
`
const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#099',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });
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

    const handleClick = ()=> {
        navigator('/Step3', { state: { name: 'zhou' } }) 
    }
    const prevStep = () =>{
        navigator('/createPool')
    }
    const changge = (e:any)=>{
        console.log(e.target.value)
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
                        <p>Step 2/3: Configuring Pool Parameters</p>
                        <div style={{marginTop:'30px',display:'flex',justifyContent:'center'}}>
                            <Card>
                               <Content style={{fontSize:'25px',fontWeight:'600'}}>Pool Pricing</Content>
                               <Content>Set the initial price and how your pool's price changes.</Content>
                               <div>
                                    <p style={{margin:'5px 30px'}}>Start Price</p>
                                    <Sinput type="text" onBlur={changge} />
                               </div>
                               <div>
                                    <p style={{margin:'5px 30px'}}>Delta</p>
                                    <Sinput type="text" onBlur={changge} />
                               </div>
                               <div style={{fontSize:'15px',margin:'30px'}}>
                                    <p style={{marginBottom:'20px'}}>You have selected a starting price of 0 ETH.</p>
                                    <p>Each time your pool sells an NFT, your sell price will adjust up by 0 ETH .</p>
                               </div>
                            </Card>
                            <Card>
                                <Content style={{fontSize:'25px',fontWeight:'600'}}>Asset Amounts</Content>
                                <Content>Set how many NFTs you deposit into the pool.</Content>
                                <div>
                                    <span style={{margin:'5px 15px 5px 30px'}}>If you want to sell</span>
                                    <Sinput2 type="text" onBlur={changge} />
                                    <Content style={{fontSize:'20px'}}>you will earn 0 ETH total.</Content>
                               </div>
                               <Driver></Driver>
                               <Content style={{fontSize:'20px'}}>Selling 0 NFTs...<br/><Slider /></Content>
                               <Content style={{fontSize:'20px'}}>will earn you 0 ETH.</Content>
                            </Card>
                        </div>
                        <Graph>
                            <Content style={{fontSize:'25px',fontWeight:'600'}}>ETH Price Per SUIP</Content>
                            <Content >Displays how your sell price goes up with each SUIP sold.</Content>
                        </Graph>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <WiredButton elevation={3} onClick={prevStep}>{/*@ts-ignore*/}
                                {"Prev Step"}
                            </WiredButton>
                            {/*@ts-ignore*/}
                            <WiredButton elevation={3} onClick={handleClick}>
                                {/*@ts-ignore*/}
                                {"Next Step"}
                            </WiredButton>
                        </div>
                    </div>
                </WiredCard>
            </div>

</>
    )
};
export default Step2;
