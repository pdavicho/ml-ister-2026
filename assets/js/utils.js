document.addEventListener('DOMContentLoaded', function () {
  setupCopyButtons();
  markActiveWeek();
  addHomeLink();
  setupLockedLinks();
});

/* ── Botones Copiar ──────────────────────────────────────── */
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
        setTimeout(function () { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2000);
      }).catch(function () {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '✓ Copiado';
        btn.classList.add('copied');
        setTimeout(function () { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
}

/* ── Semana activa en sidebar ────────────────────────────── */
function markActiveWeek() {
  var path = window.location.pathname;
  document.querySelectorAll('.week-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && path.indexOf(href.replace('../', '').replace('./', '')) !== -1) {
      link.classList.add('active');
    }
  });
}

/* ── Botón Inicio del Curso ──────────────────────────────── */
function addHomeLink() {
  var header = document.querySelector('.sidebar-header');
  if (!header) return;
  var a = document.createElement('a');
  a.href = '../index.html';
  a.className = 'sidebar-home';
  a.textContent = '← Inicio del curso';
  header.insertBefore(a, header.firstChild);
}

/* ── Semanas bloqueadas: click → página de clave ─────────── */
function setupLockedLinks() {
  document.querySelectorAll('.week-link.locked').forEach(function (link) {
    var num = link.querySelector('.week-num');
    if (!num) return;
    var semana = parseInt(num.textContent);
    link.style.pointerEvents = 'auto';
    link.style.cursor = 'pointer';
    link.style.opacity = '0.5';
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = '../locked.html?semana=' + semana;
    });
  });
}
