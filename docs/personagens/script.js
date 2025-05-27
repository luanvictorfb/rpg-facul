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

const niveis = document.querySelectorAll('input[name^="nivel_"]');
const bonus = document.querySelector('input[name="bonusArmadura"]');
const armadura = document.querySelector('input[name="armadura"]');
let spellCount = 1;
const spellContainer = document.querySelector('.spell');
const classContainer = document.querySelector('.class');
let xp = document.querySelector('input[name="xp"]')
let classeCount = 1;
const classeContainer = document.querySelector('.class');

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



document.querySelector('.buttonArma').addEventListener('click', function (e) {
  e.preventDefault();
  const bonusValor = parseInt(bonus.value) || 0;
  const destrezaValor = parseInt(atributos.destreza.value) || 0;
  armadura.value = bonusValor + 10 + calculaModificador(destrezaValor);
});

function calcularNivelTotal() {
  
  let total = 0;
  niveis.forEach(nivelInput => {
    const val = parseInt(nivelInput.value);
    if (!isNaN(val)) total += val;
  });
  return total;
}

function modifAtri() {
  const nivelTotal = calcularNivelTotal();

  if (nivelTotal >= 1 && nivelTotal <= 4) {
    proficiencia.value = 2;
  } else if (nivelTotal >= 5 && nivelTotal <= 8) {
    proficiencia.value = 3;
  } else if (nivelTotal >= 9 && nivelTotal <= 12) {
    proficiencia.value = 4;
  } else if (nivelTotal >= 13 && nivelTotal <= 16) {
    proficiencia.value = 5;
  } else if (nivelTotal >= 17) {
    proficiencia.value = 6;
  } else {
    proficiencia.value = 0;
  }
}

window.addEventListener('DOMContentLoaded', (e) => {
  

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

function calculaModificador(valor) {
  return Math.floor((valor - 10) / 2);
}

const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
})