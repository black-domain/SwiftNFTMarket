/** @format */

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Grid, Stack, Typography } from "@mui/material";
import { ScrollTop } from "../utils/scrollTop";

/**
 * @tangs
 * 页面底部页脚信息
 * 显示版本相关内容或相关合作伙伴、相关联网页跳转标签等
 * */
const Wrapper = styled.div`
 display: flex;
 /* border: 1px solid green; */
 justify-content: space-between;

 @media (max-width: 620px) {
    background-color:#000;
   display: flex;
   text-align: center;
 }
 
`
const Wid = styled.div`
  font-weight:600;
  box-shadow:0 0 15px 1px #323243;
  padding:2.25rem 0;
  background:#292a25;
  color:white;
  flex-grow:1;
  display:flex;
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif !important;
  @media (max-width: 500px) {
    /* border: 1px solid red; */
    margin-left: -45px;
    height: 100%;
    width: 100%;
    background:#000;
    box-shadow:0 0 15px 1px #000;
   .logo{
        /* border: 1px solid red; */
        margin: 0 auto;
    }
   .content{
        display: none !important;
    }
 }
`
const NFT_Create = styled.div`
    font-size:1rem;
    color:#ccc;
    text-decoration-line: underline;
    
    p{
        margin-top:0.75rem;
        cursor:pointer;
    }
    p:hover {
        color: #eee
    }
    
`
const NFT_Nav = styled.div`
    font-size:1rem;
    color:#ccc;
    cursor:pointer;
    text-decoration-line: underline;
    p{
       margin-bottom: 0.57rem;
        cursor:pointer;
    }
    p:hover {
        color: #eee
    }
`
const NFT_Connect = styled.div`
    // margin:0 auto;
    display:flex;
    justify-content:start;
    align-items:center;
    flex-direction:column;
    justify-content: space-between;
    > h2 {
        white-space:nowrap;
    }
    > ul {
        display:flex;
        list-style:none;
        justify-content:space-between;
        margin-top:1.875rem;
        width:100%;
        img:nth-child(1) {
            height: 2.5rem;
            margin-right:0.75rem;
        }
        img:nth-child(2) {
            height: 2.5rem;
            border-radius:25%;
            margin-right:0.75rem;
        }
        img:nth-child(3) {
            height: 2.5rem;
            border-radius:50%;
            margin-right:0.75rem;
        }
        img:nth-child(4) {
            border :1px solid red;
            height: 2.5rem;
            border-radius:0%;
            margin-right:0.75rem;
        } */
    }
`
const FooterPage = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <>

            <Wid className="my-iconfont">
                <Grid container sx={{ justifyContent: "space-between", margin: "0 12.5rem" }}>
                    <Grid item xs={5} rowSpacing={4} direction={"row"} display="flex">
                        <Link to={'/'} >
                            <Stack className="logo" direction={"row"} alignItems={"center"}>
                                <img src="/assets/nftlogo.png" style={{ height: "4rem", borderRadius: "50%" }} alt="" />
                                <img src="/assets/4-2.png" style={{ width: "5.125rem", height: "2.25rem" }} alt="" />
                            </Stack>
                        </Link>
                        <Typography sx={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            color: "#ccc",
                            padding: "0.5rem 0.5rem 0.5rem 2rem",
                        }}>{t("footer.content")}
                        </Typography>
                    </Grid>
                    <Grid item direction={"column"} display="flex">
                        <NFT_Create >
                            {/* <p onClick={() => { navigate('/mint') }}>{t("footer.mint")}</p> */}
                            <h4 style={{ fontSize: "1rem" }}><a href="https://docs.google.com/forms/d/e/1FAIpQLSd0KAfh1z6qpI4e6C4nZjMO0zRX9roV305WaLbvdfZx-xpNlw/viewform?usp=sf_link" target='blank'>Apply Launchpad </a></h4>
                            {/* <p onClick={() => { navigate('/create-collection') }}>{t("footer.collections")}</p> */}
                        </NFT_Create>
                        <NFT_Create >
                            {/* <p onClick={() => { navigate('/mint') }}>{t("footer.mint")}</p> */}
                            {/* <p><a href="https://docs.google.com/forms/d/e/1FAIpQLSd0KAfh1z6qpI4e6C4nZjMO0zRX9roV305WaLbvdfZx-xpNlw/viewform?usp=sf_link" target='blank'>Apply Collection </a></p> */}
                            {/* <p onClick={() => { navigate('/create-collection') }}>{t("footer.collections")}</p> */}
                        </NFT_Create>

                    </Grid>

                    <Grid  item direction={"column"} display="flex" justifyContent={"space-between"}>
                        <h4 style={{ fontSize: "1rem" }}>{'Navigation'}</h4>
                        <NFT_Nav >
                            <p onClick={() => { navigate('/explore'), ScrollTop() }}>{t("user.explore")}</p>
                        </NFT_Nav>
                    </Grid>

                    <NFT_Connect  >
                        <h4  style={{ fontSize: "1rem" }}>{t("footer.withUs")}</h4>
                        <ul>
                            <li><a href="https://twitter.com/SwiftNFTMarket" target='blank' ><img style={{
                                padding: "0.125rem"
                            }} src="/assets/twitter.svg" alt="" /></a></li>
                            <li><a href="https://github.com/SwiftNFT/SuiNFTMarket" target='blank' ><img style={{ padding: "0.325rem" }} src="/assets/github.svg" alt="" /></a></li>
                            <li><a href="https://discord.gg/dCRj39pf5x" target='blank'><img style={{ padding: "0.325rem" }} src="/assets/discord.svg" alt="" /></a></li>
                            <li><a href="mailto:data@swiftnftmarket.io" target='blank' ><img style={{ padding: "0.325rem" }} src="/assets/email.svg" alt="" /></a></li>
                        </ul>
                    </NFT_Connect>
                </Grid>
            </Wid>
        </>
    )

};
export default FooterPage;
