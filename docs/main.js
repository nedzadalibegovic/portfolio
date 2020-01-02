$(".gallery-item").click(function () {
    // create overlay with given img
    $("body").prepend(`<div class="overlay-background" style="display: none"><div class="overlay"><img src="${$(this)[0].src}" /></div></div>`);

    // fade overlay in
    $(".overlay-background").fadeIn();

    // fade overlay out and remove on callback
    $(".overlay-background").click(function () {
        $(this).fadeOut(function () {
            $(this).remove();
        });
    });
});