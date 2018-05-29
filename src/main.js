import '../src/tools/flexible.js';
import $ from 'jquery';
import config from '../src/tools/config.js';
import requestUtil from '../src/tools/jquery.request.js';
import '../css/index.css';

(function (j,r){
	var parameter = {
		platform : r.tools.GetQueryStringfnDES('platform'),
		device_token : r.tools.GetQueryStringfnDES('device_token'),
		app_secret : r.tools.GetQueryStringfnDES('secret'),
		appid : r.tools.GetQueryStringfnDES('appid'),
		openid : r.tools.GetQueryStringfnDES('openid'),
		uid :　r.tools.GetQueryStringfn('uid'),
		actCode : config.actCode1
	};
	// 赋值给全局变量
	var postData = parameter;
	/*var countDown = function(count_fun, end_fun){
		var that = this;
		var auto = setInterval(function(){
			that.count--;
			if(that.count <= 0){
				end_fun && end_fun.call(that);
				clearInterval(auto);
			};
			count_fun && count_fun.call(that);
		},1000)
	};*/
	var tools = {
		count: 3,
		phone_reg: /^((13[0-9])|(15[0-9])|(18[0-9])|147|199|17[013678])[0-9]{8}$/,
		tip: j('#tip'),
		checkPhone: function(number){
			return this.phone_reg.test(number)
		},
		alertTip: function(content){
			// 自动消失的弹窗
			this.tip.text(content)
			this.tip.show();
			requestUtil.countDown.call(this,undefined,function(){
				this.tip.hide();
				this.count = 3;
			});
		}
	};
	var postEndData = {};
	var invitUtil = {
		invitBtn: j('#invitBtn'),
		// 登录状态的标志
		checkLoginStatus : false,
		// 登录状态判断
		checkLogin: function(){
			var that = this;
			r.postLayer(config.loginpath+'/common/v1/01',postData,function(res){
				var jsonData = res || {};
				var tip2 = jsonData.message;
				if(jsonData.code != "0000"){
					that.checkLoginStatus = false;
				}else if(jsonData.code == "0000"){
					that.checkLoginStatus = true;
				}
			})
		},
		// 去登陆
		goToLogin : function(){
			// alert(parameter.platform)  正常
			if(postData.platform == 1){
				share.skipToLogin();
			}else if(postData.platform == 2){
				//ios
				skipToLogin();
			}
		},
		// 邀请好友按钮
		invitBtnFun: function(){
			j('#invitBtn').on('click',function(){
				var oldUid = parameter.uid;
				if(postData.platform == 1){
					share.clickShare(config.shareTitle,config.shareDesc,config.shareUrl+"?uid="+oldUid,config.sharePicUrl);

				}else if(postData.platform == 2){
					if( typeof clickShare === 'function'){
	  	 	  			clickShare(config.shareTitle,config.shareDesc,config.shareUrl+"?uid="+oldUid,config.sharePicUrl);
	   	 			} else{
								window.webkit.messageHandlers.clickShare.postMessage(
										'{"title":"'+config.shareTitle+'","des":"'+config.shareDesc+'","url":"'+config.shareUrl+'?uid='+oldUid+'","picUrl":"'+config.sharePicUrl+'"}');

						}
				}
			})
		},
		init: function(){
			var that = this;
			that.invitBtnFun();
		}
	};
	invitUtil.init();
})($,requestUtil)

var Bready = false;
(function(j, r) {
	var countDown = function(count_fun, end_fun) {
		var that = this;
		var auto = setInterval(function() {
			that.count--;
			if (that.count <= 0) {
				end_fun && end_fun.call(that);
				clearInterval(auto);
			};
			count_fun && count_fun.call(that);
		}, 1000);
	};
	var tools = {
		count: 2,
		phone_reg: /^((13[0-9])|(15[0-9])|(18[0-9])|147|199|17[013678])[0-9]{8}$/,
		tip: j('#tip'),
		checkPhone: function(number) {
			return this.phone_reg.test(number);
		},
		alertTip: function(content) {
			// 这里面3秒后自动消失的tips
			this.tip.text(content)
			this.tip.show();
			countDown.call(this, undefined, function() {
				this.tip.hide();
				this.count = 2;
			});
		}
	};
	var request_path = config.registerpath;
	// 判断标志
	// 注册相关
	var registerUtil = {
		phone: j('#page_phone'),//手机号码input
		mcode: j('#mcode'),//短信验证码input
		icode: j('#icode'),//图形验证码input
		password: j('#password'),//密码
		password_show: j('#page_password_show'),//是否显示密码
		page_button: j('#page_button'),//注册按钮
		send_code: j('#send_code'),//发送验证码
		wait_code: j('#wait_code'),//倒计时60s
		input_close: j('#page_input_close'),//手机号码的清空
		img_code: j('#img_code'),//图形验证码图片展示
		input_check : j("input[type='checkbox']"),
		password_show_img : j('#page_password_show img'),
		picture_verification_flag:1,//是否开启图片验证1开启
		picture_verification:j('#picture_verification'),//图形验证码元素
		inputuid: j("input[name='uid']"),//短信验证码input
		// 刷新图片验证码
		refreshImage: function() {
			var phone_val = this.phone.val();
			var platform=r.tools.GetQueryStringfnDES('platform')||4;
			var	appid=r.tools.GetQueryStringfnDES('appid')||1;
			var	device_token=r.tools.GetQueryStringfnDES('device_token')||"''";
			if (!tools.checkPhone(phone_val)) {
				tools.alertTip('请输入11位手机号码');
				return false;
			};
			console.log(device_token)
			this.img_code.attr('src', request_path+'/act01/v1/01?v=' + Math.random() + '&sendAddress=' + phone_val+'&platform='+platform+'&appid='+appid+'&device_token='+device_token);
		},
		// 注册信息
		bindEvent: function() {
			var that = this;
			this.page_button.bind('click', function() {
				// alert(Bready)
				if(!Bready){
					var phone_val = that.phone.val().trim();
					if (!tools.checkPhone(phone_val)) {
						tools.alertTip('请输入11位手机号码');
						return false;
					};
					var mcode_val = that.mcode.val().trim();
					if (mcode_val == undefined || mcode_val == '' || mcode_val == null) {
						tools.alertTip('请输入短信验证码');
						return false;
					};
					var password_val = that.password.val().trim();

					if (password_val == undefined || password_val == '' || password_val == null) {

						tools.alertTip('请输入登录密码');

						return false;

					};

					var reg  = /^[0-9a-zA-Z@#$!&*%^]{6,16}$/;

					var flag = reg.test(password_val);

					if(!flag){

						tools.alertTip("密码由 6-16位字母、数字、特殊符号组成");

						return false;

					}
					// 请同意翼龙贷手册
					// if(!that.input_check.is(":checked")){

					// 	tools.alertTip("请同意翼龙贷协议后注册");

					// 	return false;

					// }

					// 渠道码
					var ajl_sign=r.tools.GetQueryStringfn('jl_sign');
					// 活动码
					var aact_sign=r.tools.GetQueryStringfn('act_sign');
					// 注册信息
					r.postLayer(request_path+'/act03/v1/01', {
						mobile: phone_val,
						password: r.tools.encryptByDES(password_val, config.DESkey),
						mobileCode: mcode_val,
						platform: r.tools.GetQueryStringfnDES('platform')||4,
						shareCode: r.tools.GetQueryStringfn('uid'),
						appid:r.tools.GetQueryStringfnDES('appid')||1,
						orderType:1,
						device_token:r.tools.GetQueryStringfnDES('device_token')||'',
						actCode:config.actCode1,
						jl_sign:ajl_sign,
						act_sign:aact_sign,

					}, function(res) {
						var jsonData = res || {};

						var tip = jsonData.message;

						if (jsonData.code != "0000") {

							tools.alertTip(tip);
							that.refreshImage();

							return false;

						}else if(jsonData.code == "0000"){

							if(jsonData.data){

								that.inputuid.data(jsonData.data);

							}
							var str1 = phone_val.slice(0,3);
							var str2 = phone_val.slice(7,11);
							var str_end = str1+"****"+str2;

							j('#register-txt').html(str_end)
							tools.alertTip('注册成功')
							j('#main1').hide();
							j('#main2').show();
							// j("html,body").animate({scrollTop:j("#aTraw").offset().top},1000);
							window.location.href = 'https://mobile.eloancn.com/static/mobileSite/index.html';
						}
					}, ' ');
				}else{
					console.log(Bready)
					j('#main1').show();
					j('#main2').hide();
				}
			});
			// 发送验证码不管
			this.send_code.bind('touchstart', function() {
				// alert(1)

				var phone_val = that.phone.val();

				if (!tools.checkPhone(phone_val)) {

					tools.alertTip('请输入11位手机号码');

					return false;
				};

				// 此处图形验证码有可能不用

				if(JSON.parse(that.picture_verification_flag)){

					//alert(JSON.parse(that.picture_verification_flag))
					var icode_val = that.icode.val().trim();
					if (icode_val == undefined || icode_val == '' || icode_val == null) {
						tools.alertTip('请输入图形验证码');
						return false;
					};
				}
				r.postLayer(request_path+'/act02/v1/01', {
					sendAddress: phone_val,
					platform: r.tools.GetQueryStringfnDES('platform')||4,
					verification_code:that.icode.val(),
					sendCodeType:1,
					orderType:1,
					appid:r.tools.GetQueryStringfnDES('appid')||1,
				}, function(res) {
					var jsonData1 = res || {};
					var tip1 = jsonData1.message;
					if (jsonData1.code != '0000') {
						tools.alertTip(tip1);
						that.refreshImage();
						return false;
					};
					r.hide();
					// r.setLayerFlag(false);
						that.randCode = icode_val;
						that.send_code.hide();
						that.wait_code.show();
						countDown.call(that, function() {
						this.wait_code.text(this.count + '秒');
						}, function() {
							this.count = 60;
							this.wait_code.hide();
							this.send_code.show();
						});

				}, '加载中');
			});

			this.input_close.bind('touchstart', function() {

				that.phone.val("");

				j(this).hide();

			});

			this.phone.focus(function() {

				that.input_close.show();
				that.refreshImage();

			});

			this.phone.blur(function() {

				// that.refreshImage();

				that.input_close.hide();
			});
			// 点击图片验证码刷新
			this.img_code.bind('touchstart', function() {
				that.refreshImage();
			});
			// 点击图片验证码输入框刷新
			this.icode.bind('touchstart', function() {
				that.refreshImage();
			});
		},
		judge: function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			alert('是否是Android：'+isAndroid);
			alert('是否是iOS：'+isiOS);
		},
		init: function() {
			this.count = 60;
			var that=this;
			this.bindEvent();
		    // 清空手机输入栏
		    j('#phone_close').on('touchend',function(){
		    	j('#page_phone').val('');
		    	// alert(1);
		    	return false;
		    });
		}
	};
	registerUtil.init();
})($, requestUtil);
