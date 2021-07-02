const element1 = document.querySelector('.isActive1')
const element2 = document.querySelector('.isActive2')
const element3 = document.querySelector('.isActive3')

if (element1 || element2 || element3) {
    element1.addEventListener("click", event => {
        console.log(event)
        element1.classList.add('active')
        element2.classList.remove('active')
        element3.classList.remove('active')
    })

    element2.addEventListener("click", event => {
        element1.classList.remove('active')
        element2.classList.add('active')
        element3.classList.remove('active')
    })

    element3.addEventListener("click", event => {
        element1.classList.remove('active')
        element2.classList.remove('active')
        element3.classList.add('active')
    })
}


