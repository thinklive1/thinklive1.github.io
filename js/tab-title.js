var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         document.title = '繧「繝ェ繧ケ繧呈尔縺励※缧ゅい繝ェ繧ケ繧呈?';
         clearTimeout(titleTime);
     }
     else {
         document.title = '被发现了被发现了被发现了被发现了' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });