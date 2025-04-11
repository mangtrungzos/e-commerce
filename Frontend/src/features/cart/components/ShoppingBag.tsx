import { useQuery } from "@tanstack/react-query"
import { getCart } from "../../../services/cart/cartService";
import { CircleExcelIcon } from "../../../assets/images/icons/icons";

interface Props {
    isVisible: boolean;
}

export const ShoppingBag: React.FC<Props> = ({ isVisible }) => {
    // Query data
    const { data, isLoading } = useQuery({
        queryKey: ['shopping-bag'],
        queryFn: getCart
    });

    const cartItems = data?.data?.items ?? [];

    if(isLoading) return (
        <div className={`
            bg-white pl-15 pr-17 pb-15 pt-12 rounded-[4px] w-[300px] shadow-[#ccc]
            absolute top-0 left-1/2 -translate-x-1/2
            transition-all duration-500 ease-in-out transform
            ${isVisible ? 'translate-y-0 opacity-100 visible' : '-translate-y-10 opacity-0 invisible'}
          `}>
            <div role="alert" className="flex gap-20">
                <div>
                    <CircleExcelIcon />
                </div>
                <div>
                    <span className="font-[GucciSansPro-light] text-[13px] text-[black]">Your shopping bag is empty</span>
                </div>
            </div>
        </div>
    );

    // if(error) return <div>{`Error: ${error}`}</div>

    return (
        <div className="relative">
            <div className=" absolute right-2/3 w-[488px] h-[490px] bg-white">
                <h1>Shopping Bag</h1>
                <div>
                    <ul>
                        {cartItems.map((item, index) => {
                            if (index === 0) {
                                return (
                                        <li className="flex" key={index}>
                                            <div>
                                                <img className="w-[120px] h-[140px]" src={item.productId.imageUrl} alt={item.productId.name} />
                                            </div>
                                            <div>
                                                <div>{item.productId.name}</div>
                                                <div>{item.productId.price}</div>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                    </ul>
                </div>
            </div>
        </div>
    )
}