document.addEventListener('DOMContentLoaded', function () {
  setupCopyButtons();
  markActiveWeek();
  addHomeLink();
  setupLockedLinks();
});

/* ── Detectar si estamos dentro de una carpeta semana-X ── */
var IN_SEMANA = /\/semana-\d+\//.test(window.location.pathname);

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

/* ── Botón inicio (solo en páginas de semana) ────────────── */
function addHomeLink() {
  if (!IN_SEMANA) return;
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
  var prefix = IN_SEMANA ? '../' : '';

  document.querySelectorAll('.week-link.locked').forEach(function (link) {
    var num = link.querySelector('.week-num');
    if (!num) return;
    var semana = parseInt(num.textContent);
    link.style.pointerEvents = 'auto';
    link.style.cursor = 'pointer';
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = prefix + 'locked.html?semana=' + semana;
    });
  });
}
