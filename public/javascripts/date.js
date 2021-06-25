const datePicker = document.querySelector('.date-picker')
const dateString = document.querySelector('.date-string')

datePicker.addEventListener('change', event => {
    const selectedDate = datePicker.value;
    console.log(selectedDate)
    // const year = selectedDate.substr(0, 4)
    // console.log(year)
    const month = selectedDate.substr(5, 7)
    console.log(month)
    // const day = selectedDate.substr(0, 4)
    // console.log(day)
    const str1 = '12/12/2021';
    // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    const dt1 = parseInt(str1.substring(0, 2));
    const mon1 = parseInt(str1.substring(3, 5));
    const yr1 = parseInt(str1.substring(6, 10));
    const date1 = new Date(yr1, mon1 - 1, dt1).toDateString();
    console.log(date1)
})

