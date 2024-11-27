import { useWallet } from '@suiet/wallet-kit';
import React, { useEffect, useState } from 'react'
import { client } from '../../../utils/api';
import { GET_ITEM } from '../../../utils/graphql';
import { ItemSortType } from '../../../utils/queryApi';
import { GetItem, Item } from './ListedItiemType';
import './index.less'
import { MyShopCard } from '../../../components/MyShopCard';
import { ImageLoading } from '../../../components/ImageLoading';
import { ProductCard } from './ProductCard';
import { getObjectList, packageObjectId } from '../../../utils/request';
import { deepCopy } from '../../../utils/deepCopy';
import { LoadingInComponents } from '../../../components/LoadingDialog';
import { Button } from '@mui/material';
import { TransactionBlock } from '@mysten/sui.js';
import { useHandleNotify } from '../../../hooks/useNotify';

function index() {

    const { address, connected, signAndExecuteTransactionBlock } = useWallet();
    const [ProductData, setProductData] = useState([] as any)
    const [nftLoading, setnftLoading] = useState(false)
    const [isPrice, setIsPrice] = useState(false)
    const { handleNewNotification } = useHandleNotify()

    const [inputValue, setInputValue] = useState(0)


    useEffect(() => {
        setnftLoading(true)
        address && client.query({
            query: GET_ITEM({
                collection_id: '',
                item_id: '',
                operator: "",
                limit: 10,
                cursor: 0,
                on_sale: 1,
                sort_type: ItemSortType.price,
                reversed: false,
                ft_type: "",
                nft_type: ""
            })
        }).then(async (result) => {

            const idArr: string[] = []
            result.data.getItem.item.map((item: Item) => {
                idArr.push(item.item_id)
            })
            const arrData: Item[] = deepCopy(result.data.getItem.item)
            const priceArr = await getObjectList(idArr) as any

            const arrDataWithPrice = arrData.map((item) => {
                const priceItem = priceArr.find(
                    (price: any) => price.data?.objectId === item.item_id
                )

                if (priceItem && priceItem.data?.display?.data) {
                    return {
                        ...item,
                        name: priceItem.data.display.data.name,
                        image_url: priceItem.data.display.data.image_url,
                        type: priceItem.data.content.type
                    }
                }

                return item
            })
            setProductData(arrDataWithPrice)
            setnftLoading(false)

        }).catch((error) => {
            console.error(error); // 
            setnftLoading(false)
        })

    }, [])


    const takeOffNFT = async (t: any) => {
        const tx = new TransactionBlock() as any

        const arr = [
            t.collection_id,
            t.item_id
        ]

        tx.moveCall({
            target: `${packageObjectId}::market::delist_take`,
            typeArguments: [t.type],
            arguments: arr.map((item: any) => tx.pure(item))
        })

        signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })
    }

 


    const ProductCards = ProductData.map((t: any, i: number) => (
        <ProductCard key={i} takeOffNFT={takeOffNFT} itemData={t} />
    ));

    return (
        <>
            {

                !nftLoading ? ProductData.length > 0 ? <div className='NFT-ListA'>
                    {ProductCards}
                </div> : "NO DATA" : <LoadingInComponents />
            }
        </>

    )
}

export default index