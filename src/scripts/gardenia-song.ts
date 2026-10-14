const song = document.querySelector<HTMLElement>('.gardenia-song');
if (song) {
  const toolbar = song.querySelector<HTMLElement>('.gardenia-toolbar')!;
  const smaller = song.querySelector<HTMLButtonElement>('#gardenia-smaller')!;
  const larger = song.querySelector<HTMLButtonElement>('#gardenia-larger')!;
  const scrollButton = song.querySelector<HTMLButtonElement>('#gardenia-scroll')!;
  const status = song.querySelector<HTMLElement>('#gardenia-status')!;
  let size = Number.parseFloat(getComputedStyle(song).getPropertyValue('--gardenia-font-size')) || 24;
  let running = false;
  let frame = 0;
  let previous = 0;
  let position = 0;

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
    scrollButton.setAttribute('aria-pressed', 'false');
    scrollButton.querySelector('span')!.textContent = 'Tự cuộn';
  }
  function setSize(next: number) {
    stop();
    size = Math.min(32, Math.max(18, next));
    song!.style.setProperty('--gardenia-font-size', `${size}px`);
    smaller.disabled = size <= 18;
    larger.disabled = size >= 32;
    status.textContent = `Cỡ chữ lời hát: ${size} px`;
  }
  function tick(time: number) {
    if (!running) return;
    if (previous) position += Math.min(time - previous, 80) * 0.021;
    previous = time;
    // Explicit instant behavior avoids the shell's smooth-scroll setting queuing frames.
    window.scrollTo({ top: position, behavior: 'instant' });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      stop();
      status.textContent = 'Đã đến cuối lời hát';
      return;
    }
    frame = requestAnimationFrame(tick);
  }
  const currentSize = () => Number.parseFloat(getComputedStyle(song).getPropertyValue('--gardenia-font-size')) || size;
  smaller.addEventListener('click', () => setSize(currentSize() - 2));
  larger.addEventListener('click', () => setSize(currentSize() + 2));
  scrollButton.addEventListener('click', () => {
    if (running) { stop(); status.textContent = 'Đã dừng tự cuộn'; return; }
    running = true;
    position = window.scrollY;
    previous = 0;
    scrollButton.setAttribute('aria-pressed', 'true');
    scrollButton.querySelector('span')!.textContent = 'Dừng cuộn';
    status.textContent = 'Đang tự cuộn. Chạm hoặc cuộn trang để dừng';
    frame = requestAnimationFrame(tick);
  });
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', event => {
    if (!(event.target instanceof Element) || !event.target.closest('#gardenia-scroll')) stop();
  }, { passive: true });
  document.addEventListener('keydown', event => {
    if (event.key === ' ' && event.target === scrollButton) return;
    if (['Escape', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', '/'].includes(event.key)) stop();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  document.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a,#menu-toggle')) stop();
  });
  window.addEventListener('pagehide', stop);
  toolbar.hidden = false;
}
