// controllers/orderController.js
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';

export const createOrder = async (req, res) => {
  try {
    const items = JSON.parse(req.body.items);
    const shippingAddress = JSON.parse(req.body.shippingAddress);
    const totalAmount = req.body.totalAmount;

    console.log('📦 Parsed Shipping Address:', shippingAddress);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items provided' });
    }

    const formattedItems = await Promise.all(items.map(async (item, index) => {
      if (!item.product || !mongoose.Types.ObjectId.isValid(item.product)) {
        throw new Error(`Invalid product ID at item ${index + 1}`);
      }

      const existing = await Product.findById(item.product);
      if (!existing) {
        await Product.create({
          _id: item.product,
          title: item.title || `Product ${index + 1}`,
          price: item.price,
          thumbnail: item.thumbnail || 'default.jpg',
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

    // ✅ Log just before creating order
    console.log("🧾 Full Order Payload:", {
      customer: req.customer._id,
      items: formattedItems,
      shippingAddress,
      totalAmount,
      paymentProof,
    });

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
