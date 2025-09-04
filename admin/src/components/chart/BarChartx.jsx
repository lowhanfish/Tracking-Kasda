import React from 'react'
import { BarChart } from '@mui/x-charts';

function BarChartx() {
    return (
        <BarChart
            xAxis={[{
                data: ['group A', 'group B', 'group C'],
                colorMap: {
                    type: 'ordinal',
                    colors: ['#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e']
                }
            }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            height={300}
        />
    )
}

export default BarChartx
