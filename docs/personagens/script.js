document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });

    // 2. Da esquerda para a direita: converte para JSON, cria um Blob a partir da string JSON, cria uma URL para esse Blob
    //O "null, 2" é para identar o json criado
    const url = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' }));

    // 3. Cria dinamicamente um link <a> com download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ficha.json';  // nome do arquivo que será baixado
    document.body.appendChild(a);     // precisa estar no DOM para funcionar no Firefox
    a.click();                        // dispara o download
    document.body.removeChild(a);     // limpa o elemento
    URL.revokeObjectURL(url);         // libera memória
});

const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', ()=>{
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
})