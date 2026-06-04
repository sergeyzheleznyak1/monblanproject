const DatepickerType = {
    FROM: "from",
    TO: "to",
};

export const initDatepickers = () => {
    const fromInput = document.querySelector(`[data-datepicker="${DatepickerType.FROM}"]`);
    const toInput = document.querySelector(`[data-datepicker="${DatepickerType.TO}"]`);

    if (!fromInput || !toInput || typeof window.flatpickr !== "function") {
        return;
    }

    const commonOptions = {
        allowInput: true,
        dateFormat: "d-m-Y",
        disableMobile: true,
        monthSelectorType: "static",
    };

    const toDatepicker = window.flatpickr(toInput, {
        ...commonOptions,
        onChange: ([selectedDate]) => {
            fromDatepicker.set("maxDate", selectedDate || null);
        },
    });

    const fromDatepicker = window.flatpickr(fromInput, {
        ...commonOptions,
        onChange: ([selectedDate]) => {
            toDatepicker.set("minDate", selectedDate || null);
        },
    });
};
