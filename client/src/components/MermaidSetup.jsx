import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram.replace(/\r?\n/g, "\n");

  let nodeIndex = 0;
  clean = clean.replace(/\[(.*?)\]/g, (match, label) => {
    nodeIndex++;
    return `N${nodeIndex}[${label}]`;
  });

  if (!clean.trim().startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    });
  }, []);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

        const safeChart = cleanMermaidChart(diagram);

        const { svg } = await mermaid.render(id, safeChart);

        containerRef.current.innerHTML = svg;

        // 🔥 SIZE FIX (BIG + RESPONSIVE)
        setTimeout(() => {
          const svgEl = containerRef.current?.querySelector("svg");
          if (svgEl) {
            svgEl.style.width = "1200px"; // 👈 big size
            svgEl.style.maxWidth = "100%"; // 👈 responsive
            svgEl.style.height = "auto";
            svgEl.style.display = "block";
            svgEl.style.margin = "0 auto";
          }
        }, 0);
      } catch (err) {
        console.error("Mermaid render failed:", err);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="w-full mt-8">
      {/* 🔥 Heading */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
          📊 Diagram
        </h2>
        <span className="text-xs text-gray-400">Visual Representation</span>
      </div>

      {/* 🔥 Container */}
      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-6 overflow-x-auto">
        <div
          ref={containerRef}
          className="w-full flex justify-center items-center"
        />
      </div>
    </div>
  );
};

export default MermaidSetup;
