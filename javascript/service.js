function getAllProducts(limit=20) {
    return fetch(`https://fakestoreapi.com/products?limit=${limit}`)
        .then(res=>res.json())
        .catch(err=>console.log(err))
}

function getProduct(id) {
    return fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res=>res.json())
        .catch(err=>console.log(err))
}