import { Card, Illustration } from '@web3uikit/core'
import React, { useEffect, useState } from 'react'
import Pload from './Pload'
import './index.less'
import { Button, Divider, InputNumber } from '@arco-design/web-react';
import { Stack } from '@mui/material';

function index() {

    const [selectedItems, setSelectedItems] = useState([] as any);
    const [visible, setVisible] = useState(false);

    const chae = (itemId: any) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id: any) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    }


    useEffect(() => {



    }, [])



    return (
        <>
            <div style={{ height: "25rem", width: "72rem", padding: '0.625rem', display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }} >
                {
                    [1, 2, 3].map((item, index) => {
                        return <Pload chae={chae} item={item} />
                    })
                }
            </div>
            <div style={{ position: "absolute", right: "1.25rem", top: "calc(7.5rem)", borderRadius: "1rem", width: '24rem', background: "#2b2b3c", padding: "2rem 1rem", }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h2 >List ({selectedItems.length})</h2>
                    <span style={{ color: "#cb9ad0", cursor: 'pointer' }} onClick={() => setSelectedItems([])}>clear</span>
                </div>
                {
                    selectedItems.length > 0 ? selectedItems.map((item: any, index: any) => {
                        return <div className='list-img'>
                            <div>
                                <img src="/assets/3.png" alt="" />
                                <span style={{ marginLeft: "0.5rem" }}>SUI PUNKS #1889</span>
                            </div>
                            <InputNumber
                                mode='button'
                                defaultValue={0}
                                max={2000}
                                style={{ width: '6rem', color: "#fff" }}
                            />
                        </div>
                    }) : <Stack alignItems={"center"} >
                        <img src={"/assets/nothing.png"} />
                    </Stack>
                }
                <Divider style={{ border: "1px solid #3a3a54" }} />
                {
                    BoxLayout({
                        mb: "0.6rem", text1: 'Artist Royalty', text2: 'Buyer Paid', col: "#b0b0b0"
                    })
                }
                {
                    BoxLayout({ mb: "1.5rem", text1: 'Plaform Fee', text2: '2.5 %' })
                }
                {
                    BoxLayout({ mb: "1rem", text1: 'You Receive', text2: `${4} SUI`, fs: "1.2rem" })
                }
                <Button shape='round' type='primary' style={{ width: "100%", background: "#f1b5f4" }}>
                    Primary
                </Button>
            </div>
        </>
    )
}

export default index

interface BoxLayoutType {
    mb: string
    text1: string
    text2: string
    fs?: string
    col?: string
}
const BoxLayout = (props: BoxLayoutType) => {
    const { mb, text1, text2, fs = '1rem', col = '#fff' } = props
    return <div>
        <div style={{ display: "flex", justifyContent: "space-between", color: col, marginBottom: mb, fontSize: fs }}>
            <span>{text1}</span>
            <span>{text2}</span>
        </div>
    </div>
}