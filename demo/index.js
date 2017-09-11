const img = document.getElementById('img');
const uploadBtn = document.getElementById('uploadBtn');
const rgbColors = document.getElementById('rgbColors');
const hsluvColors = document.getElementById('hsluvColors');

const options = {
  width: document.getElementById('width'),
  height: document.getElementById('height'),
  maxColors: document.getElementById('maxColors'),
  minDensity: document.getElementById('minDensity'),
  //maxDensity: document.getElementById('maxDensity'),
  cubicCells: document.getElementById('cubicCells'),
  mean: document.getElementById('mean'),
  order: document.getElementById('order')
};

const applyBtn = document.getElementById('apply');

let rgbInstance, hsluvInstance;

function apply() {
  if (rgbInstance) rgbInstance.unregister();
  if (hsluvInstance) hsluvInstance.unregister();

  let startTime = Date.now();

  const opts = {
    onProcess: () => { startTime = Date.now(); },
    imageEl: img,
    inputEl: uploadBtn,    
    width: options.width.value ? parseInt(options.width.value) : false, 
    height: options.height.value ? parseInt(options.height.value) : false, 
    maxColors: options.maxColors.value ? parseInt(options.maxColors.value) : false, 
    minDensity: options.minDensity.value ? parseFloat(options.minDensity.value) : false, 
    //maxDensity: options.maxDensity.value ? parseFloat(options.maxDensity.value) : false, 
    cubicCells: options.cubicCells.value ? parseInt(options.cubicCells.value) : false, 
    mean: options.mean.checked,
    order: options.order.value
  };

  if (options.width.value) {
    img.style.width = parseInt(options.width.value) + 'px';
    img.style.height = '';
  } else {
    img.style.height = parseInt(options.height.value) + 'px';
    img.style.width = '';
  }

  rgbInstance = imagePalCanvasRgb(opts, (err, colors) => {
    if (err) return void console.error('oops!', err.stack || err);

    const elapsed = Date.now() - startTime;

    displayColors(rgbColors, colors, elapsed);
  });
  
  hsluvInstance = imagePalCanvasHsluv(opts, (err, colors) => {
    if (err) return void console.error('oops!', err.stack || err);

    const elapsed = Date.now() - startTime;
    
    displayColors(hsluvColors, colors, elapsed);
  });
}

apply();

applyBtn.addEventListener('click', apply);

function displayColors(el, colors, elapsed) {
  let html = `<h5>${elapsed}ms / ${(1000 / elapsed).toFixed(2)}fps</h5>`;
  colors.forEach(c => {
    html += `<div class="color" style="background-color:${c.hex}">${c.hex}<br />${(c.density * 100).toString().substr(0, 5)}%</div>`;
  });
  el.innerHTML = html;
}
