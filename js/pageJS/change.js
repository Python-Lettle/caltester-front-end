// 初始化
mui.init();
mui.back = function() {
    mui.openWindow({
    url:"userhome.html",
    id:"userhome",
    show:{
        autoShow:true,//页面loaded事件发生后自动显示，默认为true
        aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
    }
});
};

// 获取控件
var regButton = document.getElementById('reg');
var passwordBox = document.getElementById('password');
var passwordConfirmBox = document.getElementById('password_confirm');
var passwordOld = document.getElementById("password_old");

// 修改密码按钮事件
mui("#reg")[0].addEventListener('tap', function(event) {
    var passwordConfirm = passwordConfirmBox.value;
	
    if (passwordConfirm != passwordBox.value) {
        mui.alert('密码两次输入不一致', function() {}, 'div');
        return;
    } else if (passwordBox.value.length < 8) {
        mui.alert("密码长度小于8,请设置更长的密码", function() {}, 'div');
        return;
    }
    $.ajax(HOSTNAME + '/user/change-password',{
		headers : {
			Authorization: localStorage.getItem("token")
		},
        data:{
			"old-password" : passwordOld.value,
            "password" :passwordBox.value,
            "re-password": passwordConfirmBox.value
        },
        type:'post',//HTTP请求类型
        success:function(data){
            if (data.code != 200) {
                mui.alert(data.msg, "信息有误", function() {}, 'div');
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
            
        },
        error: function() {
            mui.alert("与服务器通信失败", "连接错误", "确定", function(){}, 'div');
        }
    });
});



