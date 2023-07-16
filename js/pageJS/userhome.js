// 初始化个人信息
document.getElementById('username').innerHTML = localStorage.getItem("username") + document.getElementById('username').innerHTML;
document.getElementById("userinfo").innerHTML += "<p>ID: " + localStorage.getItem("userid") + "</p>";
mui.ajax(HOSTNAME + '/user/points',{
	headers: {
		Authorization: localStorage.getItem("token")
	},
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	success:function(data){
		if (data.code == "200") {
			document.getElementById("userinfo").innerHTML += "<p>积分: " + data.points + "</p>";
		}
	},
	error: function(xhr,type,errorThrown){
		mui.toast("获取用户积分失败");
	}
});

//定义有关分页的全局变量
var pageNum = 1; //当前页
var pages = 0 ; //总页数
var total = 100 ; //总数据数
var navigatepageSize = pages; //分页导航显示的页码数
var navigatepageNums = []; //当前页码导航

getWrongList();
initMuiPagination(pages);
init = true;

//初始化分页导航
function initMuiPagination(pages){
	var table = document.getElementById("pagination");
	var html = "";
	html += '<li class="mui-previous mui-disabled"><a href="#">&laquo;</a></li>';
	// html += '<li class="mui-active"><a href="#">'+pageNum+'</a></li>';
	for(var i=1; i<=pages; i++){
		if (i == pageNum) {
			html += '<li class="mui-active"><a href="#">'+ i +'</a></li>';
		} else {
			html += '<li><a href="#">'+ i +'</a></li>';
		}
	}
	html += '<li class="mui-next"><a href="#">&raquo;</a></li>';
	table.innerHTML = html;
}

// 修改用户名按钮
var modifyUnameFlag = false;
var unameBox = document.getElementById("username");
var modifyInputBox = document.getElementById("uname_modify");
var modifyBtn = document.getElementById("modifyBtn");
function modifyUsername() {
	if (modifyUnameFlag == false) {
		// 切换外观显示
		modifyInputBox.style.setProperty("display", "block");
		unameBox.style.setProperty("display", "none");
		modifyBtn.innerHTML = "保存用户名";
		modifyInputBox.value = unameBox.innerHTML;
		
		modifyUnameFlag = true;
	} else {
		// 切换外观显示
		modifyInputBox.style.setProperty("display", "none");
		unameBox.style.setProperty("display", "block");
		modifyBtn.innerHTML = "修改用户名";
		
		// 保存用户名
		var newUsername = modifyInputBox.value;
		if (newUsername != "") {
			mui.ajax(HOSTNAME + '/user/change-username',{
				headers: {
					Authorization: localStorage.getItem("token")
				},
				data: {
					"userid" : localStorage.getItem("userid"),
					"username" : modifyInputBox.value
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				success:function(data){
					if (data.code == "200") {
						localStorage.setItem("username", data.username);
						unameBox.innerHTML = localStorage.getItem("username");
					}
				}
			});
		}
		
		modifyUnameFlag = false;
	}
}

// 退出登录按钮
function logout() {
	mui.confirm("是否要退出登录","退出确认",["确定","取消"],function (e) {
		if(e.index == 0) {  
			mui.ajax(HOSTNAME + '/logout',{
				headers: {
					Authorization: localStorage.getItem("token")
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				success:function(data){
					if (data.code == "200") {
						if (e.index == 0) {
							mui.openWindow({
								url:"index.html",
								id:"index",
								show:{
								autoShow:true,//页面loaded事件发生后自动显示，默认为true
								aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
								}
							});
						}
					}
				}
			});
			// localStorage.removeItem("token");
			// localStorage.removeItem("username");
			localStorage.clear();
		}else{  
			//取消  
		} 
	}, 'div');
}

(function($) {
	$('.mui-pagination').on('tap', 'a', function() {
		var li = this.parentNode;
		var classList = li.classList;
		if (!classList.contains('mui-active') && !classList.contains('mui-disabled')) {
			var active = li.parentNode.querySelector('.mui-active');
			if (classList.contains('mui-previous')) {//previous
				if (active) {
					var previous = active.previousElementSibling;
					// console.log('previous', previous);
					if (previous && !previous.classList.contains('mui-previous')) {
						$.trigger(previous.querySelector('a'), 'tap');
					} else {
						// classList.add('mui-disabled');
					}
				}
			} else if (classList.contains('mui-next')) {//next
				if (active) {
					var next = active.nextElementSibling;
					if (next && !next.classList.contains('mui-next')) {
						$.trigger(next.querySelector('a'), 'tap');
					} else {
						// classList.add('mui-disabled');
					}
				}
			} else {//page
				active.classList.remove('mui-active');
				classList.add('mui-active');
				pageNum = parseInt(this.innerText);
				var previousPageElement = li.parentNode.querySelector('.mui-previous');
				var nextPageElement = li.parentNode.querySelector('.mui-next');
				previousPageElement.classList.remove('mui-disabled');
				nextPageElement.classList.remove('mui-disabled');
				if (pageNum <= 1) {
					previousPageElement.classList.add('mui-disabled');
				} else if (pageNum >= pages) {
					nextPageElement.classList.add('mui-disabled');
				}

				document.getElementById("wrong-list").innerHTML = "";
				getWrongList();
			}
		}
	});
})(mui); 

function getWrongList()
{
	mui.ajax(HOSTNAME + '/user/wrong-list',{
		headers: {
			Authorization: localStorage.getItem("token")
		},
		data:{
			page: pageNum
		},
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		async:false,
		success:function(data){
			if (data.code == "200") {
				var table = document.getElementById("wrong-list");
				var records = data.data.record;

				pages = data.data.total_page;
				navigatepageSize = pages;

				for (var i=0; i<records.length; i++) {
					table.innerHTML += "<li class='mui-table-view-cell'>" + records[i].num1 + " "+ records[i].op + " " + records[i].num2 + " = "+ records[i].ans +"</li>";
				}
			}
		},
		error: function(xhr,type,errorThrown){
			mui.toast("获取用户错题列表失败");
		}
	});
}

function modifyPassword() {
	mui.openWindow({
		url:"change.html",
		id:"change",
		show:{
		  autoShow:true,//页面loaded事件发生后自动显示，默认为true
		  aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
		}
	});
}