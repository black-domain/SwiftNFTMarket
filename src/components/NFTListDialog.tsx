import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {useAttrListStore, useNFTMintList} from "../stores/useDialog";
const NFT_Table = styled.table`
  > tr {

    > th {
      font-weight: 700;
      font-size: 1.25rem;
      text-align: center;
    }

    > td {
      line-height: 2.8em;
      >.wired-rendered>input{
        padding:  0.625rem;
        margin: 0 0.625rem;
        border: none;
        outline: none;
      }
    }
  }

`
const Wrapper = styled.div`
  
  > wired-dialog{
    border-radius: 2rem;
    > .vertical{
      
    }
    > wired-card{
      
    }
  }
`
const NFT_Dialog = styled.div`
    display: flex;
    /* background: "", */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:black;
    border-radius:2rem;
    > p:first-of-type{
        font-size:0.5625rem;
        color:grey;
        margin-top:0.625rem;
    }
    >p:nth-child(3){
        font-size:0.5625rem;
        margin-bottom:0.75rem;
        color:grey;
    }
    
`
const NFT_Button= styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    margin-right:-1.25rem;
    > wired-button {
        width:12.5rem;
    }
`
export  function NFTListDialog({open}:{open:number}){
    const dlg = useRef<any>()
    const count = useNFTMintList(s => s.count)
    const removeNftList = useNFTMintList(s => s.remove)
    const inc = useNFTMintList(s => s.inc)
    const [formList,setFormList] = useState<{id:number,key?:string,value?:string}[]>(count.map((t,i)=>{return {id: i}}))
    const fn1 = useAttrListStore((s:any)=>s.setlist1)
    const fn2 = useAttrListStore((s:any)=>s.setlist2)
    const list1 = useAttrListStore((s:any)=>s.list1)
    const list2 = useAttrListStore((s:any)=>s.list2)

    useEffect(()=>{
        if (open>1){
            dlg.current.open=true
        }
    },[open])
    useEffect(()=>{
        if (count.length>1){
            setFormList([...formList,{id:formList.length}])

        }
    },[count])
    useEffect(()=>{
        if (formList.length>formList.filter((t)=> t.constructor===Object&& t).length){
            setFormList(formList.filter((t)=> t.constructor===Object&& t))

        }
        fn1(formList.filter(t=>t.key).map(t=>t.key));
        fn2(formList.filter(t=>t.value).map(t=>t.value));
    },[formList])


    return ReactDOM.createPortal(<>
        <Wrapper style={{width: "12.5rem",color:"transparent"}}>
            {/*@ts-ignore*/}
            <wired-dialog ref={dlg} >
                <NFT_Dialog>

                    <h2>Attribute </h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipon ullamc
                        fugia
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipon
                    </p>

                    <NFT_Table>
                        <tr>
                            <th>KEY</th>
                            <th>Value</th>
                            <th/>
                        </tr>
                        {count.map((t: number, i: number) => {
                            return <tr key={i}>
                                {/*@ts-ignore*/}
                                <td><wired-card><input type="text" onChange={e=>setFormList([...formList,formList[i].key=e.currentTarget.value])}/></wired-card></td>
                                {/*@ts-ignore*/}
                                <td><wired-card><input type="text" onChange={e=>setFormList([...formList,formList[i]['value']=e.currentTarget.value])}/></wired-card>  </td>
                                {count.length===1?null:<td style={{width: "10",cursor:"pointer"}} onClick={()=>{removeNftList();formList.splice(i,1);setFormList(formList)}}>x</td>}

                            </tr>
                        })}
                    </NFT_Table><br/>
                    <NFT_Button>

                        {/*@ts-ignore*/}
                        <wired-button onClick={() => inc(2)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;add&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</wired-button>
                        {/*@ts-ignore*/}

                        <wired-button onClick={()=>dlg.current.open=false}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;save&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</wired-button>
                    </NFT_Button>

                </NFT_Dialog>
                <br/>

                {/*@ts-ignore*/}
            </wired-dialog>
        </Wrapper>
    </>,document.getElementById('root') as HTMLElement)
}
