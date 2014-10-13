var y0 = -150;
var y1 = 60;
function update() {
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
  var logod = (st < 100 ? 0 : (st-100) *.3);
  var logol = 60 - logod;
  $("#logo-img").css({'padding': '0 0 0 '+Math.max(0,logol)+'px'});
  //puff
  var bza = (st < 100 ? 0 : (st-100) *.1);
  $("#bz").css({opacity: Math.min(1, bza)})
}
var oto = -1;
function update_delay() {
  if (oto == -1) {
    oto = setTimeout(function () {
      update();
      oto = -1;
    }, 100);
  }
}
$(window).scroll(update);
$(window).resize(update_delay);
$(document).ready(function(){
  $("#root").show();
  update();


});