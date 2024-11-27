import React from 'react'
import * as echarts from 'echarts';
import Echart from '../../../../components/Echart';


const BasicRadarChart = () => {

    const option = {
        title: {
            text: ''
        },
        legend: {
            data: ['', '']
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '1', max: 6500 },
                { name: '2', max: 16000 },
                { name: '3', max: 30000 },
                { name: '4', max: 38000 },
                { name: '5', max: 52000 },
                { name: '6', max: 25000 }
            ]
        },
        series: [
            {
                showSymbol: '',  // 不显示数据点的标记
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [6500, 3000, 20000, 35000, 50000, 18000],
                        name: 'Allocated Budget'
                    },
                ],
                itemStyle: {   // 针对每个柱子设置样式
                    color: '#fff',
                },
                areaStyle: {
                    color: '#aa754c',  // 设置折线下方填充颜色
                    opacity: 0.5,      // 设置填充颜色透明度
                    origin: 'auto'     // 设置参考坐标为最小值
                },
                symbol: 'none',  // 标记被禁用，并且只有折线连接了它们
            }
        ]
    };


    return (
        <div className='myChart' id="myChart" >
            <Echart title={'s'} cavStyle={{width:"100%", height:"14.4375rem"}} className={'echart_react'} propsOption={option} />
        </div>
    )
}

export default BasicRadarChart