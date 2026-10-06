document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.apple-hero-canvas');
  const wrap = document.querySelector('.device-perspective-wrap');
  const cursor = document.getElementById('virtualCursor');
  const icon = document.getElementById('skipInsightsIcon');
  const popup = document.getElementById('insightsPopup');

  if (!container || !wrap || !cursor || !icon || !popup) {
    return;
  }

  function moveCursorToIcon() {
    const browserWindow = document.querySelector('.browser-window');
    let left = 0;
    let top = 0;
    let element = icon;

    while (element && element !== browserWindow) {
      left += element.offsetLeft;
      top += element.offsetTop;
      element = element.offsetParent;
    }

    const cursorHotspotX = 4.5 * (cursor.offsetWidth / 24);
    const cursorHotspotY = 3 * (cursor.offsetHeight / 24);

    cursor.style.left = `${left + (icon.offsetWidth / 2) - cursorHotspotX}px`;
    cursor.style.top = `${top + (icon.offsetHeight / 2) - cursorHotspotY}px`;
  }

  container.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const rX = -(y / rect.height) * 20;
    const rY = (x / rect.width) * 20;

    wrap.style.setProperty('--rx', `${rX}deg`);
    wrap.style.setProperty('--ry', `${rY}deg`);
  });

  container.addEventListener('mouseleave', () => {
    wrap.style.setProperty('--rx', '10deg');
    wrap.style.setProperty('--ry', '-12deg');
  });

  function runShowcaseLoop() {
    popup.classList.remove('active');
    icon.classList.remove('simulated-hover');
    cursor.style.top = '68%';
    cursor.style.left = '17%';

    setTimeout(() => {
      moveCursorToIcon();
    }, 1500);

    setTimeout(() => {
      icon.classList.add('simulated-hover');
    }, 2800);

    setTimeout(() => {
      popup.classList.add('active');
    }, 3200);

    setTimeout(() => {
      cursor.style.top = '52%';
      cursor.style.left = '64%';
    }, 4500);

    setTimeout(runShowcaseLoop, 9500);
  }

  window.addEventListener('resize', moveCursorToIcon);
  runShowcaseLoop();
});
