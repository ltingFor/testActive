var sHttp = location.protocol;
var sHost = location.host;
var config={
	registerpath:sHttp+'//'+sHost+'/act_web',
	loginpath:sHttp+'//'+sHost+"/appuser",
	actCode1:'5XY4CbRVr518Z9B0HeUmGw==', //线上
	DESkey:'e9284d45-cf2a-4e46-9367-f122413ca6b0',
	shareTitle:'邀请好友一起赚 双方都有现金奖',
	shareDesc:'赚钱的机会来啦！通过专属链接邀请好友，自己拿0.3%推荐奖，好友额外赚取0.2%年化收益！',
	shareUrl:sHttp+"//"+sHost+'/static/activity/invite/regist.html', //存管集成
	sharePicUrl:sHttp+"//"+sHost+'/static/activity/invite/images/share.jpg',
};

export default config