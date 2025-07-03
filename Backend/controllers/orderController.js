// controllers/orderController.js
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';

export const createOrder = async (req, res) => {
  try {
    const items = JSON.parse(req.body.items);
    const shippingAddress = JSON.parse(req.body.shippingAddress);
    const totalAmount = req.body.totalAmount;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items provided' });
    }

    // ✅ Insert missing products into the Products collection
    const formattedItems = await Promise.all(items.map(async (item, index) => {
      if (!item.product || !mongoose.Types.ObjectId.isValid(item.product)) {
        throw new Error(`Invalid product ID at item ${index + 1}`);
      }

      // 🔍 Check if product already exists
      const existing = await Product.findById(item.product);

      // 🧠 Create product if it doesn't exist
      if (!existing) {
        await Product.create({
          _id: item.product,
          title: item.title || `Product ${index + 1}`,
          price: item.price,
          thumbnail: item.thumbnail || 'default.jpg', // Optional: add default image
          description: item.description || 'Auto-added during checkout'
        });
      }

      return {
        product: new mongoose.Types.ObjectId(item.product),
        quantity: item.quantity,
        price: item.price,
      };
    }));

    const paymentProof = req.file ? req.file.filename : null;

    const newOrder = new Order({
      customer: req.customer._id,
      items: formattedItems,
      shippingAddress,
      totalAmount,
      paymentProof,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error('❌ Error in createOrder:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while placing order',
      error: error.message,
    });
  }
};