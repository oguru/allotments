import React, {useEffect, useState} from "react";
import Hero from "../../components/Hero";
import Notice from "../../components/Notice";
import PropTypes from "prop-types";
import grassTexture from "../../images/info-grass-texture.jpg";
import infoImg from "../../images/info-main.jpg";
import infoImgSm from "../../images/info-main-sm.jpg";
import styles from "./Info.module.scss";

const Info = (props) => {
   const {notices, setStaticTxt, staticTxt} = props;

   Info.propTypes = {
      notices: PropTypes.array,
      setStaticTxt: PropTypes.func,
      staticTxt: PropTypes.bool
   };

   const [metreMeasure, setMetreMeasure] = useState(true);
   const [plotType, setPlotType] = useState("sm");
   const [plotSize, setPlotSize] = useState();
   const [plotInfo, setPlotInfo] = useState();

   useEffect(() => {
      if (!staticTxt) {
         setTimeout(() => {
            setStaticTxt(prevState => ({
               ...prevState,
               info: true
            }));
         }, 3000);
      }
   }, []);

   useEffect(() => {
      let size = "120m";
      let plotDetails;

      if (plotType === "min") {
         size = metreMeasure ?
            "Up to 80m" : "Up to 100yd";
         plotDetails =
         <>
            <p>Normal Price: £51</p>
            <p>OAP Price: £27</p>
         </>;
      } else if (plotType === "sm") {
         size = metreMeasure ?
            "85 - 167m" : "101 - 200yd";
         plotDetails =
         <>
            <p>Normal Price: £63</p>
            <p>OAP Price: £33</p>
         </>;
      } else {
         size = metreMeasure ?
            "168 - 334m" : "201 - 400yd";
         plotDetails =
         <>
            <p>Normal Price: £93</p>
            <p>OAP Price: £48</p>
         </>;
      }

      setPlotSize(size);
      setPlotInfo(plotDetails);
   }, [plotType, metreMeasure]);

   const heroContent = {
      heroTitle: "Plot Information & What's New",
      heroSubtitle: "Explore different plots to suit your needs and find updates and current news here",
      image: infoImg,
      imageSm: infoImgSm,
      imageTint: 0.45
   };

   const buildNotices = () => {
      return notices.map(item => (
         <Notice
            key={`${item.id}`}
            item={item}
         />
      ));
   };

   const mBtnAct = metreMeasure ? "btnActive" : "";
   const fBtnAct = metreMeasure ? "" : "btnActive";
   const sizeMinBtnAct = plotType === "min" ? "btnActive" : "";
   const sizeSmBtnAct = plotType === "sm" ? "btnActive" : "";
   const sizeStBtnAct = plotType === "st" ? "btnActive" : "";
   const plotStandardIn = plotType === "st" ? styles.plotStandardIn : "";
   const plotMinSm = plotType === "min" ?
      styles.plotMin : plotType === "sm" ?
         styles.plotSm : "";

   return (
      <>
         <Hero
            content={heroContent}
            staticTxt={staticTxt}
         />
         <section className={`${styles.infoCont} ${styles.infoSection} container`}>
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
                              src={grassTexture}
                           />
                        </div>
                        {/* <div className={`
                           ${styles.plotBackground}
                           ${styles.plotSizeCont}
                           ${styles.plotSmall}
                           rounded
                           d-flex`}
                        /> */}
                        <div className={`
                           ${styles.plotSizeCont}
                           ${styles.plotCont}
                           ${styles.plotTop}
                           rounded 
                           d-flex`}
                        >
                           <div className={`
                              ${styles.plotBackground} 
                              ${plotMinSm}`}>
                           </div>
                        </div>
                        {/* <div className="d-flex flex-grow-1 align-items-end justify-content-end ">
                              <p className="m-1">120</p>
                           </div> */}
                        <div className={`
                           ${styles.plotCont} 
                           ${styles.plotSizeCont}
                           ${styles.plotBot}`}
                        >
                           <div className={`
                              ${styles.plotBackground} 
                              ${styles.plotStandard} 
                              ${plotStandardIn}`}
                           >
                           </div>
                        </div>

                        {/* <div className={`${styles.plotCont} ${styles.plotSizeCont}`}>
                           <div className={`${styles.plotBackground} ${styles.plotStandard} ${plotStandardIn}`}>
                           </div>
                        </div> */}
                     </div>

                     {/* Plot f/m controls */}
                     <div className="btn-group mb-4 w-100 d-flex">
                        <button
                           className={`${styles.plotBtn} ${styles[mBtnAct]} btn w-50`}
                           onClick={() => setMetreMeasure(true)}
                        >
                           Metres&sup2;
                        </button>
                        <button
                           className={`${styles.plotBtn} ${styles[fBtnAct]} btn w-50`}
                           onClick={() => setMetreMeasure(false)}
                        >
                           Yards&sup2;
                        </button>
                     </div>
                  </div>
               </div>

               {/* <!--Plot info--> */}
               <div className={`${styles.plotDetails} col d-flex flex-column justify-between`}>

                  {/* <!--Top part of plot info--> */}
                  <div className="mb-2 w-100">
                     <h4 className="mb-3">Plot Details</h4>

                     {/* Plot type buttons to alternate */}
                     <div className={`${styles.plotButtons} btn-group w-100`} data-toggle="buttons">
                        <button
                           className={`${styles.plotBtn} ${styles[sizeMinBtnAct]} btn btn-sm ml-0 mr-3 flex-grow-0`}
                           onClick={() => setPlotType("min")}
                        >
                           Mini
                        </button>
                        <button
                           className={`${styles.plotBtn} ${styles[sizeSmBtnAct]} btn btn-sm ml-0 mr-3 flex-grow-0`}
                           onClick={() => setPlotType("sm")}
                        >
                           Small
                        </button>
                        <button
                           className={`${styles.plotBtn} ${styles[sizeStBtnAct]} btn btn-sm ml-0 flex-grow-0`}
                           onClick={() => setPlotType("st")}
                        >
                           Standard
                        </button>
                     </div>
                     <div>
                        <p>Size: {plotSize}&sup2;</p>
                        {plotInfo}
                     </div>

                     <div>

                     </div>

                  </div>
               </div>
            </div>
            <p>There is the possibility to have half a plot (small and standard only) which will be slightly cheaper than above.</p>
            <div className="mt-5">

               <p className="font-weight-bold">Disclaimer</p>
               <p>These are the 2021 prices.</p>
               <p>The plots vary in length but are usually the same width in one unbroken strip.</p>
               <p>The purpose of the graph shown is to give a rough visual representation of the total area of each plot size in relation to the other.</p>
               <p>It is for comparison purposes only and does not accurately represent the layout of available plots. Please contact us directly for more specific information on available plots.</p>
            </div>
         </section>

         <section className={`${styles.infoSection} container`}>
            <h3 className="mb-4">Notices</h3>
            {buildNotices()}
         </section>

         <section className={`${styles.infoSection} ${styles.contactSection} container`}>
            <h3 className="mb-4">Contact & How to Find Us</h3>
            <p>For more information, to book an allotment, or arrange a viewing please contact Carole on 07764 260 099 or via <span><a href = "mailto: francisroadallotments@gmail.com">francisroadallotments@gmail.com</a></span> .</p>
            <p className="bold">Directions:</p>
            <p>Francis Road Allotments is sandwiched between Bordesley Green East and Francis Road (entrance on Richmond Road opposite the mosque).</p>
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1444.9136910322652!2d-1.8160123530754408!3d52.478312125148044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDI4JzQyLjMiTiAxwrA0OCc1NC42Ilc!5e0!3m2!1sen!2suk!4v1617529544435!5m2!1sen!2suk"
               // width="600"
               // height="450"
               className={styles.googleMap}
               allowFullScreen=""
               loading="lazy"
               title="Our Location"
            ></iframe>
         </section>
      </>
   );
};

export default Info;
