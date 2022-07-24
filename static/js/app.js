// json exploration:
// 1 names (list of ids)
// 2 metadata for each id
/* example
    {
      "id": 1601,
      "ethnicity": "Caucasian",
      "gender": "F",
      "age": 22.0,
      "location": "NC",
      "bbtype": "I",
      "wfreq": 2.0
    }
*/
// 3 samples
/* example
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

    url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

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

    let top = 10;
    let i = 0;
    let xdata = [];
    let ydata = [];
    let otu_hover = [];

    let indiv_data = samples.filter(ind => ind.id == individual);
    // console.log(indiv_data);

    while (i<top) {
        xdata[i] = indiv_data[0].sample_values[i];
        ydata[i] = "OTU " + indiv_data[0].otu_ids[i];
        otu_hover[i] = indiv_data[0].otu_labels[i];
        i++;
    }

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
            color: 'rgba(55,128,191,0.6)',
            width: 1
        }
    };
    
    var data = [trace1];
    
    var layout = {
        title: 'Top 10 OTUs found in selected individual',
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



    });
};

charts(1601);


// let dropd = d3.select("#selDataset");
// ids.forEach(function(id) {
//     dropd.append('option').text(id);
// });