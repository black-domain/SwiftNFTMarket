import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useDeleteNFTList } from "../stores/useDialog";


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


export function DeleteNFTListDialog({ open }: { open: number }) {
  const dlg = useRef<any>()
  const v = useDeleteNFTList(s => s.toggle)
  useEffect(() => {
    v > 1 ? dlg.current.open = true : null
  }, [v])
  return ReactDOM.createPortal(<>
    <Wrapper style={{ width: "12.5rem", color: "transparent" }}>
      {/*@ts-ignore*/}
      <wired-dialog ref={dlg} >
        <div style={{
          display: "flex",
          background: "",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          borderRadius: "2rem"
        }}>

          <NFT_Table>
          </NFT_Table><br />
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginRight: "-1.25rem" }}>

            {/*@ts-ignore*/}
            <p>123123 223321</p>
            {/*@ts-ignore*/}
            <wired-button style={{ width: "12.5rem" }} onClick={() => dlg.current.open = false}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;save&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</wired-button>
          </div>

        </div>
        <br />

        {/*@ts-ignore*/}
      </wired-dialog>
    </Wrapper>
  </>, document.getElementById('root') as HTMLElement)
}
