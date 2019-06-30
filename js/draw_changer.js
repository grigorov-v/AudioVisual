document.onclick = function(e) {
    var id = e.target.id;
    var nElem = $('#'+id);
    var className = nElem.attr("class");
    if ( className !== "demo" ) {
        return;
    }

    var value = nElem.attr("value");
    numberAlg = Number(value);

    // $('.'+className).each(function(i,elem) {
    //     elem.removeClass("demo-current");
    // });

    nElem.addClass("demo-current");
};   