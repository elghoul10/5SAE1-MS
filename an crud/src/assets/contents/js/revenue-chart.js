let lineGraph = document.querySelector(".line-graph");

// Options
const lineGrapOptions = {
  aspectRatio: 2.5,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          padding: 12,
          callback: function (value) {
            return value + " TND";
          },
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          padding: 12,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};
const myChart = new Chart(lineGraph, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [
          totalEarning[0],
          totalEarning[1],
          totalEarning[2],
          totalEarning[3],
          totalEarning[4],
          totalEarning[5],
          totalEarning[6],
          totalEarning[7],
          totalEarning[8],
          totalEarning[9],
          totalEarning[10],
          totalEarning[11],
        ],
        borderColor: "rgba(255,117,92,1)",
        pointBorderColor: "rgba(255,255,255,1)",
        pointBackgroundColor: "rgba(255,255,255,1)",
        borderWidth: 3,
        fill: false,
      },
    ],
  },
  options: lineGrapOptions,
});

//----------------------------------------------------------------------------------------------

let lineGraph_orders = document.querySelector(".line-graph_orders");

// Options
const lineGrapOptions_orders = {
  aspectRatio: 2.5,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          padding: 12,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          padding: 12,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};
const myChart_orders = new Chart(lineGraph_orders, {
  curvature: 1,
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [
          orders[0],
          orders[1],
          orders[2],
          orders[3],
          orders[4],
          orders[5],
          orders[6],
          orders[7],
          orders[8],
          orders[9],
          orders[10],
          orders[11],
        ],
        borderColor: "rgba(255,117,92,1)",
        pointBorderColor: "rgba(255,255,255,1)",
        pointBackgroundColor: "rgba(255,255,255,1)",
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
        radius: 50,
        fill: true,
        backgroundColor: "rgba(255,117,92,1)",
      },
    ],
  },
  options: lineGrapOptions_orders,
});
