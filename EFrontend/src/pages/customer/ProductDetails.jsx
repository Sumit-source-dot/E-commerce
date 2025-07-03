import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import PaymentQR from '../../components/PaymentQR';
import { FiStar, FiMapPin, FiShoppingCart } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch from your API
    const fetchProduct = async () => {
      try {
        // Mock fetch - replace with actual API call
        const mockProducts = []; // Your product data here
        const foundProduct = mockProducts.find(p => p.id === id);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    navigate('/checkout', { 
      state: { 
        product,
        quantity 
      } 
    });
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full mr-4">
              <FiStar className="text-blue-500 mr-1" />
              <span className="text-sm font-medium text-blue-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center text-gray-500">
              <FiMapPin className="mr-1" />
              <span className="text-sm">{product.origin.city}, {product.origin.state}</span>
            </div>
          </div>

          <div className="mb-6">
            {product.discountPercentage > 0 && (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-[#E86C3B] mr-3">
                  ₹{(
                    product.price * (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="ml-2 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              </div>
            )}
            {!product.discountPercentage && (
              <span className="text-3xl font-bold text-[#E86C3B]">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="prose max-w-none text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="flex items-center mb-8">
            <span className="mr-3 font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                addToCart(product);
                setQuantity(1);
              }}
              className="flex-1 bg-white border border-[#E86C3B] text-[#E86C3B] hover:bg-[#E86C3B]/10 py-3 rounded-md transition flex items-center justify-center gap-2"
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#E86C3B] hover:bg-[#d45a2a] text-white py-3 rounded-md transition"
            >
              Buy Now
            </button>
          </div>

          <div className="mb-8">
            <PaymentQR 
              amount={(product.discountPercentage ? 
                product.price * (1 - product.discountPercentage / 100) : 
                product.price) * quantity}
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Artisan:</strong> {product.artisan?.name || 'Unknown'}</li>
              <li><strong>Materials:</strong> {product.materials?.join(', ') || 'Not specified'}</li>
              <li><strong>Dimensions:</strong> {product.dimensions || 'Varies'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;