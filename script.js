let currentMessage = 0;
let autoplay = false;
let autoplayInterval;
const messages = document.querySelectorAll('.message:not(.controls *)');
const totalMessages = messages.length;

// Crear flores flotantes
function createFloatingFlowers() {
    for (let i = 0; i < 15; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 100 + '%';
        flower.style.animationDelay = Math.random() * 6 + 's';
        flower.style.animationDuration = (Math.random() * 4 + 4) + 's';
        document.body.appendChild(flower);
    }
}

// Crear partículas brillantes
function createSparkles() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }, 300);
}

function showMessage(index) {
    messages.forEach(msg => msg.classList.remove('active'));
    messages[index].classList.add('active');
}

function nextMessage() {
    currentMessage = (currentMessage + 1) % totalMessages;
    showMessage(currentMessage);
}

function previousMessage() {
    currentMessage = (currentMessage - 1 + totalMessages) % totalMessages;
    showMessage(currentMessage);
}

function toggleAutoplay() {
    const btn = document.querySelector('.btn-auto');
    if (autoplay) {
        clearInterval(autoplayInterval);
        autoplay = false;
        btn.textContent = '▶️ Auto';
        btn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
    } else {
        autoplay = true;
        btn.textContent = '⏸️ Auto';
        btn.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        autoplayInterval = setInterval(nextMessage, 4000);
    }
}

// Efectos de teclado
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            e.preventDefault();
            nextMessage();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            previousMessage();
            break;
        case 'Enter':
            e.preventDefault();
            toggleAutoplay();
            break;
    }
});

// Efectos de click en cualquier parte
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn')) {
        // Crear efecto de ondas
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(241, 196, 15, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.clientX - 10) + 'px';
        ripple.style.top = (e.clientY - 10) + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1000';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Inicializar efectos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    createFloatingFlowers();
    createSparkles();

    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        const welcome = document.createElement('div');
        welcome.style.position = 'fixed';
        welcome.style.top = '20px';
        welcome.style.right = '20px';
        welcome.style.background = 'rgba(241, 196, 15, 0.9)';
        welcome.style.color = 'white';
        welcome.style.padding = '15px 20px';
        welcome.style.borderRadius = '10px';
        welcome.style.fontWeight = 'bold';
        welcome.style.zIndex = '1000';
        welcome.style.animation = 'fadeInUp 1s ease';
        welcome.textContent = '¡Usa las flechas o botones para navegar! 🌻';
        document.body.appendChild(welcome);
        
        setTimeout(() => {
            welcome.style.animation = 'fadeOut 1s ease forwards';
            setTimeout(() => welcome.remove(), 1000);
        }, 4000);
    }, 2000);
});