'use strict';
$(document).ready(function() {
    setTimeout(function() {
        // [ pie-legend chart ] start
        $(function() {
            var chart = am4core.create("am-pie-2", am4charts.PieChart);
            chart.data = [{
                "country": "Lithuania",
                "litres": 201.9
            }, {
                "country": "Germany",
                "litres": 165.8
            }, {
                "country": "Australia",
                "litres": 139.9
            }, {
                "country": "Austria",
                "litres": 128.3
            }, {
                "country": "UK",
                "litres": 99
            }, {
                "country": "Belgium",
                "litres": 60
            }];
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "litres";
            pieSeries.dataFields.category = "country";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            chart.legend = new am4charts.Legend();
        });
        // [ pie-legend chart ] end

        // [ XY-Stacked-1 chart ] start
        $(function() {
            am4core.useTheme(am4themes_animated);

            var chart = am4core.create("am-xy-1", am4charts.XYChart);
            chart.data = [{
                "country": "Lithuania",
                "research": 501.9,
                "marketing": 250,
                "sales": 199
            }, {
                "country": "Czech Republic",
                "research": 301.9,
                "marketing": 222,
                "sales": 251
            }, {
                "country": "Ireland",
                "research": 201.1,
                "marketing": 170,
                "sales": 199
            }, {
                "country": "Germany",
                "research": 165.8,
                "marketing": 122,
                "sales": 90
            }, {
                "country": "Australia",
                "research": 139.9,
                "marketing": 99,
                "sales": 252
            }, {
                "country": "Austria",
                "research": 128.3,
                "marketing": 85,
                "sales": 84
            }, {
                "country": "UK",
                "research": 99,
                "marketing": 93,
                "sales": 142
            }, {
                "country": "Belgium",
                "research": 60,
                "marketing": 50,
                "sales": 55
            }, {
                "country": "The Netherlands",
                "research": 50,
                "marketing": 42,
                "sales": 25
            }];

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "country";
            categoryAxis.title.text = "Local country offices";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 20;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Expenditure (M)";

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "research";
            series.dataFields.categoryX = "country";
            series.name = "Research";
            series.tooltipText = "{name}: [bold]{valueY}[/]";
            series.stacked = true;

            var series2 = chart.series.push(new am4charts.ColumnSeries());
            series2.dataFields.valueY = "marketing";
            series2.dataFields.categoryX = "country";
            series2.name = "Marketing";
            series2.tooltipText = "{name}: [bold]{valueY}[/]";
            series2.stacked = true;

            var series3 = chart.series.push(new am4charts.ColumnSeries());
            series3.dataFields.valueY = "sales";
            series3.dataFields.categoryX = "country";
            series3.name = "Sales";
            series3.tooltipText = "{name}: [bold]{valueY}[/]";

            chart.cursor = new am4charts.XYCursor();
        });
        // [ XY-Stacked-1 chart ] end

        // [ Map-heat chart ] start
        $(function() {
            var chart = am4core.create("am-map-4", am4maps.MapChart);

            chart.geodata = am4geodata_worldLow;

            chart.projection = new am4maps.projections.Miller();

            var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

            polygonSeries.useGeodata = true;

            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{name}";
            polygonTemplate.fill = am4core.color("#999");

            var hs = polygonTemplate.states.create("hover");
            hs.properties.fill = am4core.color("#899FD4");

            polygonSeries.exclude = ["AQ"];

            polygonSeries.heatRules.push({
                "property": "fill",
                "target": polygonSeries.mapPolygons.template,
                "min": am4core.color("#ffffff"),
                "max": am4core.color("#A389D4")
            });

            var heatLegend = chart.createChild(am4maps.HeatLegend);
            heatLegend.series = polygonSeries;
            heatLegend.width = am4core.percent(100);

            polygonSeries.mapPolygons.template.events.on("over", function(ev) {
                if (!isNaN(ev.target.dataItem.value)) {
                    heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
                } else {
                    heatLegend.valueAxis.hideTooltip();
                }
            });

            polygonSeries.mapPolygons.template.events.on("out", function(ev) {
                heatLegend.valueAxis.hideTooltip();
            });

            polygonSeries.data = [{
                    id: "AF",
                    value: 60.524
                },
                {
                    id: "AL",
                    value: 77.185
                },
                {
                    id: "DZ",
                    value: 70.874
                },
                {
                    id: "AO",
                    value: 51.498
                },
                {
                    id: "AR",
                    value: 76.128
                },
                {
                    id: "AM",
                    value: 74.469
                },
                {
                    id: "AU",
                    value: 82.364
                },
                {
                    id: "AT",
                    value: 80.965
                },
                {
                    id: "AZ",
                    value: 70.686
                },
                {
                    id: "BH",
                    value: 76.474
                },
                {
                    id: "BD",
                    value: 70.258
                },
                {
                    id: "BY",
                    value: 69.829
                },
                {
                    id: "BE",
                    value: 80.373
                },
                {
                    id: "BJ",
                    value: 59.165
                },
                {
                    id: "BT",
                    value: 67.888
                },
                {
                    id: "BO",
                    value: 66.969
                },
                {
                    id: "BA",
                    value: 76.211
                },
                {
                    id: "BW",
                    value: 47.152
                },
                {
                    id: "BR",
                    value: 73.667
                },
                {
                    id: "BN",
                    value: 78.35
                },
                {
                    id: "BG",
                    value: 73.448
                },
                {
                    id: "BF",
                    value: 55.932
                },
                {
                    id: "BI",
                    value: 53.637
                },
                {
                    id: "KH",
                    value: 71.577
                },
                {
                    id: "CM",
                    value: 54.61
                },
                {
                    id: "CA",
                    value: 81.323
                },
                {
                    id: "CV",
                    value: 74.771
                },
                {
                    id: "CF",
                    value: 49.517
                },
                {
                    id: "TD",
                    value: 50.724
                },
                {
                    id: "CL",
                    value: 79.691
                },
                {
                    id: "CN",
                    value: 75.178
                },
                {
                    id: "CO",
                    value: 73.835
                },
                {
                    id: "KM",
                    value: 60.661
                },
                {
                    id: "CD",
                    value: 49.643
                },
                {
                    id: "CG",
                    value: 58.32
                },
                {
                    id: "CR",
                    value: 79.712
                },
                {
                    id: "CI",
                    value: 50.367
                },
                {
                    id: "HR",
                    value: 76.881
                },
                {
                    id: "CU",
                    value: 79.088
                },
                {
                    id: "CY",
                    value: 79.674
                },
                {
                    id: "CZ",
                    value: 77.552
                },
                {
                    id: "DK",
                    value: 79.251
                },
                {
                    id: "GL",
                    value: 79.251
                },
                {
                    id: "DJ",
                    value: 61.319
                },
                {
                    id: "DO",
                    value: 73.181
                },
                {
                    id: "EC",
                    value: 76.195
                },
                {
                    id: "EG",
                    value: 70.933
                },
                {
                    id: "SV",
                    value: 72.361
                },
                {
                    id: "GQ",
                    value: 52.562
                },
                {
                    id: "ER",
                    value: 62.329
                },
                {
                    id: "EE",
                    value: 74.335
                },
                {
                    id: "ET",
                    value: 62.983
                },
                {
                    id: "FJ",
                    value: 69.626
                },
                {
                    id: "FI",
                    value: 80.362
                },
                {
                    id: "FR",
                    value: 81.663
                },
                {
                    id: "GA",
                    value: 63.115
                },
                {
                    id: "GF",
                    value: 79.9
                },
                {
                    id: "GM",
                    value: 58.59
                },
                {
                    id: "GE",
                    value: 74.162
                },
                {
                    id: "DE",
                    value: 80.578
                },
                {
                    id: "GH",
                    value: 60.979
                },
                {
                    id: "GR",
                    value: 80.593
                },
                {
                    id: "GT",
                    value: 71.77
                },
                {
                    id: "GN",
                    value: 55.865
                },
                {
                    id: "GW",
                    value: 54.054
                },
                {
                    id: "GY",
                    value: 66.134
                },
                {
                    id: "HT",
                    value: 62.746
                },
                {
                    id: "HN",
                    value: 73.503
                },
                {
                    id: "HK",
                    value: 83.199
                },
                {
                    id: "HU",
                    value: 74.491
                },
                {
                    id: "IS",
                    value: 81.96
                },
                {
                    id: "IN",
                    value: 66.168
                },
                {
                    id: "ID",
                    value: 70.624
                },
                {
                    id: "IR",
                    value: 73.736
                },
                {
                    id: "IQ",
                    value: 69.181
                },
                {
                    id: "IE",
                    value: 80.531
                },
                {
                    id: "IL",
                    value: 81.641
                },
                {
                    id: "IT",
                    value: 82.235
                },
                {
                    id: "JM",
                    value: 73.338
                },
                {
                    id: "JP",
                    value: 83.418
                },
                {
                    id: "JO",
                    value: 73.7
                },
                {
                    id: "KZ",
                    value: 66.394
                },
                {
                    id: "KE",
                    value: 61.115
                },
                {
                    id: "KP",
                    value: 69.701
                },
                {
                    id: "KR",
                    value: 81.294
                },
                {
                    id: "KW",
                    value: 74.186
                },
                {
                    id: "KG",
                    value: 67.37
                },
                {
                    id: "LA",
                    value: 67.865
                },
                {
                    id: "LV",
                    value: 72.045
                },
                {
                    id: "LB",
                    value: 79.716
                },
                {
                    id: "LS",
                    value: 48.947
                },
                {
                    id: "LR",
                    value: 60.23
                },
                {
                    id: "LY",
                    value: 75.13
                },
                {
                    id: "LT",
                    value: 71.942
                },
                {
                    id: "LU",
                    value: 80.371
                },
                {
                    id: "MK",
                    value: 75.041
                },
                {
                    id: "MG",
                    value: 64.28
                },
                {
                    id: "MW",
                    value: 54.798
                },
                {
                    id: "MY",
                    value: 74.836
                },
                {
                    id: "ML",
                    value: 54.622
                },
                {
                    id: "MR",
                    value: 61.39
                },
                {
                    id: "MU",
                    value: 73.453
                },
                {
                    id: "MX",
                    value: 77.281
                },
                {
                    id: "MD",
                    value: 68.779
                },
                {
                    id: "MN",
                    value: 67.286
                },
                {
                    id: "ME",
                    value: 74.715
                },
                {
                    id: "MA",
                    value: 70.714
                },
                {
                    id: "EH",
                    value: 70.714
                },
                {
                    id: "MZ",
                    value: 49.91
                },
                {
                    id: "MM",
                    value: 65.009
                },
                {
                    id: "NA",
                    value: 64.014
                },
                {
                    id: "NP",
                    value: 67.989
                },
                {
                    id: "NL",
                    value: 80.906
                },
                {
                    id: "NZ",
                    value: 80.982
                },
                {
                    id: "NI",
                    value: 74.515
                },
                {
                    id: "NE",
                    value: 57.934
                },
                {
                    id: "NG",
                    value: 52.116
                },
                {
                    id: "NO",
                    value: 81.367
                },
                {
                    id: "SJ",
                    value: 81.367
                },
                {
                    id: "OM",
                    value: 76.287
                },
                {
                    id: "PK",
                    value: 66.42
                },
                {
                    id: "PA",
                    value: 77.342
                },
                {
                    id: "PG",
                    value: 62.288
                },
                {
                    id: "PY",
                    value: 72.181
                },
                {
                    id: "PE",
                    value: 74.525
                },
                {
                    id: "PH",
                    value: 68.538
                },
                {
                    id: "PL",
                    value: 76.239
                },
                {
                    id: "PT",
                    value: 79.732
                },
                {
                    id: "QA",
                    value: 78.231
                },
                {
                    id: "RO",
                    value: 73.718
                },
                {
                    id: "RU",
                    value: 67.874
                },
                {
                    id: "RW",
                    value: 63.563
                },
                {
                    id: "SA",
                    value: 75.264
                },
                {
                    id: "SN",
                    value: 63.3
                },
                {
                    id: "RS",
                    value: 73.934
                },
                {
                    id: "SL",
                    value: 45.338
                },
                {
                    id: "SG",
                    value: 82.155
                },
                {
                    id: "SK",
                    value: 75.272
                },
                {
                    id: "SI",
                    value: 79.444
                },
                {
                    id: "SB",
                    value: 67.465
                },
                {
                    id: "SO",
                    value: 54
                },
                {
                    id: "ZA",
                    value: 56.271
                },
                {
                    id: "SS",
                    value: 54.666
                },
                {
                    id: "ES",
                    value: 81.958
                },
                {
                    id: "LK",
                    value: 74.116
                },
                {
                    id: "SD",
                    value: 61.875
                },
                {
                    id: "SR",
                    value: 70.794
                },
                {
                    id: "SZ",
                    value: 48.91
                },
                {
                    id: "SE",
                    value: 81.69
                },
                {
                    id: "CH",
                    value: 82.471
                },
                {
                    id: "SY",
                    value: 71
                },
                {
                    id: "TW",
                    value: 79.45
                },
                {
                    id: "TJ",
                    value: 67.118
                },
                {
                    id: "TZ",
                    value: 60.885
                },
                {
                    id: "TH",
                    value: 74.225
                },
                {
                    id: "TL",
                    value: 67.033
                },
                {
                    id: "TG",
                    value: 56.198
                },
                {
                    id: "TT",
                    value: 69.761
                },
                {
                    id: "TN",
                    value: 75.632
                },
                {
                    id: "TR",
                    value: 74.938
                },
                {
                    id: "TM",
                    value: 65.299
                },
                {
                    id: "UG",
                    value: 58.668
                },
                {
                    id: "UA",
                    value: 68.414
                },
                {
                    id: "AE",
                    value: 76.671
                },
                {
                    id: "GB",
                    value: 80.396
                },
                {
                    id: "US",
                    value: 78.797
                },
                {
                    id: "UY",
                    value: 77.084
                },
                {
                    id: "UZ",
                    value: 68.117
                },
                {
                    id: "VE",
                    value: 74.477
                },
                {
                    id: "PS",
                    value: 73.018
                },
                {
                    id: "VN",
                    value: 75.793
                },
                {
                    id: "YE",
                    value: 62.923
                },
                {
                    id: "ZM",
                    value: 57.037
                },
                {
                    id: "ZW",
                    value: 58.142
                }
            ];
        });
        // [ Map-heat chart ] end
    }, 700);
});
