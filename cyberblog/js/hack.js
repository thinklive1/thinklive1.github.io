// 获取元素
const hacking = document.getElementById('hacking');

// 设置文字内容
hacking.innerText = '骇入中';

// 3秒后清空文字
setTimeout(() => {
  hacking.innerText = '';
}, 3000);