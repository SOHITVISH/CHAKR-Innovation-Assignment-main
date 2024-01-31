// References :- https://github.com/joshcarr/largest-triangle-three-buckets.js/blob/master/lib/largest-triangle-three-buckets.js

export function largestTriangleThreeBuckets(
  data,
  threshold,
  xAccessor,
  yAccessor
) {
  var floor = Math.floor,
    abs = Math.abs,
    dataLength = data.length,
    sampled = [],
    sampledIndex = 0,
    every = (dataLength - 2) / (threshold - 2), // Bucket size. Leave room for start and end data points
    a = 0, // Initially a is the first point in the triangle
    maxAreaPoint,
    maxArea,
    area,
    nextA,
    i,
    avgX = 0,
    avgY = 0,
    avgRangeStart,
    avgRangeEnd,
    avgRangeLength,
    rangeOffs,
    rangeTo,
    pointAX,
    pointAY;

  if (threshold >= dataLength || threshold === 0) {
    return data; // Nothing to do
  }

  sampled[sampledIndex++] = data[a]; // Always add the first point

  for (i = 0; i < threshold - 2; i++) {
    // Calculate point average for next bucket (containing c)
    avgX = 0;
    avgY = 0;
    avgRangeStart = floor((i + 1) * every) + 1;
    avgRangeEnd = floor((i + 2) * every) + 1;
    avgRangeEnd = avgRangeEnd < dataLength ? avgRangeEnd : dataLength;

    avgRangeLength = avgRangeEnd - avgRangeStart;

    for (; avgRangeStart < avgRangeEnd; avgRangeStart++) {
      avgX += data[avgRangeStart][xAccessor] * 1; // * 1 enforces Number (value may be Date)
      avgY += data[avgRangeStart][yAccessor] * 1;
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

    // Get the range for this bucket
    rangeOffs = floor((i + 0) * every) + 1;
    rangeTo = floor((i + 1) * every) + 1;

    // Point a
    pointAX = data?.[a]?.[xAccessor] * 1; // enforce Number (value may be Date)
    pointAY = data?.[a]?.[yAccessor] * 1;

    maxArea = area = -1;

    for (; rangeOffs < rangeTo; rangeOffs++) {
      // Calculate triangle area over three buckets
      area =
        abs(
          (pointAX - avgX) * (data[rangeOffs][yAccessor] - pointAY) -
            (pointAX - data[rangeOffs][xAccessor]) * (avgY - pointAY)
        ) * 0.5;
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[rangeOffs];
        nextA = rangeOffs; // Next a is this b
      }
    }

    sampled[sampledIndex++] = maxAreaPoint; // Pick this point from the bucket
    a = nextA; // This a is the next a (chosen b)
  }

  sampled[sampledIndex++] = data[dataLength - 1]; // Always add last

  return sampled;
}

const groupDataByYear = (data) => {
  const groupedData = {};

  data.forEach((d) => {
    const year = new Date(d?.timestamp).getFullYear();
    if (!groupedData[year]) {
      groupedData[year] = [];
    }
    groupedData[year].push(d?.profitPercentage);
  });

  return groupedData;
};

export const processDataForChart = (downsampledData) => {
  const groupedData = groupDataByYear(downsampledData);

  const labels = Object.keys(groupedData);
  const data = labels.map((year) => {
    // Calculate the average or some other relevant statistic for each year
    const avg =
      groupedData[year].reduce((sum, curr) => sum + curr, 0) /
      groupedData[year].length;
    return avg;
  });

  return {
    labels,
    datasets: [
      {
        label: "Average Profit Percentage",
        data,
        borderColor: "#25CD25",
        backgroundColor: 'rgba(37,205,37,0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
};
