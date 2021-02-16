import Hero from "../../components/Hero";
import React from "react";
import Typist from "react-typist";
import homeImg from "../../images/randy-fath-ey6g0z_fs0-unsplash.jpg";
import styles from "./Home.module.scss";

const Home = () => {

   const heroContent = {
      heroTitle: "Welcome to Stechford Allotments",
      heroSubtitle: "Your gateway to healthier living",
      homepageText: "Click on a link in the navigation bar to learn more or to contact us",
      image: homeImg
   };

   return (
      <Hero
         content={heroContent}
         homeHero={true}
      />
   );
};

export default Home;
