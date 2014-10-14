var y0 = -150;
var y1 = 60;
function update() {
  if ( $(window).width()<1000)
  {
    $('.col').each(function (index, element) {
      var $el = $(element);
      $el.css({opacity: 1});
    });
    return;
  }
  var y3 = $(window).height();
  var y2 = y3 - 100;
  var st = $(window).scrollTop();
  $('.col').each(function (index, element) {
    var $el = $(element);
    var p = $el.position();
    var h = $el.height();
    var y = p.top - st;
    var yh = y;// + h;
    var o = 1;
    if (yh < y1) {
      if (yh < y0)
        o = 0;
      else
        o = 1 - (y1 - yh) / (y1 - y0);
    } else if (y > y2) {
      if (y > y3)
        o = 0;
      else
        o = 1 - (y - y2) / (y3 - y2);
    }
    $el.css({opacity: Math.max(.2, o)});
  });
  // logo
  var logod = (st < 40 ? 0 : (st-40) *.3);
  var logol = 60 - logod;
  $("#logo-img").css({'padding': '0 0 0 '+Math.max(0,logol)+'px'});
  //puff
  var bza = (st < 100 ? 0 : (st-100) *.1);
  $("#bz").css({opacity: Math.min(1, bza)});
  //gantt
  var $g = $("#gantt");
  if (st > 550) {
    var t = 180;
    //t += (st - 550) * .4;
    $g.css({position:'fixed', top: t+'px'});
    $g.parent().css({opacity: 1});
  } else {
    $g.css({position:'inherit', top: 'inherit'})
  }
}
function update_delay() {
  window.requestAnimationFrame(update);
}
$(window).scroll(update);
$(window).resize(update_delay);
$(document).ready(function () {
  $("#root").show();
  update();
  init_mobile_nav();
});

var mobile_nav_open = false;
function init_mobile_nav() {
  var $n = $("nav");
  $n.click(toggle_mobile_nav);
  var $mb = $("#menu-button");
  $mb.click(toggle_mobile_nav);
  // hilight current page
  var p = document.location.pathname;
  if (p == '/') p = '/company';
  $n.find("a[href='" + p + "']").addClass("selected");
}
function toggle_mobile_nav() {
  if ($(window).width()>900)//or should it be if $("nav").css('position')=='fixed'?
    return;

  move('nav')
    .set('left', mobile_nav_open ? '100%' : '60%')
    .duration(200)
    .end();
  mobile_nav_open = !mobile_nav_open;
}
