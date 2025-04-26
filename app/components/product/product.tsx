'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiPaths } from '@/app/constants/api-paths';
import { FiSearch, FiXCircle, FiFilter } from 'react-icons/fi';

type ProductType = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const ITEMS_PER_PAGE = 5;

export default function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch(apiPaths.product.PRODUCT_LIST),
          fetch(apiPaths.product.CATEGORY_LIST)
        ]);

        const productData = await productRes.json();
        const categoryData = await categoryRes.json();

        setProducts(productData);
        setFilteredProducts(productData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching products or categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === '' || product.category === selectedCategory) &&
        product.price >= minPrice &&
        product.price <= maxPrice &&
        product.rating.rate >= minRating
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, minRating, products]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(0);
    setMaxPrice(1000);
    setMinRating(0);
  };

  const paginated = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 items-end">
        <div className="flex items-center border rounded px-2">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-2 w-full outline-none"
          />
        </div>

        <div className="flex items-center border rounded">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 w-full outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="border px-2 py-1 w-20 rounded"
            placeholder="Min"
          />
          <span>–</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border px-2 py-1 w-20 rounded"
            placeholder="Max"
          />
        </div>

        <div className="flex items-center border rounded">
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="px-3 py-2 w-full outline-none"
          >
            <option value={0}>All Ratings</option>
            <option value={1}>1 ★ & up</option>
            <option value={2}>2 ★ & up</option>
            <option value={3}>3 ★ & up</option>
            <option value={4}>4 ★ & up</option>
          </select>
        </div>

        <button
          onClick={handleClearFilters}
          className="flex items-center gap-1 bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 transition"
        >
          <FiXCircle />
          Clear
        </button>
      </div>

      {/* Product Table */}
      <table className="w-full border text-sm rounded-sm">
        <thead className="bg-red-100">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium">Price</th>
            <th className="px-4 py-3 text-left font-medium">Category</th>
            <th className="px-4 py-3 text-left font-medium">Rating</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((product) => (
            <tr key={product.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-3">
                <Link href={`/components/product/${product.id}`} className="text-blue-600 hover:underline">
                  {product.title}
                </Link>
              </td>
              <td className="px-4 py-3">${product.price}</td>
              <td className="px-4 py-3 capitalize">{product.category}</td>
              <td className="px-4 py-3">{product.rating.rate} ★</td>
              <td className="px-4 py-3 space-x-2">
                <button className="text-green-600">Edit</button>
                <button
                  className="text-red-600"
                  onClick={() =>
                    setProducts((prev) => prev.filter((p) => p.id !== product.id))
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white'
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
