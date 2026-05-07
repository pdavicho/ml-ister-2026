/* ─────────────────────────────────────────────────────────
   auth.js — Sistema de claves semanales
   ISTER Machine Learning 2026 · Ing. David Minango. PhD

   Para generar el hash de una clave:
     Abre la consola del navegador (F12) y escribe:
     btoa('TU_CLAVE')   →  copia el resultado aquí
───────────────────────────────────────────────────────── */

var SEMANA_CONFIG = {
  1:  { titulo: 'Intro ML y Árboles de Decisión',    clave: btoa('ARBOL2026'),    disponible: true  },
  2:  { titulo: 'Matemáticas CART',                  clave: btoa('GINI2026'),     disponible: true  },
  3:  { titulo: 'Técnicas de Ensamblado',            clave: btoa('FOREST2026'),   disponible: true  },
  4:  { titulo: 'Evaluación y Validación',           clave: btoa('BOOST2026'),    disponible: false },
  5:  { titulo: 'Fundamentos SVM',                   clave: btoa('SVM2026'),      disponible: false },
  6:  { titulo: 'Fundamentos K-NN',                  clave: btoa('KNN2026'),      disponible: false },
  7:  { titulo: 'Implementación SVM/K-NN',           clave: btoa('SKLEARN2026'),  disponible: false },
  8:  { titulo: 'Aprendizaje No Supervisado',        clave: btoa('CLUSTER2026'),  disponible: false },
  9:  { titulo: 'K-means y DBScan',                  clave: btoa('KMEANS2026'),   disponible: false },
  10: { titulo: 'Clustering Práctico',               clave: btoa('DBSCAN2026'),   disponible: false },
  11: { titulo: 'Redes Neuronales',                  clave: btoa('NEURAL2026'),   disponible: false },
  12: { titulo: 'Deep Learning',                     clave: btoa('DEEP2026'),     disponible: false },
  13: { titulo: 'Red Neuronal Simple',               clave: btoa('KERAS2026'),    disponible: false },
  14: { titulo: 'Evaluación y Optimización',         clave: btoa('OPTIM2026'),    disponible: false },
  15: { titulo: 'Sistemas Expertos',                 clave: btoa('EXPERT2026'),   disponible: false },
  16: { titulo: 'Visión por Computadora',            clave: btoa('VISION2026'),   disponible: false },
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
