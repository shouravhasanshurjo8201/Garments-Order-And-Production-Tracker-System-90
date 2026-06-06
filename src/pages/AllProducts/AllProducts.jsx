import { useEffect, useState, useCallback } from "react";
import Container from "../../components/Shared/Container";
import Card from "../../components/Home/Card";
import CardSkeleton from "../../components/Home/CardSkeleton";
import ProductNotFound from "../ProductDetails/ProductNotFound";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        document.title = "All Products | Garments Production System";
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get("/products");
            setProducts(res.data || []);
            setFiltered(res.data || []);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        let data = [...products];

        if (search.trim()) {
            const query = search.toLowerCase();
            data = data.filter((product) => {
                const productName = product?.name?.toLowerCase() || "";
                const productCategory = product?.category?.toLowerCase() || "";
                return productName.includes(query) || productCategory.includes(query);
            });
        }

        if (category !== "all") {
            data = data.filter((product) => product.category === category);
        }

        switch (sort) {
            case "price-low":
                data.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case "price-high":
                data.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case "newest":
                data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                break;
            default:
                break;
        }

        setFiltered(data);
        setCurrentPage(1);
    }, [products, search, category, sort]);

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtered.length / productsPerPage);

    return (
        <Container>
            <div>
                {/* Heading */}
                <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                        Explore Our <span className="text-lime-500">Products</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                        Search and filter through our latest garments production batch with real-time stock status.
                    </p>
                </div>

                {/* Search & Filter Inputs */}
                <div className="p-4 rounded-3xl shadow mb-5 bg-white border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-5 relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-lime-400 outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-3 relative">
                            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-11 pr-8 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-lime-400 appearance-none outline-none cursor-pointer bg-white"
                            >
                                <option value="all">All Categories</option>
                                <option value="Shirt">Shirt</option>
                                <option value="Pant">Pant</option>
                                <option value="Jacket">Jacket</option>
                            </select>
                        </div>

                        <div className="md:col-span-4 relative">
                            <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full pl-11 pr-8 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-lime-400 appearance-none outline-none cursor-pointer bg-white"
                            >
                                <option value="default">Sort By: Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest Arrival</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Total Products Count */}
                <div className="mb-6 px-2 flex justify-between items-center">
                    <p className="font-bold text-gray-700">
                        Total Products (<span className="text-lime-600">{filtered.length}</span>)
                    </p>
                </div>

                {/* Products Grid / Loading Skeletons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
                    ) : currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <Card key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full">
                            <ProductNotFound />
                        </div>
                    )}
                </div>

                {/* Pagination UI */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-16">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-5 py-2 rounded-xl font-bold border transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50"
                        >
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-xl font-bold border transition-all ${currentPage === page
                                        ? "bg-lime-500 text-white border-lime-500 shadow-sm shadow-lime-200"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-5 py-2 rounded-xl font-bold border transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default AllProducts;