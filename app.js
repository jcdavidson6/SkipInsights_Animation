document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.apple-hero-canvas');
  const wrap = document.querySelector('.device-perspective-wrap');
  const cursor = document.getElementById('virtualCursor');
  const icon = document.getElementById('skipInsightsIcon');
  const popup = document.getElementById('insightsPopup');

  if (!container || !wrap || !cursor || !icon || !popup) {
    return;
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
      cursor.style.left = '92%';
      cursor.style.top = '7%';
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

  runShowcaseLoop();
});
