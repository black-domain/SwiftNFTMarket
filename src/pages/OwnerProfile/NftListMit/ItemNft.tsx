import { Box, ClickAwayListener } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EllipsisMiddle from '../../../components/EllipsisMiddle'
import { IconClose, IconMoreVertical } from '@arco-design/web-react/icon'
import { InputNumber, Space } from '@arco-design/web-react';
import { Root2 } from '../OwnerProfileType';
import { collectionListOnChain, requestMarket } from '../../../utils/request';
import { ScrollTop } from '../../../utils/scrollTop';
import { useWallet } from '@suiet/wallet-kit';
interface Props {
    item: Root2
    clk: (objId: string) => void
    index: number
    handleInputChange: (target: any, Id: string) => void
    col: any
    AomuntAll: string | number
}
function ItemNft(props: Props) {
    const [listDetails, setListDetails] = useState<any>(null)
    const { connected, address } = useWallet();

    const { item, clk, index, handleInputChange, col, AomuntAll } = props;

   console.log(item);
   
    

    const img = item?.display.data?.image_url ? item.display.data?.image_url.indexOf("https://") > -1 ? item.display.data?.image_url : `https://ipfs.io/ipfs/${item.display.data?.image_url.substring(7).split('?')[0]}` : "/assets/suilogo.svg"
    const name = item?.display.data?.name.length > 10 ? item.display.data?.name.slice(0, 15) + "..." : item.display.data?.name
    const objId = item?.objectId
    
    const [isTs, setisTs] = useState(false)


    const handleInputChangeChild = (event: any) => {
        handleInputChange(event, objId);
    };

    useEffect(() => {
     
    }, [AomuntAll])
    

    // useEffect(() => {
    //     if (!connected) {
    //         (document.querySelector('#connectWalletButton') as any)?.click()
    //     }

    //     objId && requestMarket(objId).then((t: any) => {

    //         // setListDetails(t.data.content.type)
    //         requestMarket(collectionListOnChain).then((e: any) => {

    //             const xx = e.data.content.fields.collection.fields.contents
    //             setListDetails(xx);

    //             xx.forEach((t1: any) => {

    //                 const Obj_type = t1.fields.key
    //                 if (Obj_type.indexOf("<") >= 0) {
    //                     return ("0x" + Obj_type.slice(0, Obj_type.indexOf("<") + 1) + "0x" + Obj_type.slice(Obj_type.indexOf("<") + 1)) === t.data.content.type && setListDetails(t1.fields)
    //                 } else {
    //                     "0x".concat(Obj_type) === t.data.content.type && setListDetails(t1.fields)
    //                 }
    //             })
    //         })
    //     })

    // }, [])


    return (
        <ClickAwayListener onClickAway={() => setisTs(false)}>
            <Box className={`${isTs ? 'ts' : "ty"}`} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#fcfcfe", height: "8rem", padding: " 1rem", borderRadius: "1rem", boxShadow: '2px 2px 6px #e3e2e7', marginBottom: "0.5rem" }}>
                <div>
                    <img style={{ width: "3rem", borderRadius: "50%" }} src={img} alt="" />
                </div>
                <div>
                    <div style={{ display: "flex" }}>
                        Name: <>{name}</>
                    </div>
                    <div style={{ display: "flex" }}>
                        ObjectId:  <EllipsisMiddle suffixCount={14}>{objId}</EllipsisMiddle>
                    </div>
                    
                </div>
                {
                    AomuntAll ? <div className='inp-but'>
                        <InputNumber
                            value={AomuntAll}
                            onChange={handleInputChangeChild}
                            mode='button'
                            defaultValue={0}
                            max={2000}
                            style={{ width: '6rem', color: "#fff" }}
                        />
                        SUI
                    </div> : <div className='inp-but'>
                        <InputNumber
                            onChange={handleInputChangeChild}
                            mode='button'
                            defaultValue={0}
                            max={2000}
                            style={{ width: '6rem', color: "#fff" }}
                        />
                        SUI
                    </div>
                }

                <div>
                    <IconClose className='cursorDiv' onClick={() => { clk(objId) }} id='icon' />
                </div>
            </Box>
        </ClickAwayListener>
    )
}

export default ItemNft