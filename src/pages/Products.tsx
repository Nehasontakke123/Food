import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductGrid } from "../components/ProductGrid";
import { SearchBar } from "../components/SearchBar";
import { useStore } from "../store/useStore";
import { Loader } from "lucide-react";
import { mockProducts } from "../data/ProductsData.ts";

export function Products() {
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useStore();

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Search functionality
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Search Bar */}
          <div className="w-full md:w-2/3 mx-auto">
            <SearchBar />
          </div>

          {/* Product Section */}
          <div className="space-y-6">
            {loading ? (
              <div className="h-64 flex justify-center items-center">
                <Loader className="h-10 w-10 text-red-600 animate-spin" />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "Result" : "Results"}
                </h2>
                <ProductGrid products={filteredProducts} />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
