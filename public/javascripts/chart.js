const displayFilter = document.querySelectorAll('.display_filter')
const dropdownThreeItems = document.querySelectorAll('.dropdown-three-item')
const dropdowntwoItems = document.querySelectorAll('.dropdown-two-item')
const dropdownOneItems = document.querySelectorAll('.dropdown-one-item')
const showButtonOne = document.querySelector('.show-button-one')
const showButtonTwo = document.querySelector('.show-button-two')
const showButtonThree = document.querySelector('.show-button-three')
const chartRows = document.querySelectorAll('.chart_row')
const noData = document.querySelector('.no-data')
const caption = document.querySelector('.caption')

for (dropdownOneItem of dropdownOneItems) {
    dropdownOneItem.addEventListener("click", (event) => {
        for (i = 0; i < chartRows.length; i++) {
            chartRows[i].style.display = ""
        }
        showButtonOne.innerText = event.path[0].innerHTML;
        for (i = 0; i < chartRows.length; i++) {
            if (showButtonTwo.innerText != 'All Months') {
                showButtonTwo.innerText = 'All Months'
            }
            if (chartRows[i].innerText.substring(7, 11) != showButtonOne.innerText.substring(0, 9) &&
                showButtonOne.innerText.substring(0, 9) != 'All Years') {
                chartRows[i].style.display = "none";
            }
        }
    })
}


for (dropdowntwoItem of dropdowntwoItems) {
    dropdowntwoItem.addEventListener("click", (event) => {
        let counter = 0;
        for (i = 0; i < chartRows.length; i++) {
            chartRows[i].style.display = ""
        }

        showButtonTwo.innerText = event.path[0].innerHTML;
        // let counter = 0;
        for (i = 0; i < chartRows.length; i++) {
            if (showButtonOne.innerText != 'All Years') {
                showButtonOne.innerText = 'All Years'
            }
            if (chartRows[i].innerText.substring(0, 3) != showButtonTwo.innerText.substring(0, 3) &&
                showButtonTwo.innerText != 'All Months') {
                chartRows[i].style.display = "none"
                showButtonOne.innerText = 'All Years'
                counter++;
            }
        }
        if (counter == chartRows.length) {
            noData.style.display = ""
            caption.style.display = "none"
        }
    })
}

for (dropdownThreeItem of dropdownThreeItems) {
    dropdownThreeItem.addEventListener("click", (event) => {
        for (i = 0; i < chartRows.length; i++) {
            chartRows[i].style.display = ""
        }
        showButtonThree.innerText = event.path[0].innerText;
        for (i = 0; i < chartRows.length; i++) {
            // if (showButtonTwo.innerText != 'All Tags') {
            //     showButtonTwo.innerText = 'All Tags'
            // }
            if (chartRows[i].innerText.substring(12) != showButtonThree.innerText &&
                showButtonThree.innerText != 'All Tags') {
                chartRows[i].style.display = "none";
            }
        }
    })
}

