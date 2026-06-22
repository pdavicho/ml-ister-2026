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

/* ── Estado del sidebar derivado de auth.js (SEMANA_CONFIG) ──
   Una semana con disponible:true navega directo a su contenido;
   una bloqueada (disponible:false) va a la página de clave.
   Así, al activar una semana en auth.js, todo el sidebar se actualiza solo. */
function setupLockedLinks() {
  var prefix = IN_SEMANA ? '../' : '';

  document.querySelectorAll('.week-link').forEach(function (link) {
    var num = link.querySelector('.week-num');
    if (!num) return;
    var semana = parseInt(num.textContent);
    if (!semana) return;

    var config = (typeof SEMANA_CONFIG !== 'undefined') ? SEMANA_CONFIG[semana] : null;
    var disponible = config ? config.disponible : true;
    var icon = link.querySelector('.week-icon');

    if (disponible) {
      // Semana disponible: enlace normal a su contenido
      link.classList.remove('locked');
      if (icon) icon.style.display = 'none';
      if (link.tagName !== 'A') {
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
        link.addEventListener('click', function () {
          window.location.href = prefix + 'semana-' + semana + '/index.html';
        });
      }
    } else {
      // Semana bloqueada: ir a la página de clave
      link.classList.add('locked');
      if (icon) icon.style.display = '';
      link.style.pointerEvents = 'auto';
      link.style.cursor = 'pointer';
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = prefix + 'locked.html?semana=' + semana;
      });
    }
  });
}
