VisualizarSenha();


function VisualizarSenha() {
    var verSenha = document.querySelector('.senha');
    var icone = document.querySelector('.icone');

    if (verSenha.getAttribute('type') === 'password') {
        verSenha.setAttribute('type', 'text');
        icone.innerHTML = '<img src="images/semOlho.png" alt="Ocultar Senha">';
    } else {
        verSenha.setAttribute('type', 'password');
        icone.innerHTML = '<img src="images/olho.png" alt="Visualizar Senha">';
    }
}



