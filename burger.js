let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-700px)';
    }
    
    else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})

close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})


let products = null;

fetch('burger.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})


function addDataToHTML(){

    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';


    if(products != null)
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('food-items');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="${product.name}">
            <div class="details">
                <div class="details-sub">
                    <h5>${product.name}</h5>
                    <h5 class="price"> ₱${product.price} </h5>
                </div>
                <p>${product.description}</p>
                <button onclick="addCart(${product.id})">Add To Cart</button>
            </div>`

            listProductHTML.appendChild(newProduct);

        });
    }
}


let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split(';')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));

    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{

        listCart[$idProduct].quantity++;
    }
    let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart=" + JSON.stringify(listCart)+"; "+timeSave+"; path=/";
    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){

    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">₱${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }

    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();

    addCartToHTML();
    function addCartToHTML(){
        let listCartHTML = document.querySelector('.listCart');
        listCartHTML.innerHTML ='';

        let totalHTML = document.querySelector('.totalQUantity');
        let totalQuantity = 0;

        if(listCart){
            listCart.forEach(product => {
                let newCart = document.createElement('div');
                newCart.classList.add('food-items');
                newCart.innerHTML =
                `<img src="${product.image}">
                <div class="content">
                  <div class="name">${product.name}</div>
                  <div class="price">₱${product.price} /1 product</div>
                </div>
      
            <div class="quantity">
            <button onclick="changeQuantity(${product.id}, '-')">-</button>
                 <span class="value">${product.quantity}</span>
                 <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            })
        }
    }
    totalHTML.innerText = totalQuantity;


}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;

        case '-':
        listCart[$idProduct].quantity--;
        if(listCart[$idProduct].quantity <=0){
            delete listCart[$idProduct];
        }
        break;

    default:
        break;

    }
    let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart=" + JSON.stringify(listCart)+"; "+timeSave+"; path=/";

    addCartToHTML();
}