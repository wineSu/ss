/**
*----------------------------------------------------------------
* @Desc   【 项目启动，懒惰的人在前进 】
* @Author -> Su
* @Date   -> 2020-03-25 15:07:26
*----------------------------------------------------------------
*/
const { exec, spawn } = require('child_process');
const {ipcRenderer: ipc, shell} = require('electron');

let $ = layui.$,
    layer = layui.layer;

//路径初始化配置
let filePathaCache = localStorage.getItem("filePathaCache");

if(!filePathaCache){
  $('.dragModel').show();
  const content = $("#dragModelCont")
  content.on("dragenter dragover", function (event) {
      event.preventDefault();
      $('.dragModel').addClass('cur')
  });
  content.on("dragleave", function (event) {
      event.preventDefault();
      $('.dragModel').removeClass('cur')
  });
  content.on("drop", function (event) {
      event.preventDefault();
      var efile = event.originalEvent.dataTransfer.files[0];
      let reg = /\\/g;
      window.localStorage.setItem("filePathaCache", efile.path.replace(reg, '/') + '/src/');
      layer.msg('初始化成功！');
      $('.dragModel').hide();
      return false;
  });
}

function start () {
  // 任何你期望执行的cmd命令，ls都可以
  let cmdStr = 'yarn dev';
  let cmdPath = localStorage.getItem("filePathaCache");
  let workerProcess = exec(cmdStr, { cwd: cmdPath })
   // 打印正常的后台可执行程序输出
   workerProcess.stdout.on('data', function (data) {
    // layer.msg('启动成功！', {icon: 1});
   })
   // 打印错误的后台可执行程序输出
   workerProcess.stderr.on('data', function (data) {
    // layer.msg('启动失败，请点击一键结束进程！', {icon: 5});
   })
   // 退出之后的输出
   workerProcess.on('close', function (code) {
    console.log('out code：' + code)
   })
}

/**
*----------------------------------------------------------------
* @Desc   【 以下为普通js事件  】
* @Author -> Su
* @Date   -> 2020-03-27 13:48:50
*----------------------------------------------------------------
*/

new CanvasAnimation({
  ele: document.getElementById('canvasStar'),
  type: 'star'
});

//一键启动
$('.fn_1').click(() => {
  $('.loadModel').fadeIn();
  start()
  spawn('D:/Microsoft VS Code/Code.exe');
  setTimeout(() => {
    $('.moveCont').html('正在开启浏览器...');
  }, 500)
  setTimeout(() => {
    shell.openExternal('http://10.16.224.27:5008/zentao/bug-browse-2-0-assigntome.html');
    shell.openExternal('https://www.leangoo.com/kanban/board/go/3033757#');
    $('.moveCont').html('正在启动命令面板...');
  }, 2000)
  setTimeout(() => {
    $('.moveCont').html('命令面板执行中...');
  }, 5000)
  setTimeout(() => {
    $('.moveCont').html('页面渲染中...');
    shell.openExternal('http://localhost:3006/nccloud/resources/workbench/public/common/main/index.html#/');
  }, 15000)
 
  setTimeout(() => {
    $('.loadModel').fadeOut();
    ipc.send('small');
  }, 20000)
})

//一键关闭
$('.fn_2').click(() => {
  exec('taskkill /f /im node.exe', { cwd: 'C:/Users/Administrator' })
  $('.loadModel').fadeIn();
  $('.moveCont').html('正在启动命令面板...');
  setTimeout(() => {
    start()
  }, 1000)
  setTimeout(() => {
    $('.moveCont').html('命令面板执行中...');
  }, 3000)
  setTimeout(() => {
    $('.moveCont').html('已完成...');
    $('.loadModel').fadeOut();
    ipc.send('small');
  }, 12000)
})

$('.reload').click(() => {
  window.location.reload()
})

$('.outSystem').click(() => {
  layer.open({
    type: 1
    ,title: false
    ,closeBtn: false
    ,area: '300px;'
    ,shade: 0.8
    ,id: 'LAY_layuipro'
    ,btn: ['火速下班', '残忍拒绝']
    ,btnAlign: 'c'
    ,moveType: 1 //拖拽模式，0或者1
    ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">bug改完了？<br /> 记得打卡啊！<br /> 我要关机了！</div>'
    ,yes: function(layero){
      exec('taskkill /f /im Code.exe', { cwd: 'C:/Users/Administrator' })
      exec('taskkill /f /im chrome.exe', { cwd: 'C:/Users/Administrator' })
      exec('shutdown -s -t 0', { cwd: 'C:/Users/Administrator' })
    }
  });
})