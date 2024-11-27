/*
 * @Author: qiancheng12 wancheng@storswift.com
 * @Date: 2023-04-17 17:10:13
 * @LastEditors: qiancheng12 wancheng@storswift.com
 * @LastEditTime: 2023-04-26 18:51:02
 * @FilePath: \Nft\nft-trading-website\src\components\MyShopCard.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import './index.less'
import themeSwitch from "../utils/themeSwitch";
import { useNavigate } from "react-router-dom";
import { useGetMoney } from "../hooks/useGetMoney";
import { ScrollTop } from "../utils/scrollTop";
import { useHandleBuyNft } from "../hooks/useBuyNft";
import { AcronymWord } from '../utils/AcronymWord';
import { RoyaltyCollection, marketID, packageObjectId, requestMarket, requestUserObject } from '../utils/request';
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { useHandleNotify } from '../hooks/useNotify';
import styled from 'styled-components';
import EllipsisMiddle from './EllipsisMiddle';
import { Button, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { ImageItem, ImgCenterButton } from './PictureGridList';

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
    data?: any
    owner?: boolean
    CollectionName?: string
    CollectionId?: string
    CollectionType?: string
    nftObjId?: string
    nftListId?:any
}

export const MyShopCard = (props: Props) => {
    const { data, owner, CollectionId, CollectionName, CollectionType, nftObjId,nftListId } = props
    const col = themeSwitch()
    const navigate = useNavigate()
    const { signAndExecuteTransactionBlock, address } = useWallet()
    const { handleNewNotification } = useHandleNotify()
    const { money } = useGetMoney()


    const { id, price } = data.data.content.fields
    const onClick = () => {
        navigate(`/item-details/${data.data.content.fields.listingId}/object/${data.data.objectId}`, { state: { CollectionName, CollectionId, price ,nftListId:nftListId} });
        ScrollTop()
    }
    const handleBuyNFT = async () => {
        const _address: string = address as string


        const tx = new TransactionBlock() as any;
        console.log(tx);
        

        const [coin] = tx.splitCoins(tx.gas, [tx.pure(price)]);
        const arr = [
            marketID,
            RoyaltyCollection,
            data.data.objectId,
            coin,
            _address,
        ]
        tx.moveCall({
            target: `${packageObjectId}::market::buy_and_take_script`,
            typeArguments: [CollectionType,"0x2::sui::SUI"],
            arguments: arr.map((item: any, i: number) => i === 3 ? item : i === 0 ? tx.object(item): tx.pure(item))
        })
        tx.transferObjects([coin], tx.pure(address))


        signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Buy NFT,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })

    }

    return (
        <ImageItem
            position={"below"}
            title={data.data?.display?.data?.name ?
            <NftName className="btn">
                <span className="btn-text-one">{data.data?.display?.data?.name}</span>
                <span className="btn-text-two">{EllipsisMiddle({ suffixCount: 7,className:"btn-text-two", children: nftObjId??"" })}</span>
            </NftName>:
            <p>{AcronymWord(nftObjId, 7)}</p>
            }
            subtitle={<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                {price!==0?
                    <>
                <Typography sx={{
                    fontSize: '1.5rem',
                    color: "#fff",
                }}>


                    <img src="/assets/suipng.png" style={{width:"1.2rem",marginTop:-4}} alt=""/>

                    <span style={{padding:4,borderRadius:8,margin:"0 4px 0 0"}}>

                    {Number((price / 1e9)).toFixed(2).toString().slice(-2)==="00"?Number((price / 1e9)):Number((price / 1e9)).toFixed(2)}

                    </span>
                </Typography>
                <Button sx={{
                    color: "rgb(255, 163, 97)",
                    borderColor: "rgb(255, 163, 97)",
                    borderRadius: "8px",
                    padding: ".5rem .75rem",
                    ':hover': {
                        borderColor: "rgb(255, 163, 97)",
                    }
                }} variant="outlined" onClick={handleBuyNFT}>
                    Buy Now
                </Button>
                    </>
                    : <div/>
                }
            </Stack>}
            imagePath={data.data?.display?.data?.image_url}
            imageHeight={"16rem"}
            sxBar={{
                bgcolor: "rgb(23, 24, 26)",
            }}
            detailsButton={<ImgCenterButton text={'Details'} onClick={onClick} />}
            noItembar={false}
        />
    )
}