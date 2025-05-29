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
const classContainer = document.querySelector('.class');
let xp = document.querySelector('input[name="xp"]');
let classeCount = 1;
const classeContainer = document.querySelector('.class');
const proficiencia = document.querySelector('input[name="bonus_proficiencia"]');

document.querySelector('.addClasse').addEventListener('click', (e) => {
  e.preventDefault();
  classeCount++;
  if (classeCount === 2) {
    classContainer.style.gridTemplateColumns = '1fr 1fr';
  } else if (classeCount === 3) {
    classContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
  }

  const newClasseDiv = document.createElement('div');
  newClasseDiv.classList.add('classe-nivel');
  newClasseDiv.innerHTML = `
    <label>Classe: <input type="text" name="classe_${classeCount}" /></label>
    <label>Nível: <input type="number" name="nivel_${classeCount}" min="1" /></label>
  `;

  classeContainer.appendChild(newClasseDiv);
  const novoNivelInput = newClasseDiv.querySelector(`input[name="nivel_${classeCount}"]`);
  novoNivelInput.addEventListener('input', modifAtri);
  modifAtri();
});

document.querySelector('.removeClasse').addEventListener('click', (e) => {
  e.preventDefault();
  const allClasseDivs = classeContainer.querySelectorAll('.classe-nivel');

  if (classeCount > 1) {
    allClasseDivs[allClasseDivs.length - 1].remove();
    classeCount--;

    if (classeCount === 1) {
      classContainer.style.gridTemplateColumns = '1fr';
    } else if (classeCount === 2) {
      classContainer.style.gridTemplateColumns = '1fr 1fr';
    } else {
      classContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
    }
  } else {
    alert("Você precisa ter pelo menos uma classe.");
  }
});

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

function atualizarSalvamentos() {
  for (const chave in atributosMod) {
    const nome = chave.replace('mod', '').toLowerCase();
    const mod = parseInt(atributosMod[chave].value) || 0;
    const profBonus = parseInt(proficiencia.value) || 0;
    const temProficiencia = checkboxes[nome]?.checked;

    testes[nome].value = temProficiencia ? mod + profBonus : mod;
  }
}

for (const chave in checkboxes) {
  checkboxes[chave].addEventListener('change', atualizarSalvamentos);
}

for (const chave in atributosMod) {
  atributosMod[chave].addEventListener('input', atualizarSalvamentos);
}

proficiencia.addEventListener('input', atualizarSalvamentos);

window.addEventListener('DOMContentLoaded', atualizarSalvamentos);

document.querySelector('.buttonArma').addEventListener('click', function (e) {
  e.preventDefault();
  const bonusValor = parseInt(bonus.value) || 0;
  const destrezaValor = parseInt(atributos.destreza.value) || 0;
  armadura.value = bonusValor + 10 + calculaModificador(destrezaValor);
});

function calcularNivelTotal() {
  const niveis = document.querySelectorAll('input[name^="nivel_"]');
  let total = 0;
  niveis.forEach(i => {
    const v = parseInt(i.value);
    if (!isNaN(v)) total += v;
  });
  return total;
}

function modifAtri() {
  const nivelTotal = calcularNivelTotal();
  console.log(nivelTotal)
  if (nivelTotal <= 4) {
    proficiencia.value = 2;
  } else if (nivelTotal <= 8) {
    proficiencia.value = 3;
  } else if (nivelTotal <= 12) {
    proficiencia.value = 4;
  } else if (nivelTotal <= 16) {
    proficiencia.value = 5;
  } else {
    proficiencia.value = 6;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[name^="nivel_"]').forEach(input => {
    input.addEventListener('input', modifAtri);
  });
  modifAtri();
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