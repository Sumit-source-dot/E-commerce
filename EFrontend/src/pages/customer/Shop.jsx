import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FiFilter, FiChevronDown, FiStar, FiClock, FiMapPin } from "react-icons/fi";
import { regionalProducts } from "./regionalProductsData";
import { categories, regions } from "./regionsData";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [filters, setFilters] = useState({
    category: "",
    region: "",
    priceRange: [0, 10000],
    popularity: ""
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setTimeout(() => {
          setProducts(regionalProducts);
          setFilteredProducts(regionalProducts);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to load products:", error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.region) {
      result = result.filter(p => 
        p.origin.state.toLowerCase().includes(filters.region.toLowerCase()) ||
        p.origin.city.toLowerCase().includes(filters.region.toLowerCase())
      );
    }

    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.popularity === "best-seller") {
      result = result.filter(p => p.isBestSeller);
    } else if (filters.popularity === "local-favorite") {
      result = result.filter(p => p.isLocalFavorite);
    }

    switch(sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [filters, sortOption, products]);

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setFilters({...filters, priceRange: newPriceRange});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#2B2B2B] mb-6 flex items-center">
          <FiMapPin className="mr-2 text-[#E86C3B]" /> Regional Highlights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products
            .filter(p => p.isFeatured)
            .slice(0, 4)
            .map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-[#3C4F76] text-white px-4 py-2 rounded-lg"
          >
            <FiFilter /> Filters
          </button>
        </div>

        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-72 flex-shrink-0`}>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#5A5A5A]/10">
            <h3 className="font-bold text-[#2B2B2B] mb-4 text-lg">Discover by Region</h3>

            <div className="mb-6">
              <h4 className="text-[#5A5A5A] font-medium mb-2">Product Type</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category}
                      onChange={() => setFilters({...filters, category})}
                      className="mr-2 text-[#E86C3B]"
                    />
                    <span className="text-[#2B2B2B]">{category}</span>
                  </label>
                ))}
                <button 
                  onClick={() => setFilters({...filters, category: ""})}
                  className="text-sm text-[#E86C3B] hover:underline mt-2"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-[#5A5A5A] font-medium mb-2">States & Cities</h4>
              <select
                value={filters.region}
                onChange={(e) => setFilters({...filters, region: e.target.value})}
                className="w-full border border-[#5A5A5A]/30 rounded-lg px-3 py-2 text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#E86C3B]/50 mb-2"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <optgroup key={region.name} label={region.name}>
                    <option value={region.name}>{region.name} (All)</option>
                    {region.cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <h4 className="text-[#5A5A5A] font-medium mb-2">Popularity</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="popularity"
                    checked={filters.popularity === "best-seller"}
                    onChange={() => setFilters({...filters, popularity: "best-seller"})}
                    className="mr-2 text-[#E86C3B]"
                  />
                  <span className="text-[#2B2B2B]">Best Sellers</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="popularity"
                    checked={filters.popularity === "local-favorite"}
                    onChange={() => setFilters({...filters, popularity: "local-favorite"})}
                    className="mr-2 text-[#E86C3B]"
                  />
                  <span className="text-[#2B2B2B]">Local Favorites</span>
                </label>
                <button 
                  onClick={() => setFilters({...filters, popularity: ""})}
                  className="text-sm text-[#E86C3B] hover:underline mt-2"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-[#5A5A5A] font-medium mb-2">Price Range (₹)</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full mr-2"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full ml-2"
                  />
                </div>
                <div className="flex justify-between text-[#2B2B2B] text-sm">
                  <span>₹{filters.priceRange[0].toLocaleString()}</span>
                  <span>₹{filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setFilters({
                category: "",
                region: "",
                priceRange: [0, 10000],
                popularity: ""
              })}
              className="w-full bg-[#F5B700] hover:bg-[#e0a500] text-[#2B2B2B] py-2 rounded-lg transition duration-300"
            >
              Reset All Filters
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-[#5A5A5A] mb-2 sm:mb-0">
              Showing {filteredProducts.length} regional products
            </p>
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-[#5A5A5A]">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-[#5A5A5A]/30 rounded-lg px-3 py-1 text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#E86C3B]/50"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                  <div className="bg-[#5A5A5A]/10 h-48 rounded"></div>
                  <div className="mt-3 bg-[#5A5A5A]/10 h-4 rounded w-3/4"></div>
                  <div className="mt-2 bg-[#5A5A5A]/10 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#5A5A5A] text-lg">No products match your filters.</p>
              <button 
                onClick={() => setFilters({
                  category: "",
                  region: "",
                  priceRange: [0, 10000],
                  popularity: ""
                })}
                className="mt-4 text-[#E86C3B] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-[#5A5A5A]/30 rounded-lg text-[#2B2B2B] hover:bg-[#3C4F76]/10">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map(page => (
                <button 
                  key={page}
                  className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-[#E86C3B] text-white' : 'text-[#2B2B2B] hover:bg-[#3C4F76]/10'}`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-[#5A5A5A]/30 rounded-lg text-[#2B2B2B] hover:bg-[#3C4F76]/10">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-[#5A5A5A]/10">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-[#F5B700] text-[#2B2B2B] text-xs font-bold px-2 py-1 rounded">
              {Math.round(product.discountPercentage)}% OFF
            </div>
          )}
          {product.isBestSeller && (
            <div className="absolute top-2 left-2 bg-[#E86C3B] text-white text-xs font-bold px-2 py-1 rounded">
              Best Seller
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-[#2B2B2B] mb-1 line-clamp-1">{product.title}</h3>
          <div className="flex items-center text-xs text-[#5A5A5A] mb-2">
            <FiMapPin className="mr-1" />
            <span>{product.origin.city}, {product.origin.state}</span>
          </div>
        </Link>

        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-[#E86C3B]">₹{product.price.toLocaleString()}</span>
          <div className="flex items-center bg-[#3C4F76]/10 px-2 py-1 rounded-full">
            <FiStar className="text-xs text-[#3C4F76] mr-1" />
            <span className="text-xs font-medium text-[#3C4F76]">
              {product.rating}
            </span>
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-[#E86C3B] hover:bg-[#d45a2a] text-white py-2 rounded-lg transition duration-300 text-sm font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Shop;