const originalTitle = document.title;

let hidden = '繧「繝ェ繧ケ繧呈尔縺励※缧ゅい繝ェ繧ケ繧呈?縺励ェ縺?';
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
    
    if (switchTimer) {
      clearTimeout(switchTimer);
      switchTimer = null;
    }
    
    updateTitle();
    switchTimer = setTimeout(() => {
      // 隐藏后切换标题
      isHidden = true;
      updateTitle();
    }, 1000);

  } else {

    
    isHidden = false;
    updateTitle();

    switchTimer = setTimeout(() => {
      switchTimer = null;
      updateTitle();
    }, 1000);

  }

});