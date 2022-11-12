async function buildPlot() {
    const n = 80;
    let v1 = [];
    let v2 = [];
    var radius = (d) => d.radius;
    var height = (d) => d.height;
    var width = (d) => d.width;

    var dimension = {
        width: window.innerWidth * 0.5,
        height: 700,
        margin: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        }
    };

    dimension.boundedWidth = dimension.width - dimension.margin.left - dimension.margin.right;
    dimension.boundedHeight = dimension.height - dimension.margin.top - dimension.margin.bottom;

    for (let i = 0; i < n; i++) {
        v1.push({
            radius: 7,
            x: Math.random() * (dimension.boundedWidth - 10) + 10,
            y: Math.random() * (dimension.boundedWidth - 10) + 10
        })

        v2.push({
            width: 14,
            height: 14,
            x: Math.random() * (dimension.boundedWidth - 10) + 10,
            y: Math.random() * (dimension.boundedWidth - 10) + 10,

        })
    };
    const wrapper = d3.select("#wrapper");
    const svg = wrapper.append("svg");
    svg.attr("height", dimension.height);
    svg.attr("width", dimension.width);
    const circles = svg.append("g");
    const squares = svg.append("g");
    circles.style("transform", `translate(${dimension.margin.left + 10}px, ${dimension.margin.top - 10}px)`);
    squares.style("transform", `translate(${dimension.margin.left + 10}px,${dimension.margin.top - 10}px)`);

    const yScaler = d3.scaleLinear()
        .domain([0, 50])
        .range([dimension.boundedHeight, 0]);

    const xScaler = d3.scaleLinear()
        .domain([0, 50])
        .range([0, dimension.boundedWidth]);

    const yAxisGenerator = d3.axisLeft()
        .scale(yScaler);

    const xAxisGenerator = d3.axisBottom()
        .scale(xScaler);

    const yAxis = circles.append("g")
        .call(yAxisGenerator);

    const xAxis = circles.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimension.boundedHeight}px)`);

    circles.selectAll("circle")
        .data(v1)
        .enter()
        .append("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr('r', radius)
        .attr("fill", "green");

    squares.selectAll("rect")
        .data(v2)
        .enter()
        .append("rect")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr('width', height)
        .attr('height', width)
        .attr("fill", "pink");
}

async function clean() {
    d3.select("svg").remove();
}

buildPlot()
