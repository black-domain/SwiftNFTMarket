import { TransactionBlock } from "@mysten/sui.js"
import { useState } from "react"
import styled from "styled-components"
import { launchpadAdminCap, packageObjectId } from "../../utils/request"
import { useWallet } from "@suiet/wallet-kit"
import { useHandleNotify } from "../../hooks/useNotify"
import DialogBox from "./components/DialogBox"
import DialogboxTable from "./components/DialogboxTable"

const Wrapper = styled.div`
  margin: 80px auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  .container{
    min-width: 50vw;
  }
    .singup {
  color: #000;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  font-weight: bold;
  font-size: x-large;
  margin-top: 1.5em;
}

.card {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 350px;
  width: 600px;
  flex-direction: column;
  gap: 35px;
  border-radius: 15px;
  background: #e3e3e3;
  box-shadow: 0 0 20px #c8c8c8;
}

.inputBox,
.inputBox1 {
  position: relative;
  width: 550px;
}

.inputBox input,
.inputBox1 input {
  width: 100%;
  padding: 10px;
  outline: none;
  border: none;
  color: #000;
  font-size: .5em;
  background: transparent;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  transition: 0.1s;
  border-bottom-left-radius: 8px;
}

.inputBox span,
.inputBox1 span {
  margin-top: 5px;
  position: absolute;
  left: 0;
  transform: translateY(-4px);
  margin-left: 10px;
  padding: 10px;
  pointer-events: none;
  font-size: 12px;
  color: #000;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 3px;
  border-radius: 8px;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
  transform: translateX(253px) translateY(-20px);
  font-size: 0.5em;
  padding: 5px 10px;
  background: #000;
  letter-spacing: 0.2em;
  color: #fff;
  border: 2px;
}



.inputBox input:valid,
.inputBox input:focus {
  border: 2px solid #000;
  border-radius: 8px;
}

.enter {
  height: 45px;
  width: 120px;
  border-radius: 5px;
  border: 2px solid #000;
  cursor: pointer;
  background-color: transparent;
  transition: 0.5s;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
  margin-bottom: 3em;
}

.enter:hover {
  background-color: rgb(0, 0, 0);
  color: white;
}
`

export const LaunchpadAdmin = () => {
  const [data, setData] = useState<any>({
    manageCap: launchpadAdminCap,
    admin: "",
    live: true,
    whitelist: [],
    max_counts: [],
    start_times: [],
    end_times: [],
    allow_counts: [],
    prices: [],
  })
  const [typeArg, setTypeArg] = useState({
    nft: "",
    coin: ""
  })



  const { signAndExecuteTransactionBlock ,address} = useWallet()
  const { handleNewNotification } = useHandleNotify()


  const arrListFun = (obj: any) => {
    setData({ ...data, whitelist: obj.whitelist, max_counts: obj.max_counts, start_times: obj.start_times, end_times: obj.end_times, allow_counts: obj.allow_counts, prices: obj.prices })
  }



  const onClick = () => {
    const tx = new TransactionBlock() as any;

    const data2 = {...data,prices:data.prices.map((item:any)=>item*1_000_000_000)}
    tx.moveCall({
      target: `${packageObjectId}::launchpad::create_multi_sales_launchpad`,
      typeArguments: Object.values(typeArg),
      arguments: Object.values(data2).map((item: any) => tx.pure(item))
    })
    console.log(tx);
    

    signAndExecuteTransactionBlock({ transactionBlock: tx,options: {
      showInput: true,
      showEffects: true,
      showEvents: true,
      showObjectChanges: true,
      showBalanceChanges: true
  } }).then((res) => {
      console.log(res, 'success transaction');
      handleNewNotification('success', 'Success Create Collection,Please Wait 10-30 Second', 'Success')

    }).catch((err) => {
      console.log(err);
      handleNewNotification('error', `${err}`, "Error");
    })
  }
  return (
    <Wrapper>

      <div className="container">
        <div className="card">
          <a className="singup">Launchpad</a>
          {/* <div className="inputBox">
            <input type="text" required={true} onChange={(e: any) => setData({ ...data, manageCap: e.currentTarget.value })} />
            <span className="user">ManageCap</span>
          </div> */}


          <div className="inputBox">
            <input type="text" required={true} onChange={(e: any) => setData({ ...data, admin: e.currentTarget.value.trim() })} />
            <span>admin</span>
          </div>
          <div className="inputBox">
            <input type="text" required={true} onChange={(e: any) => setData({ ...data, live: e.currentTarget.value.trim() === "true" ? true : false })} />
            <span>live</span>
          </div>
          <div className="inputBox">
            <input type="text" required={true} onChange={(e: any) => setTypeArg({ ...typeArg, nft: e.currentTarget.value.trim() })} />
            <span>NFT Type</span>
          </div>
          <div className="inputBox">
            <input type="text" required={true} onChange={(e: any) => setTypeArg({ ...typeArg, coin: e.currentTarget.value.trim() })} />
            <span>Coin Type</span>
          </div>

          <DialogBox data={data} setData={setData} arrListFun={arrListFun} />
          <button className="enter" onClick={onClick}>Enter</button>

        </div>

      </div>
      <DialogboxTable sx data={{
        whitelist: data.whitelist,
        max_counts: data.max_counts,
        start_times: data.start_times,
        end_times: data.end_times,
        allow_counts: data.allow_counts,
        prices: data.prices,
      }} arrListFun={arrListFun} />
    </Wrapper>
  )
}