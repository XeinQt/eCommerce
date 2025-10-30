import React, { useEffect, useState } from "react";

function Sidebar() {
  const [categories, setCategories] = useState<string[]>([]);

  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trends",
    "shoes",
    "shirts",
  ]);

  interface Product {
    category: string;
  }

  interface FetchResponse {
    products: Product[];
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();

        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category)) // ✅ correct property
        );

        console.log(uniqueCategories);
        setCategories(uniqueCategories); // ✅ store categories in state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-64 p-5 h-screen">
      <h2 className="text-2xl font-bold mb-10 mt-4">Ricos Store</h2>

      <section>
        <input
          type="text"
          placeholder="Search"
          className="border-2 rounded px-2 sm:mb-0 w-full"
        />

        <div className="flex items-center justify-center">
          <input
            type="text"
            className="border-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
          />

          <input
            type="text"
            className="border-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
          />
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-4 ">Categories</h2>
        </div>

        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-[16px] h-[16px]"
              />

              {category.toUpperCase()}
            </label>
          ))}
        </section>

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-4 ">Keywords</h2>
        </div>

        <div className="mb-5 flex flex-col">
          {keywords.map((keyword, index) => (
            <button
              key={index}
              className="border-1 px-3 py-1 mr-2 mb-2 rounded hover:bg-gray-300"
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>

        <button className="w-full bg-black text-white px-5 py-2 rounded hover:bg-gray-900 ">
          Reset Filters
        </button>
      </section>
    </div>
  );
}

export default Sidebar;
