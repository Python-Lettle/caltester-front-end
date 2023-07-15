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
};

mui.back = function() {
	mui.confirm("不要半途而废哦","退出确认",["退出","取消"],function (e) {
		if(e.index == 0) {  
			mui.openWindow({
				url:"index.html",
				id:"index",
				show:{
					autoShow:true,//页面loaded事件发生后自动显示，默认为true
					aniShow: "slide-in-right"//页面显示动画，默认为”slide-in-right“；
				}
			});
		} else {

		}
	});
};


var list = document.querySelector('.mui-table-view.mui-table-view-radio');

var operator = 'plus';
// 获取到的题目信息
var question_data = null;
getQuestions();
// 已经回答题目
var answers = [[],[],[],[],[],[],[],[],[],[]];
// 正在回答的题目下标(0-9)
var question_index = 0;
mui("#progress").progressbar({progress:question_index*10}).show();

// 题目类型切换
// list.addEventListener('selected',function(e){
// 	token = localStorage.getItem("token");
// 	operator = getMode(e.detail.el.innerText);
// 	// mui.toast(e.detail.el.innerText);
// 	question_index = 0;
// 	question_data = getQuestions();
// 	answers = [[],[],[],[],[],[],[],[],[],[]];
// });

$(".mui-table-view-cell").click(function(){
	token = localStorage.getItem("token");
	operator = getMode($(this).text());
	console.log($(this).text());
	question_index = 0;
	question_data = getQuestions();
	answers = [[],[],[],[],[],[],[],[],[],[]];
	mui("#progress").progressbar().setProgress(0);
});



mui("#submit_num")[0].addEventListener('click', function(e) {
	var ans = mui("#answer")[0].value;
	if(checkInput(ans) == true) {
		answers[question_index] = [question_data.questions[question_index].Num1, 
			question_data.questions[question_index].Num2,
			parseInt(ans)];
		question_index += 1;
		mui("#progress").progressbar().setProgress(question_index*10);

		// 是否可以提交一批答案
		if (question_index >= 10) {
			mui.ajax(HOSTNAME + '/user/judge',{
				data:{
					op: operator,
					answers: JSON.stringify(answers)
				},
				headers: {
					Authorization: localStorage.getItem("token")
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				success:function(data){
					if (data.code == 200) {
						mui.alert("恭喜你算对了"+data.data+"题!", "提交成功", "确定", function() {}, 'div');
					} else if (data.code == 30001) {
						mui.alert(data.msg, "提交失败", "确定",  function() {}, 'div');
					}
				}
			});
			question_index = 0;
			setTimeout(function(){
				mui("#progress").progressbar().setProgress(question_index*10);
			}, 1000);
		}

		showQuestion();
	} else {
		mui.alert("请输入合理的答案", "输入有误", "确定", function(){}, 'div');
	}
	mui("#answer")[0].value = "";
});

function showQuestion() {
	document.getElementById("question").innerHTML = 
		question_data.questions[question_index].Num1 + getShowOp(question_data.op) +
		question_data.questions[question_index].Num2;
}

// 获取一些题目
function getQuestions() {
	mui.ajax(HOSTNAME + '/user/question',{
		data:{
			op: operator
		},
		headers: {
			Authorization: localStorage.getItem("token")
		},
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		success:function(data){
			question_data = data.data;
			showQuestion();
		}
	});
}

// 检查用户的输入是否正确
function checkInput(inp) {
	if (inp == "") {
		return false;
	} else if (inp != parseInt(inp)) {
		return false;
	}
	return true;
}

// 获取用户选择的题目类型s
function getMode(name) {
	name = trimAll(name);
	switch(name) {
		case "加法": return "plus";
		case "减法": return "minus";
		case "乘法": return "multi";
		case "除法": return "div";
	}
}

function getOp(name) {
	switch(name) {
		case "plus": return "+";
		case "minus": return "-";
		case "multi": return "x";
		case "div": return "/";
	}
}

function getShowOp(name) {
	switch(name) {
		case "*": return "×";
		case "/": return "÷";
	}
	return name;
}


function trimAll(ele){
	if(typeof ele === 'string'){
	return ele.split(/[\t\r\f\n\s]*/g).join('');
		
	}else{
		console.error(`${typeof ele} is not the expected type, but the string type is expected`)
	}

}
