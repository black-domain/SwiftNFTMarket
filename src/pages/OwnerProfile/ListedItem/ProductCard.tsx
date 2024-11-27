/*
 * @Author: qiancheng12 wancheng@storswift.com
 * @Date: 2023-04-17 17:10:13
 * @LastEditors: qiancheng12 wancheng@storswift.com
 * @LastEditTime: 2023-04-26 18:51:02
 * @FilePath: \Nft\nft-trading-website\src\components\ProductCard.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import styled from 'styled-components'
import './index.less'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@suiet/wallet-kit'
import { ScrollTop } from '../../../utils/scrollTop'
import { ImageItem, ImgCenterButton } from '../../../components/PictureGridList'
import EllipsisMiddle from '../../../components/EllipsisMiddle'
import { AcronymWord } from '../../../utils/AcronymWord'
import { Button, Stack, Typography } from '@mui/material'
import { Item } from './ListedItiemType'
import { ReactNode, useState } from 'react'
import { InputNumber } from '@arco-design/web-react'
import * as React from "react";
import { TransactionBlock } from '@mysten/sui.js'
import { packageObjectId } from '../../../utils/request'
import { useHandleNotify } from '../../../hooks/useNotify'
import { Input, Modal } from '@web3uikit/core'


const NftName = styled.p`
    
  max-width: 100%;
  height:3.125rem;
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
  top: 50%;
}

`

interface Props {
  itemData: Item,
  takeOffNFT: (t: any) => void;
}

export const ProductCard = (props: Props) => {
  const { itemData, takeOffNFT } = props
  const navigate = useNavigate()
  const [isMakeOfferVisible, setIsMakeOfferVisible] = useState(false)
  const [changeOfferValue, setChangeOfferValue] = useState("")
  const { address, connected, signAndExecuteTransactionBlock } = useWallet()
  const { handleNewNotification } = useHandleNotify()


  const onClickMakeOffer = async () => {
    const tx = new TransactionBlock() as any;
    const [coin] = tx.splitCoins(tx.gas, [tx.pure(Number(changeOfferValue) * 1e9)]);

    tx.moveCall({
      target: `${packageObjectId}::bid::new_bid`,
      typeArguments: ["0x2::sui::SUI"],
      arguments: [
        tx.pure(itemData.item_id),
        coin
      ]
    })


    signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
      console.log(res, 'success transaction');
      setTimeout(() => {
        window.location.reload()
      }, 3000)
      handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

    }).catch((err) => {
      console.log(err, 'fail transaction');
      handleNewNotification('error', `${err}`, "Error");
    })

  }

  return (
    <>
      <ImageItem
        position={"below"}
        title={itemData.name ?
          <NftName className="btn">
            <span className="btn-text-one">{22}</span>
            <span className="btn-text-two">{EllipsisMiddle({ suffixCount: 7, className: "btn-text-two", children: itemData.item_id ?? "" })}</span>
          </NftName> :
          <p>{AcronymWord(itemData.item_id, 7)}</p>
        }
        subtitle={<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography sx={{
            fontSize: '1.5rem',
            color: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>

              {Number((itemData.price / 1000000000).toLocaleString(undefined, { minimumFractionDigits: 4 }))}
              <img src="/assets/suipng.png" style={{ width: "1.2rem", height: "1.2rem", marginLeft: "0.2rem" }} alt="" />
            </div>
          </Typography>
          <>
            <Button sx={{
              color: "rgb(0, 0, 0)",
              borderColor: "#ffa361",
              backgroundColor: "#ffa361",
              borderRadius: "8px",
              padding: ".1rem .2rem",
              ':hover': {
                borderColor: "#ffa361",
                backgroundColor: "#ffa361",
              }
            }} variant="outlined" onClick={() => takeOffNFT(itemData)}>
              Delist
            </Button>
            <Button sx={{
              color: "rgb(0, 0, 0)",
              backgroundColor: "#ffa361",
              borderColor: "#ffa361",
              borderRadius: "8px",
              padding: ".1rem .2rem",
              ':hover': {
                borderColor: "#ffa361",
                backgroundColor: "#ffa361",
              }
            }} variant="outlined" onClick={() => setIsMakeOfferVisible(true)}>
              Make Offer
            </Button>
          </>
        </Stack>}
        imagePath={itemData.image_url}
        imageHeight={"16rem"}
        sxBar={{
          bgcolor: "rgb(23, 24, 26)",
        }}
        noItembar={false}
      />

      {/*@ts-ignore*/}
      <Modal style={{ paddingTop: "200px" }}
        id="width"
        isVisible={isMakeOfferVisible}
        onCancel={function noRefCheck() { setIsMakeOfferVisible(false) }}
        onCloseButtonPressed={function noRefCheck() { setIsMakeOfferVisible(false) }}
        onOk={function noRefCheck() { onClickMakeOffer() }}
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
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Input onChange={e => setChangeOfferValue(e.currentTarget.value)}></Input>&nbsp;&nbsp;
            <h1>
              SUI
            </h1>
          </div>
        </div>
      </Modal>
    </>
  )
}