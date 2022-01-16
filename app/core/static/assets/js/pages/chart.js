'use strict';
$(document).ready(function() {
    setTimeout(function() {
        floatchart()
    }, 700);
    $(window).on('resize', function() {
        floatchart();
    });
    $('#mobile-collapse').on('click', function() {
        setTimeout(function() {
            floatchart();
        }, 700);
    });
    // [ world-low chart ] start
    var latlong = {};
    latlong["AU"] = {
        "latitude": -27,
        "longitude": 133
    };
    latlong["BR"] = {
        "latitude": -10,
        "longitude": -55
    };
    latlong["BW"] = {
        "latitude": -22,
        "longitude": 24
    };
    latlong["IN"] = {
        "latitude": 20,
        "longitude": 77
    };
    latlong["KE"] = {
        "latitude": 1,
        "longitude": 38
    };
    latlong["MX"] = {
        "latitude": 23,
        "longitude": -102
    };
    latlong["MY"] = {
        "latitude": 2.5,
        "longitude": 112.5
    };
    latlong["NI"] = {
        "latitude": 13,
        "longitude": -85
    };
    latlong["NZ"] = {
        "latitude": -41,
        "longitude": 174
    };
    latlong["PH"] = {
        "latitude": 13,
        "longitude": 122
    };
    latlong["PL"] = {
        "latitude": 52,
        "longitude": 20
    };
    latlong["RU"] = {
        "latitude": 60,
        "longitude": 100
    };
    latlong["TH"] = {
        "latitude": 15,
        "longitude": 100
    };
    latlong["ZA"] = {
        "latitude": -29,
        "longitude": 24
    };

    var mapData = [{
            "code": "MX",
            "name": "Mexico",
            "value": 114793341,
            "color": "#a389d4"
        },
        {
            "code": "BR",
            "name": "Brazil",
            "value": 196655014,
            "color": "#1de9b6"
        },
        {
            "code": "PL",
            "name": "Poland",
            "value": 38298949,
            "color": "#f44236"
        },
        {
            "code": "KE",
            "name": "Kenya",
            "value": 41609728,
            "color": "#1dc4e9"
        },
        {
            "code": "ZA",
            "name": "South Africa",
            "value": 50459978,
            "color": "#f4c22b"
        },
        {
            "code": "RU",
            "name": "Russia",
            "value": 142835555,
            "color": "#f4c22b"
        },
        {
            "code": "IN",
            "name": "India",
            "value": 241491960,
            "color": "#1de9b6"
        },
        {
            "code": "PH",
            "name": "Philippines",
            "value": 94852030,
            "color": "#04a9f5"
        },
        {
            "code": "AU",
            "name": "Australia",
            "value": 22605732,
            "color": "#1dc4e9"
        },
        {
            "code": "TH",
            "name": "Thailand",
            "value": 69518555,
            "color": "#f44236"
        },
        {
            "code": "BW",
            "name": "Botswana",
            "value": 2030738,
            "color": "#04a9f5"
        },
        {
            "code": "MY",
            "name": "Malaysia",
            "value": 28859154,
            "color": "#A389D4"
        },
        {
            "code": "NZ",
            "name": "New Zealand",
            "value": 4414509,
            "color": "#04a9f5"
        },
        {
            "code": "NI",
            "name": "Nicaragua",
            "value": 5869859,
            "color": "#A389D4"
        }
    ];

    var minBulletSize = 3;
    var maxBulletSize = 70;
    var min = Infinity;
    var max = -Infinity;
    for (var i = 0; i < mapData.length; i++) {
        var value = mapData[i].value;
        if (value < min) {
            min = value;
        }
        if (value > max) {
            max = value;
        }
    }

    var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
    var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

    var images = [];
    for (var i = 0; i < mapData.length; i++) {
        var dataItem = mapData[i];
        var value = dataItem.value;

        var square = (value - min) / (max - min) * (maxSquare - minSquare) + minSquare;
        if (square < minSquare) {
            square = minSquare;
        }
        var size = Math.sqrt(square / (Math.PI * 8));
        var id = dataItem.code;

        images.push({
            "type": "circle",
            "theme": "light",
            "width": size,
            "height": size,
            "color": dataItem.color,
            "longitude": latlong[id].longitude,
            "latitude": latlong[id].latitude,
            "title": dataItem.name + "</br> [ " + value + " ]",
            "value": value
        });
    }
    var map = AmCharts.makeChart("world-low", {
        "type": "map",
        "projection": "eckert6",

        "dataProvider": {
            "map": "worldLow",
            "images": images
        },
        "export": {
            "enabled": true
        }
    });
    // [ world-low chart ] end

    // [ Chartline chart ] start
    var chartDatac = [{
        "Year": "Jan",
        "value": 50
    }, {
        "Year": "Feb",
        "value": 60
    }, {
        "Year": "Mar",
        "value": 55
    }, {
        "Year": "Apr",
        "value": 62
    }, {
        "Year": "May",
        "value": 55
    }, {
        "Year": "Jun",
        "value": 62
    }];
    var chartc = AmCharts.makeChart("Chartline", {
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
        "categoryField": "Year",
        "categoryAxis": {
            "color": '#fff',
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
            "offset": -20,
            "minPeriod": "YYYY",
            "inside": true,
        },
        "valueAxes": [{
            "fontSize": 0,
            "inside": true,
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
            "minimum": 0,
            "maximum": 80,
        }],
        "chartCursor": {
            "valueLineEnabled": false,
            "valueLineBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false,
            "valueZoomable": false,
            "cursorColor": "#fff",
            "categoryBalloonDateFormat": "YYYY",
            "categoryBalloonColor": "#1dd6d1",
            "valueLineAlpha": 0
        },
        "graphs": [{
            "id": "g1",
            "type": "line",
            "valueField": "value",
            "bullet": "round",
            "lineColor": "#ffffff",
            "lineAlpha": 1,
            "lineThickness": 3,
            "fillAlphas": 0,
            "showBalloon": true,
            "balloon": {
                "drop": true,
                "adjustBorderColor": false,
                "color": "#000",
                "fillAlphas": 0.2,
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "type": "smoothedLine",
                "useLineColorForBulletBorder": true,
                "valueField": "value",
                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            },
        }],
    });
    // [ Chartline chart ] end

    // [ Widget-line-chart ] start
    var chartDatac = [{
        "day": "Mon",
        "value": 60
    }, {
        "day": "Tue",
        "value": 45
    }, {
        "day": "Wed",
        "value": 70
    }, {
        "day": "Thu",
        "value": 55
    }, {
        "day": "Fri",
        "value": 70
    }, {
        "day": "Sat",
        "value": 55
    }, {
        "day": "Sun",
        "value": 70
    }];
    var chartc = AmCharts.makeChart("Widget-line-chart", {
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
            "color": '#fff',
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
            "valueLineEnabled": false,
            "valueLineBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false,
            "valueZoomable": false,
            "cursorColor": "#fff",
            "categoryBalloonColor": "#51b4e6",
            "valueLineAlpha": 0
        },
        "graphs": [{
            "id": "g1",
            "type": "line",
            "valueField": "value",
            "lineColor": "#ffffff",
            "lineAlpha": 1,
            "lineThickness": 3,
            "fillAlphas": 0,
            "showBalloon": true,
            "balloon": {
                "drop": true,
                "adjustBorderColor": false,
                "color": "#ffffff",
                "fillAlphas": 0.2,
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "useLineColorForBulletBorder": true,
                "valueField": "value",
                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            },
        }],
    });
    // [ Widget-line-chart ] end

    // [ Widget-line-chart1 ] start
    var chartDatac = [{
        "day": "Mon",
        "value": 60
    }, {
        "day": "Tue",
        "value": 50
    }, {
        "day": "Wed",
        "value": 59
    }, {
        "day": "Thu",
        "value": 55
    }, {
        "day": "Fri",
        "value": 65
    }, {
        "day": "Sat",
        "value": 55
    }, {
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
            "valueLineEnabled": false,
            "valueLineBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false,
            "valueZoomable": false,
            "cursorColor": "#fff",
            "categoryBalloonColor": "#23d3d7",
            "valueLineAlpha": 0
        },
        "graphs": [{
            "id": "g1",
            "type": "line",
            "valueField": "value",
            "lineColor": "#23d3d7",
            "lineAlpha": 1,
            "lineThickness": 3,
            "fillAlphas": 0,
            "showBalloon": true,
            "balloon": {
                "drop": true,
                "adjustBorderColor": false,
                "color": "#ffffff",
                "fillAlphas": 0.2,
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "useLineColorForBulletBorder": true,
                "valueField": "value",
                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            },
        }],
    });
    // [ Widget-line-chart1 ] end

    // [ Statistics-sale chart ] start
    var chartData = [{
        "year": "2001",
        "bicycles": 55
    }, {
        "year": "2002",
        "bicycles": 40
    }, {
        "year": "2003",
        "bicycles": 50
    }];
    var chart = AmCharts.makeChart("Statistics-sale", {
        "type": "serial",
        "theme": "light",
        "autoMargins": false,
        "addClassNames": true,
        "zoomOutText": "",
        "defs": {
            "filter": [{
                "id": "shadow",
                "width": "150%",
                "height": "150%",
                "feOffset": {
                    "result": "offOut",
                    "in": "SourceAlpha",
                    "dx": "2",
                    "dy": "2"
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
            }]
        },
        "fontSize": 15,
        "pathToImages": "../amcharts/images/",
        "dataProvider": chartData,
        "dataDateFormat": "YYYY",
        "marginTop": 10,
        "marginRight": 0,
        "marginLeft": 0,
        "autoMarginOffset": 5,
        "categoryField": "year",
        "categoryAxis": {
            "gridAlpha": 0,
            "axisAlpha": 0,
            "startOnAxis": true,
            "tickLength": 0,
            "color": "#fff",
            "parseDates": true,
            "minPeriod": "YYYY",
            "offset": 0,
            "inside": true,
        },
        "valueAxes": [{
            "fontSize": 0,
            "gridAlpha": 0,
            "axisAlpha": 0,
            "minimum": 0,
            "maximum": 100,
        }],
        "graphs": [{
            "id": "g3",
            "title": "Bicycles",
            "valueField": "bicycles",
            "lineAlpha": 1,
            "lineColor": "#FFFFFF",
            "lineThickness": 3,
            "bullet": "round",
            "bulletBorderAlpha": 3,
            "bulletAlpha": 1,
            "bulletSize": 8,
            "stackable": false,
            "bulletColor": "#04A5F5",
            "bulletBorderColor": "#fff",
            "bulletBorderThickness": 3,
            "balloonText": "<div style='margin-bottom:30px;text-shadow: 2px 2px rgba(0, 0, 0, 0.1); font-weight:200;font-size:30px; color:#ffffff'>[[value]]</div>"
        }],
        "chartCursor": {
            "cursorAlpha": 1,
            "fontSize": 0,
            "zoomable": false,
            "cursorColor": "#fff",
            "categoryBalloonColor": "#04A5F5",
            "fullWidth": true,
            "categoryBalloonDateFormat": "YYYY",
            "balloonPointerOrientation": "vertical"
        },
        "balloon": {
            "borderAlpha": 0,
            "fillAlpha": 0,
            "shadowAlpha": 0,
            "offsetX": 40,
            "offsetY": -50
        }
    });
    setTimeout(function() {
        chart.zoomToIndexes(1, chartData.length - 2);
    }, 400);
    // [ Statistics-sale chart ] end

    // [ Sitevisite-chart ] start
    var chartData = [{
        "year": "1999",
        "value": 20
    }, {
        "year": "2000",
        "value": 25
    }, {
        "year": "2001",
        "value": 30
    }, {
        "year": "2002",
        "value": 28
    }, {
        "year": "2003",
        "value": 25
    }, {
        "year": "2004",
        "value": 28
    }, {
        "year": "2005",
        "value": 30
    }];

    var chart1 = AmCharts.makeChart("sitevisite-chart", {
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
        "dataProvider": chartData,
        "dataDateFormat": "YYYY",
        "autoMarginOffset": 0,
        "marginRight": 0,
        "categoryField": "year",
        "categoryAxis": {
            "color": '#fff',
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
            "offset": -20,
            "inside": true,
            "parseDates": true,
            "minPeriod": "YYYY"
        },
        "chartCursor": {
            "valueLineEnabled": false,
            "valueLineBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false,
            "cursorColor": "#fff",
            "categoryBalloonColor": "#899ed4",
            "valueZoomable": false,
            "valueLineAlpha": 0
        },
        "valueAxes": [{
            "fontSize": 0,
            "inside": true,
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
        }],
        "graphs": [{
            "id": "g1",
            "valueField": "value",
            "type": "smoothedLine",
            "lineColor": '#fff',
            "fillColors": [
                "#a389d4",
                "transparent"
            ],
            "lineAlpha": 1,
            "lineThickness": 5,
            "fillAlphas": 0.3,
            "showBalloon": true,
            "balloon": {
                "drop": true,
                "adjustBorderColor": false,
                "color": "#ffffff",
                "fillAlphas": 0.2,
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "useLineColorForBulletBorder": true,
                "valueField": "value",
                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            },
        }],
    });
    setTimeout(function() {
        chart1.zoomToIndexes(1, chartData.length - 5);
    }, 400);
    // [ Sitevisite-chart ] end

    // [ stack Chart ] start
    var chart = AmCharts.makeChart("Stack-bar", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [{
            "year": "Jan",
            "visits": 10,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "year": "Feb",
            "visits": 13,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "year": "Mar",
            "visits": 20,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "year": "Apr",
            "visits": 28,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "year": "May",
            "visits": 25,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "year": "Jun",
            "visits": 4,
            "color": ["#1de9b6", "#1dc4e9"]
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
            "fillColorsField": "color",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "columnWidth": 0.1,
            "type": "column",
            "valueField": "visits"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "year",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
        }
    });
    // [ stack Chart ] end

    // [ stack-age Chart ] start
    var chart = AmCharts.makeChart("Stack-age", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [{
            "age": "<20",
            "visits": 30,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "age": "30",
            "visits": 35,
            "color": ["#899FD4", "#A389D4"]
        }, {
            "age": "40",
            "visits": 40,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "age": "50",
            "visits": 30,
            "color": ["#899FD4", "#A389D4"]
        }, {
            "age": "60",
            "visits": 32,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "age": ">70",
            "visits": 38,
            "color": ["#899FD4", "#A389D4"]
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
            "fillColorsField": "color",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "columnWidth": 0.2,
            "type": "column",
            "valueField": "visits"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "age",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
        }
    });
    // [ stack-age Chart ] end

    // [ Line with Area Chart 2 ] start
    var chart = AmCharts.makeChart("line-area2", {
        "type": "serial",
        "theme": "light",
        "marginTop": 10,
        "marginRight": 0,
        "dataProvider": [{
            "year": "Jan",
            "value": 5,
            "value2": 80,
        }, {
            "year": "Feb",
            "value": 30,
            "value2": 95,
        }, {
            "year": "Mar",
            "value": 25,
            "value2": 87,
        }, {
            "year": "Apr",
            "value": 55,
            "value2": 155,
        }, {
            "year": "May",
            "value": 45,
            "value2": 140,
        }, {
            "year": "Jun",
            "value": 65,
            "value2": 147,
        }, {
            "year": "Jul",
            "value": 60,
            "value2": 130,
        }, {
            "year": "Aug",
            "value": 105,
            "value2": 180,
        }, {
            "year": "Sep",
            "value": 80,
            "value2": 160,
        }, {
            "year": "Oct",
            "value": 110,
            "value2": 175,
        }, {
            "year": "Nov",
            "value": 120,
            "value2": 165,
        }, {
            "year": "Dec",
            "value": 150,
            "value2": 200,
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left"
        }],
        "graphs": [{
            "id": "g1",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "round",
            "lineColor": "#1de9b6",
            "lineThickness": 3,
            "negativeLineColor": "#1de9b6",
            "valueField": "value"
        }, {
            "id": "g2",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "round",
            "lineColor": "#10adf5",
            "lineThickness": 3,
            "negativeLineColor": "#10adf5",
            "valueField": "value2"
        }],
        "chartCursor": {
            "cursorAlpha": 0,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "valueLineAlpha": 0.3,
            "fullWidth": true
        },
        "categoryField": "year",
        "categoryAxis": {
            "minorGridAlpha": 0,
            "minorGridEnabled": true,
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0
        },
        "legend": {
            "useGraphSettings": true,
            "position": "top"
        },
    });
    // [ Line with Area Chart 2 ] end

    // [ Bar Chart ] start
    var chart = AmCharts.makeChart("bar-chart", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [{
            "game": "Sport",
            "visits": 53,
            "color": ["#1de9b6", "#1dc4e9"]
        }, {
            "game": "Music",
            "visits": 13,
            "color": ["#a389d4", "#899ed4"]
        }, {
            "game": "Travel",
            "visits": 30,
            "color": ["#04a9f5", "#049df5"]
        }, {
            "game": "News",
            "visits": 4,
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
            "fillColorsField": "color",
            "fillAlphas": 0.9,
            "lineAlpha": 0,
            "columnWidth": 0.2,
            "type": "column",
            "valueField": "visits"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "game",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
        }
    });
    // [ Bar Chart ] end

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

    // [ Line Chart 1 ] start
    var chart = AmCharts.makeChart("line-chart1", {
        "type": "serial",
        "theme": "light",
        "marginTop": 10,
        "marginRight": 0,
        "dataProvider": [{
            "year": "Jan",
            "value": 65,
            "value2": 125,
            "value3": 175,
        }, {
            "year": "Feb",
            "value": 105,
            "value2": 80,
            "value3": 190,
        }, {
            "year": "Mar",
            "value": 145,
            "value2": 30,
            "value3": 160,
        }, {
            "year": "Apr",
            "value": 105,
            "value2": 70,
            "value3": 190,
        }, {
            "year": "May",
            "value": 145,
            "value2": 110,
            "value3": 140,
        }, {
            "year": "Jun",
            "value": 185,
            "value2": 150,
            "value3": 100,
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left"
        }],
        "graphs": [{
            "id": "g1",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "false",
            "lineColor": "#2cd929",
            "lineThickness": 3,
            "negativeLineColor": "#2cd929",
            "type": "smoothedLine",
            "valueField": "value"
        }, {
            "id": "g2",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "false",
            "lineColor": "#29bdf5",
            "lineThickness": 3,
            "negativeLineColor": "#29bdf5",
            "type": "smoothedLine",
            "valueField": "value2"
        }, {
            "id": "g3",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "false",
            "lineColor": "#fdda08",
            "lineThickness": 3,
            "negativeLineColor": "#fdda08",
            "type": "smoothedLine",
            "valueField": "value3"
        }],
        "chartCursor": {
            "cursorAlpha": 0,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "valueLineAlpha": 0.5,
            "fullWidth": true
        },
        "categoryField": "year",
        "categoryAxis": {
            "minorGridAlpha": 0.1,
            "minorGridEnabled": true,
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0
        },
        "legend": {
            "useGraphSettings": true,
            "position": "top"
        },
    });
    // [ Line Chart 1 ] end

    // [ Line Chart 2 ] start
    var chart = AmCharts.makeChart("line-chart2", {
        "type": "serial",
        "theme": "light",
        "marginTop": 10,
        "marginRight": 0,
        "dataProvider": [{
            "year": "Jan",
            "value": 160,
            "value2": 85,
        }, {
            "year": "Feb",
            "value": 140,
            "value2": 95,
        }, {
            "year": "Mar",
            "value": 150,
            "value2": 90,
        }, {
            "year": "Apr",
            "value": 95,
            "value2": 125,
        }, {
            "year": "May",
            "value": 130,
            "value2": 105,
        }, {
            "year": "Jun",
            "value": 55,
            "value2": 120,
        }, {
            "year": "Jul",
            "value": 75,
            "value2": 110,
        }, {
            "year": "Aug",
            "value": 65,
            "value2": 140,
        }, {
            "year": "Sep",
            "value": 140,
            "value2": 100,
        }, {
            "year": "oct",
            "value": 120,
            "value2": 95,
        }, {
            "year": "Nov",
            "value": 110,
            "value2": 130,
        }, {
            "year": "Dec",
            "value": 180,
            "value2": 80,
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "minimum": 0,
            "maximum": 200,
            "position": "left"
        }],
        "graphs": [{
            "id": "g1",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "round",
            "bulletBorderAlpha": 2,
            "bulletAlpha": 1,
            "bulletSize": 12,
            "stackable": false,
            "bulletColor": "#fff",
            "bulletBorderColor": "#a389d4",
            "bulletBorderThickness": 3,
            "lineColor": "#a389d4",
            "lineThickness": 2,
            "type": "smoothedLine",
            "valueField": "value"
        }, {
            "id": "g2",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "round",
            "bulletBorderAlpha": 2,
            "bulletAlpha": 1,
            "bulletSize": 12,
            "stackable": false,
            "bulletColor": "#fff",
            "bulletBorderColor": "#1ddcc8",
            "bulletBorderThickness": 3,
            "lineColor": "#1ddcc8",
            "lineThickness": 2,
            "type": "smoothedLine",
            "valueField": "value2"
        }],
        "chartCursor": {
            "cursorAlpha": 0,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "valueLineAlpha": 0.5,
            "fullWidth": true
        },
        "categoryField": "year",
        "categoryAxis": {
            "minorGridAlpha": 0,
            "minorGridEnabled": true,
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0
        },
        "legend": {
            "useGraphSettings": true,
            "position": "top"
        },
    });
    // [ Line Chart 2 ] end

    // [ Bar Chart2 ] start
    var chart = AmCharts.makeChart("bar-chart2", {
        "type": "serial",
        "theme": "light",
        "marginTop": 10,
        "marginRight": 0,
        "valueAxes": [{
            "id": "v1",
            "position": "left",
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
            "title": "SALES",
            "valueField": "sales",
            "columnWidth": 0.3,
            "legendValueText": "$[[value]]M",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
        }, {
            "id": "g2",
            "valueAxis": "v1",
            "lineColor": ["#a389d4", "#899ed4"],
            "fillColors": ["#a389d4", "#899ed4"],
            "fillAlphas": 1,
            "type": "column",
            "title": "VISITS ",
            "valueField": "visits",
            "columnWidth": 0.3,
            "legendValueText": "$[[value]]M",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
        }, {
            "id": "g3",
            "valueAxis": "v1",
            "lineColor": ["#04a9f5", "#049df5"],
            "fillColors": ["#04a9f5", "#049df5"],
            "fillAlphas": 1,
            "type": "column",
            "title": "CLICKS",
            "valueField": "clicks",
            "columnWidth": 0.3,
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
        "categoryField": "Year",
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
            "Year": "2014",
            "sales": 2,
            "visits": 4,
            "clicks": 3
        }, {
            "Year": "2015",
            "sales": 4,
            "visits": 7,
            "clicks": 5
        }, {
            "Year": "2016",
            "sales": 2,
            "visits": 3,
            "clicks": 4
        }, {
            "Year": "2017",
            "sales": 4.5,
            "visits": 6,
            "clicks": 4
        }]
    });
    // [ Bar Chart2 ] end

    // [ bar-chart3 ] start
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
        }, {
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
        }, {
            "date": "Q2",
            "sales1": 5,
            "sales2": 6.5
        }, {
            "date": "Q3",
            "sales1": 6.5,
            "sales2": 5.5
        }, {
            "date": "Q4",
            "sales1": 6,
            "sales2": 7
        }]
    });
    // [ bar-chart3 ] end

    // [ device chart ] start
    var chart = AmCharts.makeChart("device-chart", {
        "type": "pie",
        "theme": "light",
        "labelRadius": -35,
        "labelText": "[[percents]]%",
        "dataProvider": [{
            "device": "Tablet",
            "percentage": 25.9,
            "color": "#a389d4"
        }, {
            "device": "Mobile",
            "percentage": 32.5,
            "color": "#04a9f5"
        }, {
            "device": "Desktop",
            "percentage": 41.6,
            "color": "#1de9b6"
        }],
        "valueField": "percentage",
        "titleField": "device",
        "colorField": "color",
        "balloon": {
            "fixedPosition": true
        },
    });
    // [ device chart ] end

    // [ chart-statistics ] start
    var chart = AmCharts.makeChart("chart-statistics", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [{
            "title": "page Views",
            "value": 24.7,
            "color": "#1de9b6"
        }, {
            "title": "page Clicks",
            "value": 36.3,
            "color": "#a389d4"
        }, {
            "title": "page Likes",
            "value": 23.5,
            "color": "#04a9f5"
        }, {
            "title": "page",
            "value": 15.5,
            "color": "#ecedef"
        }],
        "titleField": "title",
        "valueField": "value",
        "colorField": "color",
        "labelRadius": 5,
        "radius": "42%",
        "innerRadius": "90%",
        "labelText": "",
        "balloon": {
            "fixedPosition": true
        },
    });
    // [ chart-statistics ] end

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

    // [ chart-percent1 ] start
    var chart = AmCharts.makeChart("chart-percent1", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [{
            "title": "Main Wallet",
            "value": 33.33,
            "color": "#1de9b6"
        }, {
            "title": "Travel",
            "value": 33.33,
            "color": "#a389d4"
        }, {
            "title": "Food & Drink",
            "value": 33.33,
            "color": "#04a9f5"
        }],
        "titleField": "title",
        "valueField": "value",
        "colorField": "color",
        "labelRadius": 5,
        "radius": "42%",
        "innerRadius": "89%",
        "labelText": "",
        "balloon": {
            "fixedPosition": true
        },
    });
    // [ chart-percent1 ] end

    // [ chart-activity ] start
    var chart = AmCharts.makeChart("chart-activity", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [{
            "title": "Max",
            "value": 550,
            "color": "#1de9b6"
        }, {
            "title": "Min",
            "value": 237,
            "color": "#ecedef"
        }],
        "titleField": "title",
        "valueField": "value",
        "colorField": "color",
        "labelRadius": 5,
        "radius": "42%",
        "innerRadius": "95%",
        "labelText": "",
        "balloon": {
            "fixedPosition": true
        },
    });
    // [ chart-activity ] end
    // [ chart-sale ] start
    var chart = AmCharts.makeChart("chart-sale", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [{
            "title": "Max",
            "value": 500,
            "color": "#1de9b6"
        }, {
            "title": "Min",
            "value": 237,
            "color": "#fff"
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
    // [ chart-sale ] end

    // [ sales-render chart ] start
    var chart = AmCharts.makeChart("sales-render", {
        "type": "radar",
        "theme": "light",
        "dataProvider": [{
            "Month": "Jan",
            "visit": 100,
            "sales": 80
        }, {
            "Month": "Feb",
            "visit": 60,
            "sales": 90
        }, {
            "Month": "Mar",
            "visit": 100,
            "sales": 80
        }, {
            "Month": "Apr",
            "visit": 100,
            "sales": 110
        }, {
            "Month": "May",
            "visit": 100,
            "sales": 40
        }, {
            "Month": "Jun",
            "visit": 80,
            "sales": 115
        }],
        "valueAxes": [{
            "axisTitleOffset": 20,
            "minimum": 0,
            "axisAlpha": 0.15
        }, {
            "id": "v2",
            "axisTitleOffset": 20,
            "minimum": 0,
            "axisAlpha": 0,
            "inside": true
        }],
        "startDuration": 2,
        "graphs": [{
                "balloonText": "[[value]] visit of per year",
                "bullet": "false",
                "fillAlphas": 1,
                "lineColor": ["#a389d4", "#899ed4"],
                "valueField": "visit"
            },
            {
                "balloonText": "[[value]] sales of per year",
                "bullet": "false",
                "valueField": "sales",
                "fillAlphas": 1,
                "lineColor": ["#1de9b6", "#1dc4e9"],
                "valueAxis": "v2"
            }
        ],
        "categoryField": "Month",
    });
    // [ sales-render chart ] end

    // [ webchart ] start
    var chart = AmCharts.makeChart("webchart", {
        "type": "radar",
        "theme": "light",
        "dataProvider": [{
            "direction": "Sales",
            "value": 15
        }, {
            "direction": "Visits",
            "value": 13
        }, {
            "direction": "Views",
            "value": 11.1
        }, {
            "direction": "Clicks",
            "value": 15
        }],
        "valueAxes": [{
            "gridType": "circles",
            "minimum": 0,
            "autoGridCount": true,
            "axisAlpha": 0,
            "fillAlpha": 0.05,
            "fillColor": "#eff1f4",
            "gridAlpha": 0.08,
            "position": "center"
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "[[category]]: [[value]] m/s",
            "bullet": "false",
            "fillAlphas": 1,
            "lineColor": ["#1de9b6", "#1dc4e9"],
            "valueField": "value"
        }],
        "categoryField": "direction",
    });
    // [ webchart ] end

    // [ Statistics-line chart ] start
    var chart = AmCharts.makeChart("Statistics-line", {
        "type": "serial",
        "theme": "light",
        "marginTop": 10,
        "marginRight": 0,
        "dataProvider": [{
            "year": "2014",
            "value": 30
        }, {
            "year": "2015",
            "value": 60
        }, {
            "year": "2016",
            "value": 50
        }, {
            "year": "2017",
            "value": 70
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "minimum": 0,
            "maximum": 100,
            "position": "left"
        }],
        "graphs": [{
            "id": "g1",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "round",
            "bulletSize": 5,
            "lineColor": "#1dc4e9",
            "lineThickness": 5,
            "valueField": "value"
        }],
        "chartCursor": {
            "categoryBalloonDateFormat": "YYYY",
            "cursorAlpha": 0,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "valueLineAlpha": 0.5,
            "fullWidth": true
        },
        "dataDateFormat": "YYYY",
        "categoryField": "year",
        "categoryAxis": {
            "minPeriod": "YYYY",
            "parseDates": true,
            "minorGridAlpha": 0.1,
            "gridColor": '#fff',
            "minorGridEnabled": true
        },
    });
    // [ Statistics-line chart ] end

    // [ Comments chart ] start
    var chartDatam = [{
        "year": "1999",
        "value": 30
    }, {
        "year": "2000",
        "value": 55
    }, {
        "year": "2001",
        "value": 80
    }, {
        "year": "2002",
        "value": 60
    }, {
        "year": "2003",
        "value": 100
    }, {
        "year": "2004",
        "value": 70
    }];
    var chartm = AmCharts.makeChart("command-card-chart1", {
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
        "dataProvider": chartDatam,
        "dataDateFormat": "YYYY",
        "autoMarginOffset": 0,
        "marginRight": 0,
        "categoryField": "year",
        "categoryAxis": {
            "color": '#fff',
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
            "offset": -20,
            "inside": true,
            "parseDates": true,
            "minPeriod": "YYYY"
        },
        "chartCursor": {
            "valueLineEnabled": false,
            "valueLineBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false,
            "cursorColor": "#fff",
            "categoryBalloonColor": "#04a9f5",
            "valueZoomable": false,
            "valueLineAlpha": 0
        },
        "valueAxes": [{
            "fontSize": 0,
            "inside": true,
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
            "minimum": 0,
            "maximum": 150,
        }],
        "graphs": [{
            "id": "g1",
            "valueField": "value",
            "type": "smoothedLine",
            "lineColor": '#04a9f5',
            "fillColors": [
                "#23b7e5"
            ],
            "lineAlpha": 1,
            "lineThickness": 5,
            "fillAlphas": 1,
            "showBalloon": true,
            "balloon": {
                "drop": true,
                "adjustBorderColor": false,
                "color": "#ffffff",
                "fillAlphas": 0.2,
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "useLineColorForBulletBorder": true,
                "valueField": "value",
                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            },
        }],
    });
    setTimeout(function() {
        chartm.zoomToIndexes(1, chartDatam.length - 2);
    }, 400);
    // [ Comments chart ] end

    // [ call chart ] start
    var chartDatac = [{
        "year": "2000",
        "value": 55
    }, {
        "year": "2001",
        "value": 45
    }, {
        "year": "2002",
        "value": 60
    }, {
        "year": "2003",
        "value": 80
    }, {
        "year": "2004",
        "value": 70
    }, {
        "year": "2005",
        "value": 55
    }];
    var chartc = AmCharts.makeChart("call-chart", {
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
        "categoryField": "year",
        "categoryAxis": {
            "color": '#fff',
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
            "offset": -20,
            "inside": true,
            "parseDates": true,
            "minPeriod": "YYYY"
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
            "valueLineEnabled": false,
            "valueLineBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false,
            "valueZoomable": false,
            "cursorColor": "#fff",
            "categoryBalloonColor": "#95ead5",
            "valueLineAlpha": 0
        },
        "graphs": [{
            "id": "g1",
            "type": "smoothedLine",
            "valueField": "value",
            "fillColors": [
                "#1de9b6",
                "#1dc4e9"
            ],
            "lineAlpha": 0,
            "fillAlphas": 1,
            "showBalloon": true,
            "balloon": {
                "drop": true,
                "adjustBorderColor": false,
                "color": "#ffffff",
                "fillAlphas": 0.2,
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "useLineColorForBulletBorder": true,
                "valueField": "value",
                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            },
        }, ],
    });
    setTimeout(function() {
        chartc.zoomToIndexes(1, chartDatac.length - 2);
    }, 400);
    // [ call chart ] end

    // [Earnings chart ] start
    var chartData = [{
        "year": "1999",
        "value": 30
    }, {
        "year": "2000",
        "value": 55
    }, {
        "year": "2001",
        "value": 80
    }, {
        "year": "2002",
        "value": 60
    }, {
        "year": "2003",
        "value": 70
    }, {
        "year": "2004",
        "value": 70
    }, {
        "year": "2005",
        "value": 110
    }, {
        "year": "2006",
        "value": 90
    }, {
        "year": "2007",
        "value": 130
    }];
    var chart = AmCharts.makeChart("Earnings-chart", {
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
        "dataProvider": chartData,
        "dataDateFormat": "YYYY",
        "autoMarginOffset": 0,
        "marginRight": -1,
        "marginBottom": -2,
        "categoryField": "year",
        "categoryAxis": {
            "color": '#fff',
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
            "offset": -20,
            "inside": true,
            "parseDates": true,
            "minPeriod": "YYYY"
        },
        "chartCursor": {
            "valueLineEnabled": false,
            "valueLineBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false,
            "cursorColor": "#fff",
            "categoryBalloonColor": "#88dcef",
            "valueZoomable": false,
            "valueLineAlpha": 0
        },
        "valueAxes": [{
            "fontSize": 0,
            "inside": true,
            "gridAlpha": 0,
            "axisAlpha": 0,
            "lineAlpha": 0,
        }],
        "graphs": [{
            "id": "g1",
            "type": "line",
            "valueField": "value",
            "fillColors": [
                "#1dc4e9",
                "#A389D4"
            ],
            "lineColor": "#1dc4e9",
            "balloon": {
                "drop": true,
                "adjustBorderColor": false,
                "color": "#ffffff",
                "type": "smoothedLine"
            },
            "lineAlpha": 1,
            "lineThickness": 5,
            "fillAlphas": 0.9,
            "showBalloon": true
        }],
    });
    // [Earnings chart ] end
});

function floatchart() {
    $(function() {
        // [ flot options ]
        var options = {
            legend: {
                show: false
            },
            series: {
                label: "",
                curvedLines: {
                    active: true,
                    nrSplinePoints: 20
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0,
            },
            yaxis: {
                min: 0,
                max: 80,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {
                color: 'transparent',
                font: {
                    size: 0,
                }
            }
        };
        var options_nospace = {
            legend: {
                show: false
            },
            series: {
                label: "",
                curvedLines: {
                    active: true,
                    nrSplinePoints: 0
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 20,
            },
            yaxis: {
                min: 0,
                max: 80,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {

            }
        };
        // [ power-card-chart ] start
        $.plot($("#power-card-chart"), [{
            data: [
                [0, 50],
                [20, 70],
                [35, 45],
                [50, 73],
                [65, 85],
            ],
            color: "#1dc4e9",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3,

            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: true
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0,
            },
            yaxis: {
                min: 0,
                max: 90,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {
                color: 'transparent',
                font: {
                    size: 0,
                }
            }
        });
        // [ power-card-chart ] end

        // [ processed-bar chart ] start
        $.plot($("#processed-bar"), [{
            data: [
                [0, 30],
                [20, 45],
                [50, 30],
                [80, 45],
                [100, 30]
            ],
            color: "#1dc4e9",
            lines: {
                show: true,
                fill: true,
                lineWidth: 0,
                fillColor: {
                    colors: [{
                            opacity: 0.9
                        },
                        {
                            opacity: 0.1
                        }
                    ]
                },
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: false,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
                    nrSplinePoints: 0
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0,
            },
            yaxis: {
                min: 0,
                max: 50,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {
                color: 'transparent',
                font: {
                    size: 0,
                }
            }
        });
        // [ processed-bar chart ] end

        // [ transactions chart ] start
        $.plot($("#transactions"), [{
            data: [
                [0, 48],
                [1, 30],
                [2, 25],
                [3, 30],
                [4, 20],
                [5, 40],
                [6, 30],
            ],
            color: "#1dc4e9",
            bars: {
                show: true,
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
                },
                barWidth: 0.2,
                align: 'center',
                horizontal: false
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: false,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
                    nrSplinePoints: 0
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0,
            },
            yaxis: {
                min: 0,
                max: 50,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {
                color: 'transparent',
                font: {
                    size: 0,
                }
            }

        });
        // [ transactions chart ] end

        // [ transactions1 chart ] start
        $.plot($("#transactions1"), [{
            data: [
                [0, 48],
                [1, 30],
                [2, 25],
                [3, 30],
                [4, 20],
                [5, 40],
                [6, 30],
            ],
            color: "#a389d4",
            bars: {
                show: true,
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
                },
                barWidth: 0.2,
                align: 'center',
                horizontal: false
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: false,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
                    nrSplinePoints: 0
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0,
            },
            yaxis: {
                min: 0,
                max: 50,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {
                color: 'transparent',
                font: {
                    size: 0,
                }
            }
        });
        // [ transactions1 chart ] end

        // [ transactions2 chart ] start
        $.plot($("#transactions2"), [{
            data: [
                [0, 44],
                [1, 26],
                [2, 22],
                [3, 35],
                [4, 28],
                [5, 35],
                [6, 28],
            ],
            color: "#1dc4e9",
            bars: {
                show: true,
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
                },
                barWidth: 0.2,
                align: 'center',
                horizontal: false
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: false,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
                    nrSplinePoints: 0
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0,
            },
            yaxis: {
                min: 0,
                max: 50,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {
                color: 'transparent',
                font: {
                    size: 0,
                }
            }
        });
        // [ transactions2 chart ] end

        // [ transactions3 chart ] start
        $.plot($("#transactions3"), [{
            data: [
                [0, 40],
                [1, 30],
                [2, 25],
                [3, 38],
                [4, 30],
                [5, 38],
                [6, 30],
            ],
            color: "#1dc4e9",
            bars: {
                show: true,
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
                },
                barWidth: 0.2,
                align: 'center',
                horizontal: false
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: false,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
                    nrSplinePoints: 0
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0,
            },
            yaxis: {
                min: 0,
                max: 50,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {
                color: 'transparent',
                font: {
                    size: 0,
                }
            }
        });
        // [transactions3 chart ] end

        // [ sadball & happyball chart ] start
        var loadingEle = $('.loading');
        $('.sadball').createWaterBall({
            cvs_config: {
                width: 110,
                height: 110
            },
            wave_config: {
                waveWidth: 0.025,
                waveHeight: 3
            },
            data_range: [30, 70, 100],
            isLoading: true,
            nowRange: 26,
            targetRange: 26
        });
        $('.happyball').createWaterBall({
            cvs_config: {
                width: 110,
                height: 110
            },
            wave_config: {
                waveWidth: 0.025,
                waveHeight: 3
            },
            data_range: [30, 70, 100],
            isLoading: true,
            nowRange: 74,
            targetRange: 74
        });
        setTimeout(function() {
            $('.sadball').createWaterBall('updateRange', 26);
            $('.happyball').createWaterBall('updateRange', 74);
        }, 1000);
    });
}
