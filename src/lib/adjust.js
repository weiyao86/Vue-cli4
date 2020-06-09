//rem 布局
(function(window, document) {
	var setRem = function() {
		var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;
		if (innerWidth > 768) {
			document.documentElement.style.fontSize = 48 + 'px';
		} else {
			document.documentElement.style.fontSize = innerWidth / 375 * 16 + 'px';
		}
	};
	window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', setRem, false);
	setRem();
})(window, document);

// 判断iPhone X、iPhone XS、iPhone XS Max、iPhone XR
// iPhone X、iPhone XS
var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio ===
	3 && window.screen.width === 375 && window.screen.height === 812;
// iPhone XS Max
var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio ===
	3 && window.screen.width === 414 && window.screen.height === 896;
// iPhone XR
var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio ===
	2 && window.screen.width === 414 && window.screen.height === 896;

if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
	document.getElementsByTagName('html')[0].className += 'isIPhoneX';
}