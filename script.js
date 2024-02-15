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
