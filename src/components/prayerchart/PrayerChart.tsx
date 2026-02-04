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
    // Load variable-pie module if not already loaded
    const loadVariablePieModule = () => {
      return new Promise<void>((resolve) => {
        if (window.Highcharts?.seriesTypes?.variablepie) {
          resolve();
          return;
        }

        // Check if script already exists
        const existingScript = document.querySelector('script[src*="variable-pie.js"]');
        if (existingScript) {
          // Wait for it to load
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () => resolve()); // Continue even if fails
          return;
        }

        // Create and load the script
        const script = document.createElement('script');
        script.src = 'https://code.highcharts.com/modules/variable-pie.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => resolve(); // Continue even if fails
        document.head.appendChild(script);
      });
    };

    // Wait for Highcharts and variable-pie module to be available
    const checkHighcharts = async () => {
      if (!window.Highcharts || !chartContainerRef.current) {
        setTimeout(checkHighcharts, 100);
        return;
      }

      // Load variable-pie module if needed
      await loadVariablePieModule();

      // Check if variablepie type is available (module loaded)
      if (!window.Highcharts.seriesTypes?.variablepie) {
        // Retry after a short delay if module not loaded yet
        setTimeout(checkHighcharts, 100);
        return;
      }
      
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
            dataLabels: {
              enabled: true,
              color: '#3c3c3c',
              style: {
                fontFamily: '"Google Sans Flex", system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: '700'
              }
            },
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