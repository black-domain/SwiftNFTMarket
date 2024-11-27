import * as React from 'react';

import { useWallet } from '@suiet/wallet-kit';
import { ChangeEvent, useEffect, useState } from 'react';
import { ScrollTop } from '../../../utils/scrollTop';
import { client } from '../../../utils/api';
import {GET_USER_TRANSACTION} from '../../../utils/graphql';
import { OperationType, TransactionHistory, UserTransactionSortType } from '../../../utils/queryApi';
import EllipsisMiddle from '../../../components/EllipsisMiddle';
import DateUtil from '../../../utils/formatData';
import { Table } from '@arco-design/web-react';
import { LoadingInComponents } from '../../../components/LoadingDialog';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}


const TableCellData = ['Type', 'Collection', 'Item', 'Price', 'Num', 'From', 'To', 'Time']

const TxnTable = () => {
    const { address, connected } = useWallet();

    const [clientData, setclientData] = useState({
        user_address: address,
        item_id:"",
        nft_type: "",
        operation: [],
        limit: 10,
        cursor: 0,
        reversed: false, // 降序
        sort_type: UserTransactionSortType.timestamp
    })
    const [dataa, setData] = useState({
        total: 0,
        dataList: [] as TransactionHistory[]
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ScrollTop()
        if (!connected) { (document.querySelector('#connectWalletButton') as any)?.click() }
        getUserTransactionFun(clientData)
    }, [])

    useEffect(() => {
        getUserTransactionFun(clientData)
    }, [clientData.cursor, clientData.sort_type, clientData.reversed,address])


    const getUserTransactionFun = (prop: any) => {
        setLoading(true)
        client.query({
            query: GET_USER_TRANSACTION(prop)
        }).then(e => {
            if (e.data.getUserTransaction) {
                console.log(e)
                setData({
                    ...dataa,
                    total: e.data.getUserTransaction.total_transactions,
                    dataList: e.data.getUserTransaction.transaction_entry
                })
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            console.log(err, 'GET_USER_TRANSACTION 请求错误');
        })
    }

    // 分页
    const onChange = (pagination: any, changedSorter: any) => {
        const { current } = pagination;
        const { direction, field } = changedSorter
        if (direction && field) {
            setclientData({ ...clientData, cursor: current - 1, sort_type: field, reversed: !clientData.reversed })
        } else {
            setclientData({ ...clientData, cursor: current - 1 })
        }
    };

    const columns = [
        {

            title: 'Type',
            dataIndex: 'operation',
            align: "center",
        },
        {
            title: 'Collection',
            dataIndex: 'collection_id',
            align: "center",
            render: (text: any) => (
                <EllipsisMiddle suffixCount={7}>{text}</EllipsisMiddle>
            )
        },
        {
            title: 'Item',
            dataIndex: 'item_id',
            align: "center",
            render: (text: any) => (
                <EllipsisMiddle suffixCount={7}>{text}</EllipsisMiddle>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            align: "center",
            sorter: true,
            render:(x:number)=>x/1e9
        },
        {
            title: 'Num',
            dataIndex: 'number',
            sorter: true,
            align: "center"
        },
        {
            title: 'From',
            dataIndex: 'from',
            align: "center",
            render: (text: any) => (
                <EllipsisMiddle suffixCount={7}>{text}</EllipsisMiddle>
            )
        },
        {
            title: 'To',
            dataIndex: 'to',
            align: "center",
            render: (text: any) => (
                <EllipsisMiddle suffixCount={7}>{text}</EllipsisMiddle>
            )
        },
        {
            title: 'Time',
            dataIndex: 'timestamp',
            sorter: true,
            align: "center",
            render: (text: any) => (
                <>{DateUtil.formatDate((Number(text) / 1000), "yyyy/MM/dd HH:mm:ss")}</>
            )
        },
    ] as any[];

    const noDataElement = dataa.dataList?.length > 0 ? <LoadingInComponents /> : <div style={{ color: "#fff" }}>NO DATA</div>;

    return (
        <div className='MuiTableCell'>
            <Table
                noDataElement={noDataElement}
                showSorterTooltip={false} hover={false}
                className={'MuiTableCell-head'}
                columns={columns}
                pagination={{ total: dataa.total, current: clientData.cursor + 1 }}
                data={dataa.dataList} onChange={onChange}
            />
        </div>
    );
}

export default TxnTable

