body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

#legend svg {
  display: block;
  margin: 0 auto 20px;
}

#treemap svg {
  display: block;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background: white;
}

/* script.js */
document.addEventListener("DOMContentLoaded", function () {
  const width = 1000;
  const height = 600;
  const colorMap = {
    "Action": "#e74c3c",
    "Adventure": "#3498db",
    "Comedy": "#f1c40f",
    "Drama": "#9b59b6",
    "Animation": "#1abc9c",
    "Family": "#e67e22",
    "Biography": "#2ecc71"
  };

  const svg = d3.select("#treemap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  d3.json("movies.json").then(data => {
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    d3.treemap()
      .size([width, height])
      .padding(2)
      (root);

    const nodes = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    nodes.append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => colorMap[d.parent.data.name] || "#ccc")
      .attr("stroke", "#fff");

    nodes.append("title")
      .text(d => `${d.data.name}\n${d.parent.data.name}: $${d.data.value}M`);

    nodes.append("text")
      .attr("x", 4)
      .attr("y", 14)
      .text(d => d.data.name)
      .attr("font-size", "12px")
      .attr("fill", "#fff")
      .style("pointer-events", "none");

    // Legend
    const legend = d3.select("#legend")
      .append("svg")
      .attr("width", 1000)
      .attr("height", 50);

    const genres = Object.keys(colorMap);
    const legendItemWidth = 140;

    const legendItems = legend.selectAll("g")
      .data(genres)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * legendItemWidth}, 0)`);

    legendItems.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", d => colorMap[d]);

    legendItems.append("text")
      .attr("x", 24)
      .attr("y", 14)
      .text(d => d)
      .attr("font-size", "14px")
      .attr("fill", "#333");
  });
});
