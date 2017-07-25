import Vue from 'vue';

var chart;

var app = new Vue({
    el: '#app',
    data: {
        code: '2538'
    },
    methods: {
        graphNow: function() {
            drawChart(this.code);
        }
    },
    created: function () {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        drawChart(this.code);
    }
});

function drawChart(code) {
    if (code == undefined) {
        return;
    }
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
    req.open("GET", "http://www.grugrut.net:28080/price/"+code, false);
    req.send(null);
}
