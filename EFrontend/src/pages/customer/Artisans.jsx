import { useState } from 'react';
import { Link } from 'react-router-dom';

const Artisans = () => {
  const [filter, setFilter] = useState('all');
 
  const artisans = [
    {
      id: 1,
      name: "Rani Devi",
      location: "Kutch, Gujarat",
      craft: "Embroidery",
      years: "3 generations",
      bio: "Our family has preserved the intricate Kutchi embroidery techniques passed down from my grandmother.",
      image: "https://f.hellowork.com/obs-static-images/seo/ObsJob/artisan.jpg",
      products: 24
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Varanasi, Uttar Pradesh",
      craft: "Weaving",
      years: "40 years",
      bio: "Each Banarasi silk saree I weave carries centuries of tradition in its patterns.",
      image: "https://cdn.shopify.com/s/files/1/0680/2538/5243/files/lathe_480x480.jpg?v=1698700430",
      products: 18
    },
    {
      id: 3,
      name: "Meena Patel",
      location: "Jaipur, Rajasthan",
      craft: "Block Printing",
      years: "25 years",
      bio: "The natural dyes we use create colors that tell the story of Rajasthan's landscape.",
      image: "https://www.dyslexiauk.co.uk/wp-content/uploads/2023/01/portrait-young-nice-lady-sitting-white-desk-with-open-book-while-writing-notes-paper-isolated-900x550.jpg",
      products: 32
    },
    {
      id: 4,
      name: "Arjun Das",
      location: "Assam",
      craft: "Pottery",
      years: "15 years",
      bio: "Our terracotta pottery is shaped by the same river clay that nourishes our fields.",
      image: "https://cdn.tatlerasia.com/asiatatler/i/ph/2021/05/14100515-dsc3281_cover_1988x1326.jpg",
      products: 12
    }
  ];

  const locations = ['All', 'Gujarat', 'Uttar Pradesh', 'Rajasthan', 'Assam'];
  const crafts = ['All', 'Embroidery', 'Weaving', 'Block Printing', 'Pottery'];

  const filteredArtisans = filter === 'all' 
    ? artisans 
    : artisans.filter(artisan => 
        artisan.location.includes(filter) || 
        artisan.craft === filter
      );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-4">Meet the Makers</h1>
        <p className="text-xl text-[#5A5A5A] max-w-3xl mx-auto">
          Discover the talented artisans behind our handmade collections and the stories woven into each piece.
        </p>
      </div>

   
      <div className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-[#5A5A5A]/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-semibold text-[#2B2B2B]">Filter by:</h2>
          
          <div className="flex flex-wrap gap-3">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="border border-[#5A5A5A]/30 rounded-lg px-4 py-2 text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#E86C3B]/50"
            >
              <option value="all">All Locations</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
            
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="border border-[#5A5A5A]/30 rounded-lg px-4 py-2 text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#E86C3B]/50"
            >
              <option value="all">All Crafts</option>
              {crafts.map((craft, index) => (
                <option key={index} value={craft}>{craft}</option>
              ))}
            </select>
            
            <button 
              onClick={() => setFilter('all')}
              className="text-sm text-[#E86C3B] hover:underline px-4 py-2"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtisans.map(artisan => (
          <div key={artisan.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-[#5A5A5A]/10">
            <div className="relative h-64">
              <img 
                src={artisan.image} 
                alt={artisan.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{artisan.name}</h3>
                <p className="text-[#FFFFFF]/90">{artisan.location}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="bg-[#3C4F76]/10 text-[#3C4F76] text-xs font-medium px-2 py-1 rounded mr-2">
                  {artisan.craft}
                </span>
                <span className="text-sm text-[#5A5A5A]">
                  {artisan.years} of experience
                </span>
              </div>
              
              <p className="text-[#5A5A5A] mb-4 italic">"{artisan.bio}"</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#5A5A5A]">
                  {artisan.products} products available
                </span>
                <Link 
                  to={`/shop?artisan=${artisan.name.replace(' ', '-').toLowerCase()}`}
                  className="bg-[#E86C3B] hover:bg-[#d45a2a] text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArtisans.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-[#5A5A5A] mb-4">No artisans match your filters.</p>
          <button 
            onClick={() => setFilter('all')}
            className="text-[#E86C3B] hover:underline font-medium"
          >
            Reset filters
          </button>
        </div>
      )}

      <div className="mt-16 bg-[#2F7360] text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Support Artisan Communities</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Every purchase directly supports these talented artisans and helps preserve traditional crafts.
        </p>
        <Link 
          to="/shop" 
          className="inline-block bg-[#E86C3B] hover:bg-[#d45a2a] text-white font-bold py-3 px-8 rounded-full transition duration-300"
        >
          Shop Their Creations
        </Link>
      </div>
    </div>
  );
};

export default Artisans;