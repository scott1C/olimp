// import './assets/scss/style.scss'
import { menu } from './components/menu.js'
import { rangeSlider } from './components/rangeSlider.js'
import { filter } from './components/filter.js'
import { productLoading } from './components/productLoading.js'
import { slider } from './components/slider.js'
import { faq } from './components/faq.js'
import { quiz } from './components/quiz.js'
import { showPopup } from './components/popup.js'
import { cart } from './components/cart.js'
menu(document.querySelector('.menu__body'), document.querySelector('.menu__icon'))
rangeSlider(document.querySelector('#range-slider'))
filter()
productLoading()
slider()
showPopup()