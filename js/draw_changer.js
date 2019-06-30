document.onclick = function(e) {
    var id = e.target.id;
    var nElem = $('#'+id);
    var className = nElem.attr("class");
    if ( className !== "demo" ) {
        return;
    }

    var value = nElem.attr("value");
    numberAlg = Number(value);

    var classCurrent = "demo-current";
    $('.'+className).each(function(i,elem) {
        $(this).removeClass(classCurrent);
    });

    nElem.addClass(classCurrent);
};   