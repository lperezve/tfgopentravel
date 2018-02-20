var inputs = "input[maxlength], textarea[maxlength]";
$(document).on('keyup', "[maxlength]", function (e) {
    var este = $(this),
        maxlength = este.attr('maxlength'),
        maxlengthint = parseInt(maxlength),
        textoActual = este.val(),
        currentCharacters = este.val().length;
        remainingCharacters = maxlengthint - currentCharacters,
        espan = este.prev('label').find('span');            
        // Detectamos si es IE9 y si hemos llegado al final, convertir el -1 en 0 - bug ie9 porq. no coge directamente el atributo 'maxlength' de HTML5
        if (document.addEventListener && !window.requestAnimationFrame) {
            if (remainingCharacters <= -1) {
                remainingCharacters = 0;            
            }
        }
        espan.html(remainingCharacters);
        if (!!maxlength) {
            var texto = este.val(); 
            if (texto.length >= maxlength) {
                este.removeClass().addClass("borderojo");
                este.val(text.substring(0, maxlength));
                e.preventDefault();
            }
            else if (texto.length < maxlength) {
                este.removeClass().addClass("bordegris");
            }   
        }   
 	}
 );

/* CAROUSEL */

$('.carousel[data-type="multi"] .item').each(function() {
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i = 0; i < 2; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }

    next.children(':first-child').clone().appendTo($(this));
  }
});