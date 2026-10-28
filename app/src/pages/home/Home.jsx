import { Helmet } from 'react-helmet-async';
import SocialSection from "../../components/main/SocialSection";
import LatestNewsSwiper from "../../components/main/LatestNewsSwiper";
import ImageGallerySection from '../../components/main/ImageGallerySection';
import GameHero from '../../components/main/GameHero';
import NextMatchesSwiper from '../../components/main/NextMatchesSwiper';

const Home = () => {
    return (
        <main>
        <Helmet >
            <title>Wac Basketball - Home page</title>
            <meta name="description" content="This is the home page." />
            <link rel="canonical" href="https://myapp.com/home" />
        </Helmet>
            <GameHero />
            <NextMatchesSwiper />
            <LatestNewsSwiper />
            <ImageGallerySection />
            <SocialSection />
        </main>
    );
};

export default Home;