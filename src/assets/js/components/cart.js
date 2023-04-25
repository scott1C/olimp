import { orderProductsFaq, isOpenedProductsFaq } from "./faq"

const cartList = document.querySelector('.menu-products__list')
const cartNumber = document.querySelector('.menu-cart__number')
const productButtons = document.querySelectorAll('.product__button--buy')
const buttonNext = document.querySelector('.menu-products__button-next')
const finalPriceText = document.querySelector('.menu-products__final-price')
const menuCart = document.querySelector('.menu-cart')
const menuOrdering = document.querySelector('.menu-ordering')
const menuOrderingId = document.querySelector('.menu-ordering__id')
const menuOrderingProductsNumber = document.querySelector('.menu-ordering__number-products')
const menuOrderingProductsPrice = document.querySelector('.menu-ordering__number-price')
const menuOrderingButton = document.querySelector('.menu-ordering__button')
let products = []
let totalPrice = 0
let open = false

if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'))
}

if (products.length) {
    buttonNext.disabled = false
}

products.forEach(product => {
    const html = `
        <li class="menu-products__item" data-id="${product.id}">
            <img class="menu-products__image" src=${product.src} alt="" aria-hidden="true">
            <div class="menu-products__text">
                <p class="menu-products__title">${product.title}</p>
                <strong class="menu-products__price">${product.price} ₽</strong>
            </div>
            <button class="menu-products__button-delete" type="button"></button>
        </li> 
    `
    totalPrice += Number(product.price)
    cartList.insertAdjacentHTML('beforeend', html)
})

cartNumber.textContent = products.length
finalPriceText.textContent = totalPrice + ' ₽'

menuCart.addEventListener('click', showCart)
menuCart.addEventListener('click', deleteProduct)
buttonNext.addEventListener('click', showMenuOrder)
menuOrdering.addEventListener('click', deleteOrderProduct)
menuOrderingButton.addEventListener('click', orderProducts)
document.addEventListener('click', hideCartOnClick)
document.addEventListener('click', hideOrderOnClick)
document.addEventListener('keydown', hideCartOnEsc)
document.addEventListener('keydown', hideOrderOnEsc)

productButtons.forEach(productButton => {
    productButton.addEventListener('click', (e) => {
        const productBox = e.currentTarget.closest('.product')
        const imageSRC = productBox.querySelector('.product__image img').getAttribute('src')
        const title = productBox.dataset.title
        const price = productBox.dataset.price
        const cartNumberValue = Number(cartNumber.textContent)
        cartNumber.textContent = cartNumberValue + 1
        updateArray(imageSRC, title, price)
        isOpenedProductsFaq()
        saveToLocalStorage()
    })
})

const updateArray = (src, title, price) => {
    const obj = {
        src,
        title,
        price,
        id: Date.now()
    }
    totalPrice += Number(price)
    renderProduct(obj, totalPrice)
    products.push(obj)
}

const renderProduct = ({ src, title, price, id }, totalPrice) => {
    const html = `
        <li class="menu-products__item" data-id="${id}">
            <img class="menu-products__image" src=${src} alt="" aria-hidden="true">
            <div class="menu-products__text">
                <p class="menu-products__title">${title}</p>
                <strong class="menu-products__price">${price} ₽</strong>
            </div>
            <button class="menu-products__button-delete" type="button"></button>
        </li> 
    `
    finalPriceText.textContent = totalPrice + ' ₽'
    cartList.insertAdjacentHTML('beforeend', html)
    buttonNext.disabled = false
    menuOrderingButton.disabled = false
}

function showCart(e) {
    if (!open) {
        e.preventDefault()
        menuCart.querySelector('.menu-products').classList.add('menu-products--open')
        document.body.classList.add('page__body--lock')
    }
}

function hideCartOnClick(e) {
    if (!menuCart.querySelector('.menu-products__body').contains(e.target)
        && !e.target.closest('.menu-cart__content')
        && !e.target.classList.contains('menu-products__button-delete')
        && !open) {
        menuCart.querySelector('.menu-products').classList.remove('menu-products--open')
        document.body.classList.remove('page__body--lock')
    }
}

function hideCartOnEsc(e) {
    if (e.code === 'Escape' && !open) {
        menuCart.querySelector('.menu-products').classList.remove('menu-products--open')
        document.body.classList.remove('page__body--lock')
    }
}

function deleteProduct(e) {
    if (!e.target.classList.contains('menu-products__button-delete')) return
    const parentNode = e.target.closest('.menu-products__item')
    deleteFromArray(parentNode)
}


function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products))
    if (!products.length) buttonNext.disabled = true
}

function deleteFromArray(parentNode) {
    const id = Number(parentNode.dataset.id)
    const index = products.findIndex(product => product.id === id)
    products.splice(index, 1)
    parentNode.remove()
    totalPrice = 0
    products.forEach(product => {
        totalPrice += Number(product.price)
    })
    finalPriceText.textContent = totalPrice + ' ₽'
    cartNumber.textContent = products.length
    saveToLocalStorage()
}

// Working with Ordering Menu
function showMenuOrder(e) {
    menuCart.querySelector('.menu-products').classList.remove('menu-products--open')
    menuOrdering.style.display = 'block'
    menuOrderingId.textContent = Math.floor(Math.random() * 1000000)
    menuOrderingProductsNumber.textContent = products.length + '  шт'
    menuOrderingProductsPrice.textContent = totalPrice + ' ₽'
    menuOrderRender()
}

function menuOrderRender() {
    const menuOrderingList = document.querySelector('.menu-ordering__list')
    open = true
    menuOrderingList.innerHTML = ''

    products.forEach(product => {
        const cls = `
            <li class="menu-ordering__item" data-id="${product.id}">
                <img class="menu-ordering__image"
                src=${product.src} alt=""
                aria-hidden="true">
                <div class="menu-ordering__item-info">
                    <p class="menu-ordering__item-title">
                        ${product.title}
                    </p>
                    <strong class="menu-ordering__number">
                        ${product.price} ₽
                    </strong>
                </div>
                <button class="menu-ordering__delete-btn">Удалить</button>
            </li>
        `
        menuOrderingList.insertAdjacentHTML('beforeend', cls)
    })
}

function deleteOrderProduct(e) {
    if (!e.target.classList.contains('menu-ordering__delete-btn')) return
    const parentNode = e.target.closest('.menu-ordering__item')
    const item = document.querySelector(`.menu-products__item[data-id="${parentNode.dataset.id}"]`)
    item.remove()
    deleteFromArray(parentNode)
    menuOrderingProductsNumber.textContent = products.length + '  шт'
    menuOrderingProductsPrice.textContent = totalPrice + ' ₽'
    if (!products.length) menuOrderingButton.disabled = true
}

function orderProducts() {
    alert('It\'s grind season, Homie!')
    open = false
    menuOrdering.style.display = 'none'
    document.body.classList.remove('page__body--lock')
    products = []
    totalPrice = 0
    cartNumber.textContent = 0
    finalPriceText.textContent = totalPrice + ' ₽'
    cartList.innerHTML = ''
    saveToLocalStorage()
}

function hideOrderOnClick(e) {
    if (!e.target.closest('.menu-ordering__inner')
        && !e.target.classList.contains('menu-ordering__button')
        && !e.target.classList.contains('menu-products__button-next')
        && !e.target.classList.contains('menu-ordering__delete-btn')
        && open) {
        open = false
        menuOrdering.style.display = 'none'
        document.body.classList.remove('page__body--lock')
    }
}

function hideOrderOnEsc(e) {
    if (e.code === 'Escape' && open) {
        open = false
        menuOrdering.style.display = 'none'
        document.body.classList.remove('page__body--lock')
    }
}

orderProductsFaq()