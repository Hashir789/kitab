"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Highcharts: any;
  }
}

const monthlyNamazData = [
  { name: "Prayed On Time", value: 55 },
  { name: "Prayed In Time", value: 40 },
  { name: "Prayed Late", value: 65 },
  { name: "Never Prayed", value: 39 }
];

export default function PrayerChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for Highcharts to be available
    const checkHighcharts = () => {
      if (window.Highcharts && chartContainerRef.current) {
        setIsLoaded(true);
        
        // Destroy existing chart if it exists
        if (chartContainerRef.current && window.Highcharts.charts) {
          const existingChart = window.Highcharts.charts.find(
            (chart: any) => chart && chart.renderTo === chartContainerRef.current
          );
          if (existingChart) {
            existingChart.destroy();
          }
        }

        window.Highcharts.chart(chartContainerRef.current, {
          chart: {
            type: 'variablepie',
            backgroundColor: 'transparent'
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          title: {
            text: ''
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> ' +
              '{point.name}</b><br/>' +
              'Count: <b>{point.y}</b><br/>'
          },
          series: [{
            minPointSize: 10,
            innerSize: '30%',
            zMin: 0,
            name: 'prayers',
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#f8f9fa',
            data: monthlyNamazData.map(item => ({
              name: item.name,
              y: item.value,
              z: 100
            })),
            colors: [
              '#969696',
              '#747474',
              '#535353',
              '#323232'
            ]
          }]
        });
      } else {
        // Retry after a short delay
        setTimeout(checkHighcharts, 100);
      }
    };

    checkHighcharts();

    // Cleanup function
    return () => {
      if (chartContainerRef.current && window.Highcharts && window.Highcharts.charts) {
        const existingChart = window.Highcharts.charts.find(
          (chart: any) => chart && chart.renderTo === chartContainerRef.current
        );
        if (existingChart) {
          existingChart.destroy();
        }
      }
    };
  }, []);

  return <div ref={chartContainerRef} style={{ height: '500px', width: '100%' }} />;
}
