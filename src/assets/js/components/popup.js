import 'swiper/swiper-bundle.css';
import Swiper from 'swiper/swiper-bundle.js';
import { initSlider } from './slider';

const popups = document.querySelectorAll('.popup')
const popupButton = document.querySelectorAll('.product__button--info')
let popupOpen = null
const initialized = Array.from(popups.length).fill(0)


export function showPopup() {
    popupButton.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            popupOpen = popups[index]
            popupOpen.classList.add('popup--open')
            document.body.classList.add('page__body--lock')

            if (!initialized[index]) {
                initSlider(popups, index)
                initialized[index] = 1
            }
        })
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            if (popupOpen !== null) {
                popupOpen.classList.remove('popup--open')
                document.body.classList.remove('page__body--lock')
            }
        }
    })

    document.body.addEventListener('click', (e) => {
        if (popupOpen) {
            if (!popupOpen.querySelector('.popup__content').contains(e.target) && !e.target.closest('.product__button')) {
                popupOpen.classList.remove('popup--open')
                document.body.classList.remove('page__body--lock')
            }
        }
    })
}