import "@brainhubeu/react-carousel/lib/style.css";
import Carousel from "@brainhubeu/react-carousel";
import Hero from "../../components/Hero";
import PropTypes from "prop-types";
import React from "react";
import aboutImg from "../../images/about-main-lg.jpg";
import aboutImgSm from "../../images/about-main-sm.jpg";
import styles from "./About.module.scss";

const About = (props) => {
   const {aboutJsx, setStaticTxt, staticTxt} = props;

   About.propTypes = {
      aboutJsx: PropTypes.array,
      setStaticTxt: PropTypes.func,
      staticTxt: PropTypes.bool
   };

   const heroContent = {
      heroTitle: "About Us",
      heroSubtitle: "Where we started and how to get involved",
      image: aboutImg,
      imageSm: aboutImgSm,
      imageTint: 0.5

   };

   return (
      <>
         <Hero
            content={heroContent}
         />
         <section className="container">
            {aboutJsx}
            <Carousel plugins={["arrows"]}>
               <img src={aboutImg} />
               <img src={aboutImg} />
               <img src={aboutImg} />
               <img src={aboutImg} />
            </Carousel>
         </section>
      </>
   );
};

export default About;
