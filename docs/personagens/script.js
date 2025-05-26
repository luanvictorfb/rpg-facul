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

  const proficiencia = document.querySelector('input[name="bonus_proficiencia"]');
  const bonus = document.querySelector('input[name="bonusArmadura"]');
  const armadura = document.querySelector('input[name="armadura"]');
  let spellCount = 1;
  const spellContainer = document.querySelector('.spell');
  const classContainer = document.querySelector('.class');
  let xp = document.querySelector('input[name="xp"]')
  let classeCount = 1;
  const classeContainer = document.querySelector('.class');

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

  document.querySelector('form').addEventListener('submit', function (event) {
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

  document.querySelector('.buttonArma').addEventListener('click', function (e) {
    e.preventDefault();
    const bonusValor = parseInt(bonus.value) || 0;
    const destrezaValor = parseInt(atributos.destreza.value) || 0;
    armadura.value = bonusValor + 10 + calculaModificador(destrezaValor);
  });

  function calcularNivelTotal() {
    const niveis = document.querySelectorAll('input[name^="nivel_"]');
    let total = 0;
    niveis.forEach(nivelInput => {
      const val = parseInt(nivelInput.value);
      if (!isNaN(val)) total += val;
    });
    return total;
  }

  function modifAtri() {
    if (infoGerais.xp.value >= 0 && infoGerais.xp.value <= 299) {
      proficiencia.value = 2;
      infoGerais.nivel.value = 1;
    } else if (infoGerais.xp.value >= 300 && infoGerais.xp.value <= 899) {
      proficiencia.value = 2;
      infoGerais.nivel.value = 2;
    } else if (infoGerais.xp.value >= 900 && infoGerais.xp.value <= 2699) {
      proficiencia.value = 2;
      infoGerais.nivel.value = 3;
    } else if (infoGerais.xp.value >= 2700 && infoGerais.xp.value <= 6499) {
      proficiencia.value = 3;
      infoGerais.nivel.value = 4;
    } else if (infoGerais.xp.value >= 6500 && infoGerais.xp.value <= 13999) {
      proficiencia.value = 3;
      infoGerais.nivel.value = 5;
    } else if (infoGerais.xp.value >= 14000 && infoGerais.xp.value <= 22999) {
      proficiencia.value = 3;
      infoGerais.nivel.value = 6;
    } else if (infoGerais.xp.value >= 23000 && infoGerais.xp.value <= 33999) {
      proficiencia.value = 3;
      infoGerais.nivel.value = 7;
    } else if (infoGerais.xp.value >= 34000 && infoGerais.xp.value <= 47999) {
      proficiencia.value = 3;
      infoGerais.nivel.value = 8;
    } else if (infoGerais.xp.value >= 48000 && infoGerais.xp.value <= 63999) {
      proficiencia.value = 4;
      infoGerais.nivel.value = 9;
    } else if (infoGerais.xp.value >= 64000 && infoGerais.xp.value <= 84999) {
      proficiencia.value = 4;
      infoGerais.nivel.value = 10;
    } else if (infoGerais.xp.value >= 85000 && infoGerais.xp.value <= 99999) {
      proficiencia.value = 4;
      infoGerais.nivel.value = 11;
    } else if (infoGerais.xp.value >= 100000 && infoGerais.xp.value <= 119999) {
      proficiencia.value = 4;
      infoGerais.nivel.value = 12;
    } else if (infoGerais.xp.value >= 120000 && infoGerais.xp.value <= 139999) {
      proficiencia.value = 5;
      infoGerais.nivel.value = 13;
    } else if (infoGerais.xp.value >= 140000 && infoGerais.xp.value <= 164999) {
      proficiencia.value = 5;
      infoGerais.nivel.value = 14;
    } else if (infoGerais.xp.value >= 165000 && infoGerais.xp.value <= 194999) {
      proficiencia.value = 5;
      infoGerais.nivel.value = 15;
    } else if (infoGerais.xp.value >= 195000 && infoGerais.xp.value <= 224999) {
      proficiencia.value = 5;
      infoGerais.nivel.value = 16;
    } else if (infoGerais.xp.value >= 225000 && infoGerais.xp.value <= 264999) {
      proficiencia.value = 6;
      infoGerais.nivel.value = 17;
    } else if (infoGerais.xp.value >= 265000 && infoGerais.xp.value <= 304999) {
      proficiencia.value = 6;
      infoGerais.nivel.value = 18;
    } else if (infoGerais.xp.value >= 305000 && infoGerais.xp.value <= 354999) {
      proficiencia.value = 6;
      infoGerais.nivel.value = 19;
    } else {
      proficiencia.value = 6;
      infoGerais.nivel.value = 20;
    }
  }



  atualizaTestes();
});


const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
})