
/**
 * Created by Administrator on 2016/7/25.
 * 使用canvas做一个简单的别踩白块游戏
 */
var game_canvas=document.getElementById("game_canvas");
game_tone={};
game_tone[0]="song/1.mp3";
game_tone[1]="song/2.mp3";
game_tone[2]="song/3.mp3";
game_tone[3]="song/4.mp3";
game_tone[4]="song/5.mp3";
game_tone[5]="song/6.mp3";
game_tone[6]="song/7.mp3";

var nowTone=0;
game_canvas.style.width="300px";
game_canvas.style.height="500px";
var gameUI_width=parseInt(game_canvas.style.width);
var gameUI_height=parseInt(game_canvas.style.height);

var gameUI=game_canvas.getContext("2d");
gameUI.translate(0.5,0.5);
console.log(gameUI);
function DrawLayout(col){
    for(var i=1;i<col;i++){
        var beginX=(gameUI_width/col)*i;
        var beginY=0;
        var endX=beginX;
        var endY=gameUI_height;
        console.log(beginX,beginY,endX,endY);
        gameUI.beginPath();
        gameUI.moveTo(beginX,beginY);

        gameUI.fillStyle="#fff";
        gameUI.strokeStyle="#fff";
        gameUI.lineTo(endX,endY);
        gameUI.lineWidth="1px";
        gameUI.stroke();
        gameUI.closePath();
    }


}
DrawLayout(3);
var currentBlock=null;
for(var i=0;i<10;i++){
    var n=getRandom(1,3);
    currentBlock=GetBlock(n,currentBlock,null);
}
DrawBlock(currentBlock);
function DrawBlock(block){
    console.log(block);
    gameUI.beginPath();

    if(block.agoBlock==null){
        block.x=(block.col-1)*block.width+1;
        block.y=gameUI_height-block.height-4;
    }else {
        block.x=(block.col-1)*block.width+1;
        block.y=block.agoBlock.y-block.height-4;
    }
    gameUI.fillStyle="#000";
    gameUI.fillRect(block.x,block.y,block.width-2,block.height);
    if(block.nextBlock==null) {
        gameUI.closePath();
    }else {
        block.nextBlock.agoBlock=block;
        DrawBlock(block.nextBlock);
    }



}
function GetBlock(col,nextBlock){
    return {
        col:col,
        width:100,
        height:150,
        x:0,
        y:0,
        agoBlock:null,
        nextBlock:nextBlock
    }
}
function getRandom(min,max){
    return parseInt(Math.random()*(max-min+1)+min,10);
}
function next(){
    console.log(game_tone[nowTone])
    document.getElementById("game_mp3").src=game_tone[nowTone];
    if(nowTone==6) {
        nowTone = 0;
    }else {
        nowTone++;
    }
    var first=currentBlock;
    if(currentBlock.nextBlock==null){
        document.getElementById("alert_success").style.display="inline-block";
        clearLayout();
        return;

//test
    }else {
        currentBlock=currentBlock.nextBlock;
        currentBlock.agoBlock=null;
        clearLayout();
        DrawBlock(currentBlock);
    }



}
function clearLayout(){
    gameUI.clearRect(0,0,gameUI_width,gameUI_height);
    DrawLayout(3);
}
game_canvas.onclick=function(e){
    console.log("当前块",currentBlock);
    e=e||event;//获取事件对象
    var x=e.clientX-game_canvas.offsetLeft;
    var y=e.clientY-game_canvas.offsetTop;
    console.log(x,y);
    if(x>=currentBlock.x&&x<=currentBlock.x+currentBlock.width&&y>=currentBlock.y&&y<=currentBlock.y+currentBlock.height){
        next();
    }else {
        document.getElementById("alert_success").style.display="inline-block";
        document.getElementById("alert_success").innerHTML="game over";
        clearLayout();
    }
}



function play(){
    clearLayout();
    document.getElementById("alert_success").style.display="none";
    for(var i=0;i<50;i++){
        var n=getRandom(1,3);
        currentBlock=GetBlock(n,currentBlock,null);
    }
    DrawBlock(currentBlock);

}
