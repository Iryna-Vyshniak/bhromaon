export default function initNavigation() {
  const burgerButton = document.querySelector('.nav__burger');
  const closeButton = document.querySelector('.nav__close');
  const dialog = document.querySelector('#mobile-menu');

  const mobileLinks = document.querySelectorAll('.mobile-nav__menu-link');

  if (!burgerButton || !closeButton || !dialog) return;

  const openMenu = () => {
    dialog.showModal();

    burgerButton.setAttribute('aria-expanded', 'true');

    document.body.classList.add('menu-open');

    closeButton.focus();
  };

  const closeMenu = () => {
    dialog.close();

    burgerButton.setAttribute('aria-expanded', 'false');

    document.body.classList.remove('menu-open');

    burgerButton.focus();
  };

  burgerButton.addEventListener('click', openMenu);

  closeButton.addEventListener('click', closeMenu);

  dialog.addEventListener('close', () => {
    burgerButton.setAttribute('aria-expanded', 'false');
  });

  // close after navigation
  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // click outside dialog
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();

    const isInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInside) {
      closeMenu();
    }
  });

  // ESC handled by dialog,
  // but keep state synced
  dialog.addEventListener('cancel', () => {
    burgerButton.setAttribute('aria-expanded', 'false');
  });
}
