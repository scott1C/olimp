export function filter() {
    const sizeFilters = document.querySelectorAll('.catalog-sizes__input')
    const sexFilters = document.querySelectorAll('.custom-checkbox__field')
    const rangeSlider = document.querySelector('#range-slider')
    const applyButton = document.querySelector('.catalog__button-apply')
    const buttonReset = document.querySelector('.catalog__button-reset')
    const maxPrice = document.querySelector('.noUi-handle-upper')
    const minPrice = document.querySelector('.noUi-handle-lower')
    const buttonMore = document.querySelector('.catalog__button--more')

    const filters = {
        price: {
            min: Number(minPrice.getAttribute('aria-valuetext')),
            max: Number(maxPrice.getAttribute('aria-valuetext'))
        },
        sexes: [],
        sizes: []
    }

    sizeFilters.forEach(sizeFilter => {
        sizeFilter.addEventListener('change', sizeFiltersUpdate)
    })

    sexFilters.forEach(sexFilter => {
        sexFilter.addEventListener('change', sexFiltersUpdate)
    })

    rangeSlider.noUiSlider.on('end', () => priceUpdate())
    rangeSlider.noUiSlider.on('set', () => priceUpdate())

    applyButton.addEventListener('click', applyFilters)

    buttonReset.addEventListener('click', () => {
        Array.from(sizeFilters).forEach(sizeFilter => {
            sizeFilter.checked = false
        })
        Array.from(sexFilters).forEach(sexFilter => {
            sexFilter.checked = false
        })
        rangeSlider.noUiSlider.reset()
        filters.sexes.splice(0)
        filters.sizes.splice(0)
    })

    function priceUpdate() {
        filters.price.min = Number(minPrice.getAttribute('aria-valuetext'))
        filters.price.max = Number(maxPrice.getAttribute('aria-valuetext'))
    }

    function sexFiltersUpdate() {
        filters.sexes = Array.from(sexFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value)
    }

    function sizeFiltersUpdate() {
        filters.sizes = Array.from(sizeFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value)
    }

    function applyFilters() {
        const products = document.querySelectorAll('.product')
        products.forEach(product => {
            const price = Number(product.dataset.price)
            const size = product.dataset.size
            const sex = product.dataset.sex
            const isSizeSelected = filters.sizes.includes(size)
            const isSexSelected = filters.sexes.includes(sex)

            if (price <= filters.price.max
                && price >= filters.price.min
                && (filters.sizes.length === 0 || isSizeSelected)
                && (filters.sexes.length === 0 || isSexSelected)) {
                product.style.display = 'block'
            } else {
                product.style.display = 'none'
            }
        })
        if (buttonMore) {
            buttonMore.style.display = 'none'
        }
    }
}