const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
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

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    items.appendChild(fragment)
}