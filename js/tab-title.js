const originalTitle = document.title;

let hidden = '繧｢繝ｪ繧ｹ繧呈尔縺励※缧ゅい繝ｪ繧ｹ繧呈？縺励ｪ縺？';
let visible = '被发现了被发现了被发现了被发现了'; 

let isHidden = false;
let switchTimer = null;

function updateTitle() {
  if(isHidden) {
    document.title = hidden;
  } else if (switchTimer) {
    document.title = visible;
  } else {
    document.title = originalTitle;
  }
}

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // 页面隐藏后,3秒切换为 hidden 标题
    switchTimer = setTimeout(() => {
      isHidden = true;
      updateTitle();
    }, 1000);
  } else {
    // 页面显示后,显示 visible 标题3秒
    isHidden = false; 
    updateTitle();
    
    switchTimer = setTimeout(() => {
      switchTimer = null;
      updateTitle();
    }, 3000); 
  }
});