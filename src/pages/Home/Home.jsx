import Hero from "../../components/Hero";
import PropTypes from "prop-types";
import React from "react";

const Home = ({image}) => {
   const heroContent = {
      id: "home",
      heroTitle: "Welcome to Francis Road Allotments",
      heroSubtitle: "Your gateway to healthier living",
      smallText: "Click on a link in the navigation bar to learn more or to contact us",
      image,
      imageTint: 0.3
   };

   return (
      <Hero content={heroContent} />
   );
};

Home.propTypes = {
   image: PropTypes.string
};

export default Home;
