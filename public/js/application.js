/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: false, newcap: true, immed: true, indent: 2 */

var MXM = (function($,d,undefined){  
  var clrz = ({
    init : function() {
      var clrz = this;
      clrz.Container = $('#images');
      clrz.Width = this.Container.width();
      clrz.Image_width = this.Width / 5;
      clrz.count = imgs.length;
      clrz.typeSize();
      for ( var i = 0; i < clrz.count; i++ ) {
        clrz.imgTemplate(imgs[i],i);
      }
      $(window).resize(function(){
        $('figure').height($('figure:first').width());
        clrz.typeSize();
      });
      $('figure').live({
        mouseenter: function() {
          $('img',this).fadeIn(300);
        },
        mouseleave: function() {
          $('img',this).fadeOut(1000);
        }
      });
      
      return this;
    },
    typeSize: function() {
      var h1 = $('h1'),
          parent = h1.parent().width();

      h1.css('font-size', parent / 5 + 'px');
      $('p').css('font-size', parent / 17 + 'px');
      $('.req').css('font-size', parent / 17 - 1 + 'px');
    },
    imgTemplate : function(img,i) {
      var clrx    = this,
          src     = '/imgs/IMG_'+img+'.JPG',
          image   = $('<img>',{
            src: src,
            id:  'img'+img
          }),
          figure  = $('<figure>').html(image).appendTo(this.Container);
      
      image.load(function(){
        rgb = clrx.getAverageInRGB(d.getElementById('img'+img));
        figure.height(figure.width()).css('background-color','rgb('+rgb.r+','+rgb.g+','+rgb.b+')');
      });
      image.hide();
    },
    getAverageInRGB : function (img) {
      var canvas = document.createElement('canvas'),
          context = canvas.getContext && canvas.getContext('2d'),
          pixelInterval = 5,
          fallbackRGB = {r:102,g:102,b:102},
          data, length,
          i = -4,
          rgb = {r:102,g:102,b:102},
          count = 0;

      if (!context) { alert('Your browser does not support CANVAS'); return fallbackRGB; }

      var height = canvas.height = img.naturalHeight || img.offsetHeight || img.height,
          width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

      context.drawImage(img, 0, 0);

      try {
        data = context.getImageData(0, 0, width, height);
      } catch(e) {
        alert(e);
        return fallbackRGB;
      }

      data = data.data;
      length = data.length;
      while ( (i += pixelInterval * 4) < length ) {
        ++count;
        rgb.r += data[i];
        rgb.g += data[i+1];
        rgb.b += data[i+2];
      }

      // ~~ used to floor values
      rgb.r = Math.floor(rgb.r/count);
      rgb.g = Math.floor(rgb.g/count);
      rgb.b = Math.floor(rgb.b/count);

      return rgb;
    }
  }).init();
})(window.jQuery,document);