'use strict';
$(document).ready(function() {
    floatchart()
    $(window).on('resize', function() {
        floatchart();
    });
    $('#mobile-collapse').on('click', function() {
        setTimeout(function() {
            floatchart();
        }, 700);
    });
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

        $.plot($("#sale-view"), [{
            data: [
                [0, 10],
                [1, 20],
                [2, 10],
                [3, 27],
                [4, 10],
                [5, 20],
                [6, 15],
                [7, 24],
                [8, 16],
                [9, 20],
                [10, 10],
                [11, 18],
                [12, 20],
                [13, 10],
                [14, 5],
            ],
            color: "#04a9f5",
            bars: {
                show: true,
                lineWidth: 0,
                fill: true,
                barWidth: 0.5,
                align: 'center',
                horizontal: false,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
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
                max: 30,
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

        $.plot($("#sale-view-second"), [{
            data: [
                [0, 10],
                [1, 20],
                [2, 10],
                [3, 27],
                [4, 10],
                [5, 20],
                [6, 15],
                [7, 24],
                [8, 16],
                [9, 20],
                [10, 10],
                [11, 18],
                [12, 20],
                [13, 10],
                [14, 5],

            ],
            color: "#1de9b6",
            bars: {
                show: true,
                lineWidth: 0,
                fill: true,
                barWidth: 0.5,
                align: 'center',
                horizontal: false,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
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
                max: 30,
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
        $.plot($("#sale-view-third"), [{
            data: [
                [0, 10],
                [1, 20],
                [2, 10],
                [3, 27],
                [4, 10],
                [5, 20],
                [6, 15],
                [7, 24],
                [8, 16],
                [9, 20],
                [10, 10],
                [11, 18],
                [12, 20],
                [13, 10],
                [14, 5],
            ],
            color: "#ff5252",
            bars: {
                show: true,
                lineWidth: 0,
                fill: true,
                barWidth: 0.5,
                align: 'center',
                horizontal: false,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
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
                max: 30,
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

        $.plot($("#app-sale"), [{
            data: [
                [0, 10],
                [2, 27],
                [4, 10],
                [6, 10],
                [8, 27],
                [10, 20],
                [12, 20],
            ],
            color: "#1DE3BE",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
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
                max: 40,
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
        $.plot($("#app-sale1"), [{
            data: [
                [0, 27],
                [2, 10],
                [4, 20],
                [6, 15],
                [8, 27],
                [10, 20],
                [12, 20],
            ],
            color: "#FF4962",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
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
                max: 40,
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
        $.plot($("#app-sale2"), [{
            data: [
                [0, 10],
                [2, 27],
                [4, 18],
                [6, 25],
                [8, 15],
                [10, 25],
                [12, 20],
            ],
            color: "#8C9CD4",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
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
                max: 40,
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
        $.plot($("#app-sale3"), [{
            data: [
                [0, 10],
                [2, 27],
                [4, 10],
                [6, 10],
                [8, 27],
                [10, 20],
                [12, 20],
            ],
            color: "#1DE3BE",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
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
                max: 40,
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
        $.plot($("#user-sale"), [{
            data: [
                [0, 10],
                [3, 80],
                [6, 30],
                [9, 70],
                [12, 20],
                [15, 85],
                [18, 70],
            ],
            color: "#1DE3BE",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: true,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
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
        $.plot($("#user-sale1"), [{
            data: [
                [0, 10],
                [3, 80],
                [6, 10],
                [9, 70],
                [12, 10],
                [15, 60],
                [18, 10],
            ],
            color: "#1DE3BE",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: true,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
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
        $.plot($("#user-sale2"), [{
            data: [
                [0, 80],
                [3, 10],
                [6, 50],
                [9, 45],
                [12, 80],
                [15, 30],
                [18, 70],
                [21, 60],
            ],
            color: "#8C9CD4",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: true,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
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
        $.plot($("#user-sale3"), [{
            data: [
                [0, 10],
                [3, 70],
                [6, 10],
                [9, 65],
                [12, 10],
                [15, 50],
                [18, 70],
            ],
            color: "#8C9CD4",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: true,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
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
        $.plot($("#user-sale4"), [{
            data: [
                [0, 50],
                [3, 70],
                [6, 10],
                [9, 65],
                [12, 10],
                [15, 50],
                [18, 70],
            ],
            color: "#04a9f5",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: true,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
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
        $.plot($("#user-sale5"), [{
            data: [
                [0, 10],
                [3, 80],
                [6, 10],
                [9, 70],
                [12, 10],
                [15, 60],
                [18, 10],
            ],
            color: "#04a9f5",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true
            },
            curvedLines: {
                apply: true,
            }
        }], {
            series: {
                label: "",
                curvedLines: {
                    active: true,
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
    });
}
