/* ─────────────────────────────────────────────────────────
   auth.js — Sistema de claves semanales
   ISTER Machine Learning 2026 · Ing. David Minango. PhD

   Para generar el hash de una clave:
     Abre la consola del navegador (F12) y escribe:
     btoa('TU_CLAVE')   →  copia el resultado aquí
───────────────────────────────────────────────────────── */

var CLAVE = btoa('ISTER_ML2026');

var SEMANA_CONFIG = {
  1:  { titulo: 'Intro ML y Árboles de Decisión',    clave: CLAVE, disponible: true  },
  2:  { titulo: 'Matemáticas CART',                  clave: CLAVE, disponible: true  },
  3:  { titulo: 'Técnicas de Ensamblado',            clave: CLAVE, disponible: true  },
  4:  { titulo: 'Evaluación y Validación',           clave: CLAVE, disponible: true  },
  5:  { titulo: 'Fundamentos SVM',                   clave: CLAVE, disponible: true  },
  6:  { titulo: 'Fundamentos K-NN',                  clave: CLAVE, disponible: true  },
  7:  { titulo: 'Implementación SVM/K-NN',           clave: CLAVE, disponible: true  },
  8:  { titulo: 'Aprendizaje No Supervisado',        clave: CLAVE, disponible: true  },
  9:  { titulo: 'K-means y DBScan',                  clave: CLAVE, disponible: true  },
  10: { titulo: 'Clustering Práctico',               clave: CLAVE, disponible: true  },
  11: { titulo: 'Redes Neuronales',                  clave: CLAVE, disponible: true  },
  12: { titulo: 'Deep Learning',                     clave: CLAVE, disponible: true  },
  13: { titulo: 'Red Neuronal Simple',               clave: CLAVE, disponible: false },
  14: { titulo: 'Evaluación y Optimización',         clave: CLAVE, disponible: false },
  15: { titulo: 'Sistemas Expertos',                 clave: CLAVE, disponible: false },
  16: { titulo: 'Visión por Computadora',            clave: CLAVE, disponible: true  },
};

/* ── Helpers ──────────────────────────────────────────── */

function isUnlocked(semana) {
  var config = SEMANA_CONFIG[semana];
  if (!config || !config.clave) return true;
  var unlocked = JSON.parse(localStorage.getItem('ml_ister_unlocked') || '[]');
  return unlocked.indexOf(semana) !== -1;
}

function unlockSemana(semana) {
  var unlocked = JSON.parse(localStorage.getItem('ml_ister_unlocked') || '[]');
  if (unlocked.indexOf(semana) === -1) unlocked.push(semana);
  localStorage.setItem('ml_ister_unlocked', JSON.stringify(unlocked));
}

function checkPassword(semana, input) {
  var config = SEMANA_CONFIG[semana];
  if (!config || !config.clave) return true;
  return btoa(input.trim().toUpperCase()) === config.clave;
}

/* Llamar al inicio de cada página de semana para bloquear acceso directo */
function protectPage(semana) {
  if (!isUnlocked(semana)) {
    window.location.replace('../locked.html?semana=' + semana);
  }
}
