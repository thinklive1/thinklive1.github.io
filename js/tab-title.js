let OriginTitle = document.title;
let titleTime;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        titleTime = setTimeout(() => {
            document.title = '繧「繝ェ繧ケ繧呈尔縺励※缧ゅい繝ェ繧ケ繧呈?';
        }, 1000);
    }
    else {
        document.title = '被发现了被发现了被发现了被发现了';
        titleTime = setTimeout(() => {
            document.title = OriginTitle;
        }, 500);
    }
});