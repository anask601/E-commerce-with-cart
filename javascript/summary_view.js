window.addEventListener('load', function() {
    initialize_summary();
})

async function initialize_summary() {
    let cart = sessionStorage.getItem('cart');
    if (!cart || (cart && cart.length == 0)) return; //check if cart is empty 

    let cart_arr = JSON.parse(cart);
    let table = document.querySelector('tbody[class="summary_table_body"]');
    let total = 0;
    
    for (let i = 0; i < cart_arr.length; i++) {
        let product = await getProduct(cart_arr[i].id);
        let row = document.createElement('tr');
        row.className = "table_row"

        let prod_col = document.createElement('td');
        prod_col.style = "padding: 5px;";
        let cont = document.createElement('div');
        cont.className = "custom_row";
        let image = document.createElement('img');
        image.style = "height: 50px; border-radius: 4px; margin-right: 5px; box-shadow: rgb(0 0 0 / 6%) 0px 3px 6px 3px;"
        image.src = product.image;
        let title = document.createElement('p');
        title.textContent = product.title;
        cont.appendChild(image); cont.appendChild(title);
        prod_col.appendChild(cont);

        let qty_col = document.createElement('td');
        qty_col.style = "padding: 5px;";
        let qty = document.createElement('p');
        qty.textContent = cart_arr[i].qty;
        qty_col.appendChild(qty);

        let price_col = document.createElement('td');
        price_col.style = "padding: 5px;";
        let price = document.createElement('p');
        price.textContent = product.price;
        price_col.appendChild(price);


        //append rows to the table
        row.appendChild(prod_col);
        row.appendChild(qty_col);
        row.appendChild(price_col);
        table.appendChild(row);

        // add to total 
        total = total + (product.price * cart_arr[i].qty);
    }

    let tax_row = document.createElement('tr');
    tax_row.style = "border-top: 1px solid silver; margin: 5px;"
    let dummy_td = document.createElement('td');
    let total_txt_td = document.createElement('td');
    let total_txt = document.createElement('p');
    total_txt.textContent = "Fixed Shipping Charges & Taxes (18%)";
    total_txt.style = "font-weight: 600"
    total_txt_td.appendChild(total_txt);

    let total_txt_num_td = document.createElement('td');
    let total_txt_num_txt = document.createElement('p');
    total_txt_num_txt.textContent = total * 0.18;
    total_txt_num_td.appendChild(total_txt_num_txt);

    tax_row.appendChild(dummy_td);
    tax_row.appendChild(total_txt_td);
    tax_row.appendChild(total_txt_num_td);

    let total_row = document.createElement('tr');
    total_row.style = "border-top: 1px solid silver; margin: 5px;"
    let dummy_td_1 = document.createElement('td');
    let total_td = document.createElement('td');
    let total_text = document.createElement('p');
    total_text.textContent = "Total";
    total_text.style = "font-weight: 600"
    total_td.appendChild(total_text);

    let total_num_td = document.createElement('td');
    let total_num = document.createElement('p');
    total_num.textContent = (total * 0.18) + total;
    total_num_td.appendChild(total_num);

    total_row.appendChild(dummy_td_1);
    total_row.appendChild(total_td);
    total_row.appendChild(total_num_td);

    table.appendChild(tax_row);
    table.appendChild(total_row);
}