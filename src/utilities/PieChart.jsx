import React, { useEffect, useState } from 'react';
import { Pie as ChartJSPie } from 'react-chartjs-2';
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';

const LabelStatusPieChart = ({ token, companyId, chartLibrary, chartData, loading, error }) => {


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{padding:'27px 0'}} className='linearChar'>
      {chartLibrary === 'chartjs' && chartData && (
        <ChartJSPie data={chartData.chartJSData} />
      )}
      {chartLibrary === 'nivo' && chartData && (
        <div style={{ height: '350px', padding:'' }} >
          <ResponsivePie
            data={chartData.nivoData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={10}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 90,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default LabelStatusPieChart;
