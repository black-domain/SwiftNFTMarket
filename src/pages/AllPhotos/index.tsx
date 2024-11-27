import React from 'react'
import './index.less'
import { Link } from '@mui/material'
import { Divider, Space } from '@arco-design/web-react'

function index() {
    return (
        <div style={{ color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "10rem" }}>
            <a className='sp-a' style={{ marginBottom: "2rem", fontSize: "2rem" }}>All Photos</a>
            <Space className={'sp-a'}>
                <a color="#fff" href="#">Photo 1</a>
                <a color="#fff" href="#">Photo 2</a>
                <a color="#fff" href="#">Photo 3</a>
                <a color="#fff" href="#">Photo 4</a>
                <a color="#fff" href="#">Photo 5</a>
            </Space>
            <Space className={'sp-img'}>
                <img src="https://shu-gallery.vercel.app/photos/5.jpg" alt="" />
                <p>
                    Photo 5: lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </Space>
            <div style={{ width: "30rem" }}>
                <Divider style={{ background: "#e5e7eb", marginBottom: "1rem" }} />
                
            </div>
        </div>
    )
}

export default index