import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const ReChartSetUp = ({ charts }) => {
  if (!charts || charts.length === 0) return null;

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  return (
    <div className="w-full mt-10 space-y-10">
      {charts.map((chart, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg"
        >
          {/* 🔥 Heading */}
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            📊 {chart.title}
          </h3>

          {/* 🔥 Chart Container */}
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {/* BAR CHART */}
              {chart.type === "bar" && (
                <BarChart data={chart.data}>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />

                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {/* LINE CHART */}
              {chart.type === "line" && (
                <LineChart data={chart.data}>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              )}

              {/* PIE CHART */}
              {chart.type === "pie" && (
                <PieChart>
                  <Tooltip />
                  <Legend />

                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120} // 🔥 bigger size
                    label
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReChartSetUp;
