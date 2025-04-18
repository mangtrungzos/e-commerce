import config from "../config/config";
import { Home } from '../pages/Home';
import { Login } from '../features/auth/components/Login';
import { Register } from '../features/auth/components/Register';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import { ProductsList } from '../pages/ProductsList';
import { ProductDetail } from '../features/products/components/ProductDetail';
import { Cart } from '../features/cart/components/Cart';
import { Shop } from '../pages/Shop';
import { About } from '../pages/About';
import { Blog } from "../pages/Blog";
import { Contact } from "../pages/Contact";
import { OAuthSuccess } from "../auth/OAuthSuccess";

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
    { path: config.routes.shop, component: Shop },
    { path: config.routes.about, component: About },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.oauthSuccess, component: OAuthSuccess },
];

// Private routes: need sign in to access
const privateRoutes = [];

export { publicRoutes, privateRoutes };