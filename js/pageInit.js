mui.init({swipeBack:true});
var token = localStorage.getItem("token");
if (token == null) {
    mui.openWindow({
        url:"login.html",
        id:"login",
        show:{
            autoShow:true,//页面loaded事件发生后自动显示，默认为true
            aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
        }
    });
}
mui.back = function() {
    mui.openWindow({
        url:"index.html",
        id:"index",
        show:{
            autoShow:true,//页面loaded事件发生后自动显示，默认为true
            aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
        }
    });
};