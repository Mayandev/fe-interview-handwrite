//正则表达式
function myTrim1(str){
    return str.replace(/^\s+|\s+$/g,'')
}

//不使用正则表达式
function myTrim2(str){
    let head = 0
        foot = str.length
    for(let i =0;i<str.length;i++){
        if(str[i]===' ')head++
        else break
    }
    for(let j =str.length-1;j>0;j--){
        if(str[j]===' ')foot--
        else break
    }
    return str.substr(head,foot-head)
}