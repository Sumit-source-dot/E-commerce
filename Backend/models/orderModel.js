// // models/orderModel.js
// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Customer',
//     required: true,
//   },
//   items: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true,
//       },
//       quantity: Number,
//       price: Number,
//     },
//   ],
// shippingAddress: {
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
// },
//   totalAmount: Number,

//   // ✅ Fixed
// paymentProof: {
//   type: String,  // ✅ Change from Buffer to String
 
// },


//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//   status: {
//     type: String,
//     default: 'pending',
//   },
//   paymentStatus: {
//     type: String,
//     default: 'pending',
//   },
// });

// export default mongoose.model('Order', orderSchema);


import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentProof: {
    type: String, // path to uploaded file or base64 URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    default: 'pending',
  },
});

export default mongoose.model('Order', orderSchema);
