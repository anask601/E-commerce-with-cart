async function initialize_home() {
    let products = await getAllProducts();

    let prods_cont = document.querySelector("div[id='prods']");

    await addCarousel();
    
    for (let i = 0; i < products.length; i++) {
        let prod_div = document.createElement('div');
        prod_div.className = "prod_cont";
        prod_div.id = products[i].id;

        let title = document.createElement('p');
        title.textContent = products[i].title;
        title.className = "prod_title"

        let image_cont = document.createElement('div');
        image_cont.className = "image_cont";

        let image = document.createElement('img');
        image.src = products[i].image;

        let price = document.createElement('p');
        let bold = document.createElement('b');
        let italic = document.createElement('i');
        italic.textContent = `Price: ${products[i].price}`;
        bold.appendChild(italic);
        price.appendChild(bold);

        let button = document.createElement('button');
        button.className = "custom_btn";
        button.onclick = () => addProductToCart(products[i].id)
        button.textContent = "+ Add"

        let body = document.createElement('div');
        body.style = "padding: 10px;"

        // append elements 
        image_cont.appendChild(image);
        prod_div.appendChild(image_cont);
        body.appendChild(title);
        body.appendChild(price);
        body.appendChild(button);
        prod_div.appendChild(body);

        prods_cont.appendChild(prod_div);
    }

    let cart = sessionStorage.getItem('cart');
    if (cart && cart.length > 0) {
        let cart_arr = JSON.parse(cart);
        updateCartCount(cart_arr);
    }
}

async function addCarousel() {

    let products = await getAllProducts(5);

    let cont = document.querySelector("div[id='slides_cont']");

    for (let i = 0; i < products.length; i++) {
        let mySlides_fade = document.createElement('div');
        mySlides_fade.className = "mySlides fade";

        let number_div = document.createElement('div');
        number_div.className = "numbertext";
        number_div.textContent = `${i+1} / ${products.length}`

        let image = document.createElement('img');
        image.src = products[i].image;
        image.style = "width:100%; height: 400px"

        // append elements 
        mySlides_fade.appendChild(number_div);
        mySlides_fade.appendChild(image);

        cont.appendChild(mySlides_fade);
    }

    var slideIndex = 0;

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

    showSlides();
} 

function addProductToCart(id) {
    let cart = sessionStorage.getItem('cart');

    if (cart && cart.length > 0) {
        let cart_arr = JSON.parse(cart);
        let index = cart_arr.findIndex((v) => v.id == id);
        if (index != -1) {
            cart_arr[index].qty = cart_arr[index].qty + 1;
        } else {
            cart_arr.push({id, qty: 1});
        }
        updateCartCount(cart_arr);
        sessionStorage.setItem('cart', JSON.stringify(cart_arr));
    } else {
        updateCartCount([{id, qty: 1}]);
        sessionStorage.setItem('cart', JSON.stringify([{id, qty: 1}]));
    }
}

function updateCartCount(cart=[]) {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count = count + cart[i].qty;
    }

    document.querySelector('span[id="cart_count"]').textContent = count;
}

function onSearch(text) {
    let prods = Array.from(document.querySelector('div[id="prods"]').children);

    for (let i = 0; i < prods.length; i++) {
        if (text && text.trim() != '') {
            let title = prods[i].querySelector('p[class="prod_title"]').textContent.toLowerCase();
            if (!title.includes(text)) {
                prods[i].style = "display: none"
            }
        } else {
            prods[i].style = "display: initial"
        }
    }

}