let iconCart = document.querySelector('.iconCart');
  let cart = document.querySelector('.cart');
  let container = document.querySelector('.container');
  let close = document.querySelector('.close');

    iconCart  .addEventListener('click', ()=> {
      if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
      }

      else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
      }
    })

    .close.addEventListener('click', ()=> {
      cart.style.right = '-100%';
      container.style.transform = 'translateX(0)';
    })

    let products = null;
    fetch('product.json')
    .then(response => response.json())
    .then(data => {
      products = data;
      addDataToHTML();
    })

    function addDataToHTML(){
      let listProductHTML = document.querySelector('.listProduct')
      listProductHTML.innerHTML = '';

      if(products != null){
          products.array.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('food-items');
            newProduct.innerHTML =
            '<img src="${product.image}"> <div class="details"> <div class="details-sub"> <h5>${product.name}</h5> <h5 class="price">$${product.price}</h5> </div> <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit reiciendis nam non quia! Earum eveniet minus. Facilis explicabo natus nihil voluptatem eveniet pariatur.</p> <button onclick="addCart(${product.id})">Add To Cart</button> </div>'
            listProductHTML.appendChild(newProduct);
          });
      }
    }
    let listCart = [];
    function checkCart (){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
    }
    checkCart();
    function addCart($idProduct){
        let productCopy = JSON.parse(JSON.stringify(products));
        if(!listCart[$idProduct]){
            let dataProduct = productCopy.filter(
                product => product.id == $idProduct
            )[0];

            listCart[$idProduct] = dataProduct;
            listCart[$idProduct].quantity = 1;
        } else{
            listCart[$idProduct].quantity++;

        }
        let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC+8";
        document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+"; path=/;";
        addCartToHTML();
    }
    addCartToHTML();