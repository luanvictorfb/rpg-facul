window.addEventListener('DOMContentLoaded', () => {

  const atributos = {
    forca: document.querySelector('input[name="forca"]'),
    destreza: document.querySelector('input[name="destreza"]'),
    constituicao: document.querySelector('input[name="constituicao"]'),
    inteligencia: document.querySelector('input[name="inteligencia"]'),
    sabedoria: document.querySelector('input[name="sabedoria"]'),
    carisma: document.querySelector('input[name="carisma"]'),
  };

  const testes = {
    forca: document.querySelector('input[name="save_forca"]'),
    destreza: document.querySelector('input[name="save_destreza"]'),
    constituicao: document.querySelector('input[name="save_constituicao"]'),
    inteligencia: document.querySelector('input[name="save_inteligencia"]'),
    sabedoria: document.querySelector('input[name="save_sabedoria"]'),
    carisma: document.querySelector('input[name="save_carisma"]'),
  };

  function calculaModificador(valor) {
    return Math.floor((valor - 10) / 2);
  }

  function atualizaTestes() {
    for (const chave in atributos) {
      const valor = parseInt(atributos[chave].value);
      if (!isNaN(valor)) {
        testes[chave].value = calculaModificador(valor);
      } else {
        testes[chave].value = '';
      }
    }
  }

  for (const chave in atributos) {
    atributos[chave].addEventListener('input', atualizaTestes);
  }

  atualizaTestes();
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });

    const url = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ficha.json';
    document.body.appendChild(a);
    a.click(); 
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', ()=>{
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
})