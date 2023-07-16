mui.back = function() {
mui.openWindow({
	url:"index.html",
	id:"index",
	show:{
		autoShow:true,//页面loaded事件发生后自动显示，默认为true
		aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
	}
});
}

if (localStorage.getItem("regsuccess") != null) {
	mui.toast("注册成功");
}
localStorage.removeItem("regsuccess");
mui("#login")[0].addEventListener('click', function() {
	mui.ajax(HOSTNAME + '/login',{
		data:{
			email: mui("#account")[0].value,
			password: mui("#password")[0].value
		},
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		success:function(data){
			console.log(data.info);
			if (data.code == 200) {
				localStorage.setItem("username",data.info.username);
				localStorage.setItem("userid",data.info.userid);
				localStorage.setItem("token",data.token);
				localStorage.setItem("email",mui("#account")[0].value);
				mui.openWindow({
					url:"index.html",
					id:"index",
					show:{
					  autoShow:true,//页面loaded事件发生后自动显示，默认为true
					  aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
					}
				});
			} else  {
				mui.toast(data.msg);
			}
			
		},
		error: function(xhr,type,errorThrown){
			mui.toast("与服务器通信失败");
		}
	});
});

mui("#reg")[0].addEventListener('click', function() {
	mui.openWindow({
		url:"reg.html",
		id:"reg",
		show:{
		  autoShow:true,//页面loaded事件发生后自动显示，默认为true
		  aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
		}
	});
});

mui("#forgetPassword")[0].addEventListener('click', function() {
	mui.openWindow({
		url:"forget.html",
		id:"forget",
		show:{
		  autoShow:true,//页面loaded事件发生后自动显示，默认为true
		  aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
		}
	});
});

