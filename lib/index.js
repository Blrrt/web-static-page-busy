'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var supportedLanguages = ['en', 'es'];
  var defaultLanguage = 'en';
  var language;

  var preferredLanguage = navigator.languages ?
    navigator.languages[0] :
    (navigator.language || navigator.userLanguage);

  for (var i = 0; i < supportedLanguages.length; i++) {
    if (preferredLanguage === supportedLanguages[i]) {
      language = preferredLanguage;
      break;
    }
  }

  if (!language) {
    language = defaultLanguage;
  }

  var elements = document.querySelectorAll('[lang="' + language + '"]');

  Array.prototype.forEach.call(elements, function (element) {
    element.classList.remove('hidden');
  });

  document.documentElement.lang = language;
});
