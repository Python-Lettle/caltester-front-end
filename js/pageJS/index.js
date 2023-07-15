mui.init({swipeBack:true});
var token = localStorage.getItem("token");
function user() {
	token = localStorage.getItem("token");
	if (token == null) {
		mui.openWindow({
			url:"login.html",
			id:"login",
			show:{
			  autoShow:true,//页面loaded事件发生后自动显示，默认为true
			  aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
			}
		});
	} else {
		mui.openWindow({
			url:"userhome.html",
			id:"userhome",
			show:{
			  autoShow:true,//页面loaded事件发生后自动显示，默认为true
			  aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
			}
		});
	}
}

function cal_page() {
	token = localStorage.getItem("token");
	if (token != null) {
		mui.openWindow({
			url:"calculate.html",
			id:"calculate",
			// styles:{
			//   top:newpage-top-position,//新页面顶部位置
			//   bottom:newage-bottom-position,//新页面底部位置
			//   width:newpage-width,//新页面宽度，默认为100%
			//   height:newpage-height,//新页面高度，默认为100%
			//   ......
			// },
			extras:{
				token: token
			},
			// createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			show:{
			  autoShow:true,//页面loaded事件发生后自动显示，默认为true
			  aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
			  // duration:animationTime//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			}
			// waiting:{
			//   autoShow:true,//自动显示等待框，默认为true
			//   title:'正在加载...'//等待对话框上显示的提示内容
			  // options:{
			  //   width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
			  //   height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
			  // }
			// }
		});
	} else {
		mui.toast("请先登录");
	}
}

function wrong_page() {
	token = localStorage.getItem("token");
	if (token != null) {
		mui.openWindow({
			url:"wrong.html",
			id:"wrong",
			show:{
			  autoShow:true,//页面loaded事件发生后自动显示，默认为true
			  aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
			}
		});
	} else {
		mui.toast("请先登录");
	}
}

function rank() {
	token = localStorage.getItem("token");
	if (token != null) {
		mui.openWindow({
			url:"rank.html",
			id:"rank",
			show:{
			  autoShow:true,//页面loaded事件发生后自动显示，默认为true
			  aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
			}
		});
	} else {
		mui.toast("请先登录");
	}
}