(() => {
  const dialog = document.querySelector('[data-lightbox-dialog]');
  if (!dialog) return;

  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('p');
  const closeButton = dialog.querySelector('[data-lightbox-close]');
  let activeTrigger = null;

  document.querySelectorAll('.lab-image').forEach((trigger) => {
    trigger.removeAttribute('target');
    trigger.removeAttribute('rel');
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const preview = trigger.querySelector('img');
      activeTrigger = trigger;
      image.src = trigger.getAttribute('href');
      image.alt = preview?.alt || '';
      caption.textContent = preview?.alt || '';
      dialog.showModal();
      closeButton.focus();
    });
  });

  const closeDialog = () => dialog.close();
  closeButton.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    caption.textContent = '';
    activeTrigger?.focus();
  });
})();
