import Hero from "../../components/Hero"
import homeImg from "../../images/randy-fath-ey6g0z_fs0-unsplash.jpg"
import React from "react";
import styles from "./Home.module.scss";

const Home = (props) => {

  const {isActive} = props;

  const heroContent = {
    heroTitle: "Welcome to Stechford Allotments",
    heroSubtitle: "Your gateway to healthier living",
    homepageText: "Click on a link in the navigation bar to learn more or to contact us",
    image: homeImg
  }  

  return (
    // <Container>
    // </Container>
      <Hero
        // image={homeImg}
        content={heroContent}
        isActive={isActive}
      />
  );
};

export default Home;
