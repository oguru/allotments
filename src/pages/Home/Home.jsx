import Hero from "../../components/Hero";
import React from "react";
import homeImg from "../../images/randy-fath-ey6g0z_fs0-unsplash.jpg";

const Home = () => {

   const heroContent = {
      heroTitle: "Welcome to Stechford Allotments",
      heroSubtitle: "Your gateway to healthier living",
      homepageText: "Click on a link in the navigation bar to learn more or to contact us",
      image: homeImg,
      imageTint: 0.4
   };

   return (
      <Hero
         content={heroContent}
         homeHero
      />
   );
};

export default Home;
