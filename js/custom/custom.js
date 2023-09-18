// 记忆浏览位置
$(function() {
    if (localStorage.tempScrollTop) {
      $(window).scrollTop(localStorage.tempScrollTop);
    }
  });
  $(window).on("scroll", function() {
    localStorage.setItem("tempScrollTop", $(window).scrollTop());
  });
  window.onbeforeunload = function() {
    var tempScrollTop = $(window).scrollTop();
    localStorage.setItem("tempScrollTop", tempScrollTop);
  };
  