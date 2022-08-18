import "react-gallery-carousel/dist/index.css";
import {aboutImages, galleryImages} from "../../images/imageImports";
import Carousel from "react-gallery-carousel";
import Hero from "../../components/Hero";
import React from "react";
import styles from "./About.module.scss";
import {useImageSize} from "../../context/imageSizeContext";

const About = () => {
   const img = aboutImages;

   const {getImageSize} = useImageSize();

   const imgSize = getImageSize("about");

   const heroContent = {
      id: "about",
      heroTitle: "About Us",
      heroSubtitle: "Where we started and how to get involved",
      image: img.mainImg[imgSize],
      imageInit: img.mainImg.init,
      imageTint: 0.5
   };

   return (
      <>
         <Hero content={heroContent} />
         <section className={`${styles.aboutSection} container`}>
            <p className={`
                ${"articleTxt"}`
            }>
               Francis Road Allotments is sandwiched between Bordesley Green East and Francis Road (entrance on Richmond Road opposite the mosque). It is one of the oldest allotments in Birmingham and goes back to the First World War when a piece of land to grow much needed food during the war was highly sought after.
            </p>
            <p className={`
                ${"articleTxt"}`
            }>
               This followed on throughout the Second World War and up until the 80s was a thriving allotment with a host of gardeners and a long waiting list. Unfortunately, this declined during the 90s and even further over the first 10 years of this Millennium until the Council decided to close it.</p>
            <p className={`
                ${"articleTxt"}`
            }>
               The remaining 4 plotholders on the site were up in arms and such was the strength of feeling that the Council said if we could raise the profile and get new plotholders onto the site, they would keep it open.
            </p>
            <p className={`
                ${"articleTxt"}`
            }>
               The next two weeks were spent knocking on everyone’s doors in the area to drum up interest. The response was so good that the Council gave us a stay of execution and totally renovated the site.
            </p>
            <p className={`
                ${"articleTxt"}`
            }>
               In the Spring of 2007 we had a grand opening and 34 new plotholders came on board.
            </p>
            <div className={`
                ${"splitImgCont"}`
            }>
               <img
                  alt={"Daffodils"}
                  className={"splitImage"}
                  src={img.Daffodils}
               />
               <img
                  alt={"Mixed colour flowers"}
                  className={"splitImage"}
                  src={img.Flowers}
               />
            </div>
            <p className={`
                ${"articleTxt"}`
            }>
               People have come and gone over the years – it is hard, continuous work in the growing season, but for anyone who has tasted home grown vegetables will know that the rewards are immense – there is no taste like it! It doesn’t have to be all vegetables of course… Added to this is the social side of getting out in the fresh air and having a chat with other people on the site.
            </p>
            <p className={`
                ${"articleTxt"}`
            }>
               In October 2019 we became an Association, responsible for all areas of looking after the allotment. Before lockdown, we held various social functions in our Community Hub and have enjoyed the artwork and input from Arts in the Yard who have made our site part of their Arts Trail – Stechford on Sea! Now lockdown is easing, we hope to hold further functions for the wider community – watch this space!!
            </p>
            <div className={styles.gridImgCont}>
               <img
                  alt={"Soup share community event"}
                  className={"splitImage"}
                  src={img.People2}
               />
               <img
                  alt={"Art painted container with people"}
                  className={"splitImage"}
                  src={img.People}
               />
               <img
                  alt={"Painted sheds"}
                  className={"splitImage"}
                  src={img.Sheds}
               />
               <img
                  alt={"Thin painted sheds and path"}
                  className={"splitImage"}
                  src={img.Path4}
               />
            </div>
            <p className={`
                ${"articleTxt"}`
            }>
               We are now up to two thirds capacity – a much smaller site than in the 1900s, but a thriving, friendly one.
            </p>
            <p className={`
                ${"articleTxt"}`
            }>
               Please feel free to send your ideas, give your thoughts, or even have a moan, and thank you for visiting our site.
            </p>
            <p className="articleTxt bold">
               Gallery
            </p>
            <div className={styles.galleryCont}>
               <Carousel style={{borderRadius: "0.25rem"}} objectFit="contain" hasCaptions="bottom" images={galleryImages} />
            </div>
         </section>
      </>
   );
};

export default About;
