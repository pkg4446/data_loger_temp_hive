const temperatures = [
    [
        [0,  1, 2, 3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
    ],
    [
        [18, 15, 18, 21, 24, 12, 15, 18, 21, 24],
        [14, 17, 20, 23, 26, 12, 15, 19, 21, 24],
        [16, 39, 22, 25, 28, 12, 32, 11, 21, 24],
        [18, 21, 24, 27, 30, 12, 24, 10, 21, 24],
        [20, 23, 26, 29, 32, 12, 15, 17, 21, 24]
    ],
    // 여기에 8개의 추가 시간대 데이터를 넣으세요
];

function getColor(temp) {
    const minTemp = 0;
    const maxTemp = 50;
    const normalizedTemp = (temp - minTemp) / (maxTemp - minTemp);
    let r, g, b;
    if (normalizedTemp < 0.25) {
        b = 255 * (1 - normalizedTemp * 4);
        g = 255 * normalizedTemp * 4;
        r = 0;
    } else if (normalizedTemp < 0.5) {
        b = 0;
        g = 255;
        r = 255 * (normalizedTemp - 0.25) * 4;
    } else if (normalizedTemp < 0.75) {
        b = 0;
        g = 255 * (1 - (normalizedTemp - 0.5) * 4);
        r = 255;
    } else {
        b = 0;
        g = 0;
        r = 255;
    }
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function updateHoneycomb(timeIndex) {
    const honeycomb = document.getElementById('honeycomb');
    honeycomb.innerHTML = '';
    
    let rowsData = temperatures[timeIndex];

    rowsData.forEach((row) => {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        row.forEach(temp => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = temp;
            cell.style.backgroundColor = getColor(temp);
            rowElement.appendChild(cell);
        });
        honeycomb.appendChild(rowElement);
    });
    document.getElementById('timeDisplay').textContent = `시간: ${timeIndex + 1}`;
}

const slider = document.getElementById('timeSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

slider.addEventListener('input', () => updateHoneycomb(parseInt(slider.value)));
prevBtn.addEventListener('click', () => {
    slider.value = Math.max(0, parseInt(slider.value) - 1);
    updateHoneycomb(parseInt(slider.value));
});
nextBtn.addEventListener('click', () => {
    slider.value = Math.min(9, parseInt(slider.value) + 1);
    updateHoneycomb(parseInt(slider.value));
});

window.addEventListener('resize', () => {
    updateHoneycomb(parseInt(slider.value));
});

updateHoneycomb(0);