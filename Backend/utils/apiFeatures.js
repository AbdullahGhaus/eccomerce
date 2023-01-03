class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query //Product.find()
        this.queryStr = queryStr //req.query -> query parameters
    };


    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i", //Case Insensitive
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr }

        //Removing query Parameters for filtering by Category
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach(key => delete queryCopy[key])

        //Filtering for Price
        let queryPrice = JSON.stringify(queryCopy) //converting to string
        queryPrice = queryPrice.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`) //Adding $ in json key attribute

        this.query = this.query.find(JSON.parse(queryPrice))
        return this;
    }

    pagination(resultsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; //Current Page Retrieved

        let skip = resultsPerPage * (currentPage - 1) //How many products to skip

        this.query = this.query.limit(resultsPerPage).skip(skip)
        return this;
    }
}

module.exports = ApiFeatures