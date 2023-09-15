import React, {useState} from "react";
import Hero from "../../components/Hero";
import Notice from "../../components/Notice";
import PropTypes from "prop-types";
import {infoImages} from "../../images/imageExports";
import {plotData} from "../../data/plotData";
import styles from "./Info.module.scss";
import {useImageSize} from "../../context/imageSizeContext";

const Info = ({notices}) => {
   const img = infoImages;
   const {getImageSize} = useImageSize();
   const imgSize = getImageSize("info");

   const heroContent = {
      id: "info",
      heroTitle: "Plot Information & What's New",
      heroSubtitle: "Explore different plots to suit your needs and find updates and current news here",
      image: img.mainImg[imgSize],
      imageInit: img.mainImg.init,
      imageTint: 0.45
   };

   return (
      <>
         <Hero content={heroContent}/>
         <section className={`${styles.infoCont} ${styles.infoSection} container`}>
            <PlotInfo />
         </section>
         <section className={`${styles.infoSection} container`}>
            <h3 className="mb-4">Notices</h3>
            {notices.map(item => (
               <Notice
                  key={item.id}
                  item={item}
               />
            ))}
         </section>
         <section className={`${styles.infoSection} ${styles.contactSection} container`}>
            <h3 className="mb-4">
               Contact & How to Find Us
            </h3>
            <p>
               For more information, to book an allotment, or arrange a viewing please contact Carole on 07764 260 099 or via <span>
                  <a href = "mailto: francisroadallotments@gmail.com">
                     francisroadallotments@gmail.com
                  </a>
               </span> .
            </p>
            <p className="bold">
               Directions:
            </p>
            <p>
               Francis Road Allotments is sandwiched between Bordesley Green East and Francis Road (entrance on Richmond Road opposite the mosque).
            </p>
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1444.9136910322652!2d-1.8160123530754408!3d52.478312125148044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDI4JzQyLjMiTiAxwrA0OCc1NC42Ilc!5e0!3m2!1sen!2suk!4v1617529544435!5m2!1sen!2suk"
               className={styles.googleMap}
               allowFullScreen=""
               loading="lazy"
               title="Our Location"
            ></iframe>
         </section>
      </>
   );
};

Info.propTypes = {
   notices: PropTypes.array
};

const PlotInfo = () => {
   const [metreMeasure, setMetreMeasure] = useState(true);
   const [plotType, setPlotType] = useState("sm");

   const img = infoImages;

   const plotMinSm = plotType === "min" ?
      styles.plotMin : plotType === "sm" ?
         styles.plotSm : "";

   return (
      <>
         <h3>Plot Info</h3>
         {/* Plot container */}
         <div className="row">
            {/* Plot gui box */}
            <div className="col-xs-12 col-md-4">
               <div className="d-flex flex-column">
                  <div className={`${styles.plotArea} flex-grow-1`}>
                     <div className={styles.grassCont}>
                        <img
                           alt="Grass texture"
                           className={styles.grassTexture}
                           src={img.textures.grass}
                        />
                     </div>
                     <div className={`
                        ${styles.plotSizeCont}
                        ${styles.plotCont}
                        ${styles.plotTop}
                        rounded d-flex
                     `}>
                        <div
                           data-test="plotBackgroundTop"
                           className={`${styles.plotBackground} ${plotMinSm}`}
                        />
                     </div>
                     <div className={`
                        ${styles.plotCont} 
                        ${styles.plotSizeCont}
                        ${styles.plotBot}`}
                     >
                        <div
                           className={`
                              ${styles.plotBackground} 
                              ${styles.plotStandard} 
                              ${plotType === "st" ? styles.plotStandardIn : ""}
                           `}
                           data-test="plotBackgroundBot"
                        >
                        </div>
                     </div>
                  </div>
                  {/* Plot f/m controls */}
                  <div className="btn-group mb-4 w-100 d-flex">
                     <button
                        className={`
                           ${styles.plotBtn} 
                           ${styles[metreMeasure ? "btnActive" : ""]} 
                           btn w-50
                        `}
                        data-test="metreButton"
                        onClick={() => setMetreMeasure(true)}
                     >
                        Metres&sup2;
                     </button>
                     <button
                        className={`
                           ${styles.plotBtn} 
                           ${styles[metreMeasure ? "" : "btnActive"]} 
                           btn w-50
                        `}
                        data-test="yardsButton"
                        onClick={() => setMetreMeasure(false)}
                     >
                        Yards&sup2;
                     </button>
                  </div>
               </div>
            </div>
            {/* <!--Plot info--> */}
            <div className={`
               ${styles.plotDetails} 
               col d-flex flex-column justify-between
            `}>
               {/* <!--Top part of plot info--> */}
               <div className="mb-2 w-100">
                  <h4 className="mb-3">Plot Details</h4>
                  {/* Plot type buttons to alternate */}
                  <div
                     className={`${styles.plotButtons} btn-group w-100`}
                     data-toggle="buttons"
                  >
                     <button
                        className={`
                           ${styles.plotBtn} 
                           ${styles.plotSizeBtn} 
                           ${styles[plotType === "min" ? "btnActive" : ""]} 
                           btn btn-sm ml-0 mr-3 flex-grow-0
                        `}
                        data-test="minPlotButton"
                        onClick={() => setPlotType("min")}
                     >
                        Mini
                     </button>
                     <button
                        className={`
                           ${styles.plotBtn} 
                           ${styles.plotSizeBtn} 
                           ${styles[plotType === "sm" ? "btnActive" : ""]} 
                           btn btn-sm ml-0 mr-3 flex-grow-0
                        `}
                        data-test="smPlotButton"
                        onClick={() => setPlotType("sm")}
                     >
                        Small
                     </button>
                     <button
                        className={`
                           ${styles.plotBtn} 
                           ${styles.plotSizeBtn} 
                           ${styles[plotType === "st" ? "btnActive" : ""]} 
                           btn btn-sm ml-0 flex-grow-0
                        `}
                        data-test="stPlotButton"
                        onClick={() => setPlotType("st")}
                     >
                        Standard
                     </button>
                  </div>
                  <div>
                     <p data-test="plotSizeInfo">Size: {plotData[plotType].size[metreMeasure ? "m" : "yd"]}&sup2;</p>
                     <p data-test="plotPriceNormal">Normal Price: £{plotData[plotType].price.normal}</p>
                     <p data-test="plotPriceOap">OAP Price: £{plotData[plotType].price.oap}</p>
                  </div>
               </div>
            </div>
         </div>
         <p>
            There is the possibility to have half a plot (small and standard only) which will be slightly cheaper than above.</p>
         <div className="mt-5">
            <p className="font-weight-bold">
               Disclaimer
            </p>
            <p>
               These are the 2021 prices.
            </p>
            <p>
               The plots vary in length but are usually the same width in one unbroken strip.
            </p>
            <p>
               The purpose of the graph shown is to give a rough visual representation of the total area of each plot size in relation to the other.
            </p>
            <p>
               It is for comparison purposes only and does not accurately represent the layout of available plots. Please contact us directly for more specific information on available plots.
            </p>
         </div>
      </>
   );
};

export default Info;
