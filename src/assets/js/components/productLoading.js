export function productLoading() {
    const buttonMore = document.querySelector('.catalog__button--more')
    const productLength = document.querySelectorAll('.product').length
    let items = 6

    buttonMore.addEventListener('click', () => {
        items += 3
        const products = Array.from(document.querySelectorAll('.product'))
        const visibleItems = products.slice(0, items)
        visibleItems.forEach(item => item.style.display = 'block')
        if (visibleItems.length === productLength)
            buttonMore.style.display = 'none'
    })
}