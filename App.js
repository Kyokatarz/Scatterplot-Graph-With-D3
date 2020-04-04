const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'


fetch(url).then(response => response.json())
            .then(data =>{
    
    //Constants for sizes
const w = 800,
      h = 600,
      padding = 100,
      tooltipW= 250,
      tooltipH=100;
    
    //Convert data.Time to Date Obj
const convertedToDate = data.map(d =>{
    const temp = d.Time.split(':');
    return new Date(1970, 1, 1, 0, temp[0], temp[1])
})
    
    //Create legend keys
const legendKeys = ['noDoping','Doping']
    //Arrays of Years and Seconds, Max and Min
const years = data.map(d => d.Year);
const seconds = data.map(d => d.Seconds);
const xMin = d3.min(years),
      xMax = d3.max(years);
const yMin = d3.min(convertedToDate),
      yMax = d3.max(convertedToDate);
    
    //Create SVG
const svg = d3.select('#svgContainer')
    .append('svg')
    .attr('width',w)
    .attr('height', h);
    
    //Create Scales
const xScale = d3.scaleLinear()
                .domain([xMin, xMax])
                .range([padding,w-padding]);
    
const yScale = d3.scaleLinear()
                .domain([yMin, yMax])
                .range([padding, (h-padding)]);
    
    //Create Axes
const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));
const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
    
    
        


   document.getElementById('test').textContent = yMax;
       
    //Create circles
    svg.selectAll('circles')
        .data(data)
        .enter()
        .append('circle')
        .attr('class','dot')
        .attr('class', d=>{
        if (d.Doping){
            return legendKeys[1]
        } else return legendKeys[0];
    })
        .attr('cx', (d,i) => xScale(d.Year))
        .attr('cy', (d,i) => yScale(convertedToDate[i]))
        .attr('data-yvalue', (d,i) => yScale(convertedToDate[i]))
        .attr('data-xvalue',(d,i) => xScale(d.Year))
        .attr('r', 8)
        .on('mouseover', (d,i)=>{
            if (w-xScale(d.Year)>=tooltipW){
            tooltip.attr('x', xScale(d.Year) +10 )
                    .attr('y', yScale(convertedToDate[i]) +10)
                    .attr('style','opacity: 1')
            } else {
                tooltip.attr('x', xScale(d.Year) - tooltipW/2 )
                    .attr('y', yScale(convertedToDate[i]) -tooltipH -10)
                    .attr('style','opacity: 1');
            }
        
            /*tooltip.append('text')
                    .text(d.Name + '(' + d.Nationality+')')*/
            
    })  
        .on('mouseout',(d,i) => {
        tooltip.attr('style', 'opacity: 0')
    })

    //Call Axes
    svg.append('g')
        .attr('transform', 'translate(0,' + (h-padding) + ')')
        .attr('id','x-axis')
        .call(xAxis);
    
    svg.append('g')
        .attr('transform', 'translate(' + padding + ',0)')
        .attr('id','y-axis')
        .call(yAxis);
    
    //Create Title
    svg.append('text')
        .text('Doping in Professional Bicycle Racing')
        .attr('x', w/2-100)
        .attr('y',padding/2)
        .attr('id','title')
    
    //Create Tooltip
const tooltip = 
      svg.append('rect')
        .attr('style','opacity: 1')
        .attr('width',tooltipW)
        .attr('height', tooltipH)
        .attr('id','tooltip')
        .append('text')
        .text('placeholder')
    
    //Create Legend
const legend = svg.selectAll('nodes')
        .data(legendKeys)
        .enter()
        .append('rect')
        .attr('id','legend')
        .attr('class', d => d)
        .attr('x', w-175)
        .attr('y',(d,i) => h/4 - (20 *i))  
        .attr('width', 7)
        .attr('height', 7)


        svg.selectAll('labels')
        .data(legendKeys)
        .enter()
        .append('text')
        .text(d=>{
            if (d == 'noDoping'){
                return 'Negative to Doping'
            } else return 'Positive to Doping'
        })
        .attr('x', w-175+20)
        .attr('y',(d,i) => h/4 - (20 *i) + 8)  


        
    
 })
