"use client";

import { useProducts } from "@/context/sale-prod-context";
import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const Admin = () => {
  // State
  const salesData = useProducts();
  // Get unique products
  const products = [...new Set(salesData.map((item) => item.name))];
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [chartData, setChartData] = useState([]);
  const [barChart, setBarChart] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);

  useEffect(() => {
    if (!selectedProduct || !products.includes(selectedProduct)) {
      setSelectedProduct(products[0] || null);
    }
  }, [products]);

  // Colors for pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#FF6B6B",
  ];

  // When product selection changes, update available cities
  useEffect(() => {
    const productCities: any = [
      ...new Set(
        salesData
          .filter((item) => item.name === selectedProduct)
          .map((item) => item.city)
      ),
    ];
    setCities(productCities);
    setSelectedCity(productCities[0]);
  }, [selectedProduct]);

  // When product or city selection changes, update chart data
  useEffect(() => {
    if (!selectedProduct || !selectedCity) return;
 
    const filteredData = salesData.filter(
      (item) => item.name === selectedProduct && item.city === selectedCity
    );

    // Group by month and sum counts
    const monthlyData = filteredData?.reduce((acc, item) => {
      const monthName = new Date(item?.date).toLocaleString("default", {
        month: "long",
      });
      if (!acc[monthName]) {
        acc[monthName] = { name: monthName, value: 0 };
      }

      acc[monthName].value += item.count;
      return acc;
    }, {});

    setChartData(Object.values(monthlyData));
  }, [selectedProduct, selectedCity]);

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary p-3 shadow-lg rounded-md border border-gray-200">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value} units`}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    // Group sales by product and sum the counts
    const productSales = salesData.reduce((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = { name: item.name, value: 0 };
      }
      acc[item.name].value += item.count;
      return acc;
    }, {});

    setBarChart(Object.values(productSales));

    // Create monthly trend data for all products
    const monthlyData = salesData.reduce((acc, item) => {
      const monthName = new Date(item.date).toLocaleString("default", {
        month: "short",
      });
      if (!acc[monthName]) {
        acc[monthName] = { name: monthName, sales: 0 };
      }
      acc[monthName].sales += item.count;
      return acc;
    }, {});

    // Convert to array and sort by month
    const monthOrder: any = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const trendData: any = Object.values(monthlyData).sort(
      (a: any, b: any) =>
        monthOrder.indexOf(a?.name) - monthOrder.indexOf(b.name)
    );

    setMonthlyTrend(trendData);
  }, [salesData]);

  if (!salesData?.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-6">
      <div className="">
        {/* Header */}
        <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            Product Sales Dashboard
          </h2>
          <p className="mt-2 opacity-80">
            Real-time analytics and performance tracking
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bar Chart */}
            <div className="bg-background rounded-xl shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4">
                Product Sales Overview
              </h2>
              <div className="mt-2 overflow-x-auto">
                <ResponsiveContainer width="100%" height={350} minWidth={300}>
                  <BarChart
                    data={barChart}
                    layout="vertical"
                    margin={{ top: 5, right: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fontSize: 10 }}
                      width={80}
                      tickFormatter={(value) =>
                        value.length > 12
                          ? `${value.substring(0, 12)}...`
                          : value
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "bg-secondary",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#4f46e5"
                      barSize={20}
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-background rounded-xl shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4 ">
                Monthly Sales Trend
              </h2>
              <div className="mt-2">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={monthlyTrend}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={{ stroke: "#e5e7eb" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "bg-secondary",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                      }}
                      formatter={(value) => [`${value} units`, "Sales"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      dot={{
                        stroke: "#4f46e5",
                        strokeWidth: 2,
                        r: 4,
                        fill: "white",
                      }}
                      activeDot={{ r: 6, fill: "#4f46e5" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Filter Card */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Filters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Product
                  </label>
                  <select
                    value={selectedProduct || {}}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full p-2 bg-background border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {products.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
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
                    className="w-full p-2 bg-background border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Monthly Distribution
              </h2>
              <div className="h-72">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name.substring(0, 3)} ${(percent * 100).toFixed(
                            0
                          )}%`
                        }
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: "20px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-gray-500">No data available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-5">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Sales Summary
              </h3>
              {chartData.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-600">Product:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedProduct}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-600">City:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedCity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-600">
                      Total Sales:
                    </span>
                    <span className="font-semibold text-gray-800">
                      {chartData.reduce(
                        (sum: any, item: any) => sum + item.value,
                        0
                      )}{" "}
                      units
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-600">
                      Highest Month:
                    </span>
                    <span className="font-semibold text-gray-800">
                      {
                        chartData.reduce(
                          (max: any, item: any) =>
                            item?.value > max?.value ? item : max,
                          chartData[0]
                        ).name
                      }
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white rounded-lg text-center text-gray-500">
                  Select a product and city to view summary
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
