const live = document.getElementById('live-status');
const labels = { all: 'Showing all items', pricing: 'Filtered to pricing', auth: 'Filtered to auth' };
document.querySelectorAll('[data-filter]').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const key = chip.getAttribute('data-filter');
    live.textContent = labels[key] || ('Filtered to ' + key);
  });
});
document.getElementById('open-dialog-btn').addEventListener('click', () => {
  document.getElementById('settings-dialog').showModal();
});
document.getElementById('open-lightbox-btn').addEventListener('click', () => {
  document.getElementById('media-lightbox').showModal();
});
document.querySelectorAll('[data-testid="rotate-btn"]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('[data-testid="media-card"]');
    const img = card.querySelector('[data-testid="media-image"]');
    img.classList.toggle('is-rotated');
    live.textContent = 'Media rotated';
  });
});
