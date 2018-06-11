import d3 from 'd3';
import { d3TimeFormatPreset, d3FormatPreset } from '../modules/utils';
import { getColorFromScheme } from '../modules/colors';
require("./trendline.css");
function trendline(slice, payload) {
    const fd = slice.formData;
    const margin = {
        top: 20, 
        right:40, 
        bottom: (fd.x_axis_label) ? 40 : 20, 
        left: (fd.y_axis_label) ? 60 : 40
    };

    margin.bottom = (fd.bottom_margin != "auto") ? parseInt(fd.bottom_margin,10) : margin.bottom;
    margin.left = (fd.left_margin != "auto") ? parseInt(fd.left_margin,10) : margin.left;
    const width = slice.width() - (margin.left + margin.right);
    const height = slice.height() - (margin.top + margin.bottom);
    const div = d3.select(slice.selector);
    const decimalFormat = d3.format("0.2f");
    const data = payload.data.data;
    //JSON.parse('[{"yearmonth":915129000000,"rate":1.1591},{"yearmonth":917807400000,"rate":1.1203},{"yearmonth":920226600000,"rate":1.0886},{"yearmonth":922905000000,"rate":1.0701},{"yearmonth":925497000000,"rate":1.063},{"yearmonth":928175400000,"rate":1.0377},{"yearmonth":930767400000,"rate":1.037},{"yearmonth":933445800000,"rate":1.0605},{"yearmonth":936124200000,"rate":1.0497},{"yearmonth":938716200000,"rate":1.0706},{"yearmonth":941394600000,"rate":1.0328},{"yearmonth":943986600000,"rate":1.011},{"yearmonth":946665000000,"rate":1.0131},{"yearmonth":949343400000,"rate":0.9834},{"yearmonth":951849000000,"rate":0.9643},{"yearmonth":954527400000,"rate":0.9449},{"yearmonth":957119400000,"rate":0.9059},{"yearmonth":959797800000,"rate":0.9505},{"yearmonth":962389800000,"rate":0.9386},{"yearmonth":965068200000,"rate":0.9045},{"yearmonth":967746600000,"rate":0.8695},{"yearmonth":970338600000,"rate":0.8525},{"yearmonth":973017000000,"rate":0.8552},{"yearmonth":975609000000,"rate":0.8983},{"yearmonth":978287400000,"rate":0.9376},{"yearmonth":980965800000,"rate":0.9205},{"yearmonth":983385000000,"rate":0.9083},{"yearmonth":986063400000,"rate":0.8925},{"yearmonth":988655400000,"rate":0.8753},{"yearmonth":991333800000,"rate":0.853},{"yearmonth":993925800000,"rate":0.8615},{"yearmonth":996604200000,"rate":0.9014},{"yearmonth":999282600000,"rate":0.9114},{"yearmonth":1001874600000,"rate":0.905},{"yearmonth":1004553000000,"rate":0.8883},{"yearmonth":1007145000000,"rate":0.8912},{"yearmonth":1009823400000,"rate":0.8832},{"yearmonth":1012501800000,"rate":0.8707},{"yearmonth":1014921000000,"rate":0.8766},{"yearmonth":1017599400000,"rate":0.886},{"yearmonth":1020191400000,"rate":0.917},{"yearmonth":1022869800000,"rate":0.9561},{"yearmonth":1025461800000,"rate":0.9935},{"yearmonth":1028140200000,"rate":0.9781},{"yearmonth":1030818600000,"rate":0.9806},{"yearmonth":1033410600000,"rate":0.9812},{"yearmonth":1036089000000,"rate":1.0013},{"yearmonth":1038681000000,"rate":1.0194},{"yearmonth":1041359400000,"rate":1.0622},{"yearmonth":1044037800000,"rate":1.0785},{"yearmonth":1046457000000,"rate":1.0797},{"yearmonth":1049135400000,"rate":1.0862},{"yearmonth":1051727400000,"rate":1.1556},{"yearmonth":1054405800000,"rate":1.1674},{"yearmonth":1056997800000,"rate":1.1365},{"yearmonth":1059676200000,"rate":1.1155},{"yearmonth":1062354600000,"rate":1.1267},{"yearmonth":1064946600000,"rate":1.1714},{"yearmonth":1067625000000,"rate":1.171},{"yearmonth":1070217000000,"rate":1.2298},{"yearmonth":1072895400000,"rate":1.2638},{"yearmonth":1075573800000,"rate":1.264},{"yearmonth":1078079400000,"rate":1.2261},{"yearmonth":1080757800000,"rate":1.1989},{"yearmonth":1083349800000,"rate":1.2},{"yearmonth":1086028200000,"rate":1.2146},{"yearmonth":1088620200000,"rate":1.2266},{"yearmonth":1091298600000,"rate":1.2191},{"yearmonth":1093977000000,"rate":1.2224},{"yearmonth":1096569000000,"rate":1.2507},{"yearmonth":1099247400000,"rate":1.2997},{"yearmonth":1101839400000,"rate":1.3406},{"yearmonth":1104517800000,"rate":1.3123},{"yearmonth":1107196200000,"rate":1.3013},{"yearmonth":1109615400000,"rate":1.3185},{"yearmonth":1112293800000,"rate":1.2943},{"yearmonth":1114885800000,"rate":1.2697},{"yearmonth":1117564200000,"rate":1.2155},{"yearmonth":1120156200000,"rate":1.2041},{"yearmonth":1122834600000,"rate":1.2295},{"yearmonth":1125513000000,"rate":1.2234},{"yearmonth":1128105000000,"rate":1.2022},{"yearmonth":1130783400000,"rate":1.1789},{"yearmonth":1133375400000,"rate":1.1861},{"yearmonth":1136053800000,"rate":1.2126},{"yearmonth":1138732200000,"rate":1.194},{"yearmonth":1141151400000,"rate":1.2028},{"yearmonth":1143829800000,"rate":1.2273},{"yearmonth":1146421800000,"rate":1.2767},{"yearmonth":1149100200000,"rate":1.2661},{"yearmonth":1151692200000,"rate":1.2681},{"yearmonth":1154370600000,"rate":1.281},{"yearmonth":1157049000000,"rate":1.2722},{"yearmonth":1159641000000,"rate":1.2617},{"yearmonth":1162319400000,"rate":1.2888},{"yearmonth":1164911400000,"rate":1.3205},{"yearmonth":1167589800000,"rate":1.2993},{"yearmonth":1170268200000,"rate":1.308},{"yearmonth":1172687400000,"rate":1.3246},{"yearmonth":1175365800000,"rate":1.3513},{"yearmonth":1177957800000,"rate":1.3518},{"yearmonth":1180636200000,"rate":1.3421},{"yearmonth":1183228200000,"rate":1.3726},{"yearmonth":1185906600000,"rate":1.3626},{"yearmonth":1188585000000,"rate":1.391},{"yearmonth":1191177000000,"rate":1.4233},{"yearmonth":1193855400000,"rate":1.4683},{"yearmonth":1196447400000,"rate":1.4559},{"yearmonth":1199125800000,"rate":1.4728},{"yearmonth":1201804200000,"rate":1.4759},{"yearmonth":1204309800000,"rate":1.552},{"yearmonth":1206988200000,"rate":1.5754},{"yearmonth":1209580200000,"rate":1.5554},{"yearmonth":1212258600000,"rate":1.5562},{"yearmonth":1214850600000,"rate":1.5759},{"yearmonth":1217529000000,"rate":1.4955},{"yearmonth":1220207400000,"rate":1.4342},{"yearmonth":1222799400000,"rate":1.3266},{"yearmonth":1225477800000,"rate":1.2744},{"yearmonth":1228069800000,"rate":1.3511},{"yearmonth":1230748200000,"rate":1.3244},{"yearmonth":1233426600000,"rate":1.2797},{"yearmonth":1235845800000,"rate":1.305},{"yearmonth":1238524200000,"rate":1.3199},{"yearmonth":1241116200000,"rate":1.3646},{"yearmonth":1243794600000,"rate":1.4014},{"yearmonth":1246386600000,"rate":1.4092},{"yearmonth":1249065000000,"rate":1.4266},{"yearmonth":1251743400000,"rate":1.4575},{"yearmonth":1254335400000,"rate":1.4821},{"yearmonth":1257013800000,"rate":1.4908},{"yearmonth":1259605800000,"rate":1.4579},{"yearmonth":1262284200000,"rate":1.4266},{"yearmonth":1264962600000,"rate":1.368},{"yearmonth":1267381800000,"rate":1.357},{"yearmonth":1270060200000,"rate":1.3417},{"yearmonth":1272652200000,"rate":1.2563},{"yearmonth":1275330600000,"rate":1.2223},{"yearmonth":1277922600000,"rate":1.2811},{"yearmonth":1280601000000,"rate":1.2903},{"yearmonth":1283279400000,"rate":1.3103},{"yearmonth":1285871400000,"rate":1.3901},{"yearmonth":1288549800000,"rate":1.3654},{"yearmonth":1291141800000,"rate":1.3221},{"yearmonth":1293820200000,"rate":1.3371},{"yearmonth":1296498600000,"rate":1.3656},{"yearmonth":1298917800000,"rate":1.402},{"yearmonth":1301596200000,"rate":1.446},{"yearmonth":1304188200000,"rate":1.4335},{"yearmonth":1306866600000,"rate":1.4403},{"yearmonth":1309458600000,"rate":1.4275},{"yearmonth":1312137000000,"rate":1.4333},{"yearmonth":1314815400000,"rate":1.3747},{"yearmonth":1317407400000,"rate":1.3732},{"yearmonth":1320085800000,"rate":1.3558},{"yearmonth":1322677800000,"rate":1.3155},{"yearmonth":1325356200000,"rate":1.291},{"yearmonth":1328034600000,"rate":1.3238},{"yearmonth":1330540200000,"rate":1.3208},{"yearmonth":1333218600000,"rate":1.316},{"yearmonth":1335810600000,"rate":1.2806},{"yearmonth":1338489000000,"rate":1.2541},{"yearmonth":1341081000000,"rate":1.2278},{"yearmonth":1343759400000,"rate":1.2406},{"yearmonth":1346437800000,"rate":1.2885},{"yearmonth":1349029800000,"rate":1.2974},{"yearmonth":1351708200000,"rate":1.2837},{"yearmonth":1354300200000,"rate":1.3119},{"yearmonth":1356978600000,"rate":1.3304},{"yearmonth":1359657000000,"rate":1.3347},{"yearmonth":1362076200000,"rate":1.2953},{"yearmonth":1364754600000,"rate":1.3025},{"yearmonth":1367346600000,"rate":1.2983},{"yearmonth":1370025000000,"rate":1.3197},{"yearmonth":1372617000000,"rate":1.3088},{"yearmonth":1375295400000,"rate":1.3314},{"yearmonth":1377973800000,"rate":1.3364},{"yearmonth":1380565800000,"rate":1.3646},{"yearmonth":1383244200000,"rate":1.3491},{"yearmonth":1385836200000,"rate":1.3708},{"yearmonth":1388514600000,"rate":1.3624}]');
    const x_data_label = "__timestamp";
    const y_data_label = fd.metric.label;
    div.selectAll('*').remove();

    const svg = div.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		
	const ground = svg.append("g").attr("transform", "translate(" + margin.left + ",0)");
    let xAxisFormatter = d3TimeFormatPreset((fd.x_axis_format == "smart_date")?'%d-%b-%Y':fd.x_axis_format);
    let yAxisFormatter = "";
    const xScale = d3.time.scale()
		.range([0,width]);
		
	const yScale = d3.scale.linear()
        .range([height, 0]);

    xScale.domain(d3.extent(data, function(d) { return d[x_data_label]; }));
    yScale.domain([0, Math.round(d3.max(data, function(d) { return parseFloat(d[y_data_label]); }))]);

    const xLabels = data.map(function (d) { return d[x_data_label]; })
    const lineColor = getColorFromScheme(1,fd.color_scheme);    
    function drawLineChart() {
        svg.append("g")
		    .attr("class", "y axis");
		
	    svg.append("g")
            .attr("class", "x axis");
            
	    const xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .tickFormat(xAxisFormatter);
            
        const yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");   
    
        const line = d3.svg.line()
            .x(function(d) { return xScale(d[x_data_label]); })
            .y(function(d) { return yScale(d[y_data_label]); })
            .interpolate(fd.line_interpolation);
        
        ground.append("path")
            .datum(data)
            .attr("class","line")
            .attr("d", line)
            .attr("stroke",lineColor);

        if(fd.show_markers){
            ground.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx",(d)=>xScale(d[x_data_label]))
                .attr("cy",(d)=>yScale(d[y_data_label]))
                .attr("r",2)
                .attr("fill",lineColor);
        }    

        svg.select(".x.axis")
            .attr("transform", "translate("+ (margin.left) +"," + (height) + ")")
            .call(xAxis)
    
        if(fd.y_axis_format){
            yAxisFormatter = d3FormatPreset(fd.y_axis_format);
            yAxis.tickFormat(yAxisFormatter);
        }    
        svg.select(".y.axis")
            .attr("transform", "translate(" + (margin.left) + ",0)")
            .call(yAxis);
        
        // x axis label
        if(fd.x_axis_label){
            svg.append("text")
                .attr("x", (width + (margin.left + margin.right) )/ 2)
                .attr("y", height + margin.bottom)
                .attr("class", "text-label")
                .attr("text-anchor", "middle")
                .text(fd.x_axis_label);
        }    
        
        if(fd.y_axis_label){
            svg.append("text")
                .attr("x", ((height + margin.bottom + margin.top)/2)*-1)
                .attr("y", (margin.left)/ 4)
                .attr("class", "text-label")
                .attr("text-anchor", "start")
                .attr("transform","rotate(-90)")
                .text(fd.y_axis_label);
        }    
    }

    function drawTrendLine() {
        // get the x and y values for least squares
        const xSeries = d3.range(1, xLabels.length + 1);
        const ySeries = data.map(function(d) { return parseFloat(d[y_data_label]); });
        
        const leastSquaresCoeff = leastSquares(xSeries, ySeries);
        
        // apply the reults of the least squares regression
        const x1 = xLabels[0];
        const y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
        const x2 = xLabels[xLabels.length - 1];
        const y2 = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
        const trendData = [[x1,y1,x2,y2]];
        
        const trendline = ground.selectAll(".trendline")
            .data(trendData);
            
        trendline.enter()
            .append("line")
            .attr("class", "trendline")
            .attr("x1", function(d) { return xScale(d[0]); })
            .attr("y1", function(d) { return yScale(d[1]); })
            .attr("x2", function(d) { return xScale(d[2]); })
            .attr("y2", function(d) { return yScale(d[3]); })
            .attr("stroke", "rgba("+fd.color_picker.r+","+fd.color_picker.g+","+fd.color_picker.b+","+fd.color_picker.a+")")
            .attr("stroke-width", 2);
        
        // display equation on the chart
        svg.append("text")
            .text("eq: " + decimalFormat(leastSquaresCoeff[0]) + "x + " + 
                decimalFormat(leastSquaresCoeff[1]))
            .attr("class", "text-label")
            .attr("x", function(d) {return xScale(x2) - 60;})
            .attr("y", function(d) {return yScale(y2) - 30;});
        
        // display r-square on the chart
        svg.append("text")
            .text("r-sq: " + decimalFormat(leastSquaresCoeff[2]))
            .attr("class", "text-label")
            .attr("x", function(d) {return xScale(x2) - 60;})
            .attr("y", function(d) {return yScale(y2) - 10;});
    }

    // returns slope, intercept and r-square of the line
	function leastSquares(xSeries, ySeries) {
		var reduceSumFunc = function(prev, cur) { return prev + cur; };
		
		var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
		var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

		var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
			.reduce(reduceSumFunc);
		
		var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
			.reduce(reduceSumFunc);
			
		var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
			.reduce(reduceSumFunc);
			
		var slope = ssXY / ssXX;
		var intercept = yBar - (xBar * slope);
		var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
		
		return [slope, intercept, rSquare];
	}

    function drawToolTip() {
        const focus = ground.append("g")
            .style("display", "none");     

	    const hoverLine = focus.append("line")
            .attr("stroke", "#ccc")
            .attr("x1", 10).attr("x2", 10) 
            .attr("y1", 0).attr("y2", height);

        ground.append("rect") 
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() {
                focus.style("display", "none");
			    d3.select("#tooltip").remove("");
		     })
            .on("mousemove", mousemove);

        function mousemove() {     
            const mouse_x = d3.mouse(this)[0];
            const x0 = xScale.invert(mouse_x),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i];
                if(d0[x_data_label] && d1[x_data_label]){
                    const d = x0 - d0[x_data_label] > d1[x_data_label] - x0 ? d1 : d0;  
                    hoverLine.attr("x1", mouse_x).attr("x2", mouse_x);
                    d3.select("#tooltip").remove("");
                    drawForeignObject(mouse_x,d);
                }
        }

	    const fowidth = 150;

	    function drawForeignObject(x,d){
		    var fo = ground.append('foreignObject');
		    fo.attr({
				'id':'tooltip',
                'x': ((width + margin.left + margin.right) - xScale(d[x_data_label])) < fowidth ? ((xScale(d[x_data_label]) + margin.left + margin.right )-fowidth) : xScale(d[x_data_label]),
                'y': yScale(d[y_data_label]),
                'width': fowidth,
                'class': 'svg-tooltip'
            });
            var div = fo.append('xhtml:div')
                .append('div')
                .attr({ 'class': 'tooltip' });
                    
            div.append('p')
                .html(xAxisFormatter(new Date(d[x_data_label])));
			div.append('p')
                .html("<span style='height:10px;width:10px;display:inline-block;background:"+lineColor+"'></span>&nbsp;&nbsp;"+ y_data_label +"&nbsp;<strong>"+ (fd.y_axis_format ? yAxisFormatter(d[y_data_label]) : d[y_data_label]) +"</strong>");	
            var foHeight = div[0][0].getBoundingClientRect().height;
            fo.attr({ 'height': foHeight });          
	    }                         

        var bisectDate = d3.bisector(function(d) { return d[x_data_label]; }).left;
    }

    drawLineChart();
    drawTrendLine();
    drawToolTip();
}

module.exports = trendline;