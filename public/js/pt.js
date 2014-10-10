var y0 = 0;
var y1 = 210;
function setopacities() {
  var y3 = $(window).height() - 100;
  var y2 = y3 - 100;
  var st = $(window).scrollTop();
  $('.col').each(function (index, element) {
    var $el = $(element);
    var p = $el.position();
    var h = $el.height();
    var y = p.top - st;
    var yh = y + h;
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
    $el.css({opacity: o});
  });
}
var oto = -1;
function setopacities1() {
  if (oto == -1) {
    oto = setTimeout(function () {
      setopacities();
      oto = -1;
    }, 100);
  }
}
$(window).scroll(setopacities);
$(window).resize(setopacities1);
setTimeout(function(){
  $("#root").show();
}, 500);