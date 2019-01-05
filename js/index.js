// 点击开始游戏 -->> 动态生成100个小格子  100div
// leftClick 没有雷 -->> 显示数字 （代表当前小格子为中心周围8个格字的雷数 就是除了你点击的那个雷其他8个雷 9-1=8 ）
                        // 扩散（当前区域没用雷的时候继续扩散 当那个数字不是0的时候停止扩散 就是旁边有雷停止扩散）
        //  有雷  -->> game Over
// rightClick 没用标记 -->> 进行标记  有标记 -->> 取消标记 -->> 标记是否正确   10个都正确标记的话 提升成功
// 已经出现数字的格子的话 -->> 无效果 不可以标记

 var startBtn = document.getElementById('btn');
 var box = document.getElementById('box');
 var flagBox = document.getElementById('flagBox');
 var alertBox = document.getElementById('alertBox');
 var alertImg = document.getElementById('alertImg');
 var closeBtn = document.getElementById('close');
 var score = document.getElementById('score');
 var minesNum; // 雷的数量
 var mineOver; // 记录当前标记雷的数量
 var block;
 var mineMap = [];  // 这个数组是当前小格是否有雷
 var startGameBool = true;

bindEvent();
function bindEvent() {
    startBtn.onclick = function() {
        if(startGameBool){
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();
            startGameBool = false;
        }
        
    }
    
    box.oncontextmenu = function() {
        return false;
    }
    box.onmousedown = function(e) {
        var event = e.target;  
        if (e.which == 1) {
            leftClick(event);
        }else if(e.which == 3) {
            rightClick(event);
    }
    closeBtn.onclick = function() { 
         alertBox.style.display = 'none';
         flagBox.style.display = 'none';
         box.style.display = 'none';
         box.innerHTML = '';
         startGameBool = true;
     }
}
// 生成100个小格 10个有雷
function init() {
    minesNum = 10;
    mineOver = 10;
    score.innerHTML = mineOver;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var con = document.createElement('div'); 
            con.classList.add('block'); 
            con.setAttribute('id', i + '-' + j); 
            box.appendChild(con); 
            mineMap.push({mine: 0});
       }
    }
    block = document.getElementsByClassName('block');
    while(minesNum) {
        var mineIndex = Math.floor(Math.random()*100); 
        if(mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('isLei');        
            minesNum --;
        }
    }
}

// leftClick右击 
function leftClick(dom) {
    if(dom.classList.contains('flag')){
        ruturn;
    }
    var isLei = document.getElementsByClassName('isLei'); 
    if(dom && dom.classList.contains('isLei')) { 
        console.log('gameOver');
        for(var i = 0; i < isLei.length; i++) { 
            isLei[i].classList.add('show'); 
        }
        setTimeout(function() {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("img/over.jpg")'; 
        }, 800)
    }else { 
        var n = 0; 
        var posArr = dom && dom.getAttribute('id').split('-'); 
        var posX = posArr && +posArr[0];  
        var posY = posArr && +posArr[1]; 
        dom && dom.classList.add('num');
        for(var i = posX - 1; i <= posX + 1; i++){
            for(var j = posY - 1; j <= posY + 1; j++){ 
                var aroundBox =  document.getElementById(i + '-' + j);
                if(aroundBox && aroundBox.classList.contains('isLei')) {
                    n++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        if(n == 0) {
            for(var i = posX - 1; i <= posX + 1; i++) {
                for(var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j); 
                    if(nearBox && nearBox.length !=0) {
                        if(!nearBox.classList.contains('check')){
                             nearBox.classList.add('check');
                             leftClick(nearBox);
                        }
                       
                    }
                }
            }
        }
    }
}
// 右边点击
function rightClick(dom) {
    if(dom.classList.contains('num')){
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('isLei') && dom.classList.contains('flag')) {
         mineOver--;
     }
    if(dom.classList.contains('isLei') && !dom.classList.contains('flag')) {
        mineOver ++;
    }
    score.innerHTML = mineOver; 
    if(mineOver == 0) {
         alertBox.style.display = 'block';
         alertImg.style.backgroundImage = 'url("img/success.png")';
    }
}
}













