// Products array of objects, keep details of all products in the store for the shopping cart
let products = [
    {
        name: 'Running Shoes',
        id: 'runshs',
        price: 70,
        numOfItems: 0
    },
    {
        name: 'Weights',
        id: 'weights',
        price: 30,
        numOfItems: 0
    },
    {
        name: 'Yoga Mattresses',
        id: 'yogamat',
        price: 29,
        numOfItems: 0
    },
    {
        name: 'Sports Balls',
        id: 'sportballs',
        price: 29,
        numOfItems: 0
    },
    {
        name: 'Treadmills',
        id: 'trdmill',
        price: 459,
        numOfItems: 0
    },
    {
        name: 'Sports Car',
        id: 'car',
        price: 300000,
        numOfItems: 0
    }
]

let productsG = document.querySelectorAll('.addToCart');
for (let i = 0 ; i < productsG.length ; i++) {
    productsG[i].addEventListener('click', () => {
            numberOfItems(products[i]);
            calculateCost(products[i]);
        }
    )
}

function numberOfItems(product) {
    let numOfItems = localStorage.getItem('numberOfItems');
    numOfItems = parseInt(numOfItems);
    if ( numOfItems ) {
        localStorage.setItem('numberOfItems', numOfItems + 1)
        document.getElementById(['productCount']).textContent = numOfItems + 1;
    }
    else {
        localStorage.setItem('numberOfItems',1);
        document.getElementById(['productCount']).textContent = 1;
    }
    addItemToCart(product);
}

function addItemToCart(product) {
    let cartItem = localStorage.getItem('productInCart');
    cartItem = JSON.parse(cartItem)
    if (cartItem != null) {
        if (cartItem[product.id] == null) { // if the product wasn't clicked before, add it to current cart
            cartItem = {
                ...cartItem, [product.id]: product
            }
        }
        cartItem[product.id].numOfItems += 1;
    }
    else {
        product.numOfItems = 1;
        cartItem = {
            [product.id]: product
        }
    }

    localStorage.setItem("productInCart", JSON.stringify(cartItem));
}

function calculateCost(product) {
    let currentCost = localStorage.getItem("cost");
    if(currentCost != null) {
        currentCost = parseInt(currentCost);
        localStorage.setItem("cost", currentCost + product.price);
    }
    else {
        localStorage.setItem("cost", product.price);
    }
}

function showItemsInCart() {
    let items = localStorage.getItem('productInCart');
    let totalCost = localStorage.getItem("cost");
    items = JSON.parse(items);
    let products = document.querySelector(".products");
    let table = document.getElementById("productsSum");
    if (items && products) {
        document.getElementById("placeOrder").disabled= false;
        Object.values(items).map(item => {
            let row = table.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.innerHTML = `${item.name}`;
            cell2.innerHTML = `$${item.price}`;
            cell3.innerHTML = `${item.numOfItems}`;
            cell4.innerHTML = `$${item.price * item.numOfItems}`;
            });
        products.innerHTML += `
                <h4>Total Price: $${totalCost}</h4>
        `;
    }
}


function maintainCountOfItems() {
    let numOfItems = localStorage.getItem('numberOfItems');
    if (numOfItems) {
        document.getElementById(['productCount']).textContent = numOfItems;
    }
}

showItemsInCart();

let docContent = document.querySelector(".content");
if (docContent) {
    maintainCountOfItems(); // Call function make sure that the items will stay in the cart upon reloading the page.
}
if(localStorage.getItem("mouseLeaveCount") == null) {
    localStorage.setItem("mouseLeaveCount", 0);
}
document.body.onmouseleave = alertOnMouseLeave;
function alertOnMouseLeave() {
    let count = localStorage.getItem("mouseLeaveCount")
    if (count == 0) {
        window.alert("Thank You and Good Bye :)");
        count++;
        localStorage.setItem("mouseLeaveCount", 1);
    }
}

function reloadIfAddedToCart() {
    let cartButton = document.querySelectorAll('.addToCart');
    for (let i = 0 ; i < cartButton.length ; i++) {
        cartButton[i].addEventListener("click", () => {
            location.reload();
        })
    }
}

reloadIfAddedToCart();
