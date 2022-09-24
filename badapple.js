/** @type {HTMLCanvasElement} */
let canvas;
/** @type {HTMLVideoElement} */
let video;
/** @type {CanvasRenderingContext2D} */
let ctx;
function runFrame() {
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;
  const scaleFactor = 64 / videoHeight;
  const scaledWidth = videoWidth * scaleFactor;
  const scaledOff = -(scaledWidth - 64) / 2;
  ctx.drawImage(video, scaledOff | 0, 0, scaledWidth | 0, 64);
  const artworkSrc = canvas.toDataURL();
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Bad Apple',
    artwork: [{src: artworkSrc, sizes: '64x64', type: 'image/png'}],
  });
}
let lastTime = 0;
function throttledRunFrame() {
  const currentTime = Date.now();
  if (currentTime - lastTime > 500) {
    // throttle to 2fps; the flip animation looks bad otherwise
    lastTime = currentTime;
    runFrame();
  }
}
function loadHandler() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  video = document.getElementById('video');
  video.ontimeupdate = throttledRunFrame;
}
loadHandler();