import config from "../config/config";
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import { ProductsList } from '../pages/ProductsList';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';

// Public routes: no need sign in to access
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.checkout, component: Checkout },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.products, component: ProductsList },
    { path: config.routes.productDetail, component: ProductDetail },
    { path: config.routes.cart, component: Cart },
];

// Private routes: need sign in to access
const privateRoutes = [];

export { publicRoutes, privateRoutes };