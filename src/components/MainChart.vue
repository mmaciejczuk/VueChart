<template>
    <div class="wrapper">     
        <div>
            <div v-for="(item, n) in items">
                <div class="btn" v-bind:id=n v-on:click="displayChart(item)">{{item}}</div>
            </div>     
        </div>   
        <div>
            <div id="line-chart"></div>
            <div id="apple-chart"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'main-chart',
        props: {

        },

        data(){
            return{
                items:[],
            }
        },

        methods :{
            
            displayChart: function(itemName){
                let itemContent;
                let allocationCountries;
                let performance;

            // axios.get('../../data/colors.json', { responseType: 'arraybuffer' }).then(response => {
            //     var buffer = new Buffer(response.data, 'binary');
            //     var textdata = buffer.toString(); // for string
            //     console.log(textdata);
            //     var jsondata = buffer.toJSON(); // for json
            //     console.log(jsondata);
            // });                

            // let uri = "../../data/colors.json";
            // axios.get(uri)
            // .then((response) => {
            //     console.log(response.data);
            //     })
            // .then((response) => {
            //     console.table("item " + this.item);
            //     })
            // .catch((error) => {
            //     console.error("error " + error);
            //     }); 
                                    
            // axios.get('../../data/colors.json')
            // .catch(function (error) {
            //     if (error.response) {
            //     // The request was made and the server responded with a status code
            //     // that falls out of the range of 2xx
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //     } else if (error.request) {
            //     // The request was made but no response was received
            //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //     // http.ClientRequest in node.js
            //     console.log(error.request);
            //     } else {
            //     // Something happened in setting up the request that triggered an Error
            //     console.log('Error', error.message);
            //     }
            //     console.log(error.config);
            // });                        


            //     $.getJSON( "../../data/colors.json", function(json) {
            //         console.log( "JSON Data received, name is " + json);
            //     });                

            //     fetch('../../data/colors.json').then(response => {
            //         return response.json();
            //     }).then(data => {
            //         console.log(data);
            //     }).catch(err => {
            //         console.log(err);
            //     });

            //     fetch('../../data/colors.json').then(response => {
            //         return response.text();
            //     }).then(text => {
            //         console.log(text);
            //     }).catch(err => {
            //         console.log(err);
            //     }); 
                
            //     var request = new XMLHttpRequest();
            //     request.open("GET", "../../data/colors.json", false);
            //     request.send(null);
            //     request.onreadystatechange = function() {
            //     if ( request.readyState === 4 && request.status === 200 ) {
            //         var my_JSON_object = JSON.parse(request.responseText);
            //         console.log(my_JSON_object);
            //     }
            //         else{
            //             console.log("dupa");
            //         }
            //     } 

            //     var request = new XMLHttpRequest();
            //     request.open("GET","../../data/colors.json", false);
            //     request.send(null);
            //     var jsonData = JSON.parse(request.responseText);
            //     console.log(jsonData);

                this.$http.get('https://static.fundconnect.com/data.json')
                .then(response => {
                    const {data} = response;

                    itemContent = data.filter(it => it._id === itemName);

                    allocationCountries = itemContent.map(it => it.value.AllocationCountry
                                                        .map(({Value, Key}) => ({name: Key, y:Value})));

                    performance = itemContent.map(it =>it.value.Performance
                                                .map(({Value, Date}) => ([Number(Date.substring(0,4)), Value])));
            
                    Highcharts.chart('line-chart', {
                        chart: {
                            renderTo: 'line-chart',
                            defaultSeriesType: 'spline',
                        },                        
                        title: {
                            text: 'Performance history'
                        },
                        series: [{  
                            name: '',                     
                            data: performance[0],                    
                        }],
                        xAxis: {
                            name: '',
                            min: 2012,
                        },
                        yAxis: {
                            name: ''
                        },
                    });
                    
                    Highcharts.chart('apple-chart', {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: 'Country allocation'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        series: 
                        [{
                            name: 'Brands',
                            colorByPoint: true,
                            data: allocationCountries[0],
                        }],
                        legend: {
                            align: 'right',
                            verticalAlign: 'top',
                            layout: 'vertical',
                            x: 0,
                            y: 100
                        },
                    });  
                });                
            },
        },

        computed: {

        }, 

        //chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
        created: function(){
            this.$http.get('https://static.fundconnect.com/data.json')
            .then(response => {
                this.items = response.data.map(item => item._id);
            }) 
            .catch(function (error) {
                console.log(error);
            });
        }            
    }
</script>

<style scoped>
.wrapper{
    display:grid;
    grid-template-columns: 1fr 3fr;
    /*grid-column-gap: 1%;
    grid-row-gap: 1%; */
    grid-gap: 1em;
    height: 100vh;
}

.wrapper > div{
    background: #eee;
    padding: 1em;
}

.wrapper > div:nth-child(odd){
    background: #ddd;
}

#line-chart{
    border: solid 1px;
    margin-bottom: 20px;
}

#apple-chart{
    border: solid 1px;
}

</style>