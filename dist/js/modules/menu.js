function menu() {
    const
        hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.nav__menu'),
        menuLinks = document.querySelectorAll('.nav__menu-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('nav__menu_active');

        if (menu.classList.contains('nav__menu_active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('hamburger_active');
            menu.classList.remove('nav__menu_active');
        });
    });
}

export default menu;