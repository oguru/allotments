import Hero from "../../components/Hero";
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import homeImg from "../../images/home-main.jpg";

const Home = (props) => {
   const {setStaticTxt, staticTxt} = props;

   Home.propTypes = {
      setStaticTxt: PropTypes.func,
      staticTxt: PropTypes.bool
   };

   useEffect(() => {
      if (!staticTxt) {
         setTimeout(() => {
            setStaticTxt(prevState => ({
               ...prevState,
               home: true
            }));
         }, 5000);
      }
   }, []);

   const heroContent = {
      heroTitle: "Welcome to Francis Rd Allotments",
      heroSubtitle: "Your gateway to healthier living",
      smallText: "Click on a link in the navigation bar to learn more or to contact us",
      image: homeImg,
      imageTint: 0.3
   };

   return (
      <Hero
         content={heroContent}
         homeHero
         staticTxt={staticTxt}
      />
   );
};

export default Home;
