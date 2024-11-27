import { Button, CodeArea, Input, Upload } from "@web3uikit/core"
import { useEffect, useState } from "react";
import { MerkleTree } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256';
import { packageObjectId, storage, LaunchpadListActivityList } from "../../utils/request";
import { LoadingDialog } from "../../components/LoadingDialog";
import { TransactionBlock } from "@mysten/sui.js";
import { useWallet } from "@suiet/wallet-kit";
import { useHandleNotify } from "../../hooks/useNotify";
import { BCS, getSuiMoveConfig } from '@mysten/bcs';
import { sha3_256 } from 'js-sha3';
import { useLocation, useNavigate } from "react-router-dom";

export const WhiteList=()=>{
    const [data,setData] = useState<string[]>([])
    const [loading, setLoading] = useState<any>(false)
    const { connected, address, signAndExecuteTransactionBlock } = useWallet();
    const { handleNewNotification } = useHandleNotify()
    const {state}:any = useLocation()
    const navigator = useNavigate()
    async function uploadFile(file: any) {
        return await storage.storeBlob(new Blob([file]))
    }
    useEffect(()=>{
        if(state?.sale===undefined){
           navigator("/")
        }
    },[])
    


    const createWhiteList = ()=>{
        const tx = new TransactionBlock() as any;
        console.log(tx);
        
        // execute function
        const bcs = new BCS(getSuiMoveConfig());

        //@ts-ignore
        const leaves = JSON.parse(data).map(t=>bcs.ser(BCS.ADDRESS, t).toBytes()).map(x => sha3_256(x));

        const tree = new MerkleTree(leaves, sha3_256, { sortPairs: true });
        const root = Array.from(tree.getRoot());


        
        tx.moveCall({
            target: `${packageObjectId}::launchpad::create_whitelist`,
            typeArguments: ["0xf75b6e1c935c8922c52ca40e2bb9c2dd62eafe8f3db55238d09f97c55004e941::my_swift::AnimalFruit","0x2::sui::SUI"],
            arguments: [
                state?.t?.slingshot_id,
                LaunchpadListActivityList,
                state?.sale,
                root,
                "https://ipfs.io/ipfs/bafkreif4fovhnch5dcp7f47lo2aaxm2sp7w2cpjwse4cws3qgyjyir2fpq"
            ].map((item: any) => tx.pure(item))
        }) 

        signAndExecuteTransactionBlock({ transactionBlock: tx, options: {
            showInput: true,
            showEffects: true,
            showEvents: true,
            showObjectChanges: true,
            showBalanceChanges: true
        } }).then((res) => {
            setLoading(false)
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            setLoading(false)
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })

    }
    const buyWhiteList = ()=>{
        const tx = new TransactionBlock() as any;
        const bcs = new BCS(getSuiMoveConfig());
        
        console.log(tx);
       

        //@ts-ignore
        const leaves = JSON.parse(data).map(t=>bcs.ser(BCS.ADDRESS, t).toBytes()).map(x => sha3_256(x));

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
                state?.t?.slingshot_id,
                state?.sale,
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
            setLoading(false)
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            setLoading(false)
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })

    }

   

    const testBuy =()=>{
        const tx = new TransactionBlock() as any;
        
        const bcs = new BCS(getSuiMoveConfig());

        const ADDRESS_ONE =
        '0x10974b7c796893b50a74544e798bdbfa853b323796ff5ae731d7cd4acee9f206';


        const ADDRESS_TWO =
        '0x94fbcf49867fd909e6b2ecf2802c4b2bba7c9b2d50a13abbb75dbae0216db82a';


        const DATA_ONE = bcs.ser(BCS.ADDRESS, ADDRESS_ONE).toBytes();

        const DATA_TWO = bcs.ser(BCS.ADDRESS, ADDRESS_TWO).toBytes()
      
        
            
        const leaves = [DATA_ONE, DATA_TWO].map(x => sha3_256(x));

        const tree = new MerkleTree(leaves, sha3_256,{sortPairs:true});
        
        const root = tree.getRoot().toString("hex");
        
        const leaf = sha3_256(DATA_ONE);
        const proof = tree.getHexProof(leaf);
        const x = proof.map((x:any)=> Array.from(bcs.ser(BCS.ADDRESS, x).toBytes()));


        
        const DATA_T2 = bcs.ser(BCS.ADDRESS, leaf).toBytes()
        
           
            
        // execute function
        
        tx.moveCall({
            target: `0x1e92b8174763fca77602bdc6d5a7c88c3197f0332e9753cda2699cbaf7cad6f8::merkle_proof::verify`,
            typeArguments: [],
            arguments: [
                x,
                Array.from(tree.getRoot()),
                Array.from(DATA_T2)
            ].map((item: any) => tx.pure(item))
        })

        signAndExecuteTransactionBlock({ transactionBlock: tx, options: {
            showInput: true,
            showEffects: true,
            showEvents: true,
            showObjectChanges: true,
            showBalanceChanges: true
        } }).then((res) => {
            setLoading(false)
            console.log(res, 'success transaction');
            handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

        }).catch((err) => {
            setLoading(false)
            console.log(err, 'fail transaction');
            handleNewNotification('error', `${err}`, "Error");
        })
    }


    return <>
        <br />
        <br />
        {/* <Input placeholder="URL" onChange={(e)=>x(e.currentTarget.value)}/> */}
        <Upload
            onChange={async function noRefCheck(e:any){
                setLoading(true)
                const reader = new FileReader();
                reader.onload = (event:any) => {
                    const content = event.target.result;
                    setData((content));
                };
                reader.readAsText(e);
                setLoading(false)
                const fileHash = await uploadFile(e)


            }}
        theme="textOnly"
        />
{/* <Button text="Clear" onClick={()=>setData([])}></Button> */}
<br />

<Button text="Create WhiteList" onClick={createWhiteList}></Button>
<br />

<Button text="Buy WhiteList" onClick={buyWhiteList}></Button>
<br />

{/* <Button text="Test Merkle_proof" onClick={testBuy}></Button> */}
<br />

{loading ? <LoadingDialog /> : null}
{/* @ts-ignore*/}
{data.length>0&&<CodeArea  onBlur={function noRefCheck(){}}  onChange={function noRefCheck(){}}  text={data}/>}

    </>
}