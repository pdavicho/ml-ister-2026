document.addEventListener('DOMContentLoaded', function () {
  setupCopyButtons();
  markActiveWeek();
});

function setupCopyButtons() {
  document.querySelectorAll('.sourceCode').forEach(function (wrapper) {
    var btn  = wrapper.querySelector('.btn-copy');
    var code = wrapper.querySelector('code');
    if (!btn || !code) return;

    btn.addEventListener('click', function () {
      var text = code.innerText || code.textContent;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '✓ Copiado';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copiar';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        // Fallback for older browsers
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '✓ Copiado';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copiar';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

function markActiveWeek() {
  var path = window.location.pathname;
  document.querySelectorAll('.week-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && path.indexOf(href.replace('../', '').replace('./', '')) !== -1) {
      link.classList.add('active');
    }
  });
}
