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
    let query = Product.find({});
    let totalCountQuery = Product.find({});
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalCountQuery = totalCountQuery.find({ category: req.query.category });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalCountQuery = totalCountQuery.find({ brand: req.query.brand });
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);

      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const totalDocs = await totalCountQuery.countDocuments().exec();
    console.log("totalDocs==>",totalDocs)
    const doc = await query.exec();

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
