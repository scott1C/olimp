const quizData = [
    {
        number: 1,
        title: 'Какой тип кроссовок рассматриваете?',
        answers: [
            {
                type: "checkbox-image",
                answer_title: "кеды",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            },
            {
                type: "checkbox-image",
                answer_title: "кеды",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            },
            {
                type: "checkbox-image",
                answer_title: "кеды",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            },
            {
                type: "checkbox-image",
                answer_title: "кеды",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            },
            {
                type: "checkbox-image",
                answer_title: "кеды",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            },
            {
                type: "checkbox-image",
                answer_title: "кеды",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            }
        ]
    },
    {
        number: 2,
        title: 'Какой размер вам подойдет?',
        answers: [
            {
                type: "checkbox-image",
                answer_title: "менее 36",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            },
            {
                type: "checkbox-image",
                answer_title: "36-38",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            },
            {
                type: "checkbox-image",
                answer_title: "39-41",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            },
            {
                type: "checkbox-image",
                answer_title: "42-44",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            },
            {
                type: "checkbox-image",
                answer_title: "45 и больше",
                image_direction: "01.6e1c6bd5.png",
                image_description: "Image with sneakers"
            }
        ]
    },
    {
        number: 3,
        title: 'Уточните какие-либо моменты',
        answers: [
            {
                type: "textarea",
                answer_title: "Введите сообщение",
            }
        ]
    },
]

const quizTemplate = (data = [], dataLength = 0, options) => {
    const { number, title } = data
    const { nextBtnText } = options
    const answers = data.answers.map(item => {
        if (item.type === "checkbox-image") {
            return `
                <li class="form-quiz__item">
                    <img class="form-quiz__image form-quiz__image--1" src=${item.image_direction}
                    alt=${item.image_description}>
                    <label class="form-quiz__label form-quiz__label--1 custom-checkbox">
                        <input class="form-quiz__answer custom-checkbox__field" type="checkbox">
                        <span class="form-quiz__content custom-checkbox__content">${item.answer_title}</span>
                    </label>
                </li>
            `
        }
        else if (item.type === "textarea") {
            return `
                <label class="form-quiz__label">
                    <textarea class="form-quiz__textarea"
                        placeholder="${item.answer_title}"></textarea>
                </label>
            `
        }
    })
    return `
        <div class="form-quiz__inner">
        <h4 class="form-quiz__title">${title}</h4>
            <ul class="form-quiz__list">
                ${answers.join('')}
            </ul>
        </div>
        <div class="form-quiz__bottom">
            <div class="form-quiz__number">${number} из ${dataLength}</div>
            <button class="form-quiz__button form-quiz__button--next">${nextBtnText}</button>
        </div>
    `
}

class Quiz {
    constructor(selector, data, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.data = data
        this.counter = 0
        this.dataLength = this.data.length
        this.init()
        this.events()
    }

    init() {
        this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options)
    }

    nextQuestion() {
        if (this.valid()) {
            if (this.counter + 1 < this.dataLength) {
                this.counter++
                this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options)
                document.querySelector('.form-quiz__questions').style.display = 'block'
                document.querySelector('.form-quiz__last-question').style.display = 'none'
            } else {
                document.querySelector('.form-quiz__questions').style.display = 'none'
                document.querySelector('.form-quiz__last-question').style.display = 'flex'
                document.querySelector('.quiz__title').textContent = 'Ваша подборка готова!'
                document.querySelector('.quiz__descr').textContent = 'Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог'
                document.querySelector('.quiz__title').style.margin = '40px 0 26px'
                document.querySelector('.quiz__descr').style.marginBottom = '24px'
            }
        }
    }

    valid() {
        const inputs = this.$el.querySelectorAll('input')
        const textarea = this.$el.querySelector('.form-quiz__textarea')
        let isValid = false

        if (inputs.length === 0 && textarea === null)
            return true

        if (textarea) {
            if (textarea.value.trim().length > 0) {
                isValid = true
                return isValid
            }
        }

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                isValid = true
                break
            }
        }

        if (!isValid) {
            inputs.forEach(input => {
                input.classList.add('custom-checkbox__field--error')
            })
        }
        return isValid
    }

    events() {
        this.$el.addEventListener('click', (e) => {
            if (e.target === document.querySelector('.form-quiz__button--next')) {
                e.preventDefault()
                this.nextQuestion()
            }
        })
        document.querySelector('.last-question__button').addEventListener('click', (e) => {
            e.preventDefault()
            alert('Your answer was sent')
            this.counter = -1
            this.nextQuestion()
        })
    }
}

const quiz = new Quiz('.form-quiz__questions', quizData, {
    nextBtnText: 'Следующий шаг',
    sendBtnText: 'Отправить'
})