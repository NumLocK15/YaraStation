
(function($){

	function drawSin(xOffset,color1,color2){
        var config = this.data('waterBall').config;
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = config.cvs_config.width;
		canvas.height = config.cvs_config.height;

        /****剪切内圆画布***/
		ctx.save();
		var points = [];//用于存放绘制Sin曲线的点
        ctx.beginPath();
        ctx.arc(config.circle_config.r,config.circle_config.r,config.circle_config.cR - 5,0,2 * Math.PI);
        ctx.clip();
        ctx.closePath();

        /***画sin曲线***/
		ctx.beginPath();
		//在整个轴长上取点
		var w_sX = config.wave_config.sX,
			w_waveWidth = config.wave_config.waveWidth,
			w_waveHeight = config.wave_config.waveHeight,
			w_axisLength = config.wave_config.axisLength,
			c_width = config.cvs_config.width,
			c_height = config.cvs_config.height;

		for(var x = w_sX;x < w_sX + w_axisLength;x += 20 / w_axisLength) {
			//此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
			var y = -Math.sin((w_sX + x) * w_waveWidth + xOffset);

			var dY = c_height * (1 - config.nowRange / 100 );

			points.push([x, dY + y * w_waveHeight]);
			ctx.lineTo(x, dY + y * w_waveHeight);
		}
		ctx.lineTo(w_axisLength,c_height);
		ctx.lineTo(w_sX,c_height);
		ctx.lineTo(points[0][0],points[0][1]);

		var gradient = ctx.createLinearGradient(0,c_height,c_width,points[points.length - 1][1]);
		gradient.addColorStop(0,color1);
		gradient.addColorStop(1,color2);

		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.restore();


        /**绘制百分比文本**/
		if (!config.isLoading) {
			ctx.save();
			var size = 0.4 * config.circle_config.cR;
			ctx.font = size + 'px Microsoft Yahei';
			ctx.textAlign = 'center';
			ctx.fillStyle = config.textColorRange[getIndex.call(this)];
			ctx.fillText(~~config.nowRange + '%', config.circle_config.r, config.circle_config.r + size / 2);
			ctx.restore();

		}
		return canvas;
	}

	function drawCircle(){
        var config = this.data('waterBall').config;
        var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = config.cvs_config.width;
		canvas.height = config.cvs_config.height;
		ctx.lineWidth = config.lineWidth;
		ctx.beginPath();
		ctx.strokeStyle = config.circle_line_color[getIndex.call(this)];
		ctx.arc(config.circle_config.r,config.circle_config.r,config.circle_config.cR,0,2 * Math.PI);
		ctx.stroke();

		return canvas;
	}

	function getIndex(){
        var config = this.data('waterBall').config;
		for (var i = 0,data = config.data_range;i < data.length;i++) {
			if (config.nowRange < data[i]) {
				return i;
			}
		}
		return data.length - 1;

	}

    var methods = {
        init: function (config) {

         return this.each(function(){
            //使用jQuery data方法对每个元素跟踪变量

            var $this = $(this),
                data = $this.data('waterBall'),
                _config = {
                    cvs_config:{
                        width:220,//canvas的长
                        height:220//canvas的高
                    },
                    wave_config:{
                        sX:0,//x轴偏移
                        sY:220 / 2,
                        waveWidth:0.015,//波宽
                        waveHeight:5,//波高
                        axisLength:220,//轴长
                        speed:0.09,//波速
                        xOffset:0
                    },
                    circle_config:{
                        r:220 / 2,//圆心
                        cR:220 / 2 - 5//半径
                    },
                    isLoading:false,//当isLoading为true时，不显示百分比文字
                    nowRange:0,
                    targetRange:0,
                    lineWidth:2,//圆圈线条宽度
                    data_range:[60,80,100],//数据临界值范围
                    textColorRange:['#f44236','#fff','#fff'],//不同临界值文字的颜色范围
                    circle_line_color:['#f15248','#f4c22b','#1de9b6'],//不同临界值圆圈线条颜色
                    main_backcolor_range:[['#f15248','#f75c52'],['#f4c22b','#ffd148'],['#1de9b6','#35f1c2']],//渐变色
                    backcolor_range:[['#f44236','#f75c52'],['#f4c22b','#ffd148'],['#1de9b6','#35f1c2']]
                };
            if (!data) {
                var wave_config = {},circle_config = {};
                if (config.cvs_config) {
                    wave_config = {
                        sY:config.cvs_config.width / 2,
                        axisLength:config.cvs_config.width
                    };
                    circle_config = {
                        r:config.cvs_config.width / 2,
                        cR:config.cvs_config.width / 2 - 5
                    };
                }

                $.extend(true, _config,{
                    wave_config:wave_config,
                    circle_config:circle_config
                },config);
                var canvas = document.createElement('canvas');
                canvas.width = _config.cvs_config.width;
                canvas.height = _config.cvs_config.height;
                $this.html("").html($(canvas));
                $this.data('waterBall',{
                    canvas:canvas,
                    target:$this,
                    config:_config
                });
                methods.render.apply($this);
            }
         });

        },
        destroy: function () {
        },
        updateRange:function (newVal) {
            return this.each(function(){
                var $this = $(this),
                    data = $this.data('waterBall');
                if (!data) return;
                var config = $this.data('waterBall').config;
                config.targetRange = 0;
                config.nowRange = 0;
                config.isLoading = false;
                setTimeout(function () {
                    config.targetRange = newVal;
                },0);
            });
        },
        render: function () {
            var config = this.data('waterBall').config;
            var _canvas = this.data('waterBall').canvas;
            var w_sX = config.wave_config.sX,
                xOffset = config.wave_config.xOffset,
                bg_color1 = config.backcolor_range[getIndex.call(this)][0],
                bg_color2 = config.backcolor_range[getIndex.call(this)][1],
                main_bg_color1 = config.main_backcolor_range[getIndex.call(this)][0],
                main_bg_color2 = config.main_backcolor_range[getIndex.call(this)][1],
                ctx = _canvas.getContext('2d');

            var cvs1 = drawCircle.call(this);

            if (config.nowRange <= config.targetRange) {
                var tmp = 1;
                config.nowRange += tmp;
            }

            if (config.nowRange > config.targetRange) {
                var tmp = 1;
                config.nowRange -= tmp;
            }
            var cvs2 = drawSin.call(this,xOffset + 40, bg_color1, bg_color2);
            var cvs3 = drawSin.call(this,-40 + xOffset, main_bg_color1, main_bg_color2);
            ctx.clearRect(0,0,config.cvs_config.width,config.cvs_config.height);
            ctx.drawImage(cvs1, 0, 0);
            ctx.drawImage(cvs2, 0, 0);
            ctx.drawImage(cvs3, 0, 0);
            delete cvs1;
            delete cvs2;
            delete cvs3;

            config.wave_config.xOffset += config.wave_config.speed;
            requestAnimationFrame(methods.render.bind(this));
        }
    };
	$.fn.createWaterBall = function(method) {

		if (methods[method]) {
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		} else if(typeof method === 'object' || !method) {
			return methods.init.apply(this,arguments);
		} else {
			$.error('Method ' + method + 'does not exits on jQuery.createWaterBall');
		}
	};
})(jQuery);
