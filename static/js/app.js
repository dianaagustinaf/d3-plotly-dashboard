/**
 * JSON / DATA EXPLORATION

1 names (list of ids)

2 metadata for each id
    example
    {
      "id": 1601,
      "ethnicity": "Caucasian",
      "gender": "F",
      "age": 22.0,
      "location": "NC",
      "bbtype": "I",
      "wfreq": 2.0
    }

3 samples
    example
    {
      "id": "940",
      "otu_ids": [
        1167,
        2859
      ],
      "sample_values": [
        163,
        126
      ],
      "otu_labels": [
        "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas",
        "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus"
      ]
    }
 */

// let individual = 1601

function charts(individual) {

    // LOAD DATA

    const url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    const url2="../samples.json"

    let ids;
    let metadata;
    let samples;

    d3.json(url).then((data) => {

        ids = data.names;
        metadata = data.metadata;
        samples = data.samples;
        // console.log(ids);
        // console.log(metadata);
        // console.log(samples);


    // BAR CHART
    /**
    Use sample_values as the values for the bar chart.
    Use otu_ids as the labels for the bar chart.
    Use otu_labels as the hovertext for the chart.
    */

    let indiv_data = samples.filter(ind => ind.id == individual);
    // console.log(indiv_data);

    let top = 10;
    let i = 0;
    let indiv_samples = indiv_data[0].sample_values;
    let datalength = indiv_samples.length;
    console.log(datalength);

    let xdata = [];
    let ydata = [];
    let otu_hover = [];

    // validation just in case array has less than 10 values   // i.e. case 1287 
    while (i<top && i<datalength) {
        xdata[i] = indiv_data[0].sample_values[i];
        ydata[i] = "OTU " + indiv_data[0].otu_ids[i];
        otu_hover[i] = indiv_data[0].otu_labels[i];
        i++;
    }
    i=0;

    // console.log(xdata)
    // console.log(ydata)
    // console.log(otu_hover)

    var trace1 = {
        x: xdata.reverse(),
        y: ydata.reverse(),
        text: otu_hover.reverse(),
        orientation: 'h',
        type: 'bar',
        marker: {
            color: 'blue',
            opacity: 0.3,
            line: {
                color: 'black',
                width: 1
                }
        }
    };
    
    var data = [trace1];
    
    var layout = {
        title: 'Top 10 OTUs found in selected individual',
        font: { color: "darkblue", family: "Arial" }
        //barmode: 'stack'
    };
    
    Plotly.newPlot('bar', data, layout);


/**
 * BUBBLE CHART
Use otu_ids for the x values.
Use sample_values for the y values.
Use sample_values for the marker size.
Use otu_ids for the marker colors.
Use otu_labels for the text values.
 */
  
// indiv_data = samples.filter(ind => ind.id == individual);

    let xdataB = indiv_data[0].otu_ids;
    let ydataB = indiv_data[0].sample_values;
    let otu_hoverB = indiv_data[0].otu_labels;

    // console.log(xdataB)
    // console.log(ydataB)
    // console.log(otu_hoverB)

    var trace2 = {
        x: xdataB,
        y: ydataB,
        mode: 'markers',
        text: otu_hoverB,
        marker: {
            color: xdataB,
            size: ydataB,
            colorscale: "Blues"
        }
    };

    var dataB = [trace2];

    var layout = {
        title: 'Each sample OTUs found in selected individual',
        font: { color: "darkblue", family: "Arial" }
    };

    Plotly.newPlot('bubble', dataB, layout);


    /**
     * DROPDOWN 
     */

    let dropd = d3.select("#selDataset");
    ids.forEach(function(id) {
    dropd.append('option').text(id);
    });



    /**
     * METADATA
     */

    let indiv_metadata = metadata.filter(ind => ind.id == individual);
    console.log(indiv_metadata);

    let panel = d3.select("#sample-metadata")
    panel.html('');
    Object.entries(indiv_metadata[0]).forEach(([key,value]) => {
        panel.append('p').text(key.toUpperCase() + ": " + value);
    });
    // Object.values(obj)
    // Object.keys(obj)


    /**
     *   GAUGE
     */

    let indiv_wfreq = indiv_metadata[0].wfreq;
    
    var data3 = [
        {
            type: "indicator",
            mode: "gauge+number+delta",
            value: indiv_wfreq,
            title: {text: "Belly Button Washing Frequency"},
            delta: { reference: 0, increasing: { color: "RebeccaPurple"}},

            gauge: {
                axis: { range: [null, 9], tickwidth: 1, ticks:9},
                bar: { color: "RebeccaPurple", opacity:0.5 },
                steps: [
                    { range: [0, 1], color: "darkblue", opacity:0.6 },
                    { range: [1, 2], color: "white"},
                    { range: [2, 3], color: "darkblue"},
                    { range: [3, 4], color: "white"},
                    { range: [4, 5], color: "darkblue"},
                    { range: [5, 6], color: "white"},
                    { range: [6, 7], color: "darkblue"},
                    { range: [7, 8], color: "white"},
                    { range: [8, 9], color: "darkblue"}
                ],
                threshold: {
                    line: { color: "RebeccaPurple", opacity:0.5, width: 4.5},
                    thickness: 0.75,
                    value: indiv_wfreq
                }
            }
        }
    ];

    var layout3 = { 
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial" }
    };
    Plotly.newPlot('gauge', data3, layout3);



    });
};


function optionChanged(indivID) {
    charts(indivID);
}

// INIT 
charts(1601);





