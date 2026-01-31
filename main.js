(function () {
  'use strict';

  // Set footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Random projects: pick up to 6 from PROJECTS (shuffled)
  var container = document.getElementById('random-projects-container');
  if (container && typeof PROJECTS !== 'undefined' && PROJECTS.length) {
    var copy = PROJECTS.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = copy[i];
      copy[i] = copy[j];
      copy[j] = t;
    }
    var toShow = copy.slice(0, 6);
    toShow.forEach(function (p) {
      var card = document.createElement('article');
      card.className = 'project-card';
      var link = p.link ? '<a href="' + p.link + '" class="project-card__link">' + escapeHtml(p.title) + '</a>' : escapeHtml(p.title);
      card.innerHTML =
        '<h3 class="project-card__title">' + link + '</h3>' +
        '<p class="project-card__meta">' + escapeHtml(p.section) + (p.year ? ' · ' + p.year : '') + '</p>' +
        '<p class="project-card__desc">' + escapeHtml(p.description) + '</p>';
      container.appendChild(card);
    });
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
