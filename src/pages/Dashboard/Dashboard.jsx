import React, { useState, useEffect } from "react";
// import {
//   qpMapChart,
//   qpLineChart,
//   qpDoughnutPieChart,
//   qpBarChart,
// } from "../../utils/charts";
import "./Dashboard.css";
import Footer from "../../layout/Footer/Footer";
import { qpAddScrollbar, qpTaskList } from "../../utils/misc";
import useReq from "../../hooks/useReq";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  
  },
};
function Dashboard()  {
  
  const [countData, setcountData] = useState();
  const { sendRequest } = useReq();

  useEffect(() => {
    sendRequest("admin/dashboard", "GET", null, onResponse);
  }, []);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setcountData(res.data.data.countData);
  };
    return (
      <main className="main-content p-5" role="main">
        <div className="row">
						<div className="col-md-6 col-lg-6 col-xl-3 mb-5">
							<div className="card card-tile card-xs bg-primary bg-gradient text-center">
								<div className="card-body p-4">
									<div className="tile-left">
										<i className="batch-icon batch-icon-tag-alt-2 batch-icon-xxl"></i>
									</div>
									<div className="tile-right">
                  <div className="tile-number">{ countData?.orders}</div>
										<div className="tile-description">Orders</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-6 col-xl-3 mb-5">
							<div className="card card-tile card-xs bg-secondary bg-gradient text-center">
								<div className="card-body p-4">
									<div className="tile-left">
										<i className="batch-icon batch-icon-users batch-icon-xxl"></i>
									</div>
									<div className="tile-right">
										<div className="tile-number">{ countData?.sellers}</div>
										<div className="tile-description">Sellers</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-6 col-xl-3 mb-5">
							<div className="card card-tile card-xs bg-primary bg-gradient text-center">
								<div className="card-body p-4">
									<div className="tile-left">
										<i className="batch-icon batch-icon-map batch-icon-xxl"></i>
									</div>
									<div className="tile-right">
										<div className="tile-number">{ countData?.drivers}</div>
										<div className="tile-description">Drivers</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-6 col-xl-3 mb-5">
							<div className="card card-tile card-xs bg-secondary bg-gradient text-center">
								<div className="card-body p-4">
									<div className="tile-left">
										<i className="batch-icon batch-icon-store batch-icon-xxl"></i>
									</div>
									<div className="tile-right">
										<div className="tile-number">{ countData?.buyers}</div>
										<div className="tile-description">Buyers</div>
									</div>
								</div>
							</div>
						</div>
					</div>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-xl-8 mb-5">
            <div className="card">
              <div className="card-header">
                Sales Overview
                
              </div>
              <div className="card-body">
                        <Line
                  datasetIdKey='id'
                  options={options}
          data={{
            labels: countData?.salesData?.labels,
            
            datasets: [
              {
                id: 1,
                label: 'Sales',
                data: countData?.salesData?.dataset, 
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                id: 2,
                label: 'Orders',
              data: countData?.ordersData?.dataset,
                 borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }}
        />
                {/* <div
                  className="card-chart"
                  data-chart-color-1="#07a7e3"
                  data-chart-color-2="#32dac3"
                  data-chart-legend-1="Sales ($)"
                  data-chart-legend-2="Orders"
                  data-chart-height="281"
                >
                  <canvas id="sales-overview" />
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-4 mb-5">
            <div className="card card-md">
              <div className="card-header">
                Users Onboarding Status
              </div>
              <div className="card-body text-center">
                <Doughnut data={{
  labels: countData?.users?.labels,
  datasets: [
    {
      label: '# of Votes',
      data: countData?.users?.dataset,
      backgroundColor: [
 
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}} />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-12">
            <Footer />
          </div>
        </div>
      </main>
    );
  
}

export default Dashboard;
