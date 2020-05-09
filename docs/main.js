const addOnClick = () => {
    $('.gallery-item').click(function () {
        // create overlay with given img
        $('body').prepend(
            `<div class="overlay-background" style="display: none"><div class="overlay"><img src="${
                $(this)[0].src
            }" /></div></div>`
        );

        // fade overlay in
        $('.overlay-background').fadeIn();

        // fade overlay out and remove on callback
        $('.overlay-background').click(function () {
            $(this).fadeOut(function () {
                $(this).remove();
            });
        });
    });
};

const shuffle = (array) => {
    let counter = array.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        const temp = array[--counter];

        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
};

const main = async () => {
    const response = await fetch(
        'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/portfolio-qcvuk/service/portfolio/incoming_webhook/api'
    );
    const json = await response.json();
    const images = json.map((image) => image.url);

    shuffle(images);

    for (image of images) {
        $('.gallery').append(`<img class="gallery-item" src="${image}"/>`);
    }

    addOnClick();
};

main();
