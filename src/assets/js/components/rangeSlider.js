import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export function rangeSlider(rangeSlider) {
    if (rangeSlider) {
        noUiSlider.create(rangeSlider, {
            start: [1850, 25768],
            connect: true,
            step: 1,
            range: {
                'min': [1850],
                'max': [25768]
            }
        });

        const input0 = document.querySelector('.catalog-price__input--1');
        const input1 = document.querySelector('.catalog-price__input--2');
        const inputs = [input0, input1];

        rangeSlider.noUiSlider.on('update', (values, handle) => {
            inputs[handle].value = Math.round(values[handle]);
        });

        const setRangeSlider = (i, value) => {
            let arr = [null, null];
            arr[i] = value;

            rangeSlider.noUiSlider.set(arr);
        };

        inputs.forEach((el, index) => {
            el.addEventListener('change', (e) => {
                setRangeSlider(index, e.currentTarget.value);
            });
        });
    }
}