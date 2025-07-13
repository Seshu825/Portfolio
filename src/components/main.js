const products = [
    {id: 1, name :"shoes", category:"fashion" },
    {id: 1, name :"jocket", category:"fashion" },
    {id: 1, name :"smartphone", category:"electronics" },
    {id: 1, name :"tables", category:"furniture" },
    {id: 1, name :"sandles", category:"fashion" }
]


function filterProducts(category){
    const FilteredProducts= category==="all"?products: products.filter(product => product.category === category)
    // return FilteredProducts
    console.clear();
    console.table(FilteredProducts)
}

filterProducts('all');


