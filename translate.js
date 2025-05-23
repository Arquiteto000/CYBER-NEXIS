function changeLanguage(language) {
  var sections = document.querySelectorAll('[data-translate]');
  sections.forEach(function(section) {
    var translations = section.getAttribute('data-translate').split('|');
    var index;
    switch (language) {
      case 'pt-BR':
        index = 0; // Português
        break;
      case 'en-US':
        index = 1; // Inglês
        break;
      case 'es-ES':
        index = 2; // Espanhol
        break;
      default:
        console.error('Idioma não suportado:', language);
        return; // Sai da função se o idioma não for suportado
    }
    if (index >= translations.length) {
      console.error('Número de traduções insuficiente para o idioma selecionado:', language);
      return; // Sai da função se o número de traduções for insuficiente
    }
    section.textContent = translations[index];
  });
}