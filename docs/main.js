const addOnClick = () => {
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
}

const main = async () => {
    const response = await fetch('https://portfolio.nedzad.dev/api/');
    const json = await response.json();
    const images = json.map(image => image.url);

    for (image of images) {
        $(".gallery").append(`<img class="gallery-item" src="${image}"/>`);
    }

    addOnClick();
}

main();