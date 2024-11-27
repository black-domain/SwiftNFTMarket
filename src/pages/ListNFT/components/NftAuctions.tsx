/** @format */

import * as React from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import SelectObj from "./NftListSelect";
// import './index.scss'
/**
 * @tangs
 * 页面详情页信息
 * 显示版本相关内容或相关合作伙伴、相关联网页跳转标签等
 * */

 const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

const Auctions = () => {
    return (
        <>
            <div  className="Component" id="Auctions">
                <SelectObj />
                <h2 style={{marginTop:'15px'}}>Minimum bid</h2>
                <input  className="input" type="text" placeholder="Enter Minimum bid" />
                <div style={{display:'flex',marginTop:'20px',justifyContent:'space-between',width:'630px'}}>
                    <div>
                        <h2>Starting date</h2>
                        <Space direction="vertical" >
                            <DatePicker onChange={onChange} />
                        </Space>
                    </div>
                    <div>
                        <h2>Expiration date</h2>
                        <Space direction="vertical" >
                            <DatePicker onChange={onChange} />
                        </Space>
                    </div>
                </div>
            </div>
        </>
    )
    
};
export default Auctions;
