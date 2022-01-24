class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //searching feature of the products by name
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            //search keyword for filters
            $regex: this.queryStr.keyword,
            $options: "i", //mean case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // // searching feature of the products by department
  // searchbyDept() {

  //   const keyword1 = this.queryStr.keyword1
  //     ? {
  //         department: {
  //           //search keyword for filters
  //           $regex: this.queryStr.keyword1,
  //           $options: "i", //mean case insensitive
  //         },
  //       }
  //     : {};

  //   this.query = this.query.find({ ...keyword1 });
  //   return this;
  // }

  //basically we make the copy of this.queryStr bcz this is object and
  //we can't use it without so we get it with refernece
  //so we use spread syntax allows an iterable such as an array expression
  //or string to be expanded in places where zero or more arguments

  //filter for categories
  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);
    this.query = this.query.find(queryCopy);

    // Filter For Price and Rating

    // object to text
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    //convert to object
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
