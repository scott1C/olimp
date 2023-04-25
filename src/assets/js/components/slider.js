import 'swiper/swiper-bundle.css';
import Swiper from 'swiper/swiper-bundle.js';

export function slider() {
    const swiperAbout = new Swiper('.about__slider', {
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
    })
}

export function initSlider(popups, index) {
    const popupThumbs = popups[index].querySelector('.popup__thumbs')
    const popupSlider = popups[index].querySelector('.popup__slider')
    const swiperThumbs = new Swiper(popupThumbs, {
        spaceBetween: 20,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    })

    const swiperPopup = new Swiper(popupSlider, {
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        thumbs: {
            swiper: swiperThumbs
        }
    })

    const thumbsItems = popups[index].querySelectorAll('.thumbs-popup__item')
    thumbsItems.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            swiperPopup.slideTo(index, 1000)
        })
    })
}