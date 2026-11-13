(() => {
  let preference = 'system';
  try {
    preference = localStorage.getItem('d2d:theme') || 'system';
  } catch {
    preference = 'system';
  }
  const isDark =
    preference === 'dark' ||
    (preference === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
})();
