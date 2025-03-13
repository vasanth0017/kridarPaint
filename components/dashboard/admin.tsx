"use client";

// ProductSalesDashboard.jsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Admin = () => {
  // Sample data - this would come from your API or database
  const salesData = [
    { product: "Laptop", date: "2025-01-15", city: "New York", count: 45 },
    { product: "Laptop", date: "2025-02-20", city: "New York", count: 32 },
    { product: "Laptop", date: "2025-03-10", city: "New York", count: 28 },
    { product: "Laptop", date: "2025-01-05", city: "Chicago", count: 39 },
    { product: "Laptop", date: "2025-02-10", city: "Chicago", count: 41 },
    { product: "Laptop", date: "2025-03-22", city: "Chicago", count: 35 },
    { product: "Smartphone", date: "2025-01-03", city: "New York", count: 65 },
    { product: "Smartphone", date: "2025-02-12", city: "New York", count: 58 },
    { product: "Smartphone", date: "2025-03-25", city: "New York", count: 72 },
    { product: "Smartphone", date: "2025-01-07", city: "Los Angeles", count: 51 },
    { product: "Smartphone", date: "2025-02-18", city: "Los Angeles", count: 63 },
    { product: "Smartphone", date: "2025-03-15", city: "Los Angeles", count: 59 },
    { product: "Headphones", date: "2025-01-10", city: "Chicago", count: 38 },
    { product: "Headphones", date: "2025-02-05", city: "Chicago", count: 42 },
    { product: "Headphones", date: "2025-03-18", city: "Chicago", count: 36 },
    { product: "Monitor", date: "2025-01-22", city: "Seattle", count: 29 },
    { product: "Monitor", date: "2025-02-08", city: "Seattle", count: 34 },
    { product: "Monitor", date: "2025-03-17", city: "Seattle", count: 31 },
    { product: "Keyboard", date: "2025-01-14", city: "Boston", count: 22 },
    { product: "Keyboard", date: "2025-02-25", city: "Boston", count: 26 },
    { product: "Keyboard", date: "2025-03-05", city: "Boston", count: 24 },
    { product: "Mouse", date: "2025-01-30", city: "Miami", count: 18 },
    { product: "Mouse", date: "2025-02-15", city: "Miami", count: 21 },
    { product: "Mouse", date: "2025-03-20", city: "Miami", count: 19 },
  ];

  // Get unique products
  const products = [...new Set(salesData.map(item => item.product))];
  
  // State
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [chartData, setChartData] = useState([]);
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

  // When product selection changes, update available cities
  useEffect(() => {
    const productCities:any = [...new Set(
      salesData
        .filter(item => item.product === selectedProduct)
        .map(item => item.city)
    )];
    
    setCities(productCities);
    setSelectedCity(productCities[0]);
  }, [selectedProduct]);

  // When product or city selection changes, update chart data
  useEffect(() => {
    if (!selectedProduct || !selectedCity) return;

    // Filter data by product and city
    const filteredData = salesData.filter(
      item => item.product === selectedProduct && item.city === selectedCity
    );

    // Group by month and sum counts
    const monthlyData = filteredData.reduce((acc:any, item) => {
      const monthName = new Date(item.date).toLocaleString('default', { month: 'long' });
      
      if (!acc[monthName]) {
        acc[monthName] = { name: monthName, value: 0 };
      }
      
      acc[monthName].value += item.count;
      return acc;
    }, {});

    setChartData(Object.values(monthlyData));
  }, [selectedProduct, selectedCity]);

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }:any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded border border-gray-200">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value} units`}</p>
        </div>
      );
    }
    return null;
  };
  console.log("chartdata",chartData)
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Product Sales Dashboard</h2>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Product
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {products.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={cities.length === 0}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }:any) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>
      
      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">Sales Summary</h3>
        {chartData.length > 0 && (
          <div>
            <p>
              <span className="font-medium">Product:</span> {selectedProduct}
            </p>
            <p>
              <span className="font-medium">City:</span> {selectedCity}
            </p>
            <p>
              <span className="font-medium">Total Sales:</span> {chartData.reduce((sum:any, item:any) => sum + item.value, 0)} units
            </p>
            <p>
              <span className="font-medium">Highest Month:</span> {
                chartData.reduce((max:any, item:any) => (item?.value > max?.value ? item : max), chartData[0]).name
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;