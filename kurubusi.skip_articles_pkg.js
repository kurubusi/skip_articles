





//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
//  kurubusi.skip_articles Ver.1.0.01 publicbeta
//  2014-10-16
//  KURUBUSI.net === Masahiro Ohkubo
//  http://kurubusi.net/
//  kurubusi.skip_articles.js
//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
/**
 *
 *読み飛ばし機能 kurubusi.skip_articles
 *@module skipArticles
 *@namespace app
 *
 */



 skipArticles = function(){
	
	
	
	var SkipArticles = function(button){
		var this_ = this;
		this.buttonelm = button;
		this.groupname = this.buttonelm.getAttribute('data-sas-group');
		this.orderarr = [];
		this.ordersortarr = [];
		this.ordeposition = 0;
		
		
		
		//同グループのオブジェクト配列作成
		for( var i = 0; i < TARGETPOINT.length; i++ ){
			if(TARGETPOINT[i].getAttribute('data-sas-group') === this.groupname){
				this.orderarr[(TARGETPOINT[i].getAttribute('data-sas-order') || i)] = TARGETPOINT[i];
			}
		}
		
		//配列並び替え
		var count = 0;
		for(var item in this.orderarr) {
			this.ordersortarr[count] = this.orderarr[item];
			count++;
		}
		
		this.changeScrollOpacity(this.buttonelm);
		
		addEventSet(this.buttonelm, 'click', function(e){
			if(this_.ordeposition in this_.ordersortarr){ //続きがあるとき
				this_.moveScroll(document.body.scrollTop, this_.ordersortarr[this_.ordeposition].offsetTop); //移動
				this_.changeTargetStyle(this_.ordersortarr[this_.ordeposition]); //ターゲットスタイル変更
				this_.ordeposition++;
			}else{ //続きがないとき
				this_.ordeposition  = 0;
				if( /*@cc_on ! @*/ false ){
					this_.buttonelm.fireEvent( "onclick" );
				}else{
					var evt = document.createEvent( "MouseEvents" ); // マウスイベント作成
					evt.initEvent( "click", false, true ); // イベントの設定
					this_.buttonelm.dispatchEvent( evt ); // イベントを強制的に発生
				}
			}
		});
		
	};

	//目標の位置に移動
	SkipArticles.prototype.moveScroll = function(y, movey){  //今いる位置, 目標の位置
		
		var begin = new Date() - 0, // アニメーションの開始時間を記録
				moveY = movey - y,      // オブジェクトの現在地と目的地の距離を計測
				duration = 300;         // 移動にかかる時間
		
		
		// アニメーションループを作成
		var timer = setInterval(function(){
			
			var time = new Date() - begin;  // 開始時間（begin）から何秒経過したか取得
			var cuY = easeOutQuad(time, y, moveY, duration);
			if (time > duration){  // 予定アニメーション時間を超過した場合にインターバルをクリア
				clearInterval(timer);
				cuY = movey;
			}
			window.scrollTo(0,cuY);
		},10);
		
		
	};

	//ターゲットの色管理
	SkipArticles.prototype.changeTargetStyle = function(target){
		target.setAttribute('class', target.getAttribute('class') +' k_sas_point');
		
	};

	//ボタンオブジェクトのの透明度とか管理
	SkipArticles.prototype.changeScrollOpacity = function(obj){
		
		var parent = obj.parentNode,
				objstyletop = parseFloat((obj.currentStyle || document.defaultView.getComputedStyle(obj, '')).top);
		
		if(parent.style.position === '' || parent.style.position === 'static'){
			parent.style.position = 'relative';
		}
		
		obj.style.position = 'absolute';
		obj.style.transition = 'opacity 0.3s ease-out 0ms';
		
		
		addEventSet(window, 'scroll', function(e){
			var topaa = (document.documentElement.scrollTop || document.body.scrollTop) + objstyletop;
			obj.style.top = topaa + 'px';
			obj.style.opacity = 0.1;
		});
		addEventSet(obj, 'mouseover', function(e){
			obj.style.opacity = 1;
		});
		
		
		
	};
	
	
	

	
	
	
	switchArea = function(serchclass, serchtag) {
		var par = document,
				reg = new RegExp('(^| +)' + serchclass + '($| +)'),
				nodeList = [];
		
		if (serchtag === undefined) {
			serchtag = '*';
		}
		var el = par.getElementsByTagName(serchtag);
		for (var i = 0; i < el.length; i++) {
			if (reg.test(el[i].className)){
				nodeList.push(el[i]);
			}
		}
		return nodeList;
	};
	
	addEventSet = function(elm,listener,fn){
		try { elm.addEventListener(listener,fn,false);}
		catch(e){ elm.attachEvent("on"+listener,fn);};
	};
	
	extendDeep = function(parent, child){
		var i,
				toStr = Object.prototype.toString,
				astr = "[object Array]";
		child = child || {};
		for(i in parent){
			if(parent.hasOwnProperty(i)){
				if(typeof parent[i] === "object"){
					child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
					extendDeep(parent[i], child[i]);
				}else{
					child[i] = parent[i];
				}
			}
		}
		return child;
	};
	
	addEventSet = function(elm,listener,fn){
		try { elm.addEventListener(listener,fn,false);}
		catch(e){ elm.attachEvent("on"+listener,fn);};
	};
	
	addReadyFunction = function(func){
		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded" , func , false) ;
		}else if(window.ActiveXObject){
			var ScrollCheck = function(){
				try {
					document.documentElement.doScroll("left");
				} catch(e) {
					setTimeout(ScrollCheck , 1 );
					return;
				} 
				// and execute any waiting functions
				func();
			}
			ScrollCheck();
		}
	}
	
	
	uniqueId = function(){
		var randam = Math.floor(Math.random()*1000)
		var date = new Date();
		var time = date.getTime();
		return randam + time.toString();
	}
	
	
	inferenceUa = function(){
		var UA = navigator.userAgent;
		if(UA.indexOf('iPhone') !== -1){
			return 'iPhone';
		}else if(UA.indexOf('iPad') !== -1){
			return 'iPad';
		}else if((UA.indexOf('Android') !== -1) && (UA.indexOf('Mobile') !== -1)){
			return 'AndroidMobile';
		}else if(UA.indexOf('Windows Phone') !== -1){
			return 'Windows Phone';
		}else if(UA.indexOf('BlackBerry') !== -1){
			return 'BlackBerry';
		}else{
			return 'PC';
		}
	};
	
	
	easing = function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	};
	
	
	
	easeOutQuad = function (t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	}
	
	
	
	
	
	
	
	
	var BUTTONELEM,
			TARGETPOINT,
			GROUPARR = [];
			
	addReadyFunction(function(){
		BUTTONELEM = switchArea('k_sas_b'),
		TARGETPOINT = switchArea('k_sas_w');
		
		for( i = 0; i < BUTTONELEM.length; i++ ){
			GROUPARR[i] = new SkipArticles(BUTTONELEM[i]);
		}
	});
	
	
	
	
	
}; //-- skipArticles --//






skipArticles();




