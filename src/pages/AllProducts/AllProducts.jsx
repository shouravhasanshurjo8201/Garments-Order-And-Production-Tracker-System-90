import { useEffect, useState } from "react";
import Container from "../../components/Shared/Container";
import Card from "../../components/Home/Card";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ProductNotFound from "../ProductDetails/ProductNotFound";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(true);

    // API  Products Load
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await axiosSecure.get("/products");
                setProducts(res.data);
                setSearchData(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        loadProducts();
    }, [axiosSecure]);

    // Search Filter
    useEffect(() => {
        if (!products) return;
        setIsSearching(true);

        const timer = setTimeout(() => {
            const check = search.trim().toLowerCase();
            const filtered = check
                ? products.filter((p) =>
                    p.name.toLowerCase().includes(check)
                )
                : products;

            setSearchData(filtered);
            setIsSearching(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, products]);

    return (
        <Container>
            <div>
                <div>
                    {/* Title */}
                    <div className="text-center mb-2">
                        <h2 className="text-4xl font-bold">
                            <span className="text-lime-500">All Products</span>
                        </h2>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center p-2 ">
                        <div className="text-green-400 text-xl font-bold my-2">
                            Products Found <span>({searchData.length})</span>
                        </div>
                        <div>
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search Products"
                                className="w-68 md:w-95 py-1 my-2 pl-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>
                    </div>

                    {/* Loader, Cards, Product-Not-Found */}
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[30vh]">
                            <LoadingSpinner />
                        </div>
                    ) : searchData && searchData.length > 0 ? (
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                            {isSearching ? (
                                <div className="col-span-12 flex justify-center items-center">
                                    <LoadingSpinner />
                                </div>
                            ) : (
                                searchData.map((product) => (
                                    <Card key={product._id} product={product} />
                                ))
                            )}
                        </div>
                    ) : (
                        <ProductNotFound />
                    )}
                </div>
            </div>
        </Container>
    );
};

export default AllProducts;
