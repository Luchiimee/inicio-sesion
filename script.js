document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const loginMessage = document.getElementById('login-message');

    // Selector actualizado para los videos de fondo
    const backgroundVideos = document.querySelectorAll('.login-container .background-video');
    let currentItemIndex = 0;

    function showCurrentVideo() {
        if (backgroundVideos.length === 0) return;

        // Oculta y pausa todos los videos
        backgroundVideos.forEach(video => {
            video.classList.remove('active');
            video.pause();
            video.currentTime = 0; // Reinicia el tiempo del video
        });

        // Muestra y reproduce el video actual
        const currentVideo = backgroundVideos[currentItemIndex];
        currentVideo.classList.add('active');
        currentVideo.play().catch(e => console.error("Error al reproducir video:", e));
    }

    function nextVideoInCarousel() {
        currentItemIndex = (currentItemIndex + 1) % backgroundVideos.length;
        showCurrentVideo();
    }

    // Inicializa el carrusel de videos
    if (backgroundVideos.length > 0) {
        showCurrentVideo(); // Muestra el primer video al cargar la página
        // Escucha el evento 'ended' de cada video para pasar al siguiente
        backgroundVideos.forEach(video => {
            video.addEventListener('ended', nextVideoInCarousel);
        });
    }

    // Lógica de Login (sin cambios)
    const CORRECT_USERNAME = 'admin'; // ¡CAMBIA ESTO!
    const CORRECT_PASSWORD = 'admin'; // ¡CAMBIA ESTO EN PRODUCCIÓN POR ALGO SEGURO!

    loginButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
            loginMessage.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
            loginMessage.style.color = '#28a745';
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'admin.html';
        } else {
            loginMessage.textContent = 'Usuario o contraseña incorrectos.';
            loginMessage.style.color = '#dc3545';
        }
    });

    usernameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            loginButton.click();
        }
    });

    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            loginButton.click();
        }
    });
});