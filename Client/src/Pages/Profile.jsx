import React from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';


function Profile() {
  // Sample data for the line chart (e.g., user activity over time)
  const lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Activity',
              data: [65, 59, 80, 0, 56, 55, 40],
              fill: false,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(75,192,192,1)',
          },
      ],
  };

  const pieData = {
      labels: ['Preference A', 'Preference B', 'Preference C','Preference D'],
      datasets: [
          {
              data: [30, 50, 60,10],
              backgroundColor: ['#FF6384','#FF6352', '#36A2EB', '#FFCE56'],
          },
      ],
  };

  // Customize chart options if necessary
  const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
  };

  return (
    <div className="p-5 ">
    <h1 className="text-2xl font-bold mb-5">My Profile Dashboard</h1>
    
    {/* Profile information section */}
    <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <p className="mb-1">Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        {/* Add more user information as needed */}
    </div>
    
    {/* Line chart container */}
    <div className="mb-10 h-96 glass text-center ">
        <h2 className="text-xl font-semibold mb-2">Activity Over Time</h2>
        <Line data={lineData} options={chartOptions} />
    </div>
    
    
    {/* Pie chart container */}
    <div className="h-96">
        <h2 className="text-xl font-semibold mb-2">Preference Distribution</h2>
        <Pie data={pieData} options={chartOptions} />
    </div>
</div>
  );
}

export default Profile;

