async function buildPlot() {
    const data = await d3.json("my_weather_data.json");
    const dateParser = d3.timeParse("%Y-%m-%d");
    const xMate = (d) => d.temperatureMin;
    const yMate = (d) => dateParser(d.date);

    var dimension = {
        width: window.innerWidth*0.9,
        height: 600,
        margin: {
            top: 25,
            left: 25,
            bottom: 25,
            right: 25
        }
    };

    dimension.boundedWidth = dimension.width - dimension.margin.left - dimension.margin.right;
    dimension.boundedHeight = dimension.height - dimension.margin.top - dimension.margin.bottom;

    const wrapper = d3.select("#wrapper");
    const svg = wrapper.append("svg")
    svg.attr("height",dimension.height);
    svg.attr("width",dimension.width);
    const bounded = svg.append("g");
    bounded.style("transform",`translate(${dimension.margin.left}px, ${dimension.margin.top})`);


    const xMan = d3.scaleLinear()
        .domain(d3.extent(data,xMate))
        .range([dimension.boundedHeight,0]);

    const yMan = d3.scaleTime()
        .domain(d3.extent(data,yMate))
        .range([0,dimension.boundedWidth]);

    var lineMax = d3.line()
        .x(d => yMan(yMate(d)))
        .y(d => xMan(xMate(d)));

    bounded.append("path")
        .attr("d",lineMax(data))
        .attr("fill","none")
        .attr("stroke", "#090900")

    const xMate_high = (d) => d.temperatureHigh;

    const xMan_high = d3.scaleLinear()
        .domain(d3.extent(data, xMate_high))
        .range([dimension.boundedHeight, 0]);

    var lineMax_high = d3.line()
        .x(d => yMan(yMate(d)))
        .y(d => xMan_high(xMate_high(d)));

    bounded.append("path")
        .attr("d", lineMax_high(data))
        .attr("fill","none")
        .attr("stroke", "blue")


    const Mx_x = d3.axisBottom(yMan);
    const Mx_y = d3.axisRight(xMan);

    bounded.append("g")
        .attr("transform", `translate(0, ${dimension.boundedHeight})`)
        .call(Mx_x);
    bounded.append("g")
        .attr("transform", `translate(0, 0)`)
        .call(Mx_y)

}

buildPlot();