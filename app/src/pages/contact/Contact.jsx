import { Helmet } from "react-helmet-async";
import SocialSection from "../../components/main/SocialSection";

const Contact = () => {
    return (
        <div>
            <Helmet>
                <title>Contact Us Page - My App</title>
                <meta name="description" content="This is the Contact page." />
                <link rel="canonical" href="https://myapp.com/contact" />
            </Helmet>
            
            <SocialSection />
        </div>
    );
};

export default Contact;