const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content
const fragment = document.createDocumentFragment()
let car = {}

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})
cards.addEventListener('click', d => {
    addToCar(d)
})
items.addEventListener('click', d => {
    btnIncreaseNDiminish(d) 
})

const fetchData = async () => {
    try{
        const res = await fetch('api.json')
        const data = await res.json()
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
    cards.appendChild(fragment)
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

    car[product.id] = {...product}
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
    drawFooter()
}

const drawFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(car).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Empty car</th>
        `
        return
    }
    
    const namount = Object.values(car).reduce((acc, { amount }) => acc + amount, 0)
    const nprice = Object.values(car).reduce((acc, {amount, price}) => acc + amount * price ,0)

    templateFooter.querySelectorAll('td')[0].textContent = namount
    templateFooter.querySelector('span').textContent = nprice

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        car = {}
        drawCar()
    })

}

const btnIncreaseNDiminish = d => {
    if (d.target.classList.contains('btn-info')) {
        const product = car[d.target.dataset.id]
        product.amount++
        car[d.target.dataset.id] = { ...product }
        drawCar()
    }

    if (d.target.classList.contains('btn-danger')) {
        const product = car[d.target.dataset.id]
        product.amount--
        if (product.amount === 0) {
            delete car[d.target.dataset.id]
        } else {
            car[d.target.dataset.id] = {...product}
        }
        drawCar()
    }
    d.stopPropagation()
}
