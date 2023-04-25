const list = document.querySelectorAll('.faq__item')
list.forEach(el => {
    el.addEventListener('click', (e) => {
        const self = e.currentTarget
        const button = self.querySelector('.faq__button')
        const content = self.querySelector('.faq__content')

        self.classList.toggle('faq__list--open')

        if (self.classList.contains('faq__list--open')) {
            button.setAttribute('aria-expanded', true)
            content.setAttribute('aria-hidden', false)
            content.style.maxHeight = content.scrollHeight + 'px'
        }
        else {
            button.setAttribute('aria-expanded', false)
            content.setAttribute('aria-hidden', true)
            content.style.maxHeight = null
        }
    })
})


// For Order Products Menu
export function orderProductsFaq() {
    const expandButton = document.querySelector('.menu-ordering__expand')
    const orderContent = document.querySelector('.menu-ordering__list')

    expandButton.addEventListener('click', () => {
        orderContent.classList.toggle('menu-ordering__list--open')
        expandButton.classList.toggle('menu-ordering__expand--open')

        if (orderContent.classList.contains('menu-ordering__list--open')) {
            expandButton.setAttribute('aria-expanded', true)
            orderContent.setAttribute('aria-hidden', false)
            orderContent.style.maxHeight = orderContent.scrollHeight + 'px'
        } else {
            expandButton.setAttribute('aria-expanded', false)
            orderContent.setAttribute('aria-hidden', true)
            orderContent.style.maxHeight = null
        }
    })
}

export function isOpenedProductsFaq() {
    const expandButton = document.querySelector('.menu-ordering__expand')
    const orderContent = document.querySelector('.menu-ordering__list')

    if (expandButton.classList.contains('menu-ordering__expand--open')
        && orderContent.classList.contains('menu-ordering__list--open')) {
        expandButton.classList.remove('menu-ordering__expand--open')
        orderContent.classList.remove('menu-ordering__list--open')
        expandButton.setAttribute('aria-expanded', false)
        orderContent.setAttribute('aria-hidden', true)
        orderContent.style.maxHeight = null
    }
}