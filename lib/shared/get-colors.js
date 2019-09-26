module.exports = (imagePal, { srcUrl, width, height, imageEl, canvasEl, inputEl, onProcess, ...options }, cb) => {
  if (!height) width = width || 100; // default if height not specified

  const img = imageEl || new Image();
  const canvas = canvasEl || document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');

  const imgOnLoad = () => {
    if (width) {
      const aspectY = img.naturalHeight / img.naturalWidth;
      canvas.width = width;
      canvas.height = Math.round(width * aspectY);
    } else {
      const aspectX = img.naturalWidth / img.naturalHeight;
      canvas.height = height;
      canvas.width = Math.round(height * aspectX);
    }

    canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imgData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);
    if (typeof onProcess === 'function') onProcess();
    const colors = imagePal(imgData.data, { hasAlpha: true, ...options });

    cb(null, colors);
  };

  const imgOnError = (e, err) => cb(err);

  img.addEventListener('load', imgOnLoad, false);
  img.addEventListener('error', imgOnError, false);

  if (srcUrl) {
    img.crossOrigin = "Anonymous";
    img.src = srcUrl;
  }

  let inputEvt;
  if (inputEl) {
    inputEvt = inputEvt => {
      const reader = new FileReader();
      reader.onload = fileEvt => {
        img.src = fileEvt.target.result;
      };
      reader.readAsDataURL(inputEvt.target.files[0]);
    };
    inputEl.addEventListener('change', inputEvt, false);
  }

  if (img.complete && img.naturalWidth && img.naturalHeight) imgOnLoad(); // trigger if already loaded

  return {
    unregister: () => {
      img.removeEventListener('load', imgOnLoad, false);
      img.removeEventListener('error', imgOnError, false);      
      if (inputEvt) inputEl.removeEventListener('change', inputEvt, false);
    }
  };
};
