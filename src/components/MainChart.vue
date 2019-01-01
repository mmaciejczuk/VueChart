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

                this.$http.get('http://static.fundconnect.com/data.json')
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

.btn{

}
</style>