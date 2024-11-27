import { Button, Card, Grid, LinearProgress, Stack, Typography, linearProgressClasses, styled } from "@mui/material"
import { TransactionBlock } from "@mysten/sui.js";
import { packageObjectId, requestMarket } from "../../../utils/request";
import { useHandleNotify } from "../../../hooks/useNotify";
import { useWallet } from "@suiet/wallet-kit";
import { useEffect, useState } from "react";
import { CSSProperties } from "@mui/material/styles/createMixins";
import MerkleTree from "merkletreejs";
import { BCS, getSuiMoveConfig } from "@mysten/bcs";
import { sha3_256 } from "js-sha3";
import { useParams } from "react-router-dom";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: 'rgb(255, 163, 97)',
    },
}));

interface Props {
    data: any
    sx?: CSSProperties
    slingshotId:string
    saleId:string
}

export const ProgressCard = (props: Props) => {
    const { data, sx,slingshotId,saleId } = props
    const { handleNewNotification } = useHandleNotify()
    const { signAndExecuteTransactionBlock, address } = useWallet()
    useEffect(()=>{},[])
    
    const handleExecute = async () => {

        const tx = new TransactionBlock() as any;
        const [coin] = tx.splitCoins(tx.gas, [tx.pure(data.launchpad.fields?.price)]);
        const data1 = {
            slingshotId,
            saleId,
            count:1,
            clock: "0x06",
            coin
        }

        tx.moveCall({
            target: `${packageObjectId}::launchpad::multi_purchase`,
            typeArguments: ["0xf75b6e1c935c8922c52ca40e2bb9c2dd62eafe8f3db55238d09f97c55004e941::my_swift::AnimalFruit", "0x2::sui::SUI"],
            arguments: Object.values(data1).map((item: any, i: number) => i === 4 ? item : tx.pure(item))
        })
        tx.transferObjects([coin], tx.pure(address))

        console.log(tx);

        signAndExecuteTransactionBlock({ transactionBlock: tx }).then((res) => {
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })

    }
    const buyWhiteList = ()=>{
        const tx = new TransactionBlock() as any;
        const bcs = new BCS(getSuiMoveConfig());
        
        console.log(tx);
       

        //@ts-ignore
        const leaves = data.launchpad.fields.map(t=>bcs.ser(BCS.ADDRESS, t).toBytes()).map(x => sha3_256(x));

        const tree = new MerkleTree(leaves, sha3_256,{sortPairs:true});
        
        const root = tree.getRoot().toString("hex");
        
        const leaf = sha3_256(bcs.ser(BCS.ADDRESS, address).toBytes());
        const proof = tree.getHexProof(leaf);
        const x = proof.map((x:any)=> Array.from(bcs.ser(BCS.ADDRESS, x).toBytes()));
        // execute function
        const [coin] = tx.splitCoins(tx.gas, [tx.pure(1_000_000_000)]);
        tx.moveCall({
            target: `${packageObjectId}::launchpad::whitelist_purchase`,
            typeArguments: ["0xf75b6e1c935c8922c52ca40e2bb9c2dd62eafe8f3db55238d09f97c55004e941::my_swift::AnimalFruit","0x2::sui::SUI"],
            arguments: [
                slingshotId,
                saleId,
                1,
                "0x06",
                "0xc20851f4103b1ef81adf5c5ee298ce8daba858ab304fb8a249c6dccd24d61693",
                x,
                coin
            ].map((item: any,i:number) =>i!==6? tx.pure(item):item)
        })
        tx.transferObjects([coin], tx.pure(address))


        signAndExecuteTransactionBlock({ transactionBlock: tx, options: {
            showInput: true,
            showEffects: true,
            showEvents: true,
            showObjectChanges: true,
            showBalanceChanges: true
        } }).then((res) => {
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })

    }



    return (
        <Card sx={{ color: "#fff", width: "100%", borderRadius: "16px", padding: "1.5rem 2rem", bgcolor: "rgb(23, 24, 26)", ...sx }}>
            <Grid container rowGap={"1rem"}>
                <Stack sx={{ width: "100%", color: "rgba(255, 255, 255, 0.7)" }} direction={"row"} justifyContent={"space-between"}>
                    <Typography>Plase 3 Total Minted</Typography>
                    <Typography>{data.launchpad.fields?.minted_count}/{data.launchpad.fields?.max_count}</Typography>
                </Stack>
                <BorderLinearProgress sx={{ width: "100%", }} variant="determinate" value={(data.launchpad.fields?.minted_count/data.launchpad.fields.max_count)*100} />
                <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>CURRENT PRICE</Typography>
                <Stack sx={{ width: "100%", alignItems: "center" }} direction={"row"} justifyContent={"space-between"}>
                    <Typography sx={{ fontSize: "1.5rem" }}>{(Number(data.launchpad.fields?.price) / 1_000_000_000)} SUI</Typography>
                    <Button sx={{
                        p: ".5rem 3.125rem",
                        fontSize: "1.125rem",
                        borderRadius: "16px",
                        bgcolor: "rgb(255, 163, 97)",
                        color: "black",
                        ':hover': {
                            borderColor: "rgb(255, 163, 97)",
                        }
                    }} variant="contained" onClick={data.whitelist? buyWhiteList: handleExecute}>
                        Mint Now
                    </Button>
                </Stack>
            </Grid>
        </Card>
    )
}