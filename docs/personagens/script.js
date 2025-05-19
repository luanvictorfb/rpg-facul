window.addEventListener('DOMContentLoaded', () => {

  const infoGerais = {
    classe: document.querySelector('input[nome=nome_classe]'),
    nivel: document.querySelector('input[name="nome_nivel"]'),
    xp: document.querySelector('input[name="xp"]')
  }

  const bonusState = {
    proficiencia: document.querySelector('input[name="bonus_proficiencia"]'),

  }

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

  function modifAtri(){
    if(infoGerais.xp.value >= 0 || infoGerais.xp.value <= 299){
      bonusState.proficiencia.value = 2;
      infoGerais.nivel.value = 2;
    } else if (infoGerais.xp.value >= 300 || infoGerais.xp.value <= 899){
      bonusState.proficiencia.value = 2;
      infoGerais.nivel.value = 3;
    } else if (infoGerais.xp.value >= 900 || infoGerais.xp.value <= 2699){
      bonusState.proficiencia.value = 2;
      infoGerais.nivel.value = 4;
    } else if (infoGerais.xp.value >= 2700 || infoGerais.xp.value <= 6499){
      bonusState.proficiencia.value = 3;
      infoGerais.nivel.value = 5;
    } else if (infoGerais.xp.value >= 6500 || infoGerais.xp.value <= 13999){
      bonusState.proficiencia.value = 3;
      infoGerais.nivel.value = 6;
    } else if (infoGerais.xp.value >= 14000 || infoGerais.xp.value <= 22999){
      bonusState.proficiencia.value = 2;
      infoGerais.nivel.value = 3;
    } else if (infoGerais.xp.value >= 23000 || infoGerais.xp.value <= 33999){

    }
  }

  function calculaModificador(valor) {
    return Math.floor((valor - 10) / 2);
  }

  function atualizaTestes() {
    for (const i in atributos) {
      const valor = parseInt(atributos[i].value);
      if (!isNaN(valor)) {
        testes[i].value = calculaModificador(valor);
      } else {
        testes[i].value = '';
      }
    }
  }

  for (const i in atributos) {
    atributos[i].addEventListener('input', atualizaTestes);
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