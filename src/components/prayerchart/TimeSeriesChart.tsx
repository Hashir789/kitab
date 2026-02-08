"use client";

import { useEffect, useRef, useState } from "react";
import monthlyLies from "@/monthlyLies.json";

declare global {
  interface Window {
    Highcharts: any;
  }
}

export default function TimeSeriesChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load additional Highcharts modules if not already loaded
    const loadHighchartsModules = async () => {
      const modules = [
        'https://code.highcharts.com/modules/data.js',
        'https://code.highcharts.com/modules/exporting.js',
        'https://code.highcharts.com/modules/export-data.js',
        'https://code.highcharts.com/modules/accessibility.js',
        'https://code.highcharts.com/themes/adaptive.js'
      ];

      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve) => {
          // Check if script already exists
          const existingScript = document.querySelector(`script[src="${src}"]`);
          if (existingScript) {
            resolve();
            return;
          }

          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => resolve(); // Continue even if fails
          document.head.appendChild(script);
        });
      };

      await Promise.all(modules.map(loadScript));
    };

    // Wait for Highcharts to be available
    const checkHighcharts = async () => {
      await loadHighchartsModules();
      
      if (!window.Highcharts || !chartContainerRef.current) {
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

      // Process data from JSON
      try {
        const [year, month] = monthlyLies.month.split('-').map(Number);
        const data = monthlyLies.days.map((day: { day: number; lies: number }) => {
          // Create timestamp for the day (midnight UTC)
          const date = new Date(Date.UTC(year, month - 1, day.day));
          return [date.getTime(), day.lies];
        });

        // Find the maximum value in the data
        const maxValue = Math.max(...monthlyLies.days.map((day: { day: number; lies: number }) => day.lies));
        const yAxisMax = maxValue + 2;
        console.log('Max value:', maxValue, 'Y-axis max:', yAxisMax);

        // Calculate height as slightly more than half of width
        const containerWidth = chartContainerRef.current.offsetWidth;
        const chartHeight = containerWidth / 1.8;

        // Add custom animation plugin
        (function (H: any) {
          const animateSVGPath = (svgElem: any, animation: any, callback: any = void 0) => {
            const length = svgElem.element.getTotalLength();
            svgElem.attr({
              'stroke-dasharray': length,
              'stroke-dashoffset': length,
              opacity: 1
            });
            svgElem.animate({
              'stroke-dashoffset': 0
            }, animation, callback);
          };

          H.seriesTypes.areaspline.prototype.animate = function (init: boolean) {
            const series = this,
              animation = H.animObject(series.options.animation);
            if (!init) {
              animateSVGPath(series.graph, animation);
            }
          };

          H.addEvent(H.Axis, 'afterRender', function (this: any) {
            const axis = this,
              chart = axis.chart,
              animation = H.animObject(chart.renderer.globalAnimation);

            axis.axisGroup
              // Init
              .attr({
                opacity: 0,
                rotation: -3,
                scaleY: 0.9
              })
              // Animate
              .animate({
                opacity: 1,
                rotation: 0,
                scaleY: 1
              }, animation);
            
            if (axis.horiz) {
              axis.labelGroup
                // Init
                .attr({
                  opacity: 0,
                  rotation: 3,
                  scaleY: 0.5
                })
                // Animate
                .animate({
                  opacity: 1,
                  rotation: 0,
                  scaleY: 1
                }, animation);
            } else {
              axis.labelGroup
                // Init
                .attr({
                  opacity: 0,
                  rotation: 3,
                  scaleX: -0.5
                })
                // Animate
                .animate({
                  opacity: 1,
                  rotation: 0,
                  scaleX: 1
                }, animation);
            }

            if (axis.plotLinesAndBands) {
              axis.plotLinesAndBands.forEach((plotLine: any) => {
                const animation = H.animObject(plotLine.options.animation);

                // Init
                plotLine.label.attr({
                  opacity: 0
                });

                // Animate
                animateSVGPath(
                  plotLine.svgElem,
                  animation,
                  function () {
                    plotLine.label.animate({
                      opacity: 1
                    });
                  }
                );
              });
            }
          });
        })(window.Highcharts);

        window.Highcharts.chart(chartContainerRef.current, {
          chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            height: chartHeight,
            spacingTop: 100,
            spacingRight: 0,
            spacingBottom: 0,
            spacingLeft: 0
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
          subtitle: {
            text: ''
          },
          xAxis: {
            type: 'datetime',
            labels: {
              style: {
                fontFamily: '"Google Sans Flex", system-ui, sans-serif',
                fontSize: '12px',
                color: '#3c3c3c'
              }
            },
            gridLineColor: '#e6e6e6',
            lineColor: '#e6e6e6',
            tickColor: '#e6e6e6'
          },
          yAxis: {
            title: {
              text: ''
            },
            min: 0,
            max: yAxisMax,
            endOnTick: false,
            allowDecimals: false,
            labels: {
              style: {
                fontFamily: '"Google Sans Flex", system-ui, sans-serif',
                fontSize: '12px',
                color: '#3c3c3c'
              }
            },
            gridLineColor: '#e6e6e6'
          },
          legend: {
            enabled: false
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
            pointFormatter: function(this: any) {
              return '<span style="color:#535353">\u25CF</span> <b>False Speakings</b><br/>' +
                'Count: <b>' + this.y + '</b><br/>';
            }
          },
          plotOptions: {
            areaspline: {
              animation: {
                duration: 1000
              },
              marker: {
                enabled: false,
                lineColor: '#434343',
                fillColor: '#535353',
                states: {
                  hover: {
                    enabled: true,
                    fillColor: '#535353',
                    lineColor: '#535353',
                    lineWidth: 2,
                    radius: 5
                  }
                }
              },
              lineWidth: 2,
              lineColor: '#535353',
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, 'rgb(80, 80, 80)'],
                  [0.5, 'rgb(160, 160, 160)'],
                  [0.75, 'rgb(200, 200, 200)'],
                  [1, 'rgba(240, 240, 240)']
                ]
              },
              states: {
                hover: {
                  lineWidth: 2
                }
              },
              threshold: null
            }
          },
          series: [{
            type: 'areaspline',
            name: 'Number of Lies',
            color: '#535353',
            data: data,
            animation: {
              duration: 1000
            },
            turboThreshold: 0,
            marker: {
              lineColor: '#535353',
              fillColor: '#535353'
            }
          }]
        });
      } catch (error) {
        console.error('Error loading chart data:', error);
      }
    };

    checkHighcharts();

    return () => {
      if (chartContainerRef.current && window.Highcharts?.charts) {
        const existingChart = window.Highcharts.charts.find(
          (chart: any) => chart && chart.renderTo === chartContainerRef.current
        );
        if (existingChart) {
          existingChart.destroy();
        }
      }
    };
  }, []);

  return (
    <div 
      ref={chartContainerRef} 
      style={{ 
        width: '100%', 
        aspectRatio: '1.5 / 1',
        position: 'relative',
      }} 
    />
  );
}
