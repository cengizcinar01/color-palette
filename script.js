const searchInput = document.querySelector('#search-input');
const searchColor = document.querySelector('.search-color');
const searchImage = document.querySelector('#search-image');
const typeSelect = document.querySelector('#palette-type');
const typeText = document.querySelector('#type-text');
const countSelect = document.querySelector('#palette-count');
const randomBtn = document.querySelector('#random-btn');
const paletteContainer = document.querySelector('#palette');
const relatedContainer = document.querySelector('#related');
const imageColorsContainer = document.querySelector('#image-colors');
const imageColorsWrapper = document.querySelector('#image-colors-wrapper');

let currentColor = 'skyblue',
    currentType = 'analogous',
    currentCount = 6,
    imageColors = [];

function generateAnalogousPalette(hsl, count) {
    const palette = [];
    const [hue, saturation, lightness] = hsl;

    for (let i = 0; i < count; i++) {
        let newHue = hue + 30 * i;
        if (newHue > 360) {
            newHue -= 360;
        }
        palette.push([newHue, saturation, lightness]);
    }
    return palette;
}

function generateMonochromaticPalette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;

    for (let i = 0; i < count; i++) {
        let newLightness = lightness + 10 * i;
        if (newLightness > 100) {
            newLightness -= 100;
        }
        palette.push([hue, saturation, newLightness]);
    }
    return palette;
}

function generateTriadicPalette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        let newHue = hue + 120 * i;
        if (newHue > 360) {
            newHue -= 360;
        }
        palette.push([newHue, saturation, lightness]);
    }
    return palette;
}

function generateCompoundPalette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        let newHue = hue + 150 * i;
        if (newHue > 360) {
            newHue -= 360;
        }
        palette.push([newHue, saturation, lightness]);
    }
    return palette;
}

function generateShadesPalette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        let newSaturation = saturation + 10 * i;
        if (newSaturation > 100) {
            newSaturation -= 100;
        }
        palette.push([hue, newSaturation, lightness]);
    }
    return palette;
}

function generateTetradicPalette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        let newHue = hue + 90 * i;
        if (newHue > 360) {
            newHue -= 360;
        }
        palette.push([newHue, saturation, lightness]);
    }
    return palette;
}

function generateSquarePalette(hsl, count) {
    const palette = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        let newHue = hue + 60 * i;
        if (newHue > 360) {
            newHue -= 360;
        }
        palette.push([newHue, saturation, lightness]);
    }
    return palette;
}

function generateRelatedColorPalette(hsl, count) {
    const palette = [];
    const [hue, saturation, lightness] = hsl;

    palette.push([hue, (saturation + 20) % 100, lightness]);
    palette.push([hue, (saturation - 20) % 100, lightness]);
    palette.push([hue, saturation, (lightness + 20) % 100]);
    palette.push([(hue + 20) % 360, saturation, lightness]);
    palette.push([(hue - 20) % 360, saturation, lightness]);
    palette.push([hue, Math.max(0, saturation - 40) % 100, Math.min(100, lightness + 20) % 100]);

    for (let i = palette.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [palette[i], palette[j]] = [palette[j], palette[i]];
    }
    return palette;
}

function generatePalette(hsl, type, count) {
    switch (type) {
        case 'analogous':
            return generateAnalogousPalette(hsl, count);
        case 'monochromatic':
            return generateMonochromaticPalette(hsl, count);
        case 'triadic':
            return generateTriadicPalette(hsl, count);
        case 'compound':
            return generateCompoundPalette(hsl, count);
        case 'shades':
            return generateShadesPalette(hsl, count);
        case 'tetradic':
            return generateTetradicPalette(hsl, count);
        case 'square':
            return generateSquarePalette(hsl, count);
        case 'related':
            return generateRelatedColorPalette(hsl, count);
    }
}

function generatePaletteHtml(type, container) {
    let color = currentColor;
    let count = currentCount;
    const hsl = getHslFromColor(color);
    if (!hsl) return;
    let palette = [];
    container.innerHTML = '';

    if (type === 'image-colors') {
        palette = imageColors;
    } else {
        palette = generatePalette(hsl, type, count);
    }

    palette.forEach((color) => {
        if (type != 'image-colors') {
            color = HslToHex(...color);
        }

        const colorEl = document.createElement('div');
        colorEl.classList.add('color');
        colorEl.style.backgroundColor = color;
        colorEl.innerHTML = `
                    <div class="overlay">
                        <div class="icons">
                            <div class="copy-color" title="Copy color code">
                                <i class="bx bxs-copy"></i>
                            </div>
                            <div class="generate-palette" title="Generate Palette">
                                <i class="bx bxs-palette"></i></i>
                            </div>
                        </div>
                        <div class="code">${color.toUpperCase()}</div>
                    </div>
        `;
        container.appendChild(colorEl);
    });
}

function getHslFromColor(color) {
    if (isValidColor(color)) {
        let temp = document.createElement('div');
        temp.style.color = color;
        document.body.appendChild(temp);
        let style = window.getComputedStyle(temp);
        let rgb = style.getPropertyValue('color');
        document.body.removeChild(temp);
        let rgbValues = removeRGB(rgb);
        let hsl = rgbToHsl(rgbValues);
        return hsl;
    }
    return [360, 100, 50];
}

function isValidColor(color) {
    return CSS.supports('color', color);
}

function removeRGB(rgb) {
    return rgb.replace('rgb(', '').replace(')', '').split(',');
}

function rgbToHsl(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = (cmin + cmax) / 2;

    if (delta === 0) {
        h = s = 0;
    } else {
        if (cmax === r) {
            h = ((g - b) / delta) % 6;
        } else if (cmax === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);
        if (h < 0) {
            h += 360;
        }

        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    }

    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return [h, s, l];
}

function HslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

generatePaletteHtml(currentType, paletteContainer);
generatePaletteHtml('related', relatedContainer);

searchInput.addEventListener('keyup', (e) => {
    const value = e.target.value;
    if (isValidColor(value)) {
        searchColor.style.backgroundColor = value;
        currentColor = value;
        generatePaletteHtml(currentType, paletteContainer);
        generatePaletteHtml('related', relatedContainer);
    }
});

typeSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    currentType = value;
    typeText.textContent = value + 'Palette';
    generatePaletteHtml(currentType, paletteContainer);
});

countSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    currentCount = value;
    generatePaletteHtml(currentType, paletteContainer);
});

randomBtn.addEventListener('click', () => {
    const randomColor = getRandomColor();
    searchInput.value = randomColor;
    searchColor.style.backgroundColor = randomColor;
    currentColor = randomColor;
    generatePaletteHtml(currentType, paletteContainer);
    generatePaletteHtml('related', relatedContainer);
});

const palettes = document.querySelectorAll('.palette');
palettes.forEach((palette) => {
    palette.addEventListener('click', (e) => {
        const target = e.target;
        const color = target.parentElement.parentElement.children[1].textContent;
        if (target.classList.contains('copy-color')) {
            copyToClipboard(color);
            toast(`Color ${color} copied to clipboard`);
        }
        if (target.classList.contains('generate-palette')) {
            searchInput.value = color;
            searchColor.style.backgroundColor = color;
            currentColor = color;
            generatePaletteHtml(currentType, paletteContainer);
            generatePaletteHtml('related', relatedContainer);
            toast('Palette generated for' + color);
        }
    });
});

function copyToClipboard(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
}

function toast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, 2000);
}

searchImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const image = new Image();
            image.src = reader.result;
            image.onload = function () {
                extractColorsFromImage(image);
            };
        };
    }
});

function extractColorsFromImage(image) {
    colorjs.prominent(image, { amount: 6, format: 'hex' }).then((color) => {
        // empty imageColors array
        imageColors = [];
        imageColors.push(...color);
        generatePaletteHtml('image-colors', imageColorsContainer);
        imageColorsWrapper.classList.remove('hidden');
    });
}
