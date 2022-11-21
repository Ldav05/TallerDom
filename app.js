const cards = document.getElementById('cards')
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
let car = {}

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})
items.addEventListener('clicl', d => {
    addToCar(d)
})

const fetchData = async () => {
    try{
        const res = await fetch('api.json')
        const data = await res.json()
       console.log(data)
        Cards(data)
    } catch(e){ 
        console.log(e)
    }
}

const Cards = data => {
    data.forEach(element => {
        templateCard.querySelector('h5').textContent = element.name
        templateCard.querySelector('p').textContent = element.price
        templateCard.querySelector('img').setAttribute("src", element.img)
        templateCard.querySelector('.btn-dark').dataset.id = element.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    items.appendChild(fragment)
}

const addToCar = d => {
    if (d.target.classList.contains('btn-dark')) {
       setCar(d.target.parentElement)
    
    }
    d.stopPropagation()
}

const setCar = object => {
    const product = {
        id: object.querySelector('.btn-dark').dataset.id,
        name: object.querySelector('h5').textContent,
        price: object.querySelector('p').textContent,
        amount: 1
    }
    
    if(car.hasOwnProperty(product.id)){
        product.amount = car[product.id].amount + 1
    }
    drawCar()
}
const drawCar = () => {
    items.innerHTML = ''
    Object.values(car).forEach(product => {
        templateCarrito.querySelector('th').textContent = product.id
        templateCarrito.querySelectorAll('td')[0].textContent = product.name
        templateCarrito.querySelectorAll('td')[1].textContent = product.amount
        templateCarrito.querySelector('.btn-info').dataset.id = product.id 
        templateCarrito.querySelector('.btn-danger').dataset.id = product.id 
        templateCarrito.querySelector('span').textContent = product.amount * product.price

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    });
    items.appendChild(fragment)
}