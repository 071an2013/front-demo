window.onload = function(){
    

}

/* 
    * 获取样式属性值
    * boxObj dom对象
    * attr 需要获取样式属性
    */
   function getCss(boxObj,attr){
        if(boxObj.currentStyle){
            //针对IE浏览器
            return boxObj.currentStyle[attr];
        }else{
            //Firefox，Opera，Safari，Chrome等浏览器 document.defaultView.getComputedStyle(元素,null).属性
            //return getComputedStyle(boxObj, false)[attr];
            return document.defaultView.getComputedStyle(boxObj,null)[attr];
        }
    }

/* 
    * 运动函数
    * 适用： 宽高、字体大小、透明度增减、上下左右偏移
    * boxObj dom对象
    * target 运动终点
    * attr 需要改变样式属性
    * endFn 结束再次调用
    * 改变元素多个属性调用参考： 改变宽后改变高后改变字体
        startMove(box,"width",800,function(){
            //js代码
        });
*/
function startMove(boxObj, attr, target, endFn) {
    //清除定时器 将timer作为obj的属性，（obj.timer） 因为要给每一个box定时器，清除时不会清除到其他box上的定时器
    clearInterval(boxObj.timer);
    //开启定时器
    boxObj.timer = setInterval(function () {
        //获取原来的样式属性值
        var cssVal = getCss(boxObj, attr);
        //透明度属性转为浮点数再乘100倍 "0.6"=>600; px转为整数 "10px"=>10
        attr == "opacity" ? cssVal = parseFloat(cssVal) * 100 : cssVal = parseInt(cssVal);

        //是否到达终点
        if (cssVal == target) {
            //终点停止计时器
            clearInterval(boxObj.timer);
            //运动结束时调用该函数
            if (endFn) {//判断是否传入函数，如果传入了就执行函数
                endFn();
            }
        } else {
            //速度 变速
            var speed = (target - cssVal) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //属性值增减
            cssVal = cssVal + speed;
            //运动
            if (attr == "opacity") {
                boxObj.style[attr] = cssVal / 100;
            } else {
                boxObj.style[attr] = cssVal + "px";
            }
        }
    }, 10);
}
