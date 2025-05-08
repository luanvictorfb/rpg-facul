let forca = document.querySelector('.forca');
let destreza = document.querySelector('.destreza');
let constituicao = document.querySelector('.constituicao');
let inteligencia = document.querySelector('.inteligencia');
let sabedoria = document.querySelector('.sabedoria');


((atributo - 10)/2)














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