import Vue from 'vue';

var chart;

var app = new Vue({
    el: '#app',
    data: {
        code: '2538',
        codes: null
    },
    methods: {
        graphNow: function() {
            drawChart(this.code);
        },
        fetchCode: function() {
            console.log('fetchCode()');
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', "http://www.grugrut.net:28080/code/");
            xhr.onload = function() {
                self.codes = eval(xhr.responseText);
                console.log(self.codes[0].html_url);
            };
            xhr.send();
        }
    },
    created: function() {
        this.fetchCode();
        google.charts.load('current', {
            'packages': ['corechart']
        });
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
                legend: 'none',
                seriesType: "candlesticks",
                series: {
                    1: {
                        type: "line"
                    }
                }
            };
            chart = new google.visualization.ComboChart(document.getElementById('canvas'));
            chart.draw(data, options);
        }
    };
    req.open("GET", "http://www.grugrut.net:28080/price/" + code, false);
    req.send(null);
}