import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/material';
import EllipsisMiddle from '../../../components/EllipsisMiddle';
import { InputNumber } from '@arco-design/web-react';
import { IconMoreVertical } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import ItemNft from './ItemNft';
import { ChainStructure, Root2 } from '../OwnerProfileType';
import { usePreview } from '../../../stores/useTheme';
import { useHandleNotify } from '../../../hooks/useNotify';
import { TransactionBlock } from '@mysten/sui.js';
import { marketID, packageObjectId } from '../../../utils/request';
import { useWallet } from '@suiet/wallet-kit';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    open: boolean
    handleClickOpen: () => void;
    handleClose: () => void;
    data: ChainStructure
    clk: (objId: string) => void
    col: any
}

export default function AlertDialogSlide(props: Props) {
    const { open, handleClickOpen, handleClose, data, clk, col } = props
    const [postParam, setPostParam] = useState([])
    const [values, setValues] = useState<ChainStructure>();
    const { handleNewNotification } = useHandleNotify()
    const { connected, signAndExecuteTransactionBlock } = useWallet()
    const [TotalAmount, setTotalAmount] = useState(0)
    const [AomuntAll, setAomuntAll] = useState(0 as any)
    const [TotalAomuntAll, setTotalAomuntAll] = useState(0 as any)


    const handleInputChange = (target: any, Id?: string) => {
        const newValues = [...data];
        if (Id) {
            newValues.map((i) => {
                if (i.objectId === Id) {
                    i.amount = target
                    const collectionId = col.filter((t: any) => i.type.indexOf(t.key) >= 0 && t.value)
                    i.collectionId = collectionId[0]?.value
                }
            })
            setValues(newValues);

            const totalAmount = newValues.reduce((sum, item) => {
                return sum + item.amount
            }, 0);

            setTotalAmount(totalAmount)
        } else {
            newValues.map((i) => {
                i.amount = target
                const collectionId = col.filter((t: any) => i.type.indexOf(t.key) >= 0 && t.value)
                i.collectionId = collectionId[0]?.value
            })
        }
    }

    useEffect(() => {
        handleInputChange(AomuntAll)
    }, [AomuntAll])


    const handleOk = () => { // 点击确认的时候

        if (connected) {
            const tx = new TransactionBlock() as any;

            const a: any = {}
            data.forEach((t, i) => {
                console.log(t, 't');
                if(!t.kioskId){
                    a["col" + i] = { col: t.type, arr: [t] }
                }
            })
            const kioskNft = data.filter((t) => t.kioskId)
            console.log(kioskNft, 'kioskNft');
            kioskNft.forEach((t, i) => {
                tx.moveCall({
                    target: `${packageObjectId}::ob_market::ob_list`,
                    typeArguments: [t.content.type,"0x2::sui::SUI"],
                    arguments: [
                        tx.pure("0x60619c70606fc8b1af97d549cc2484533fce9a35b49455977562903057d3d0dd"), //order_book
                        tx.pure(t.kioskId),//kiosk
                        tx.pure(t.amount * 1_000_000_000),
                        tx.pure(t.objectId), // nft_id
                    ]
                })
            })

            //delist ob_nft
            // tx.moveCall({
            //     target: `${packageObjectId}::ob_market::ob_delist`,
            //     typeArguments: ["0x75ed05a40d2551507b04d95aade04a5772a51f6c9cd09c92fbbbb65da1f27866::swift::Swift","0x2::sui::SUI"],
            //     arguments: [
            //         tx.pure("0x60619c70606fc8b1af97d549cc2484533fce9a35b49455977562903057d3d0dd"), //order_book
            //         tx.pure("0x398bc275da4fdffe64632b173aa89bed66bfc71801dc2aa17d8e3e95df226059"),//kiosk
            //         tx.pure( 1_000_000),
            //         tx.pure("0x4125fc9fe21158693ad52802d0710303ba8d2a0b98c419c2f3fb3aa30ebc2c58"), // nft_id
            //     ]
            // })
            const mergedArr: any = Object.values(a).reduce((acc: any, obj: any) => {
                const existingObj = acc.find((item: any) => item.col === obj.col);
                if (existingObj) {
                    existingObj.arr.push(...obj.arr);
                } else {
                    acc.push(obj);
                }
                return acc;
            }, []);


            mergedArr.forEach((t: any) => {
                tx.moveCall({
                    target: `${packageObjectId}::market::batch_list`,
                    typeArguments: [t.arr[0].type,"0x2::sui::SUI"],
                    arguments: [
                        tx.object(marketID),
                        tx.makeMoveVec({ objects: t.arr.map((t1: any) => tx.pure(t1.objectId)) }),
                        tx.pure(t.arr.map((t1: any) => t1.amount * 1_000_000_000)),
                    ]
                })
            })
            


            signAndExecuteTransactionBlock({
                transactionBlock: tx, options: {
                    showInput: true,
                    showEffects: true,
                    showEvents: true,
                    showObjectChanges: true,
                    showBalanceChanges: true
                }
            }).then((res) => {
                console.log(res);
                if (res.effects?.status.status === "success") {
                    handleClose()
                    handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')
                    setTimeout(()=>{
                        window.location.reload()
                    },3000)
                } else {
                    handleNewNotification('error', JSON.stringify("err"), "Error");

                }

            }).catch((err) => {
                console.log(err);

                handleNewNotification('error', `${err}`, "Error");
            })
            console.log(tx, 'transactionBlock Param');

        } else {
            handleNewNotification('error', 'Please conection Wallet', 'Error')
        }
    }



    return (
        <div className='slide' id='sli'>
            <Dialog
                sx={{ width: "60rem" }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ fontWeight: "600", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className='my-iconfont'>{"List"}</div>
                    <div  className='inp-but' >
                        <span  >Set Global Price</span>: &nbsp;&nbsp;
                        <InputNumber
                            placeholder='Price'
                            onChange={(e) => setAomuntAll(e)}
                            mode='button'
                            style={{ width: '6rem', color: "#fff", border: "1px solid #4d505b", borderRadius: "0.5rem" }}
                        />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {
                            data.map((item, index) => {
                                return <ItemNft AomuntAll={AomuntAll} key={index} col={col} handleInputChange={handleInputChange} index={index} clk={clk} item={item} />
                            })
                        }
                        <>
                            <Box sx={{ padding: "1rem" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ color: "#adacb1" }}>Artist Royalty</span>
                                    <span>Buyer Paid</span>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0" }}>
                                    <span style={{ color: "#adacb1" }}>Plaform Fee</span>
                                    <span>1.5%</span>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: "600" }}>You Receive</span><span>{AomuntAll ? AomuntAll * data.length * 98.5 / 100 : TotalAmount * 98.5 / 100} SUI</span></Box>
                            </Box>
                        </>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => handleOk()} style={{ background: "#e6964f", border: "none", padding: "1rem", width: "100%", borderRadius: "1rem", color: "#fff" }}>Primary</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
