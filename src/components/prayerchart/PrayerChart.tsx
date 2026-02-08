"use client";

import { useEffect, useRef, useState } from "react";
import monthlyPrayer from "@/monthlyPrayer.json";

declare global {
  interface Window {
    Highcharts: any;
  }
}

type PrayerStatus = "Prayed On Time" | "Prayed In Time" | "Prayed Late" | "Never Prayed";
type PrayerName = "All" | "Fajar" | "Zuhr" | "Asr" | "Maghrib" | "Isha";
type RawPrayerStatus = "prayed on time" | "prayed in time" | "prayed late" | "never prayed";

const statusOrder: PrayerStatus[] = [
  "Prayed On Time",
  "Prayed In Time",
  "Prayed Late",
  "Never Prayed",
];

function getMonthlyNamazData(selectedPrayer: PrayerName) {
  const statusCounts: Record<PrayerStatus, number> = {
    "Prayed On Time": 0,
    "Prayed In Time": 0,
    "Prayed Late": 0,
    "Never Prayed": 0,
  };

  const statusMap: Record<RawPrayerStatus, PrayerStatus> = {
    "prayed on time": "Prayed On Time",
    "prayed in time": "Prayed In Time",
    "prayed late": "Prayed Late",
    "never prayed": "Never Prayed",
  };

  monthlyPrayer.days.forEach((day: any) => {
    const prayers = day.prayers as Record<string, RawPrayerStatus>;

    const values =
      selectedPrayer === "All"
        ? Object.values(prayers)
        : [prayers[selectedPrayer]];

    values.forEach((prayer) => {
      if (!prayer) return;

      const mappedStatus = statusMap[prayer];
      if (!mappedStatus) return;

      statusCounts[mappedStatus] += 1;
    });
  });

  return statusOrder.map((name) => ({
    name,
    value: statusCounts[name],
  }));
}

export default function PrayerChart({ selectedPrayer = "All" }: { selectedPrayer?: PrayerName }) {
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

      const monthlyNamazData = getMonthlyNamazData(selectedPrayer);
      // Filter out categories with 0 values
      const filteredData = monthlyNamazData.filter(item => item.value > 0);
      
      // Calculate total for percentage calculation
      const total = filteredData.reduce((sum, item) => sum + item.value, 0);

      window.Highcharts.chart(chartContainerRef.current, {
          chart: {
            type: 'variablepie',
            backgroundColor: 'transparent',
            width: null,
            height: 500
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
            backgroundColor: 'rgb(240, 240, 240)',
            borderColor: 'rgb(230, 230, 230)',
            borderRadius: 10,
            borderWidth: 1,
            shadow: {
              color: 'rgba(0, 0, 0, 0.12)',
              offsetX: 0,
              offsetY: 4,
              opacity: 1,
              width: 10
            },
            style: {
              fontFamily: '"Google Sans Flex", system-ui, sans-serif',
              fontSize: '14px',
              color: 'rgb(100, 100, 100)',
              fontWeight: '600'
            },
            headerFormat: '',
            pointFormatter: function(this: any) {
              const percentage = total > 0 ? ((this.y / total) * 100).toFixed(1) : '0.0';
              return '<span style="color:' + this.color + '">\u25CF</span> <b>' + 
                this.name + '</b><br/>' +
                'Count: <b>' + this.y + '</b><br/>' +
                'Percentage: <b>' + percentage + '%</b><br/>';
            }
          },
          series: [{
            minPointSize: 10,
            innerSize: '30%',
            size: '75%',
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
            data: filteredData.map((item) => ({
              name: item.name,
              y: item.value,
              z: 100
            })),
            colors: [
              '#969696',
              '#747474',
              '#535353',
              '#323232'
            ].slice(0, filteredData.length)
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
  }, [selectedPrayer]);

  return <div ref={chartContainerRef} style={{ height: '500px', width: '100%' }} />;
}