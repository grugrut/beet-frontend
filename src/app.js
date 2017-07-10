import Vue from 'vue';

var chart;

var app = new Vue({
    el: '#app',
    data: {
        code: '1234'
    },
    methods: {
        graphNow: function() {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == 200) {
                    var rpdata = eval(req.responseText);
                    var data = google.visualization.arrayToDataTable(rpdata, true);
                    var options = {
                        legend:'none',
                        seriesType: "candlesticks",
                        series: {1: { type: "line"}}
                    };
                    chart.draw(data, options);
                }
            };
            req.open("GET", "http://www.grugrut.net:28080/"+ this.code, false);
            req.send(null);
        }        
    },
    created: function () {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == 200) {
                    var rpdata = eval(req.responseText);
                    var data = google.visualization.arrayToDataTable(rpdata, true);
                    var options = {
                        legend:'none',
                        seriesType: "candlesticks",
                        series: {1: { type: "line"}}
                    };
                    chart = new google.visualization.ComboChart(document.getElementById('canvas'));
                    chart.draw(data, options);
                }
            };
            req.open("GET", "http://www.grugrut.net:28080/" , false);
            req.send(null);
        }
    }
});
