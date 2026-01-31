(function () {
  'use strict';

  // Set footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fixed projects: display first 4 from PROJECTS
  var container = document.getElementById('random-projects-container');
  if (container && typeof PROJECTS !== 'undefined' && PROJECTS.length) {
    var toShow = PROJECTS.slice(0, 4); // 只取前4个项目
    
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
