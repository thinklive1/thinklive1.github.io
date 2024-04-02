var a_idx = 0;
jQuery(document).addEventListener("DOMContentLoaded",function($) {
  $("body").click(function(e) {
    var a = new Array
    ("å¯Œå¼º", "æ°‘ä¸»", "æ–‡æ˜Ž", "å’Œè°", "è‡ªç”±", "å¹³ç­‰", "å…¬æ­£", "æ³•æ²»", "çˆ±å›½", "æ•¬ä¸š", "è¯šä¿¡", "å‹å–„");
    var $i = $("<span/>").text(a[a_idx]);
    a_idx = (a_idx + 1) % a.length;
    var x = e.pageX,
    y = e.pageY;
    $i.css({
        "z-index": 5,
        "top": y - 20,
        "left": x,
        "position": "absolute",
        "font-weight": "bold",
        "color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    });
    $("body").append($i);
    $i.animate({
        "top": y - 180,
        "opacity": 0
    },
3000,
function() {
   $i.remove();
});
});
setTimeout('delay()', 2000);
});

function delay() {
$(".buryit").removeAttr("onclick");
}