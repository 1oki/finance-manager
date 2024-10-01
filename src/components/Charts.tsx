import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Charts = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const incomeData = transactions.filter(t => t.type === "income").map(t => +t.amount);
    const expenseData = transactions.filter(t => t.type === "expense").map(t => +t.amount);

    // Set up chart dimensions
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous content
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };


    console.log(typeof incomeData[2])
    console.log(typeof expenseData[0])
    // Set up scales
    const x = d3.scaleBand().range([0, width]).padding(0.1).domain(["Income", "Expense"]);
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([
        0, 
        d3.max([...incomeData, ...expenseData])!]);


    // Add the bars
    svg
      .append("g")
      .selectAll(".bar")
      .data([
        { category: "Income", value: d3.sum(incomeData) },
        { category: "Expense", value: d3.sum(expenseData) },
      ])
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.category)!)
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => (d.category === "Income" ? "#4caf50" : "#f44336"));

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
  }, [transactions]);

  return <svg ref={chartRef} width={500} height={300} style={{border: '1px solid #000'}}></svg>;
};

export default React.memo(Charts);
