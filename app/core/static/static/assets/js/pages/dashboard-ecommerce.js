'use strict';
$(document).ready(function() {
    // [ bar-chart ] start
        var chart = AmCharts.makeChart("bar-chart3", {
            "type": "serial",
            "theme": "light",
            "marginTop": 10,
            "marginRight": 0,
            "valueAxes": [{
                "id": "v1",
                "position": "left",
                "gridAlpha": 0,
                "axisAlpha": 0,
                "lineAlpha": 0,
                "autoGridCount": false,
                "labelFunction": function(value) {
                    return +Math.round(value) + "00";
                }
            }],
            "graphs": [{
                "id": "g1",
                "valueAxis": "v1",
                "lineColor": ["#1de9b6", "#1dc4e9"],
                "fillColors": ["#1de9b6", "#1dc4e9"],
                "fillAlphas": 1,
                "type": "column",
                "title": "Last Week ",
                "valueField": "sales2",
                "columnWidth": 0.2,
                "legendValueText": "$[[value]]M",
                "balloonText": "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
            },{
                "id": "g2",
                "valueAxis": "v1",
                "lineColor": ["#a389d4", "#899ed4"],
                "fillColors": ["#a389d4", "#899ed4"],
                "fillAlphas": 1,
                "type": "column",
                "title": "Market Place ",
                "valueField": "sales1",
                "columnWidth": 0.2,
                "legendValueText": "$[[value]]M",
                "balloonText": "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
            }],
            "chartCursor": {
                "pan": true,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.2
            },
            "categoryField": "date",
            "categoryAxis": {
                "dashLength": 1,
                "gridAlpha": 0,
                "axisAlpha": 0,
                "lineAlpha": 0,
                "minorGridEnabled": true
            },
            "legend": {
                "useGraphSettings": true,
                "position": "top"
            },
            "balloon": {
                "borderThickness": 1,
                "shadowAlpha": 0
            },
            "dataProvider": [{
                "date": "Q1",
                "sales1": 4.5,
                "sales2": 5.5
            },{
                "date": "Q2",
                "sales1": 5,
                "sales2": 6.5
            },{
                "date": "Q3",
                "sales1": 6.5,
                "sales2": 5.5
            },{
                "date": "Q4",
                "sales1": 6,
                "sales2": 7
            }]
        });
    // [  bar-chart ] end

    // [ Widget-line-chart1 ] starts
     var chartDatac = [{
            "day": "Mon",
            "value": 60
        },{
            "day": "Tue",
            "value": 50
        },{
            "day": "Wed",
            "value": 59
        },{
            "day": "Thu",
            "value": 55
        },{
            "day": "Fri",
            "value": 65
        },{
            "day": "Sat",
            "value": 55
        },{
            "day": "Sun",
            "value": 70
        }];
        var chartc = AmCharts.makeChart("Widget-line-chart1", {
            "type": "serial",
            "addClassNames": true,
            "defs": {
                "filter": [{
                        "x": "-50%",
                        "y": "-50%",
                        "width": "200%",
                        "height": "200%",
                        "id": "blur",
                        "feGaussianBlur": {
                            "in": "SourceGraphic",
                            "stdDeviation": "30"
                        }
                    },
                    {
                        "id": "shadow",
                        "x": "-10%",
                        "y": "-10%",
                        "width": "120%",
                        "height": "120%",
                        "feOffset": {
                            "result": "offOut",
                            "in": "SourceAlpha",
                            "dx": "0",
                            "dy": "20"
                        },
                        "feGaussianBlur": {
                            "result": "blurOut",
                            "in": "offOut",
                            "stdDeviation": "10"
                        },
                        "feColorMatrix": {
                            "result": "blurOut",
                            "type": "matrix",
                            "values": "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .2 0"
                        },
                        "feBlend": {
                            "in": "SourceGraphic",
                            "in2": "blurOut",
                            "mode": "normal"
                        }
                    }
                ]
            },
            "fontSize": 15,
            "dataProvider": chartDatac,
            "autoMarginOffset": 0,
            "marginRight": 0,
            "categoryField": "day",
            "categoryAxis": {
                "color": '#393c40',
                "gridAlpha": 0,
                "axisAlpha": 0,
                "lineAlpha": 0,
                "offset": -20,
                "inside": true,
            },
            "valueAxes": [{
                "fontSize": 0,
                "inside": true,
                "gridAlpha": 0,
                "axisAlpha": 0,
                "lineAlpha": 0,
                "minimum": 0,
                "maximum": 100,
            }],
            "chartCursor": {
                "valueLineEnabled":false,
                "valueLineBalloonEnabled":false,
                "cursorAlpha":0,
                "zoomable":false,
                "valueZoomable":false,
                "cursorColor":"#fff",
                "categoryBalloonColor": "#23d3d7",
                "valueLineAlpha": 0
            },
            "graphs": [{
                "id": "g1",
                "type": "line",
                "valueField":"value",                
              "lineColor":"#23d3d7",
              "lineAlpha":1,
              "lineThickness":3,
                "fillAlphas": 0,
                "showBalloon":true,
                "balloon": {
                    "drop":true,
                    "adjustBorderColor":false,
                    "color":"#ffffff",
                    "fillAlphas":0.2,
                    "bullet":"round",
                    "bulletBorderAlpha":1,
                    "bulletSize":5,
                    "hideBulletsCount":50,
                    "lineThickness":2,
                    "useLineColorForBulletBorder":true,
                    "valueField":"value",
                    "balloonText":"<span style='font-size:18px;'>[[value]]</span>"
                },
            }],
        });
    // [ Widget-line-chart1 ] end
});
