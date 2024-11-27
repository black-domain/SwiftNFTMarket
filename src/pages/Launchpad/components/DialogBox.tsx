/*
 * @Author: qiancheng12 wancheng@storswift.com
 * @Date: 2023-05-12 11:23:12
 * @LastEditors: qiancheng12 wancheng@storswift.com
 * @LastEditTime: 2023-05-15 16:27:27
 * @FilePath: \nft-trading-website\src\pages\Launchpad\components\DialogBox.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Input, Select, Message, DatePicker } from '@arco-design/web-react';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
interface Props {
    arrListFun: (obj: any) => void
    data: any
    setData: any
}

const DialogBox = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const { arrListFun, data, setData } = props



    function onOk() {
        form.validate().then((res) => {
            setConfirmLoading(true);
            setTimeout(() => {
                Message.success('Success !');

                setData({
                    ...data,
                    whitelist: [...data.whitelist, ...transitionFun(res.whitelist, true)],
                    max_counts: [...data.max_counts, ...transitionFun(res.max_counts)],
                    start_times: [...data.start_times, Date.parse(new Date(res.start_times) + "")],
                    end_times: [...data.end_times, Date.parse(new Date(res.end_times) + "")],
                    allow_counts: [...data.allow_counts, ...transitionFun(res.allow_counts)],
                    prices: [...data.prices, ...transitionFun(res.prices)],
                })


                form.resetFields();

                setVisible(false);
                setConfirmLoading(false);
            }, 1500);
        });
    }


    const transitionFun = (value: any, isBool = false) => {
        if (isBool) {
            return value.split(",").map((t: string) => t === "true" ? true : false)
        }
        return value.split(",").map((t: number) => Number(t))
    }



    return (
        <div >
            <Button onClick={() => setVisible(true)} type='primary'>
                +
            </Button>
            <Modal
                title='Add Sale'
                visible={visible}
                onOk={onOk}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible(false)}
                style={{ width: "700px" }}
            >
                <Form
                    form={form}
                >
                    <FormItem label='start_times' rules={[{ required: true, message: 'Please enter start_times' }]} field='start_times' >
                        <DatePicker showTime style={{ width: 300 }} />
                    </FormItem>
                    <FormItem label='whitelist' rules={[{ required: true, message: 'Please enter whitelists' }]} field='whitelist' >
                        <Input placeholder='' />
                    </FormItem>
                    <FormItem label='max_counts' rules={[{ required: true, message: 'Please enter max_counts' }]} field='max_counts' >
                        <Input placeholder='' />
                    </FormItem>

                    {/* <FormItem label='start_times' field='start_times' >
                        <Input placeholder='' />
                    </FormItem>
                   
                    <FormItem label='end_times' field='end_times' >
                        <Input placeholder='' />
                    </FormItem> */}

                    <FormItem label='allow_counts' rules={[{ required: true, message: 'Please enter allow_counts' }]} field='allow_counts' >
                        <Input placeholder='' />
                    </FormItem>
                    <FormItem label='prices' rules={[{ required: true, message: 'Please enter prices' }]} field='prices' >
                        <Input placeholder='' />
                    </FormItem>

                    <FormItem label='end_times' rules={[{ required: true, message: 'Please enter end_times' }]} field='end_times' >
                        <DatePicker showTime style={{ width: 300 }} />
                    </FormItem>
                </Form>
            </Modal>
        </div>
    )
}

export default DialogBox