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

// 해야하는 것들

// 0. fetch data를 typing하기(pre: writing interface IHistorical)
// 1. coin의 ohlcv 정보를 chart로 표시하기(pre: install library: apex chart)

// 알게 된 것들

// 1. apex chart라는 차트 라이브러리의 존재
// 2. chart에서 흔히 통용되는 용어에 대해 알게됨(x축의 밑에 있는 점자 표시는 scale or tick이라고 부른다, 배경의 칸은 grid라고 부른다)
// 3. toFixed로 소숫점 고정할 수 있다는 것 상기
// 4. fetching한 data를 가지고 Apex Chart에 사용하는 방식(map으로 특정 데이터를 배열화해서 사용)
