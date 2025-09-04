import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { Box } from '@mui/material';

// Data dummy untuk setiap bulan dari Januari hingga Desember
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Data acak untuk setiap baris
const processData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4500, 4200, 3800, 3100, 2900];
const successData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 5200, 4900, 4100, 3500, 3300];
const rejectedData = [1000, 200, 500, 100, 200, 300, 150, 180, 250, 200, 150, 200];

// Konfigurasi series untuk setiap garis
const series = [
  {
    data: processData,
    label: 'Proccess',
    color: '#8884d8', // Warna ungu untuk proses
  },
  {
    data: successData,
    label: 'Success',
    color: '#82ca9d', // Warna hijau untuk sukses
  },
  {
    data: rejectedData,
    label: 'Rejected',
    color: '#ffc658', // Warna oranye untuk gagal
  },
];

export default function LineChartx() {
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <LineChart
        xAxis={[{ scaleType: 'point', data: months }]}
        series={series}
        height={400}
        margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </Box>
  );
}