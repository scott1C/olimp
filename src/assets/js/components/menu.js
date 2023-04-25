export function menu(menuBody, menuIcon) {
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            document.body.classList.toggle('page__body--lock')
            menuBody.classList.toggle('menu__body--active')
            menuIcon.classList.toggle('menu__icon--active')
        })
    }
}