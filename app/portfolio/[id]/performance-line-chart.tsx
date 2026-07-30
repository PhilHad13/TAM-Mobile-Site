"use client";

import { useEffect, useRef } from "react";

type Point = {
  benchmark: number;
  date: string;
  portfolio: number;
};

export function PerformanceLineChart({ points }: { points: Point[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const context = canvas.getContext("2d");
      if (!context) return;

      const width = canvas.clientWidth;
      const height = 180;
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, width, height);

      const padding = { bottom: 27, left: 34, right: 9, top: 14 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const allValues = points.flatMap((point) => [
        point.portfolio,
        point.benchmark,
      ]);
      const minimum = Math.min(0, ...allValues);
      const maximum = Math.max(...allValues);
      const range = maximum - minimum || 1;
      const x = (index: number) =>
        padding.left + (index / Math.max(points.length - 1, 1)) * chartWidth;
      const y = (number: number) =>
        padding.top + chartHeight - ((number - minimum) / range) * chartHeight;

      context.font =
        '10px Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';
      context.textAlign = "right";
      context.textBaseline = "middle";

      for (let step = 0; step <= 4; step += 1) {
        const chartValue = minimum + (range * step) / 4;
        const lineY = y(chartValue);
        context.beginPath();
        context.strokeStyle = "#e7eaee";
        context.lineWidth = 1;
        context.moveTo(padding.left, lineY);
        context.lineTo(width - padding.right, lineY);
        context.stroke();
        context.fillStyle = "#7c8795";
        context.fillText(`${chartValue.toFixed(0)}%`, padding.left - 7, lineY);
      }

      const drawSeries = (key: "portfolio" | "benchmark", colour: string) => {
        context.beginPath();
        context.strokeStyle = colour;
        context.lineWidth = 2.5;
        context.lineJoin = "round";
        context.lineCap = "round";

        points.forEach((point, index) => {
          const pointX = x(index);
          const pointY = y(point[key]);
          if (index === 0) context.moveTo(pointX, pointY);
          else context.lineTo(pointX, pointY);
        });
        context.stroke();

        points.forEach((point, index) => {
          context.beginPath();
          context.fillStyle = "#ffffff";
          context.strokeStyle = colour;
          context.lineWidth = 2;
          context.arc(x(index), y(point[key]), 3, 0, Math.PI * 2);
          context.fill();
          context.stroke();
        });
      };

      drawSeries("benchmark", "#91a5b7");
      drawSeries("portfolio", "#c7a35a");

      context.fillStyle = "#7c8795";
      context.textBaseline = "bottom";
      context.textAlign = "left";
      context.fillText(points[0]?.date ?? "", padding.left, height);
      context.textAlign = "right";
      context.fillText(points[points.length - 1]?.date ?? "", width - padding.right, height);
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [points]);

  return (
    <canvas
      aria-label="Line chart comparing portfolio and benchmark performance"
      className="performanceLineChart"
      ref={canvasRef}
      role="img"
    />
  );
}
