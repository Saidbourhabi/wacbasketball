import { Helmet } from 'react-helmet-async';
import SocialSection from "../../components/main/SocialSection";
import LatestNewsSwiper from "../../components/main/LatestNewsSwiper";
import ImageGallerySection from '../../components/main/ImageGallerySection';
import GameHero from '../../components/main/GameHero';

const Home = () => {
    return (
        <main>
        <Helmet >
            <title>Home Page - My App</title>
            <meta name="description" content="This is the home page." />
            <link rel="canonical" href="https://myapp.com/home" />
        </Helmet>
            <GameHero />
            <SocialSection />
            <LatestNewsSwiper />
            <ImageGallerySection />
        </main>
    );
};

export default Home;