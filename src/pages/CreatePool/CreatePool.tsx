/** @format */

import * as React from "react";
import styled from "styled-components";
// import {Button} from "../../components/Button";
import {LinkSuiWallet} from "../../utils/request";
import {ChevronDown} from '@web3uikit/icons'
import {useWallet} from "@suiet/wallet-kit";
import {useEffect, useRef, useState} from "react";
import {Input, Modal, Select, Typography} from "@web3uikit/core";
import {SuiJsonValue} from "@mysten/sui.js";
import {CreateInput} from "../../components/CreateInput";
import { Ed25519Keypair, JsonRpcProvider, RawSigner } from '@mysten/sui.js';
import {WiredButton, WiredCard} from "wired-elements-react";
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


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
const Content = styled.p`
    text-align: center;
    margin-top: 15px;
`
const ContentDiv = styled.div`
    text-align: center;
    margin-left: 120px;
    margin-top: 20px;
`
const Butt = styled.button`
    width: 165px;
    height: 50px;
    cursor: pointer; 
    margin-left: 20px;
    border-width: 2px !important;
    border: 1px solid rgb(100, 100, 100) !important;
    font-weight: 400;
    font-size: 20px;
    color:#fff;
    text-align: center;
    vertical-align: middle;
    background-color: transparent;
`


const CreatePool = () => {
    const {connected} = useWallet();
    const [open, setOpen] = React.useState(false);
    const [valueInp,setValueinp] = useState(1)
    const navigator = useNavigate();
    // const location = useLocation()
    // const {state} =location
    // console.log(state);
    
    useEffect(() => {
        if (!connected) {
            (document.querySelector('#connectWalletButton') as any)?.click()
        }
    }, [])

    const handleClick = ()=> {
        navigator('/step2', { state: { name: 'zhou' } }) 
    }
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const noRefCheck = (props:any)=>{
        setOpen(false);
    }
    const changge = (e:any)=>{
        setValueinp(e.target.value)
    }
    const Jumpme = () =>{
        navigator('/me')
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
                    <div style={{height:'450px'}}>
                        <p style={{fontSize:'20px'}}>Step 1/3: Selecting Assets</p>
                        <div style={{height:'350px',marginTop:'30px',fontSize:'35px'}}>
                            <Content>I want to ...</Content>
                            <ContentDiv style={{}}>
                                deposit
                                <Butt> Select NFT <ChevronDown style={{fontSize:'30px',verticalAlign:'middle'}} /></Butt>
                            </ContentDiv>
                            <Content style={{marginLeft:'-70px'}}>and ...</Content>
                            <ContentDiv style={{}}>
                                deposit
                                <Butt onClick={handleClickOpen}> Select Token <ChevronDown style={{fontSize:'30px',verticalAlign:'middle'}} /></Butt>
                            </ContentDiv>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <WiredButton elevation={3} onClick={Jumpme}>{/*@ts-ignore*/}
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
            <div>
      
                <Dialog open={open} onClose={handleClose} >
                    {/* <DialogTitle>Subscribe</DialogTitle> */}
                    <DialogContent style={{width:'600px'}}>
                        <DialogContentText >
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
            </div>
</>
    )
};
export default CreatePool;
