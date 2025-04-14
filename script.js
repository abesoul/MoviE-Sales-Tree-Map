const width = 1000;
const height = 600;

const tooltip = d3.select("#tooltip");

const svg = d3.select("#tree-map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("movies.json").then(data => {
  const root = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  d3.treemap()
    .size([width, height])
    .padding(1)
    (root);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  const genres = root.children.map(d => d.data.name);
  colorScale.domain(genres);

  svg.selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => colorScale(d.parent.data.name))
    .attr("data-name", d => d.data.name)
    .attr("data-category", d => d.parent.data.name)
    .attr("data-value", d => d.data.value)
    .on("mousemove", (event, d) => {
      tooltip
        .style("opacity", 1)
        .html(
          `<strong>${d.data.name}</strong><br/>
           Genre: ${d.parent.data.name}<br/>
           Revenue: $${d.data.value}M`
        )
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

  svg.selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", d => d.x0 + 5)
    .attr("y", d => d.y0 + 20)
    .text(d => d.data.name)
    .attr("font-size", "12px")
    .attr("fill", "white")
    .attr("pointer-events", "none");

  // Legend
  const legend = d3.select("#legend")
    .append("svg")
    .attr("width", width)
    .attr("height", 50);

  genres.forEach((genre, i) => {
    legend.append("rect")
      .attr("x", i * 100)
      .attr("y", 10)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", colorScale(genre));

    legend.append("text")
      .attr("x", i * 100 + 24)
      .attr("y", 24)
      .text(genre)
      .attr("font-size", "12px");
  });
});
