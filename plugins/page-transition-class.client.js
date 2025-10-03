export default defineNuxtPlugin((nuxtApp) => {
  // Use Nuxt page lifecycle to time transitions after rendering
  nuxtApp.hook('page:start', () => {
    if (typeof document === 'undefined') return;
    document.body.classList.add('page-loading');
    document.body.classList.add('page-out');
    document.body.classList.remove('page-in');
  });

  nuxtApp.hook('page:finish', () => {
    if (typeof document === 'undefined') return;
    document.body.classList.remove('page-out');
    document.body.classList.add('page-in');
    // Wait a couple frames so layout is settled before showing footer
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.remove('page-loading');
      });
    });
    setTimeout(() => {
      document.body.classList.remove('page-in');
    }, 500);
  });
});