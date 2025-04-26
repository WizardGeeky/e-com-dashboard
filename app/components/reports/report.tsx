"use client";

import React, { useEffect, useState } from "react";
import { TbStarsFilled, TbBrandDatabricks } from "react-icons/tb";
import { FaSitemap } from "react-icons/fa6";
import { PiUsersThreeFill } from "react-icons/pi";
import { apiPaths } from "@/app/constants/api-paths";
import { motion } from "framer-motion";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Report() {
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [totalCategories, setTotalCategories] = useState<number>(0);

  useEffect(() => {
    fetch(apiPaths.product.PRODUCT_LIST)
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch(apiPaths.product.CATEGORY_LIST)
      .then((res) => res.json())
      .then((data) => setTotalCategories(data.length));

    fetch(apiPaths.user.ALL_USERS)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const overallRating =
    products.reduce((acc, p) => acc + p.rating?.rate || 0, 0) /
    (products.length || 1);

  const categoryCountMap = products.reduce((acc: Record<string, number>, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const chartColors = [
    "#6366F1",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
  ];

  const categoryCountChart = {
    labels: Object.keys(categoryCountMap),
    datasets: [
      {
        label: "Product Count",
        data: Object.values(categoryCountMap),
        backgroundColor: chartColors,
      },
    ],
  };

  const productRatingChart = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        label: "Rating",
        data: products.map((p) => p.rating?.rate || 0),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const productPriceChart = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        label: "Price",
        data: products.map((p) => p.price),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
    ],
  };

  const baseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { size: 12 },
          color: "#334155",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: { color: "#64748b", font: { size: 10 } },
        grid: {
          color: "#e2e8f0",
        },
      },
    },
  };

  const scaleFadeVariant = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="w-full space-y-10">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={scaleFadeVariant}
          className="rounded-xl p-6 px-2 w-full border-2 border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 transition-shadow"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
        >
          <div className="grid grid-cols-2 items-center">
            <TbBrandDatabricks className="text-6xl sm:text-7xl text-white" />
            <div>
              <p className="text-base sm:text-xl text-white font-semibold">
                Total Products
              </p>
              <p className="text-4xl sm:text-6xl text-white">
                {products.length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={scaleFadeVariant}
          className="rounded-xl p-6 px-2 w-full border-2 border-transparent bg-gradient-to-r from-green-500 to-teal-500 transition-shadow"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
        >
          <div className="grid grid-cols-2 items-center">
            <FaSitemap className="text-6xl sm:text-7xl text-white" />
            <div>
              <p className="text-base sm:text-xl text-white font-semibold">
                Categories
              </p>
              <p className="text-4xl sm:text-6xl text-white">
                {totalCategories}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={scaleFadeVariant}
          className="rounded-xl p-6 px-2 w-full border-2 border-transparent bg-gradient-to-r from-yellow-400 to-red-500 transition-shadow"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
        >
          <div className="grid grid-cols-2 items-center">
            <TbStarsFilled className="text-6xl sm:text-7xl text-white" />
            <div>
              <p className="text-base sm:text-xl text-white font-semibold">
                Overall Rating
              </p>
              <p className="text-4xl sm:text-6xl text-white">
                {overallRating.toFixed(1)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={scaleFadeVariant}
          className="rounded-xl p-6 px-2 w-full border-2 border-transparent bg-gradient-to-r from-blue-600 to-black transition-shadow"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
        >
          <div className="grid grid-cols-2 items-center">
            <PiUsersThreeFill className="text-6xl sm:text-7xl text-white" />
            <div>
              <p className="text-base sm:text-xl text-white font-semibold">
                Users
              </p>
              <p className="text-4xl sm:text-6xl text-white">{users.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="space-y-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="space-y-4">
            <p className="font-semibold text-base md:text-lg text-slate-600 mb-4">
              Products and their Count (by Category)
            </p>
            <div className="rounded-xl p-4 bg-red-100 h-64 sm:h-72 md:h-80" style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}>
              <Pie data={categoryCountChart} options={baseChartOptions} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="space-y-4">
            <p className="font-semibold text-base md:text-lg text-slate-600 mb-4">
              Products and their Rating
            </p>
            <div className="rounded-xl p-4 bg-violet-100 h-64 sm:h-72 md:h-80 overflow-x-auto" style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}>
              <Bar data={productRatingChart} options={baseChartOptions} />
            </div>
          </div>

          {/* Line Chart */}
          <div className="space-y-4 col-span-1 sm:col-span-2">
            <p className="font-semibold text-base md:text-lg text-slate-600 mb-4">
              Products and their Price Trend
            </p>
            <div className="rounded-xl p-4 bg-green-50 h-64 sm:h-80 md:h-96 overflow-x-auto" style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}>
              <Line data={productPriceChart} options={baseChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
