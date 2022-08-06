import Hero from "../../components/Hero";
import React from "react";
import homeImg from "../../images/home-main.jpg";

const Home = () => {
   const heroContent = {
      id: "home",
      heroTitle: "Welcome to Francis Road Allotments",
      heroSubtitle: "Your gateway to healthier living",
      smallText: "Click on a link in the navigation bar to learn more or to contact us",
      image: homeImg,
      imageTint: 0.3
   };

   return (
      <Hero content={heroContent} />
   );
};

export default Home;
