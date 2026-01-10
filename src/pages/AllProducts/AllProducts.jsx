import { useEffect, useState } from "react";
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

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        document.title = "All Products | Garments Production System";
    }, []);

    // Fetch products
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await axiosSecure.get("/products");
                setProducts(res.data);
                setFiltered(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [axiosSecure]);

    // Search + Filter + Sort Logic
    useEffect(() => {
        let data = [...products];

        // 1. Search 
        if (search) {
            data = data.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.category.toLowerCase().includes(search.toLowerCase())
            );
        }

        // 2. Category Filter
        if (category !== "all") {
            data = data.filter(p => p.category === category);
        }

        // 3. Sorting 
        if (sort === "price-low") data.sort((a, b) => a.price - b.price);
        if (sort === "price-high") data.sort((a, b) => b.price - a.price);
        if (sort === "newest") data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setFiltered(data);
        setCurrentPage(1);
    }, [search, category, sort, products]);

    // Pagination Calculation
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtered.length / productsPerPage);

    return (
        <Container>
            <div className="-mt-18">
                <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                        Explore Our <span className="text-lime-500">Products</span>
                    </h2>
                    <p className=" mt-4 max-w-2xl mx-auto">
                        Search and filter through our latest garments production batch with real-time stock status.
                    </p>
                </div>

                <div className="p-4 rounded-3xl shadow mb-5">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                        <div className="md:col-span-5 relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3  border border-gray-500/50 rounded-2xl focus:ring-2 focus:ring-lime-400 transition-all outline-none"
                            />
                        </div>

                        <div className="md:col-span-3 relative">
                            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-500/50 rounded-2xl focus:ring-2 focus:ring-lime-400 appearance-none outline-none cursor-pointer"
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
                                className="w-full pl-11 pr-4 py-3 border border-gray-500/50 rounded-2xl focus:ring-2 focus:ring-lime-400 appearance-none outline-none cursor-pointer"
                            >
                                <option value="default">Sort By: Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest Arrival</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-6 px-2 flex justify-between items-center">
                    <p className="font-bold">
                        Total Products (<span className="text-lime-600 font-bold">{filtered.length})</span>
                    </p>
                </div>

                {/* Product Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
                    ) : currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <Card key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full">
                            <ProductNotFound />
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-16">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="px-5 py-2.5 rounded-xl font-bold bg-white/80 border border-gray-200/50 text-gray-600 hover:bg-lime-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all shadow-sm"
                        >
                            Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === page
                                        ? "bg-lime-500 text-white shadow shadow-lime-200"
                                        : "bg-white/60 text-gray-600 hover:bg-gray-100/50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-5 py-2.5 rounded-xl font-bold bg-white/80 border border-gray-200/50 text-gray-600 hover:bg-lime-500 hover:text-white/90 disabled:opacity-50 transition-all shadow-sm"
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