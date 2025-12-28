import { BarChart } from '@mui/x-charts/BarChart';
// import { dataset, valueFormatter } from '../dataset/weather';


export const dataset = [
    {
        value: 21,
        title: 'Verifikasi Kaban',
    },
    {
        value: 28,
        title: 'Verifikasi Dokumen1',
    },
    {
        value: 41,
        title: 'Verifikasi Dokumen2',
    },
    {
        value: 73,
        title: 'Verifikasi Dokumen3',
    },
    {
        value: 99,
        title: 'Verifikasi Dokumen4',
    },
    {
        value: 144,
        title: 'Verifikasi Dokumen5',
    },
    {
        value: 319,
        title: 'Verifikasi Dokumen6',
    },
    {
        value: 249,
        title: 'Verifikasi Kepala Badan',
    },
    {
        value: 131,
        title: 'Verifikasi Dokumen8',
    },

];


function valueFormatter(value) {
    return `${value} Doc`;
}




const chartSetting = {
    height: 270,
    margin: { left: 0 },
};

export default function HorizontalBars({ valuex }) {
    return (


        <BarChart
            dataset={valuex}
            yAxis={[{ scaleType: 'band', dataKey: 'title', width: 150, }]}
            series={[{ dataKey: 'value', label: 'Data berproses', valueFormatter, color: '#beb6f3' }]}
            layout="horizontal"
            {...chartSetting}
        />
    );
}