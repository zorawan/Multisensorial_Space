/** global d3 */

var url = "https://localnews-336100.wl.r.appspot.com/weather";

fetch(url)
	.then((response) => response.json())
	.then((data) => {
		// console.log(data);
		var margin = {
				top: 30,
				right: 30,
				bottom: 30,
				left: 30,
			},
			width = 1200 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		var svg = d3
			.select("#myData")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var date = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
			22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		];
		var months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		// Build X scales and axis:

		var x = d3
			.scaleBand()
			.range([0, width - 80])
			.domain(date);
		svg
			.append("g")
			.attr("transform", "translate(90," + height + ")")
			.call(d3.axisTop(x).tickSize(height))
			.style("text-anchor", "middle")
			.call((g) => g.selectAll(".tick line").attr("opacity", ".1"))
			.call((g) => g.selectAll(".tick text").attr("dy", -5).attr("dx", 18))
			.call((g) => g.select(".domain").attr("opacity", "0"))
			.attr("font-size", "15");
		// Build Y scales and axis:
		var y = d3
			.scaleBand()
			.range([-20, height - 15])
			.domain(months);

		svg
			.append("g")
			.call(d3.axisRight(y).tickSize(width + 60))
			.call((g) => g.selectAll(".tick line").attr("opacity", ".1"))
			.call((g) => g.selectAll(".tick text").attr("x", 0).attr("y", 18))
			.call((g) => g.select(".domain").attr("opacity", "0"))
			.attr("font-size", "15");

		// tooltip
		var tooltip = d3
			.select("#myData")
			.append("div")
			.attr("class", "tooltip")
			.style("opacity", 0)
			.style("position", "obsolute");

		//data
		var range_img = [
			"source_img/ic_1.svg",
			"source_img/ic_2.svg",
			"source_img/ic_3.svg",
			"source_img/ic_4.svg",
			"source_img/ic_5.svg",
		];
		var myColor = d3.scaleLinear().range([0, 5]).domain([0, 100]);
		// var myColor = d3.scaleLinear().range(["white", "#4CFF69"]).domain([0, 100]);
		console.log(myColor);
		console.log(data);
		svg
			.selectAll()
			.data(data)
			.enter()
			.append("svg:image")
			// .attr("r", 12)
			.attr("xlink:href", function (d) {
				var index = Math.floor(myColor(d.humidity));
				return range_img[index];
			})
			.attr("x", function (d) {
				var date = new Date(d.date);
				return x(date.getDate()) + 107;
			})
			.attr("y", function (d) {
				var date = new Date(d.date);
				// console.log(date.getMonth());
				return y(months[date.getMonth()]) + 18;
			})
			.attr("width", x.bandwidth())
			.attr("height", y.bandwidth())
			.style("fill", function (d) {
				return myColor(d.humidity.toFixed(2));
			})

			.on("mouseover", function (i, d) {
				console.log(i);
				tooltip.transition().duration(200).style("opacity", 1);

				tooltip
					.html(
						"<span id = 'tooltipDate'>" +
							new Date(d.date).toDateString() +
							"</span>" +
							"<br>" +
							"<span class = 'tooltipText'>Location:  </span>" +
							d.city +
							"<br>" +
							"<span class = 'tooltipText'>Temperature:  </span>" +
							(d.temp - 273.15).toFixed(2) +
							" °C" +
							"<br>" +
							"<span class = 'tooltipText'> Humidity:  </span>" +
							d.humidity.toFixed(2) +
							" %" +
							"<br>" +
							"<span class = 'tooltipText'> Dew Point:  </span>" +
							(d.dew_point - 273.15).toFixed(2) +
							" °C"
					)

					.style("left", i.pageX - 50 + "px")
					.style("top", i.pageY - 100 + "px")
					.style("line-height", "1.8em")
					.style("text-align", "left");
			})
			.on("mouseout", function (i, d) {
				tooltip.transition().duration(500).style("opacity", 0);
			});

		var svg = d3
			.select("#today")
			.append("text")
			.data(data)
			.text(function (d) {
				const lastDate = data[data.length - 1];
				return new Date(lastDate.date).toDateString();
			});

		var svg = d3
			.select("#currentLocation")
			.append("text")
			.data(data)
			.text(function (d) {
				const location = data[data.length - 1];
				const lasteDateLocation = location.city;
				return lasteDateLocation;
			});

		var svg = d3
			.select("#tempN")
			.append("text")
			.data(data)
			.text(function (d) {
				const lastDate = data[data.length - 1];
				const lasteDateTemp = (lastDate.temp - 273.15).toFixed(2) + " °C";
				return lasteDateTemp;
			});

		var svg = d3
			.select("#dewN")
			.append("text")
			.data(data)
			.text(function (d) {
				const lastDate = data[data.length - 1];
				const lasteDateDew = (lastDate.dew_point - 273.15).toFixed(2) + " °C";
				return lasteDateDew;
			});

		var svg = d3
			.select("#humN")
			.append("text")
			.data(data)
			.text(function (d) {
				const lastDate = data[data.length - 1];
				const lasteDateHum = lastDate.humidity.toFixed(2) + " %";
				return lasteDateHum;
			});
		var svg = d3
			.select(".text_location")
			.append("text")
			.data(data)
			.text(function (d) {
				const location = data[data.length - 1];
				const lasteDateLocation = location.city;
				return lasteDateLocation;
			});
	});
