function filterProducts(products, req) {
    const query = req.query.q;
    const brands = req.query.brand;
    const categories = req.query.category;
    const minPrice = req.query['price_min'];
    const maxPrice = req.query['price_max'];
    const minRating = req.query['rating_min'];
    const maxRating = req.query['rating_max'];

    const result = products.filter(product => {
        const isQuery = query? product.title.includes(query) : true;
        let isInPriceRange = true;
        if(minPrice) {
            isInPriceRange = product.price >= minPrice;
        } 
        if(maxPrice) {
            isInPriceRange = isInPriceRange && product.price <= maxPrice;
        } 
        let isInRatingRange = true;
        if(minRating) {
            isInRatingRange = product.rating >= minRating;
        }
        if(maxRating) {
            isInRatingRange = isInRatingRange && product.rating <= maxRating;
        }
        const isBrand = brands? 
                        (Array.isArray(brands)? 
                            brands.some(brand => brand === product.brand)
                            : product.brand === brands)
                        : true;
        const isCategory = categories? 
                        (Array.isArray(categories)? 
                            categories.some(category => category === product.category)
                            : product.category === categories)
                        : true;
        return isQuery && isInPriceRange && isInRatingRange && isBrand && isCategory;
    })

    return result;
}

module.exports = filterProducts;