import React from 'react'
import { PieChart } from '@mui/x-charts';

function PieChartx() {
    return (
        <PieChart
            colors={['#6aaefb', '#81d2f1', '#beb6f3']}
            series={[
                {
                    data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' },
                    ],
                },
            ]}
            width={250}
            height={300}
        />
    )
}

export default PieChartx
