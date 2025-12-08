import { useEffect, useState } from "react";
import Container from "../../components/Shared/Container";
import Card from "../../components/Home/Card";
import { TbFidgetSpinner } from "react-icons/tb";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AllProducts = () => {
    const products = [
        {
            id: 1,
            name: "Money Plant 1",
            category: "Indoor",
            quantity: 10,
            price: 15,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "A Money Plant is known for bringing prosperity and positive vibes."
        },
        {
            id: 2,
            name: "Money Plant 2",
            category: "Indoor",
            quantity: 8,
            price: 12,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "A beautiful money plant to enhance positivity in your home."
        },
        {
            id: 3,
            name: "Money Plant 3",
            category: "Indoor",
            quantity: 5,
            price: 10,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "Bring prosperity and luck with this money plant."
        },
        {
            id: 4,
            name: "Money Plant 4",
            category: "Indoor",
            quantity: 7,
            price: 14,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "A perfect indoor plant to decorate your room."
        },
        {
            id: 5,
            name: "Money Plant 5",
            category: "Indoor",
            quantity: 6,
            price: 16,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "Easy to maintain and brings positive energy."
        },
        {
            id: 6,
            name: "Money Plant 6",
            category: "Indoor",
            quantity: 9,
            price: 18,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "Enhance your workspace with this lucky plant."
        },
        {
            id: 7,
            name: "Money Plant 7",
            category: "Indoor",
            quantity: 4,
            price: 20,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "Adds beauty and positive vibes to your home."
        },
        {
            id: 8,
            name: "Money Plant 8",
            category: "Indoor",
            quantity: 3,
            price: 22,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "A perfect gift for friends and family."
        },
        {
            id: 9,
            name: "Money Plant 9",
            category: "Indoor",
            quantity: 8,
            price: 17,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "Brings prosperity and happiness wherever placed."
        },
        {
            id: 10,
            name: "Money Plant 10",
            category: "Indoor",
            quantity: 5,
            price: 19,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "A symbol of wealth and positive energy."
        },
        {
            id: 11,
            name: "Money Plant 11",
            category: "Indoor",
            quantity: 6,
            price: 21,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "Enhance your interior with this indoor plant."
        },
        {
            id: 12,
            name: "Money Plant 12",
            category: "Indoor",
            quantity: 7,
            price: 25,
            image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
            description: "A beautiful lucky plant to decorate your home or office."
        },
    ]

    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchData, setSearchData] = useState(products);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchData(products);
            setLoading(false);
        }, 500); 
        return () => clearTimeout(timer);
    }, []);

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
    }, [search]);

    return (
        <Container>
            <div>
                <div>
                    <div className="text-center mb-2">
                        <h2 className="text-4xl font-bold">
                            <span className="text-lime-500">All Products</span>
                        </h2>
                    </div>

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

                    {loading ? (
                        <div className="flex justify-center items-center min-h-[30vh]">
                            <LoadingSpinner/>
                        </div>
                    ) : searchData && searchData.length > 0 ? (

                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                            {isSearching ? (
                                <div className="col-span-12 flex justify-center items-center">
                                    <LoadingSpinner/>
                                </div>
                            ) : (
                                searchData.map((product) => (
                                    <Card key={product.id} product={product} />
                                ))
                            )}
                        </div>

                    ) : (
                        <div className="min-h-[30vh] flex flex-col items-center justify-center text-center">
                            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                                No Products Found
                            </h2>
                            <p className="text-gray-500">
                                Nothing to show right now. Export products to fill this space.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default AllProducts;
