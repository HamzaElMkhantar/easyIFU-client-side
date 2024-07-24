import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ companyId, token }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/dashboard-label-count/${companyId}`, config);
        const result = response.data;

        const labels = result.map(item => `${item.month}/${item.year}`);
        const createdCounts = result.map(item => item.created);
        const approvedCounts = result.map(item => item.approved);
        const releasedCounts = result.map(item => item.released);
        const rejectedCounts = result.map(item => item.rejected);

        setData({
          labels,
          datasets: [
            {
              label: 'Labels Created',
              data: createdCounts,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
            {
              label: 'Labels Approved',
              data: approvedCounts,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
            },
            {
              label: 'Labels Released',
              data: releasedCounts,
              borderColor: 'rgba(255, 206, 86, 1)',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              fill: true,
            },
            {
              label: 'Labels Rejected',
              data: rejectedCounts,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [companyId, token]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date (Month/Year)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Labels',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='mt-3 linearChar py-3'>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
