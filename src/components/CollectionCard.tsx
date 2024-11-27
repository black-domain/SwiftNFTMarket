import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AcronymWord } from "../utils/AcronymWord";
import { CardLoading } from "./CardLoading";

interface Props {
  height?: number
  width?: number
  img?: string
  data?: any
  toggle?: boolean
  objectid?: string
  stateData?: any
}
const NFT_Card = styled.div`
  margin: 0.625rem;
  cursor: pointer;
  box-shadow:0 0 0.3125rem 0.3125rem rgba(255,255,255,0.2);
  border-radius:0.75rem;
`
const Card = styled.div`
  aspect-ratio:2/1;
  min-width:25vw;
  position:relative;
  border-radius:0.75rem;
  overflow: hidden;
  &:hover{
    > div:nth-child(3){
      opacity: 1;
      transition: all 300ms;

    }
    > div:nth-child(2){
      opacity: 1;
      transition: all 300ms;

    }
  }
  
`
const CardDetailBG = styled.div`
  transition: all 300ms;
  opacity: 0;
  height: 50%;
  background: rgba(52, 52, 68,0.95);
  border-radius: 0 0 0.75rem 0.75rem;
  position: absolute;
  top: 60%;
  z-index: 0;
  width: 100%;
`
const CardDetail = styled.div`
  transition: all 300ms;
  opacity: 0;
  position: absolute;
  top: 70%;
  left: 44%;
  transform:translateX(-50%);
  display:flex;
  align-items:center;
  .detail {
    margin: 0 0.625rem;
    white-space: nowrap;
    div:nth-child(1){
      /* border: 1px solid red; */
      font-size: 1.125rem;
      font-weight: 700;
    }
    div:nth-child(2){
      /* border: 1px solid green; */
      font-size: 0.875rem;
      font-weight: 300
    }
  }
`

export const CollectionCard = (props: Props) => {
  const navigate = useNavigate()
  console.log(props);


  const { height, width, data, toggle, objectid, stateData } = props
  const onClick = (x: any) => {
    if (x) {
      console.log(x, 'x');

      navigate(`/collection/${objectid}`, { state: stateData })
    }
  }
  console.log(data, 'datas');

  return <NFT_Card onClick={() => !toggle && onClick(data)}>
    <Card>
      {toggle ? <CardLoading /> :

        <div style={{
          height: "100%",
          backgroundSize: "cover",
          backgroundImage: data ? `url(\"https://${data.featured_image?.substring(7)}.ipfs.nftstorage.link` : "url(\"/assets/6.png\")",
          backgroundPosition: "center",
          borderRadius: "0.75rem 0.75rem 0 0"
        }}>
        </div>
      }
      {!toggle && <CardDetailBG />}

      {/*<div style={{height: "90px", width: "90px", position: "absolute", top: "50%", left: "50%", background: "#7d8ca9", transform: "translate(-50%,-50%)", borderRadius: "15px", border: "3px solid #343444"}}>*/}
      {/*    <img style={{width: "100%", height: "100%", borderRadius: "12px"}} src={`/assets/a8.jpg`} alt=""/>*/}
      {/*</div>*/}

      {!toggle &&
        <CardDetail>
          {/*<img style={{width: "40px", borderRadius: "12px"}} src="/assets/nftfalse.svg" alt=""/>*/}
          <div style={{ width: "3.125rem", height: "3.125rem", backgroundImage: data ? `url(\"https://${data.logo_image?.substring(7)}.ipfs.nftstorage.link` : "url(\"/assets/7.png\")", backgroundPosition: "center", backgroundSize: "cover" }} />
          {/*<img style={{width: "20%", height: "100%", borderRadius: "12px"}} src={data?`https://${data.logo_image?.substring(7)}.ipfs.nftstorage.link`:"/assets/7.png"} alt=""/>*/}
          {/**@认证icon*/}
          {/*<img style={{marginLeft:"12px",width:"30px",borderRadius: "12px"}} src={`/assets/official.svg`} alt=""/>*/}

          <div className="detail">
            <div>{data && data.name}</div>
            <div><span style={{ color: "#999" }}>Created by</span> {data && AcronymWord(data.receiver, 7)}</div>
            {/*<div><span style={{color: "grey", fontSize: 10}}>Created by</span> Unknown</div>*/}
          </div>
        </CardDetail>
      }
    </Card>
  </NFT_Card>
}