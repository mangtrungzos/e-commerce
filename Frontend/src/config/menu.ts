export interface MenuItems {
    id?: string,
    title: string,
    path?: string,
    delay?: number,
}

// Menu Sidebar 1
export const MENU_ITEMS: MenuItems[] = [
    { title: 'Gifts' ,},
    { title: 'New In' },
    { title: 'Handbags' },
    { title: 'Travel' },
    { title: 'Women' },
    { title: 'Men' },
    { title: 'Children' },
    { title: 'Jewelry & Watches' },
    { title: 'Décor & Lifestyle' },
    { title: 'Fragrances & Make-Up' },
];

// Menu Sidebar 2
export const MENU_ITEMS_2: MenuItems[] = [
    { title: 'Gucci Services' },
    { title: 'World of Gucci' },
    { title: 'Store Locator' },
    
];

// Menu Profile
export const MENU_PROFILE: MenuItems[] = [
    { id: 'my account', title: 'my account', path: '/profile' },
    { id: 'sign in', title: 'sign in', path: '/login' },
    { title: 'my orders' },
    { title: 'account setting' },
    { title: 'address book' },
    { title: 'wallet' },
    { title: 'saved items' },
    { title: 'my appointments' },
    { id: 'sign out', title:'sign out' },
];

// Menu categories
export const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'women', label: 'women' },
    { id: 'men', label: 'men' },
    { id: 'bag', label: 'bag' },
    { id: 'shoes', label: 'shoes' },
    { id: 'watches', label: 'watches' },
]

// Menu header
export const MENU_HEADER: MenuItems[] = [
    { id: 'home', title: 'Home', path: '/' },
    { id: 'shop', title: 'Shop', path: '/shop' },
    { id: 'features', title: 'Features', path: '/cart' },
    { id: 'blog', title: 'Blog', path: '/blog' },
    { id: 'about', title: 'About', path: '/about' },
    { id: 'contact', title: 'Contact', path: '/contact' },
]

// Menu size
export const MENU_SIZE = [
    { id: 's', size: 'S' },
    { id: 'm', size: 'M' },
    { id: 'l', size: 'L' },
    { id:'xl', size: 'XL' },
    { id:'xxl', size: 'XXL' },
]