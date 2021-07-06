const displayFilter = document.querySelectorAll('.display_filter')
const dropdowntwoItems = document.querySelectorAll('.dropdown-two-item')
const dropdownOneItems = document.querySelectorAll('.dropdown-one-item')
const showButtonOne = document.querySelector('.show-button-one')
const showButtonTwo = document.querySelector('.show-button-two')
const chartRows = document.querySelectorAll('.chart_row')
const noData = document.querySelector('.no-data')
const caption = document.querySelector('.caption')

for (dropdownOneItem of dropdownOneItems) {
    dropdownOneItem.addEventListener("click", (event) => {
        showButtonOne.innerHTML = event.path[0].innerHTML;
        let counter = 0;
        for (i = 0; i < chartRows.length; i++) {
            chartRows[i].removeAttribute('hidden')
            if (chartRows[i].innerText.substring(7, 11) != showButtonOne.innerHTML) {
                chartRows[i].setAttribute('hidden', '')
                counter++;
            }
            if (showButtonOne.innerHTML == 'All Years') {
                chartRows[i].removeAttribute('hidden')
            }
            if (counter == 0) {
                noData.setAttribute('hidden', '')
            }
        }
    })
}


for (dropdowntwoItem of dropdowntwoItems) {
    dropdowntwoItem.addEventListener("click", (event) => {
        showButtonTwo.innerHTML = event.path[0].innerHTML;
        let counter = 0;
        for (i = 0; i < chartRows.length; i++) {
            chartRows[i].removeAttribute('hidden')
            if (chartRows[i].innerText.substring(0, 3) != showButtonTwo.innerHTML.substring(0, 3)) {
                chartRows[i].setAttribute('hidden', '')
                counter++;
            }
            if (showButtonTwo.innerHTML.substring(0, 10) == 'All Months') {
                chartRows[i].removeAttribute('hidden')
            }
            if (counter == chartRows.length && showButtonTwo.innerHTML.substring(0, 10) !== 'All Months') {
                noData.removeAttribute('hidden')
                caption.setAttribute('hidden', '')
            } else {
                noData.setAttribute('hidden', '')
                caption.removeAttribute('hidden')
            }
        }
    })
}