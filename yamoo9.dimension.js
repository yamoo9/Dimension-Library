/* yamoo9.dimension.js @ 2013 by yamoo9.com */
var yamoo9 = {};
window.$dimension = yamoo9.dimension = (function(w, d, undefined){

	var __d, _dimension, html, body, check_MoveWindow;

	__d = _dimension = {};
	html = d.documentElement;
	body = d.body;
	// 라이브러리 버전
	__d.version = 'v0.0.6';
	// screen.width & screen.height - 모니터 화면 가로/세로 길이
	__d.getScreenWH = function() {
		this.width = screen.width;
		this.height = screen.height;
		return this;
	};
	// window.screenY & window.screenX - 모니터에서 브라우저 창의 상단/좌단에서의 위치 좌표 점
	__d.getScreenXY = function() {
		this.screenX = w.screenX ? w.screenX : w.screenLeft;
		this.screenY = w.screenY ? w.screenY : w.screenTop;
		return this;
	};
	// window.outerWidth & window.outerHeight - 크롬(브라우저의 외형)을 포함한 브라우저의 가로/세로 길이
	__d.getOuter = function() {
		this.outerWidth = w.outerWidth ? w.outerWidth : html.offsetWidth || body.offsetWidth || 0;
		this.outerHeight = w.outerHeight ? w.outerHeight : html.offsetHeight || body.offsetHeight || 0;
		return this;
	};
	// window.innerWidth & window.innerHeight - 사용자 가시 영역(뷰포트: viewport) 가로/세로 길이
	__d.getInner = function() {
		this.innerWidth = w.innerWidth ? w.innerWidth : html.clientWidth || body.clientWidth || 0;
		this.innerHeight = w.innerHeight ? w.innerHeight : html.clientHeight || body.clientHeight || 0;
		return this;
	};
	// window.scrollX & window.scrollY - 문서의 상단/좌단 시작점에서 스크롤된 좌표 점
	__d.getScrollXY = function() {
		this.pageX = this.scrollX = w.scrollX ? w.scrollX : w.pageXOffset ? w.pageXOffset : html.scrollLeft || body.scrollLeft || 0;
		this.pageY = this.scrollY = w.scrollY ? w.scrollY : w.pageYOffset ? w.pageYOffset : html.scrollTop || body.scrollTop || 0;
		return this;
	};
	// html.scrollWidth & html.scrollHeigth - 스크롤 되는 문서의 가로/세로 길이
	__d.getScrollWH = function () {
		this.pageWidth = this.scrollWidth = html.scrollWidth || body.scrollWidth || 0;
		this.pageHeight = this.scrollHeight = html.scrollHeight || body.scrollHeight || 0;
		return this;
	};
	// 윈도우 움직이는지 체크하는 메소드
	__d.checkMoveWindow = function(action) {
		var old_screenX = this.screenX, old_screenY = this.screenY;
		this.getScreenXY();
		if( action.constructor === Function && old_screenX !== this.screenX || old_screenY !== this.screenY ) {
			action();
		}
	};
	// 매 주기마다 윈도우 체크 (주기 기본 값: 300ms)
	__d.setIntervalCheckMoveWindow = function(action, ms) {
		var _this = this;
		ms = ms || 300;
		check_MoveWindow = setInterval(function(){_this.checkMoveWindow(action); } , ms); 
	};
	// 윈도우 움직이는지 체크 해제하는 메소드
	__d.clearIntervalCheckMoveWindow = function() {
		clearInterval(check_MoveWindow);
	};
	// _dimension 객체의 메소드 중, init, update, clear를 제외한 나머지 실행
	// ['getScreenWH', 'getScreenXY', 'getOuter', 'getInner', 'getScrollXY', 'getScrollWH']
	__d.update = function() {
		var reg = /(init|update|clear|checkMoveWindow|setIntervalCheckMoveWindow|clearIntervalCheckMoveWindow)/ig;
		for (var prop in this) {
			if ( this.hasOwnProperty(prop) && this[prop].constructor === Function && !prop.match(reg) ) {
				this[prop]();
			}
		}
		return this;
	};
	// 메소드를 제외한 프로퍼티(version 제외) 지우는 메소드
	__d.clear = function() {
		for (var prop in this) {
			if ( this.hasOwnProperty(prop) && this[prop].constructor !== Function && this[prop] !== this['version']) {
				delete this[prop];
			}
		}
		return this;
	};
	// 초기화 메소드
	__d.init = function(method) {
		method = method || 'update';
		this.clear();
		this[method]();
		return this;
	};

	__d.init();

	return __d;
})(window, document);

