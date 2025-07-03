import axios from 'axios';

const API_URL = '/api/orders';

// Create new order
const createOrder = async (formData) => {
  const token = localStorage.getItem('token');
  return axios.post("/api/orders", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  }).then(res => res.data);
};


// Get user's orders
const getMyOrders = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}/myorders`, config);
  return response.data;
};

// Get order by ID
const getOrderById = async (orderId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}/${orderId}`, config);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
  getOrderById,
};

export default orderService;