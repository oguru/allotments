// main images
import aboutImg from "./about-main.jpg";
import aboutImgSm from "./about-main-sm.jpg";
import articlesImg from "./articles-main.jpg";
import articlesImgSm from "./articles-main-sm.jpg";
import homeImg from "./home-main.jpg";
import infoImg from "./info-main.jpg";
import infoImgSm from "./info-main-sm.jpg";

// article images
import art1MainImg from "./art-1-main.jpg";
import art1MainSm from "./art-1-main-sm.jpg";
import art1PhTest from "./art-1-ph-test.jpg";
import art1SoilPrep from "./art-1-soil-prep.jpg";
import art2MainImg from "./art-2-main-md.jpg";
import art2MainThumb from "./art-2-main-sm.jpg";

const mainImagesInit = [
   {src: homeImg,
      alt: "home"},
   {src: infoImgSm,
      alt: "info"},
   {src: articlesImgSm,
      alt: "articles"},
   {src: aboutImgSm,
      alt: "about"}
];

const mainImagesLg = [
   {src: infoImg,
      alt: "info"},
   {src: articlesImg,
      alt: "articles"},
   {src: aboutImg,
      alt: "about"}
];

const articleImages = {
   art1MainImg,
   art1MainSm,
   art1SoilPrep,
   art1PhTest,
   art2MainImg,
   art2MainThumb
};

export {articleImages, mainImagesInit, mainImagesLg};