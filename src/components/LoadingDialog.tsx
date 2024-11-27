/*
 * @Author: qiancheng12 wancheng@storswift.com
 * @Date: 2023-04-24 11:17:38
 * @LastEditors: qiancheng12 wancheng@storswift.com
 * @LastEditTime: 2023-05-05 11:00:18
 * @FilePath: \Nft\nft-trading-website\src\components\LoadingDialog.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import ReactDOM from "react-dom";
import React, { CSSProperties } from "react";
import styled from "styled-components";
import { Padding } from "@mui/icons-material";
import { SxProps } from "@mui/material";
const LdsHourglass = styled.div`
  display: inline-block;
  position: relative;
  width: 5rem;
  height: 5rem;
  &:after{
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 0.5rem;
    box-sizing: border-box;
    border: 2rem solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
`

export const LoadingDialog = () => {
  return ReactDOM.createPortal(<>
    <div style={{
      width: "100%",
      height: "100%",
      background: "rgba(30,30,30,0.8)",
      position: "fixed",
      top: 0,
      zIndex: "10000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="my-iconfont" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <LdsHourglass />
        loading images...

      </div>

    </div>
  </>, (document.querySelector("#root") as Element))
}

interface InComProps {
  style?: CSSProperties
  className?: string
}
export const LoadingInComponents = (props: InComProps) => {
  const { className, style } = props;
  return (
    <div className={className} style={{
      width: "100%",
      height: "100%",
      background: "rgba(30,30,30,0.8)",
      borderRadius:"16px",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "4.875rem 0",
      ...style
    }}>
      <div className="my-iconfont" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <LdsHourglass />

        loading images...
      </div>

    </div>
  )
}