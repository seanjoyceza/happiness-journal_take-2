const asc_button = document.querySelector('#ascend')
const des_button = document.querySelector('#descend')
const list = document.querySelector('.list')

if (asc_button) {
    asc_button.addEventListener('change', (event) => {
        sortingAscDate()
    });

    des_button.addEventListener('change', (event) => {
        sortingDesDate()
    });
}



function sortingAscDate() {
    // Select container with all entries
    let container = list;
    // Returns HTMLCollection that contains all child elements
    let divCard = container.children;

    // Convert selected HTML elements into array using slice
    divCard = Array.prototype.slice.call(divCard);
    // Sort this new array using .sort
    divCard.sort(function (a, b) {
        if (a.children[0].children[0].children[1] < b.children[0].children[0].children[1]) {
            return -1;
        } else {
            return 1;
        }
    })

    // Append array into container 
    for (let i = 0, l = divCard.length; i < l; i++) {
        container.appendChild(divCard[i]);
    }
    return container;
}

function sortingDesDate() {
    let container = list;
    let divCard = container.children;

    divCard = Array.prototype.slice.call(divCard);
    divCard.sort(function (a, b) {
        if (a.children[0].children[0].children[1] > b.children[0].children[0].children[1]) {
            return -1;
        } else {
            return 1;
        }
    })

    for (let i = 0, l = divCard.length; i < l; i++) {
        container.appendChild(divCard[i]);
    }
    return container;
}




// function sortingAscAlpha() {
//     let container = list;
//     let divCard = container.children;

//     divCard = Array.prototype.slice.call(divCard);
//     divCard.sort(function (a, b) {
//         if (a.childNodes[1].childNodes[1].childNodes[3].innerText > b.childNodes[1].childNodes[1].childNodes[3].innerText) {
//             return -1;
//         } else {
//             return 1;
//         }
//     })

//     for (let i = 0, l = divCard.length; i < l; i++) {
//         container.appendChild(divCard[i]);
//     }
//     return container;
// }

// function sortingDesAlpha() {
//     let container = list;
//     let divCard = container.children;

//     divCard = Array.prototype.slice.call(divCard);
//     divCard.sort(function (a, b) {
//         if (a.childNodes[1].childNodes[1].childNodes[3].innerText < b.childNodes[1].childNodes[1].childNodes[3].innerText) {
//             return -1;
//         } else {
//             return 1;
//         }
//     })

//     for (let i = 0, l = divCard.length; i < l; i++) {
//         container.appendChild(divCard[i]);
//     }
//     return container;
// }