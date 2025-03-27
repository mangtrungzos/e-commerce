import { productsList } from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { RootStore } from "../../redux/store";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../customArrow/CustomArrow";

export const SuggestProducts: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        className: "gap-20",
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };

    // Query data
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: productsList
    });

    const productByCategory = useSelector((state: RootStore) => state.category.featureProductByWomen);

    // Filter products by category
    const filterProductsByCty = products.filter((product) => product.category === productByCategory)

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetcing products</p>;

    return (
        <div className="mt-[50px] pt-[50px]">
            <h3 className="uppercase font-[GucciSansPro-medium] pb-10">you may also like</h3>
            <div className="mx-auto px-4 max-w-[1300px]">
                <Slider {...settings}>
                    {filterProductsByCty.map((product, index) => (
                        <div key={index}>   
                            <div className="group relative overflow-hidden min-h-[300px]">
                                <img 
                                    className="w-[230px] h-[300px] cursor-pointer transition-transform duration-500 group-hover:scale-110" 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                />
                            </div>
                            <p className="font-[GucciSansPro-light] pt-10 pb-6">{product.name}</p>
                            <p className="font-[GucciSansPro-book]">{product.price}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}