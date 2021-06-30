const datePicker = document.querySelector('.date-picker')
const dateString = document.querySelector('.date-string')

if (datePicker) {
    datePicker.addEventListener('change', event => {
        const selectedDate = datePicker.value;
        const year = selectedDate.substr(0, 4)
        const month = selectedDate.substr(5, 2)
        const day = selectedDate.substr(8, 2)
        const str1 = `${day}/${month}/${year}`;
        const dt1 = parseInt(str1.substring(0, 2));
        const mon1 = parseInt(str1.substring(3, 5));
        const yr1 = parseInt(str1.substring(6, 10));
        const date1 = new Date(yr1, mon1 - 1, dt1).toDateString();
        dateString.value = date1;
    })
}


