import { apiPaths } from '@/app/constants/api-paths';

// Define Product type
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// Update component with correct typing for `params`
type ProductDetailProps = {
  params: Promise<{ id: number }>; // Use Promise for params
};

// Ensure async fetch logic
export default async function ProductDetail({ params }: ProductDetailProps) {
  // Await the params to resolve the id
  const { id } = await params;

  // Ensure async fetch for the product
  const res = await fetch(apiPaths.product.SINGLE_PRODUCT(id));
  const product: Product = await res.json();

  // Extract image domain for display
  const imageDomain = new URL(product.image).hostname;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-64 h-64 object-contain bg-gray-100 rounded-lg shadow-inner"
          />
        </div>
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="mt-2 text-lg text-gray-600">{product.category.toUpperCase()}</p>
            <div className="mt-4 flex items-center gap-2">
              <span

 className="text-yellow-500 text-xl">★</span>
              <span className="text-gray-700 font-medium">
                {product.rating.rate} / 5 ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold text-green-600">${product.price}</p>
          </div>

          <button className="w-fit px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Buy Now
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Image Domain</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Product ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Image Domain</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">{imageDomain}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}