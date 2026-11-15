(function () {
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.classList.remove('dark-mode');
      if (document.body) document.body.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
      if (document.body) document.body.classList.add('dark-mode');
    }
  } catch (e) {}
})();
