import Modal from './main/Modal';
import BannerHero from './banner/BannerHero';
import CategoriesMounts from './categories/CategoriesMount';
import FeaturedProduct from './featured_product/FeaturedProduct '

const Home = () => {
    return (
           <>
                <Modal/>
                <BannerHero/>
                <CategoriesMounts/>
                <FeaturedProduct/>
           </>
    )
}
export default Home;