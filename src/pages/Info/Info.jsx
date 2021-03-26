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

   const [measurementType, setMeasurementType] = useState("metres");
   const [standardPlot, setStandardPlot] = useState(true);
   const [plotSize, setPlotSize] = useState();

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

      if (standardPlot) {
         size = measurementType === "metres" ?
            "200m" : "250yd";
      } else {
         size = measurementType === "metres" ?
            "120m" : "180yd";
      }

      setPlotSize(size);
   }, [standardPlot, measurementType]);

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
            key={`${item.title}`}
            item={item}
         />
      ));
   };

   return (
      <>
         <Hero
            content={heroContent}
            staticTxt={staticTxt}
         />
         <section className={`${styles.infoCont} container`}>
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
                        <div className={`
                           ${styles.plotBackground}
                           ${styles.plotSizeCont}
                           ${styles.plotSmall}
                           rounded 
                           d-flex`}
                        />
                        {/* <div className="d-flex flex-grow-1 align-items-end justify-content-end ">
                              <p className="m-1">120</p>
                           </div> */}
                        <div className={`${styles.plotStandardCont} ${styles.plotSizeCont}`}>
                           <div className={`${styles.plotBackground} ${styles.plotStandard} ${standardPlot ? styles.plotStandardIn : ""}`}>
                           </div>
                        </div>
                     </div>

                     {/* Plot f/m controls */}
                     <div className="btn-group w-100 d-flex">
                        <button
                           className={`btn btn-primary active w-50`}
                           onClick={() => setMeasurementType("metres")}
                        >
                           Metres&sup2;
                        </button>
                        <button
                           className={`btn btn-primary w-50`}
                           onClick={() => setMeasurementType("yards")}
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
                     <h4>Plot Details</h4>

                     {/* Plot type buttons to alternate */}
                     <div className={`${styles.plotButtons} btn-group w-100`} data-toggle="buttons">
                        <button
                           className={`${styles.plotBtn} btn btn-sm btn-primary ml-0 mr-3 flex-grow-0`}
                           onClick={() => setStandardPlot(false)}
                        >
                           Small
                        </button>
                        <button
                           className={`${styles.plotBtn} btn btn-sm btn-primary ml-0 flex-grow-0`}
                           onClick={() => setStandardPlot(true)}
                        >
                           Standard
                        </button>
                     </div>
                     <div>
                        <p>Size: {plotSize}&sup2;</p>
                        {standardPlot ?
                           <>
                              <p>Normal Price: £93</p>
                              <p>OAP Price: £48</p>

                           </> :
                           <>
                              <p>Normal Price: £51</p>
                              <p>OAP Price: £27</p>
                           </>
                        }
                     </div>

                     <div>

                     </div>

                  </div>
               </div>
            </div>
            <div>
               <p className="font-weight-bold">Disclaimer</p>
               <p>The plots vary in length but are usually the same width, and one unbroken strip.</p>
               <p>The purpose of the graph shown is to give a rough visual representation of the total area of each plot size in relation to the other.</p>
               <p>It is for comparison purposes only and does not accurately represent the layout of available plots. Please contact us directly for more specific information on available plots.</p>
            </div>
         </section>

         <section className="container my-5">
            <h3 className="mb-4">Notices</h3>
            {buildNotices()}
         </section>
      </>
   );
};

export default Info;
