const searchInout = document.querySelector('.search-input');
searchColor = document.querySelector('.search-input');
searchImage = document.querySelector('#search-image');
typeSelect = document.querySelector('#palette-type');
countSelect = document.querySelector('#palette-count');
randomBtn = document.querySelector('#random-btn');
paletteContainer = document.querySelector('#palette');
relatedContainer = document.querySelector('#related');

let currentColor = 'skyblue',
    currentType = 'analogous',
    currentCount = 6,
    imageColors = [];

function generateAnalogousPalette(hs1, count) {
    const palette = [];
    const [hue, saturation, lightness] = hsl;

    for (let i = 0; i < count; i++) {
        let newHue = hue + 30 * i;
        if (newHue > 360) {
            newHue -= 360;
        }
    }
}
