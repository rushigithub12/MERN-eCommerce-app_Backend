const { Order } = require("../model/Order");

exports.createdOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    let query = Order.find({});
    let totalCountQuery = Order.find({});

    // Filters
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalCountQuery = totalCountQuery.find({ category: req.query.category });
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
    const orders = await query.exec();

    // Pagination metadata (to match JSON Server format)
    const response = {
      data: orders,
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

exports.fetchOrderByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const orders = await Order.find({ user: user }).populate("user");
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Order.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};
