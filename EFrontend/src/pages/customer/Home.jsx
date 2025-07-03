
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { addToCart } = useCart();
  const [featuredProducts] = useState([
    {
    _id: "66a2b301dc799600145a0019",
    title: "Banarasi Silk Saree",
    category: "Textiles",
    price: 8999,
    rating: 4.8,
    thumbnail: "https://www.kollybollyethnics.com/image/catalog/data/07Oct2022/Banarasi-silk-Saree-in-Purple-colour-4704-1.jpg",
    origin: { state: "Uttar Pradesh", city: "Varanasi" },
    discountPercentage: 15,
    addedDate: "2023-07-03"
  },
  {
    _id: "66a2b301dc799600145a0020",
    title: "Blue Pottery Jaipur",
    category: "Pottery",
    price: 2499,
    rating: 4.6,
    thumbnail: "https://pinkcity.com/wp-content/uploads/2013/09/blue-pottery.jpg",
    origin: { state: "Rajasthan", city: "Jaipur" },
    discountPercentage: 10,
    addedDate: "2023-07-03"
  },
  {
    _id: "66a2b301dc799600145a0021",
    title: "Pashmina Shawl",
    category: "Textiles",
    price: 5999,
    rating: 4.9,
    thumbnail: "https://cdn.exoticindia.com/images/products/original/shawls-2019/swq88_a02.jpg",
    origin: { state: "Kashmir", city: "Srinagar" },
    discountPercentage: 20,
    addedDate: "2023-07-03"
  },
  {
    _id: "66a2b301dc799600145a0022",
    title: "Bidriware Hookah",
    category: "Home Decor",
    price: 12999,
    rating: 4.7,
    thumbnail: "https://i.etsystatic.com/32136760/r/il/cc7f57/5867280923/il_fullxfull.5867280923_novp.jpg",
    origin: { state: "Telangana", city: "Hyderabad" },
    discountPercentage: 5,
    addedDate: "2023-07-03"
  },
  {
    _id: "66a2b301dc799600145a0023",
    title: "Madhubani Painting",
    category: "Art",
    price: 3499,
    rating: 4.5,
    thumbnail: "https://media.fuzia.com/assets/uploads/images/co_brand_1/article/2021/inbound2405372232026480468-1622311941.jpg",
    origin: { state: "Bihar", city: "Madhubani" },
    discountPercentage: 0,
    addedDate: "2023-07-03"
  },
  {
    _id: "66a2b301dc799600145a0024",
    title: "Silver Tribal Jewelry",
    category: "Jewelry",
    price: 4599,
    rating: 4.4,
    thumbnail: "https://i.pinimg.com/originals/95/50/bf/9550bfbbf21f1347695d63e5647c57a5.jpg",
    origin: { state: "Odisha", city: "Bhubaneswar" },
    discountPercentage: 12,
    addedDate: "2023-07-03"
  },
  {
    _id: "66a2b301dc799600145a0025",
    title: "Sandalwood Ganesha",
    category: "Home Decor",
    price: 2899,
    rating: 4.8,
    thumbnail: "https://cdn.exoticindia.com/images/products/original/sculptures-2019/dde911.webp",
    origin: { state: "Karnataka", city: "Mysore" },
    discountPercentage: 8,
    addedDate: "2023-07-03"
  },
  {
    _id: "66a2b301dc799600145a0026",
    title: "Assam Bamboo Craft",
    category: "Home Decor",
    price: 1799,
    rating: 4.3,
    thumbnail: "https://2.bp.blogspot.com/--5Gv-w_HdfQ/Va4H8qBOLSI/AAAAAAAAAH0/jB3KLlpKIZc/s640/PicMonkey%2BCollage.jpg",
    origin: { state: "Assam", city: "Guwahati" },
    discountPercentage: 15,
    addedDate: "2023-07-03"
  }
  ]);
  const [loading] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Optional: Add a toast notification here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#3C4F76] to-[#2F7360] text-white rounded-xl overflow-hidden my-8">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Bringing India's Handmade Heritage to You
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover authentic handicrafts directly from artisans across India
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/shop" 
              className="bg-[#E86C3B] hover:bg-[#d45a2a] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Shop Now
            </Link>
            <Link 
              to="/artisans" 
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 border border-white"
            >
              Meet Artisans
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="my-16">
        <h2 className="text-3xl font-bold text-[#2B2B2B] mb-12 text-center">
          Explore Our Collections
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Textiles', icon: '🧵', count: '120+ Products' },
            { name: 'Jewelry', icon: '💍', count: '85+ Designs' },
            { name: 'Home Decor', icon: '🏠', count: '65+ Items' },
            { name: 'Pottery', icon: '🏺', count: '45+ Pieces' },
          ].map((category, index) => (
            <Link 
              to={`/shop?category=${category.name.toLowerCase()}`} 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-[#5A5A5A]/10 text-center hover:border-[#F5B700] group"
            >
              <span className="text-4xl mb-3 block group-hover:text-[#E86C3B] transition duration-300">{category.icon}</span>
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-1">{category.name}</h3>
              <p className="text-sm text-[#5A5A5A]">{category.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="my-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-[#2B2B2B]">Featured Products</h2>
          <Link to="/shop" className="text-[#E86C3B] hover:text-[#d45a2a] font-semibold flex items-center">
            View All <span className="ml-1">→</span>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="bg-[#5A5A5A]/10 h-48 rounded"></div>
                <div className="mt-3 bg-[#5A5A5A]/10 h-4 rounded w-3/4"></div>
                <div className="mt-2 bg-[#5A5A5A]/10 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-[#5A5A5A]/10">
                <Link to={`/product/${product.id}`}>
                  <div className="relative">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    {product.discountPercentage > 10 && (
                      <div className="absolute top-2 right-2 bg-[#F5B700] text-[#2B2B2B] text-xs font-bold px-2 py-1 rounded">
                        {Math.round(product.discountPercentage)}% OFF
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-[#2B2B2B] mb-1 line-clamp-1">{product.title}</h3>
                    <p className="text-xs text-[#5A5A5A] mb-2">{product.brand}</p>
                  </Link>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-[#E86C3B]">₹{product.price}</span>
                    <div className="flex items-center bg-[#3C4F76]/10 px-2 py-1 rounded-full">
                      <span className="text-xs text-[#3C4F76] mr-1">⭐</span>
                      <span className="text-xs font-medium text-[#3C4F76]">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#E86C3B] hover:bg-[#d45a2a] text-white py-2 rounded-lg transition duration-300 text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Artisan Story */}
      <section className="my-16 bg-[#2F7360] text-white rounded-xl overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <div className="h-full min-h-64 bg-white/10 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Artisan"
                  className="h-40 w-40 object-cover rounded-full shadow-lg"
                />
              </div>
            </div>
            <div className="md:w-2/3 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Meet Raj Shri, Master Weaver from Varanasi</h2>
              <p className="text-lg mb-6">
                For three generations, Rajesh's family has been creating exquisite Banarasi silk sarees using traditional techniques passed down through the decades.
              </p>
              <p className="text-lg mb-8 italic">
                "Each thread tells a story of our heritage. When you wear one of our sarees, you become part of that story."
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/artisans" 
                  className="bg-[#E86C3B] hover:bg-[#d45a2a] text-white font-bold py-3 px-6 rounded-full transition duration-300"
                >
                  Know More Artisans
                </Link>
                <Link 
                  to="/shop?artisan=rajesh" 
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full transition duration-300 border border-white"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="my-16">
        <h2 className="text-3xl font-bold text-[#2B2B2B] mb-12 text-center">
          Why Choose Handmade
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-[#F5B700]/10 p-8 rounded-lg border-l-4 border-[#F5B700]">
            <h3 className="text-xl font-bold text-[#2B2B2B] mb-4">Authentic Craftsmanship</h3>
            <p className="text-[#5A5A5A]">
              Each piece is uniquely crafted by skilled artisans using traditional techniques that have been perfected over generations.
            </p>
          </div>
          <div className="bg-[#3C4F76]/10 p-8 rounded-lg border-l-4 border-[#3C4F76]">
            <h3 className="text-xl font-bold text-[#2B2B2B] mb-4">Fair Trade Practices</h3>
            <p className="text-[#5A5A5A]">
              We ensure artisans receive fair compensation for their work, helping to preserve India's rich craft traditions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;