import logo from './logo/logo.svg';
import slider from './banner/HP_Hero-FullBleed-Desktop_Gucci-SS25-Jan25-1-9-0474-11-F_001_Default.avif';
import angleRight from './icon/angle-right.svg';
import banner1 from './banner/banner-01.jpg';
import banner2 from './banner/banner-02.jpg';
import banner3 from './banner/banner-03.jpg';

interface Images {
    logo: string,
    slider: string,
    angleRight: string,
    banner1: string,
    banner2: string,
    banner3: string
}

const images: Images = {
    logo,
    slider,
    angleRight,
    banner1,
    banner2,
    banner3
} as const

export default images;