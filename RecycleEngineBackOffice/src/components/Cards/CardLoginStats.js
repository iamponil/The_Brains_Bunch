import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js';

const CardLoginStats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/auth/user/login-stats');
      setStats(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (stats.labels && stats.values) {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: stats.labels,
          datasets: [{
            label: 'User Login Stats',
            data: stats.values,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  }, [stats]);

  return (
    <div>
       <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent"></div>
      {/* <h2>User Login Stats</h2> */}
      <div className="relative w-full max-w-full flex-grow flex-1 text-center">
             
              <h2 className="text-blueGray-700 text-xl font-semibold">
              User Login Stats
              </h2>
            </div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div></div>
  );
};


export default CardLoginStats;
