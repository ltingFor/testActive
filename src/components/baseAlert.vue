<template>
	<div id="oAlert" v-if="isShow">
		<!--弹框-->
		<div class="gui-msk"></div>
		<div class="guiMsk-com">

		    <span class="gui-icon guiMsk-close" v-if="promptType == 'helpType'"  @click="refresh"></span>
            <a :href="`${addressData.tologin_address}${backUrl}`" v-else-if="promptType == 'backUrl'" class="gui-icon guiMsk-close"></a>
			<span class="gui-icon guiMsk-close" v-else @click="guiMsk"></span>

		    <div class="gui-icon top"></div>
		    <div class="help-com">
		        <h2 style="text-indent:0;">温馨提示</h2>

		    	<div v-if="promptType == 'toUrl'">
		    		<p>亲!你尚未登录或登录状态已失效，请登录</p>
		    		<a class="toLogin" :href="`${addressData.tologin_address}${zqzr}`"  :class="{redColor : isRed}">现在去登录</a>
		    	</div>
		    	<p v-else v-html='promptstr'></p>
		    </div>
		    <div class="fot"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'oAlert',
		props:['isShow','promptstr','promptType','btnStr','isRed','cancelStr','customUrl'],

		data(){
			return {
				loginInNo:false,
                zqzr:'',
                backUrl: ''
                //promptstr: '',
			}
		},
		methods:{
			guiMsk:function(val){
                bus.$emit('actionFlag',val);
				bus.$emit('isShow', false);
			},
			refresh:function(){
				location.href = location.href;
			}

		},
		watch:{
			noLoginIn:function(val){
				this.loginInNo = val;
			}
		},
		mounted(){
			var self = this;
			bus.$on('urlName', function(val){
                self.zqzr = Tools.base64encode(self.addressDataPub.address_pub + '/'+ val);
			});
            // this.zqzr = this.base64encode('https://licaitest.eloancn.com');
            bus.$on('backUrl',function(val){
                self.backUrl = Tools.base64encode(val);
            });
		}
	}
</script>
<style scoped>
.gui-icon {
    background: url("/static/img/guide.png") no-repeat;
}

.gui-msk {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
    filter: Alpha(opacity=70);
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
}

/* 
帮助中心

.guiMsk-com {
    width: 480px;
    position: fixed;
    z-index: 1001;
    top: 50%;
    left: 50%;
    margin-left: -240px;
    margin-top: -160px;
}

.guiMsk-com .top {
    background-position: 0 -49px;
    height: 8px;
}

.guiMsk-com .guiMsk-close {
    background-position: -225px 0;
    position: absolute;
    right: 8px;
    top: 15px;
    width: 17px;
    height: 17px;
    cursor: pointer
}

div .help-com {
    text-align: center;
    font-size: 18px;
    min-height: 200px;
    background-color: #f6f6f6;
    border: 1px solid #d5d5d5;
    border-bottom: none;
    border-top: none;
    overflow: hidden
}

div .help-com h2 {
    color: #000;
    border-bottom: 1px solid #d5d5d5;
    height: 42px;
    background-color: #fff;
}

div .help-com p {
    color: #333;
    line-height: 30px;
    margin: 35px 0 25px 0;
    font-size: 16px;
    margin-top: 60px;
    margin-bottom: 60px;
}

div .help-com .sue-btn {
    line-height: 46px;
    background-position: 0 -72px;
    display: block;
    width: 170px;
    height: 46px;
    margin: 0 auto;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    text-align: center;
}

div .help-com .help p {
    font-size: 14px;
    color: #757575;
    margin-top: 23px;
    line-height: 30px;
    margin-bottom: 0;
}

div .help-com .help div {
    width: 340px;
    margin: 0 auto;
    margin-top: -3px;
    overflow: hidden
}

div .help-com .help div span {
    display: block;
    float: left;
    padding-left: 24px;
    font-size: 16px;
    background: url("/static/img/guide.png") no-repeat -469px -22px;
    line-height: 23px;
    color: #333;
}

div .help-com .help div .phone {
    font-weight: bold;
    background-position: -468px 7px;
    line-height: 27px;
}

div .help-com .help div span em {
    font-size: 13px;
}

div .help-com .help div i {
    display: block;
    float: left;
    height: 14px;
    border-left: 1px solid #d5d5d5;
    margin: 7px 15px 0 20px;
}

div .help-com .help div a {
    font-size: 14px;
    color: #0090f0;
    display: block;
    float: left;
    margin-left: -3px;
}

div .fot {
    background-position: 0 -60px;
    height: 8px;
}

.u-btn.u-btn-hui {
    display: inline-block;
    margin-left: 30px;
    background: #f6f6f6;
    color: #9b999a;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 170px;
    height: 45px;
    border: 1px solid #d5d5d5;
    line-height: 45px;
    _zoom: 1;
    *display: inline;
    border-radius: 5px;
}


.u-btn.u-btn-red {
    display: inline-block;
    margin-left: 30px;
    background: #f84d4d;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 170px;
    height: 45px;
    border: 1px solid #f84d4d;
    line-height: 45px;
    _zoom: 1;
    *display: inline;
    border-radius: 5px;
}
.u-btn.u-btn-red2 {
    display: inline-block;
    background: #f84d4d;
    color: #fff!important;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 170px;
    height: 45px;
    border: 1px solid #f84d4d;
    line-height: 45px;
    _zoom: 1;
    border-radius: 5px;
}

.u-btn.u-btn-green {
    margin-left: 5px;
    background: #0090f0;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 170px;
    height: 45px;
    border: 1px solid #0090f0;
    line-height: 45px;
    display: inline-block;
    _zoom: 1;
    *display: inline;
    border-radius: 5px;
}
.help-com .cenTxt{
    background-color: #f6f6f6;
    min-height: 180px;
    border-left: 1px solid #d5d5d5;
    border-right: 1px solid #d5d5d5;
}
.cenTxt a {
    display: block;
    margin: 0 auto;
    width: 220px;
    height: 46px;
     background: #0090f0;
     border-radius:5px;
    text-align: center;
    line-height: 44px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
}
.cenTxt .two{width: 150px!important;margin-left: 50px;float: left;background-color: #dcdcdc;} */
.redColor{
	background: #f84d4d!important;
}

html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
div,
dl,
dt,
dd,
ul,
ol,
li,
p,
blockquote,
pre,
hr,
figure,
table,
caption,
th,
td,
form,
fieldset,
legend,
input,
button,
textarea,
menu {
    margin: 0;
    padding: 0;
}

header,
footer,
section,
article,
aside,
nav,
address,
figure,
figcaption,
menu,
details {
    display: block;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

caption,
th {
    text-align: left;
    font-weight: normal;
}

html,
body,
fieldset,
img,
iframe,
abbr {
    border: 0;
}

i,
cite,
em,
var,
address,
dfn {
    font-style: normal;
}

[hidefocus],
summary {
    outline: 0;
}

li {
    list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
small {
    font-size: 100%;
}

sup,
sub {
    font-size: 83%;
}

pre,
code,
kbd,
samp {
    font-family: inherit;
}

q:before,
q:after {
    content: none;
}

textarea {
    overflow: auto;
    resize: none;
}

label,
summary {
    cursor: default;
}

a,
button {
    cursor: pointer;
}

del,
ins,
u,
s,
a,
a:hover {
    text-decoration: none;
}

body,
textarea,
input,
button,
select,
keygen,
legend {
    font: 14px/1.7 \5fae\8f6f\96c5\9ed1, \5b8b\4f53;
    outline: 0;
    border: 0;
    outline: none;
}

.f-cb:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
}

.f-cb {
    zoom: 1
}

.f-fl {
    float: left;
}

.f-fr {
    float: right;
}

.f-hide {
    display: none !important
}

.f-show {
    display: block !important
}

.wrap {
    width: 1000px;
    margin: 0 auto;
}

.toLogin {
    /* border: 1px solid #f84d4d; */

    width: 210px;
    height: 40px;
    line-height: 39px;
    border-radius: 4px;
    background: #0090f0;
    color: #ffffff;
    font-weight: bold;
    margin: 0 auto;
    cursor: pointer;
    display: block;
    margin-bottom: 46px;
}
</style>
