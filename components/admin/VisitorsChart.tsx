"use client";

import { useState } from "react";

// Mock data for the chart
const chartData = [
  { date: "Jun 23", mobile: 200, desktop: 150 },
  { date: "Jun 24", mobile: 190, desktop: 141 },
  { date: "Jun 25", mobile: 220, desktop: 160 },
  { date: "Jun 26", mobile: 250, desktop: 180 },
  { date: "Jun 27", mobile: 230, desktop: 170 },
  { date: "Jun 28", mobile: 240, desktop: 175 },
  { date: "Jun 29", mobile: 210, desktop: 155 },
];

export function VisitorsChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate max value for scaling
  const maxValue = Math.max(
    ...chartData.flatMap((d) => [d.mobile, d.desktop])
  );

  // Chart dimensions
  const width = 100;
  const height = 200;
  const padding = 20;

  // Generate path for area chart
  const generatePath = (values: number[], offset: number = 0) => {
    const points = values.map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (values.length - 1);
      const y = height - padding - (value / maxValue) * (height - padding * 2);
      return `${x},${y}`;
    });

    const path = points
      .map((point, index) => (index === 0 ? `M ${point}` : `L ${point}`))
      .join(" ");

    // Close the path for area chart
    const firstX = padding;
    const lastX = width - padding;
    const bottomY = height - padding;
    return `${path} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
  };

  const mobilePath = generatePath(chartData.map((d) => d.mobile));
  const desktopPath = generatePath(chartData.map((d) => d.desktop));

  return (
    <div className="w-full">
      <div className="relative" style={{ height: `${height}px` }}>
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          {/* Desktop area */}
          <path
            d={desktopPath}
            fill="url(#desktopGradient)"
            opacity="0.6"
            className="transition-opacity"
          />
          {/* Mobile area */}
          <path
            d={mobilePath}
            fill="url(#mobileGradient)"
            opacity="0.6"
            className="transition-opacity"
          />
          {/* Desktop line */}
          <path
            d={generatePath(chartData.map((d) => d.desktop))
              .replace(/ L \d+,\d+ Z$/, "")}
            fill="none"
            stroke="rgb(15 23 42)"
            strokeWidth="2"
            className="dark:stroke-slate-200"
          />
          {/* Mobile line */}
          <path
            d={generatePath(chartData.map((d) => d.mobile))
              .replace(/ L \d+,\d+ Z$/, "")}
            fill="none"
            stroke="rgb(15 23 42)"
            strokeWidth="2"
            className="dark:stroke-slate-200"
          />

          {/* Hover indicator */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={padding + (hoveredIndex * (width - padding * 2)) / (chartData.length - 1)}
                y1={padding}
                x2={padding + (hoveredIndex * (width - padding * 2)) / (chartData.length - 1)}
                y2={height - padding}
                stroke="rgb(148 163 184)"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="dark:stroke-slate-500"
              />
              <circle
                cx={padding + (hoveredIndex * (width - padding * 2)) / (chartData.length - 1)}
                cy={
                  height -
                  padding -
                  (chartData[hoveredIndex].mobile / maxValue) *
                    (height - padding * 2)
                }
                r="4"
                fill="rgb(15 23 42)"
                className="dark:fill-slate-200"
              />
              <circle
                cx={padding + (hoveredIndex * (width - padding * 2)) / (chartData.length - 1)}
                cy={
                  height -
                  padding -
                  (chartData[hoveredIndex].desktop / maxValue) *
                    (height - padding * 2)
                }
                r="4"
                fill="rgb(15 23 42)"
                className="dark:fill-slate-200"
              />
            </g>
          )}

          {/* Gradients */}
          <defs>
            <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(15 23 42)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(15 23 42)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="desktopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Hover zones */}
          {chartData.map((_, index) => (
            <rect
              key={index}
              x={padding + (index * (width - padding * 2)) / (chartData.length - 1) - 10}
              y={padding}
              width={20}
              height={height - padding * 2}
              fill="transparent"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg p-3 pointer-events-none z-10"
            style={{
              left: `${
                (hoveredIndex / (chartData.length - 1)) * 100
              }%`,
              transform: "translateX(-50%)",
              bottom: `${height + 10}px`,
            }}
          >
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-50 mb-2">
              {chartData[hoveredIndex].date}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-900 dark:bg-slate-200 rounded"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Mobile {chartData[hoveredIndex].mobile}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Desktop {chartData[hoveredIndex].desktop}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-slate-600 dark:text-slate-400">
        {chartData.map((data, index) => (
          <span key={index}>{data.date}</span>
        ))}
      </div>
    </div>
  );
}

