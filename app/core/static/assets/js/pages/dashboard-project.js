'use strict';
$(document).ready(function() {
    // [ Bar Chart1 ] start
    var chart = AmCharts.makeChart("bar-chart1", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [{
            "Average": "0-1",
            "value": 53,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "Average": "1-4",
            "value": 13,
            "color": ["#a389d4", "#899ed4"]
        }, {
            "Average": "8-24",
            "value": 30,
            "color": ["#04a9f5", "#049df5"]
        }, {
            "Average": ">24",
            "value": 4,
            "color": ["#f44236", "#f48f36"]
        }],
        "valueAxes": [{
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
            "fontSize": 0,
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "labelPosition": "top",
            "labelText": "[[value]]",
            "fillColorsField": "color",
            "fillAlphas": 0.9,
            "lineAlpha": 0,
            "type": "column",
            "valueField": "value"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "Average",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
        }
    });
    // [ Bar Chart1 ] end

    // [ chart-percent ] start
    var chart = AmCharts.makeChart("chart-percent", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [{
            "title": "page done",
            "value": 23,
            "color": "#1de9b6"
        }, {
            "title": "page progress",
            "value": 14,
            "color": "#f4c22b"
        }, {
            "title": "page outstanding",
            "value": 35,
            "color": "#a389d4"
        }, {
            "title": "page started",
            "value": 28,
            "color": "#04a9f5"
        }],
        "titleField": "title",
        "valueField": "value",
        "colorField": "color",
        "labelRadius": 5,
        "radius": "42%",
        "innerRadius": "91%",
        "labelText": "",
        "balloon": {
            "fixedPosition": true
        },
    });
    // [ chart-percent ] end

});
