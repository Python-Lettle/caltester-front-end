// 初始化
mui.init();
mui.back = function() {
    mui.openWindow({
    url:"login.html",
    id:"login",
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
var emailBox = document.getElementById('email');
var codeBox = document.getElementById("code");

// 忘记密码按钮事件
mui("#reg")[0].addEventListener('tap', function(event) {
    var passwordConfirm = passwordConfirmBox.value;
    if (passwordConfirm != passwordBox.value) {
        mui.alert('密码两次输入不一致', function() {}, 'div');
        return;
    } else if (passwordBox.value.length < 8) {
        mui.alert("密码长度小于8,请设置更长的密码", function() {}, 'div');
        return;
    }
    $.ajax(HOSTNAME + '/forget-password',{
        data:{
            "email" : emailBox.value,
            "vcode" : codeBox.value,
            "password": mui("#password")[0].value,
            "re-password": mui("#password_confirm")[0].value
        },
        type:'post',//HTTP请求类型
        success:function(data){
            if (data.code != 200) {
                mui.alert(data.msg, "信息有误", function() {}, 'div');
            } else {
                localStorage.clear();
                mui.openWindow({
                    url:"login.html",
                    id:"login",
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

// 发送验证码事件
var sendEmailFlag = true;
function sendEmail() {
    var email = emailBox.value;
    if (checkEmail(email) == false) {
        mui.alert("请输入正确的邮箱!", "邮箱错误", "确定", function(){}, 'div');
        return ;
    }

    if (sendEmailFlag == true) {
        mui.ajax(HOSTNAME + '/forget-vcode',{
            data:{
                "email": mui("#email")[0].value
            },
            type:'post',//HTTP请求类型
            success:function(data){
                if (data.code != 200) {
                    mui.alert(data.msg, "信息有误", function() {}, 'div');
                } else {
                    var btn = document.getElementById("sendCodeBtn");
                    mui.toast("已发送验证码，请注意查收");
                    btn.classList.add("mui-disabled");
                    sendEmailFlag = false;
                }
            },
            error: function() {
                mui.alert("与服务器通信失败", "连接错误", "确定", function(){}, 'div');
            }
        });
    }
}

