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

const mapModKeys = {
  forca: 'modForca',
  destreza: 'modDestreza',
  constituicao: 'modConstituicao',
  inteligencia: 'modInteligencia',
  sabedoria: 'modSabedoria',
  carisma: 'modCarisma'
};

const checkboxes = {
  forca: document.querySelector('input[name="save_forca_chk"]'),
  destreza: document.querySelector('input[name="save_destreza_chk"]'),
  constituicao: document.querySelector('input[name="save_constituicao_chk"]'),
  inteligencia: document.querySelector('input[name="save_inteligencia_chk"]'),
  sabedoria: document.querySelector('input[name="save_sabedoria_chk"]'),
  carisma: document.querySelector('input[name="save_carisma_chk"]')
};

const atributosMod = {
  modForca: document.querySelector('input[name="modificador_forca"]'),
  modDestreza: document.querySelector('input[name="modificador_destreza"]'),
  modConstituicao: document.querySelector('input[name="modificador_constituicao"]'),
  modInteligencia: document.querySelector('input[name="modificador_inteligencia"]'),
  modSabedoria: document.querySelector('input[name="modificador_sabedoria"]'),
  modCarisma: document.querySelector('input[name="modificador_carisma"]')
}


const bonus = document.querySelector('input[name="bonusArmadura"]');
const armadura = document.querySelector('input[name="armadura"]');
let spellCount = 1;
const spellContainer = document.querySelector('.spell');
let xp = document.querySelector('input[name="xp"]');
const classeContainer = document.querySelector('.class');


document.querySelector('.addSpell').addEventListener('click', (e) => {
  e.preventDefault();
  spellCount++
  const newDiv = document.createElement('div');
  newDiv.classList.add('input-spells');
  if (spellCount === 2) {
    spellContainer.style.gridTemplateColumns = '1fr 1fr';
  } else if (spellCount === 3) {
    spellContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
  }

  newDiv.innerHTML = `
      <label>Nome da Magia: 
        <input type="text" name="spell_name_${spellCount}" />
      </label>
      <label>Usos Restantes: 
        <input type="number" name="spell_uses_${spellCount}" min="0" />
      </label>
      <label>Descrição:</label>
      <textarea name="spell_desc_${spellCount}" rows="3"></textarea>
    `;
  spellContainer.appendChild(newDiv);
});

document.querySelector('.removeSpell').addEventListener('click', (e) => {
  e.preventDefault();
  const spells = spellContainer.querySelectorAll('.input-spells');

  if (spells.length > 1) {
    spells[spells.length - 1].remove();
    spellCount--;

    if (spellCount === 1) {
      spellContainer.style.gridTemplateColumns = '1fr';
    } else if (spellCount === 2) {
      spellContainer.style.gridTemplateColumns = '1fr 1fr';
    } else {
      spellContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
    }
  } else {
    alert("Você precisa ter pelo menos uma magia.");
  }
});

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
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

document.querySelector('.form2').addEventListener('submit', function (event) {
  event.preventDefault();
  const input = document.getElementById('arquivo');
  const file = input.files[0];

  if (!file) {
    alert('Selecione um arquivo JSON primeiro.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const jsonObject = JSON.parse(e.target.result);
      console.log("Objeto carregado do JSON:", jsonObject);

      for (let i = 2; jsonObject[`spell_name_${i}`]; i++) {
        document.querySelector('.addSpell').click();
      }

      const form = document.getElementById('form');
      for (const key in jsonObject) {
        const input = form.elements.namedItem(key);
        if (input) {
          if (input.type === 'checkbox') {
            input.checked = jsonObject[key] === 'on' || jsonObject[key] === true;
          } else {
            input.value = jsonObject[key];
          }
        }
      }

      const event = new Event('input', { bubbles: true });
      document.querySelectorAll('input').forEach(input => {
        input.dispatchEvent(event);
      });


      document.querySelectorAll('input[name^="nivel_"]').forEach(input => {
        input.removeEventListener('input', modifAtri);
        input.addEventListener('input', modifAtri);
      });

      atualizaTestes();
      modifAtri();
      atualizarSalvamentos();
      atualizarPericia();

    } catch (err) {
      console.error("Erro ao fazer parse do JSON:", err);
    }
  };



  reader.readAsText(file);
});

document.querySelector('.buttonArma').addEventListener('click', function (e) {
  e.preventDefault();
  const bonusValor = parseInt(bonus.value) || 0;
  const destrezaValor = parseInt(atributos.destreza.value) || 0;
  armadura.value = bonusValor + 10 + calculaModificador(destrezaValor);
});


window.addEventListener('DOMContentLoaded', (e) => {

  function atualizaTestes() {
    for (const i in atributos) {
      const valor = parseInt(atributos[i].value);
      const modKey = mapModKeys[i];
      if (!isNaN(valor)) {
        testes[i].value = calculaModificador(valor);
        atributosMod[modKey].value = calculaModificador(valor);
      } else {
        testes[i].value = '';
        atributosMod[modKey].value = '';
      }
    }
  }

  for (const i in atributos) {
    atributos[i].addEventListener('input', atualizaTestes);
  }

  atualizaTestes();
});

function calculaModificador(valor) {
  return Math.floor((valor - 10) / 2);
}

const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
})