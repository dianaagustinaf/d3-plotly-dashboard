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


url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then((data) => {

    const ids = data.names;
    const metadata = data.metadata;
    const samples = data.samples;
    //console.log(ids);

})

