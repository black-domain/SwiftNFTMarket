import React, { useEffect, useState } from 'react';
import { Button, Table, TableColumnProps } from '@arco-design/web-react';
import { DialogboxTableData } from '../../../model/itype';
import DateUtil from '../../../utils/formatData';



const DialogboxTable = (props: any) => {
    const { data, arrListFun } = props;

    const [arrList, setarrList] = useState([{}] as any)

    useEffect(() => {
        const arr = data && data.max_counts?.map((_: any, i: any) => ({
            whitelist: data.whitelist?.[i],
            max_counts: data.max_counts?.[i],
            start_times: data.start_times?.[i],
            end_times: data.end_times?.[i],
            allow_counts: data.allow_counts?.[i],
            prices: data.prices?.[i],
        }));
        setarrList(arr || []);
    }, [data])



    const delfun = (index: number) => {
        const result = {
            whitelist: [],
            max_counts: [],
            start_times: [],
            end_times: [],
            allow_counts: [],
            prices: []
        } as any;
        const filteredArr = arrList.filter((item: any, i: any) => i !== index); // 删除指定下标

        setarrList(filteredArr)
        for (let i = 0; i < filteredArr.length; i++) {
            const item = filteredArr[i]
            result.whitelist.push(item.whitelist);
            result.max_counts.push(item.max_counts);
            result.start_times.push(item.start_times);
            result.end_times.push(item.end_times);
            result.allow_counts.push(item.allow_counts);
            result.prices.push(item.prices);
        }

        arrListFun(result)
    }





    const columns: TableColumnProps[] = [
        {
            title: 'start_times',
            dataIndex: 'start_times',
            align: "center",
            width: 120,
            render: (col, item, index) => {
                return DateUtil.formatDate(item.start_times / 1000)
            }
        },
        {
            title: 'whitelists',
            dataIndex: 'whitelists',
            width: 120,
            align: "center",
            render: (col, item, index) => {
                return item.whitelist + ""
            }
        },
        {
            title: 'max_counts',
            dataIndex: 'max_counts',
            width: 120,
            align: "center"

        },
        {
            title: 'allow_counts',
            dataIndex: 'allow_counts',
            width: 120,
            align: "center"

        },
        {
            title: 'prices',
            dataIndex: 'prices',
            width: 120,
            align: "center"

        },
        {
            title: 'end_times',
            dataIndex: 'end_times',
            width: 120,
            align: "center",
            render: (col, item, index) => {
                return DateUtil.formatDate(item.end_times / 1000)
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (_, record, index) => {



                return <Button onClick={() => delfun(index)} type='primary' status='danger'>
                    Delete
                </Button>

            }

        }
    ];




    return <Table style={{ margin: "20px 0" }} virtualized
        scroll={{
            y: 400,
            x: 400,
        }} columns={columns} pagination={false} data={arrList} />;
};

export default DialogboxTable;