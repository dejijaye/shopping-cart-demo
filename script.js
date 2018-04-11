// Shopping cart initialized with some items in it.
var shoppingCart = [{
    id: "4",
    inCart: "true",
    name: "ASSASSIN'S CREED: DIRECTOR'S CUT",
    owned: "false",
    price: "9.99"
}, {
    id: "2",
    inCart: "true",
    name: "THE SETTLER'S: GOLD EDITION",
    owned: "false",
    price: "5.99"
}];

function addToCart(event) {
    event.preventDefault();
    var productDetail = this.dataset
    if(productDetail.inCart === 'false') {
        shoppingCart.push(productDetail);
        this.dataset.inCart = 'true';
        this.textContent = 'IN CART';
        this.classList.add('btn-disable');
        this.previousElementSibling.classList.add('hide'); 
    }
    
    updateCart();
}

function removeFromCart(event) {
    event.preventDefault();
    var self = this;
    var indexToDelete;
    var itemToDelete
    shoppingCart.forEach(function(item) {
        if(self.dataset.id === item.id) {
            indexToDelete = shoppingCart.indexOf(item);
            itemToDelete = item
        }
    });

    shoppingCart.splice(indexToDelete, 1);
    updateCart();
    resetButton(itemToDelete.id);

}


document.addEventListener('DOMContentLoaded', function() {
    // register event handlers
    for(var i = 0; i < document.querySelectorAll('.btn-add').length; i++) {
        document.querySelectorAll('.btn-add')[i].addEventListener('click', addToCart);
    }
    
    for(var i = 0; i < document.querySelectorAll('.remove').length; i++) {
        document.querySelectorAll('.remove')[i].addEventListener('click', removeFromCart);
    }

    document.querySelector('.clear-cart').addEventListener('click', clearCart);

})



function updateCart() {

    if(shoppingCart.length > 0) {
        var totalAmount = shoppingCart.reduce(function (a,b) { return a + Number(b.price); }, 0);
    
        var totalItems = shoppingCart.length;
        document.querySelector('.total-item').innerHTML = totalItems;
        var holderHTML = `<div class="product cart-info"><span class="cart-summary">${formatText(totalItems)} 
                        <div class="cart-right" style="float: right;"><span class="cart-total">$${totalAmount} 
                        </span><button class="btn btn-clear clear-cart">CLEAR CART</button></div></div>`;
        
        shoppingCart.forEach(function(product) {

            holderHTML += `<div class="product"><img src="img/img${product.id}.png" alt=""><span class="product-title">${product.name} 
                    </span><span class="product-price">$${product.price} 
                    </span><a href="#"><span class="remove" data-id="${product.id}">Remove</span></a></div>`;
        });
        document.querySelector('.dropdown-content').innerHTML = holderHTML;
        document.querySelector('.clear-cart').addEventListener('click', clearCart);

        // register event handler on newly created buttons
        for(var i = 0; i < document.querySelectorAll('.remove').length ; i++) {
            document.querySelectorAll('.remove')[i].addEventListener('click', removeFromCart);
        }

    } else {
        var totalAmount = 0;
        var totalItems = shoppingCart.length;
        document.querySelector('.total-item').innerHTML = totalItems;
        var holderHTML = `<div class="product cart-info"><span class="cart-summary">${formatText(totalItems)}</span></div>`;
        
        document.querySelector('.dropdown-content').innerHTML = holderHTML;
        document.querySelector('.cart-summary').style.top = 0;
    }

}

function formatText(n) {
    return  `${n} ITEM(S) IN CART`; 
}

function clearCart() {
    shoppingCart = [];
    updateCart();
    resetButtons();
}

function resetButtons() {
    var addBtns = document.querySelectorAll('.btn-add');
    for(var i = 0; i < addBtns.length; i++) {
        if(addBtns[i].dataset.owned !== "true") {
            addBtns[i].classList.remove('btn-disable');
            addBtns[i].previousElementSibling.classList.remove('hide');
            addBtns[i].textContent = "$" + addBtns[i].dataset.price;
            addBtns[i].dataset.inCart = "false";
        }
    }
}

function resetButton(id) {
    var button = document.querySelectorAll('.btn-add')[id];
    button.dataset.inCart = "false";
    button.textContent = "$" + button.dataset.price;
    button.classList.remove('btn-disable');
    button.previousElementSibling.classList.remove('hide');
}
