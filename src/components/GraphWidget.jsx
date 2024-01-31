import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  registerables,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CustomText from "./CustomText";
import {
  largestTriangleThreeBuckets,
  processDataForChart,
} from "../utils/helper";
import FileUpload from "./FileUpload";
import graphsortby from "../assets/graphsortby.png";
import { options } from "../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ...registerables
);

const GraphWidget = ({ title }) => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const handleDataLoaded = (loadedData) => {
    setData(loadedData);
    // You can now use this data to plot your graph
  };

  useEffect(() => {
    if (data && data.length > 0) {
      // Apply the LTTB downsampling algorithm

      const downsampledData = largestTriangleThreeBuckets(
        data,
        70000,
        "timestamp",
        "profitPercentage"
      );

      // Prepare the data for Chart.js
      const NewData = processDataForChart(downsampledData);
      setChartData(NewData);
    }
  }, [data]);

  return (
    <>
      <FileUpload onDataLoaded={handleDataLoaded} />
      <div className="w-full p-6 flex flex-col gap-2 items-start bg-white rounded-2xl shadow-xl">
        <div className="w-full flex pb-4 justify-between items-center">
          <CustomText
            title={title}
            className={"text-xl font-semibold text-[#131313]"}
          />

          <div className="flex items-center gap-1">
            <span className="text-[#454545] text-sm font-normal">Yearly</span>
            <button>
              <img src={graphsortby} alt="graph-sortby" loading="lazy"/>
            </button>
          </div>
        </div>

        <Line options={options} data={chartData} />
      </div>
    </>
  );
};

export default GraphWidget;
