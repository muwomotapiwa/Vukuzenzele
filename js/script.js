// Toggle mobile menu
function toggleMenu() {
    document.getElementById('menu').classList.toggle('show');
}

function closeMenu() {
    document.getElementById('menu').classList.remove('show');
}

// Language switcher
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}