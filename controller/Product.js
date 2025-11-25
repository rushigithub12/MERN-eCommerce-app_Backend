const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllproducts = async (req, res) => {
  try {
    let condition = {};
    if (!req.query.admin) {
      condition.deleted = { $ne: true };
    }
    let query = Product.find(condition);
    let totalCountQuery = Product.find(condition);

    // Filters
    if (req.query.category) {
      query = query.find({ category: { $in: req.query.category.split(",") } });
      totalCountQuery = totalCountQuery.find({
        category: { $in: req.query.category.split(",") },
      });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalCountQuery = totalCountQuery.find({ brand: req.query.brand });
    }

    // Sorting
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    // Pagination
    const page = parseInt(req.query._page) || 1;
    const pageSize = parseInt(req.query._per_page || req.query._limit) || 10;

    const totalDocs = await totalCountQuery.countDocuments().exec();
    const totalPages = Math.ceil(totalDocs / pageSize);

    query = query.skip(pageSize * (page - 1)).limit(pageSize);
    const products = await query.exec();

    // Pagination metadata (to match JSON Server format)
    const response = {
      data: products,
      first: 1,
      items: totalDocs,
      last: totalPages,
      next: page < totalPages ? page + 1 : null,
      pages: totalPages,
      prev: page > 1 ? page - 1 : null,
    };

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const { id } = await req.params;
    const doc = await Product.findById(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = await req.params;
    const doc = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
