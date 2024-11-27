import styled from "styled-components";
import { HomeRankingType } from "../model/HomeRanking";
import React from "react";
import { HandleImagePrefixe } from "../utils/handleImagePrefixe";

const Card = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
  height: 4.375rem;
  align-items: center;
  margin: 0.75rem 0;
  border-bottom: 1px solid #333;
  @media (max-width: 500px) {
    /* border: 1px solid #099; */
    width: 31.25rem;
    /* display: grid; */
    /* gap: 20px 0; */
    /* grid-template-columns: .3fr 3fr 1fr 1fr 1fr 1fr 1fr; */
  }
`
const NFT_Iamge = styled.div`
    display:flex;
    align-items:center;
    margin-right:0.625rem;
  .imgWrapper{
    width: 3.75rem;
    height: 3.75rem;
    overflow: hidden;
    padding: 0.25rem;
    border-radius: 0.5rem;
    margin: 0 0.75rem;
    display: flex;
    justify-content: center;
  }
    .img {
        width:100%;
      border-radius: 0.25rem;
    }
    span:nth-child(2){
        font-weight:900;
        font-size:1.125rem;
    }
`
const NFT_Matter = styled.div`
    margin-right: 0.625rem;
    white-space: nowrap;
    div:first-child {
        font-weight:800;
    }
    div:last-child {
        font-size:0.75rem;
        color:#999;
    }
`


// @ts-ignore
export const HomeRanking: React.FC<HomeRankingType> = ({ data }: HomeRankingType) => {
    return (
        <Card>
            <NFT_Iamge>
                <span className="imgWrapper" >
                    <div style={{ width: "3.125rem", height: "3.125rem", backgroundImage: `url(\"${HandleImagePrefixe(data.logo_image, 'prefixe')}`, backgroundPosition: "center", backgroundSize: "cover" }} />
                </span>
                <span>{data.name}</span>
            </NFT_Iamge>
            <NFT_Matter>
                <div>{data.floor_price / 1000000000}</div>
                <div>FLOOR PRICE</div>
            </NFT_Matter>
            <NFT_Matter>
                <div>{data.item.length}</div>
                <div>ON SELL</div>
            </NFT_Matter>
            <NFT_Matter>
                <div>{data.total_volume / 1000000000}</div>
                <div>TOTAL VOLUME</div>
            </NFT_Matter>
            <NFT_Matter>
                <div>{data.item.length}</div>
                <div>ITEMS</div>
            </NFT_Matter>


        </Card>
    )
}