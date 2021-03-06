import React from 'react';
import { fetchCoinHistory } from '../api';
import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: 'Price',
              data: data?.map((price) => ({
                x: new Date(price.time_close),
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['#0fbcf9'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

// ???????????? ??????

// 0. fetch data??? typing??????(pre: writing interface IHistorical)
// 1. coin??? ohlcv ????????? chart??? ????????????(pre: install library: apex chart)

// ?????? ??? ??????

// 1. apex chart?????? ?????? ?????????????????? ??????
// 2. chart?????? ?????? ???????????? ????????? ?????? ?????????(x?????? ?????? ?????? ?????? ????????? scale or tick????????? ?????????, ????????? ?????? grid?????? ?????????)
// 3. toFixed??? ????????? ????????? ??? ????????? ??? ??????
// 4. fetching??? data??? ????????? Apex Chart??? ???????????? ??????(map?????? ?????? ???????????? ??????????????? ??????)
