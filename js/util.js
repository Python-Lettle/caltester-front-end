function trimAll(ele){
    if(typeof ele === 'string'){
    return ele.split(/[\t\r\f\n\s]*/g).join('');
        
    }else{
        console.error(`${typeof ele} is not the expected type, but the string type is expected`)
    }

}

// 检查邮箱是否合法：去掉空格 检查@符号
function checkEmail(emailStr) {
    emailStr = trimAll(emailStr);

    // 计算@数量
    var atCount = 0;
    for (var i=0; i<emailStr.length; i++) {
        if (emailStr[i] == '@') {
            atCount += 1;
        }
    }

    return atCount==1;
}