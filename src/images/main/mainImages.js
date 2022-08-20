/* eslint-disable */

// main images
import aboutImgInit from "./about/about-main-init.jpg";
import aboutImgLg from "./about/about-main-lg.jpg";
import aboutImgMd from "./about/about-main-md.jpg";
import aboutImgSm from "./about/about-main-sm.jpg";

import adminImgLg from "./admin/admin-main-lg.jpg";
import adminImgMd from "./admin/admin-main-md.jpg";
import adminImgSm from "./admin/admin-main-sm.jpg";

import articlesImgInit from "./articles/articles-main-init.jpg";
import articlesImgLg from "./articles/articles-main-lg.jpg";
import articlesImgMd from "./articles/articles-main-md.jpg";
import articlesImgSm from "./articles/articles-main-sm.jpg";

import homeImgLg from "./home/home-main-lg.jpg";
import homeImgMd from "./home/home-main-md.jpg";
import homeImgSm from "./home/home-main-sm.jpg";

import grassTexture from "./info/info-grass-texture.jpg";
import infoImgInit from "./info/info-main-init.jpg";
import infoImgLg from "./info/info-main-lg.jpg";
import infoImgMd from "./info/info-main-md.jpg";
import infoImgSm from "./info/info-main-sm.jpg";

// about images
import After from "./about/about-after.jpg";
import After2 from "./about/about-after-2.jpg";
import Before from "./about/about-before.jpg";
import Before2 from "./about/about-before-2.jpg";
import Communal from "./about/about-communal-area.jpg";
import Communal2 from "./about/about-communal-area-2.jpg";
import Daffodils from "./about/about-daffodils.jpg";
import Flowers from "./about/about-flowers.jpg";
import Grass from "./about/about-grass.jpg";
import Path from "./about/about-path.jpg";
import Path2 from "./about/about-path-2.jpg";
import Path3 from "./about/about-path-3.jpg";
import Path4 from "./about/about-path-4.jpg";
import People from "./about/about-people.jpg";
import People2 from "./about/about-people-2.jpg";
import Plot from "./about/about-plot.jpg";
import Plot2 from "./about/about-plot-2.jpg";
import Plot3 from "./about/about-plot-3.jpg";
import SchoolPlot from "./about/about-school-plot.jpg";
import Seats from "./about/about-seats.jpg";
import Sheds from "./about/about-sheds.jpg";
import Welcome from "./about/about-welcome.jpg";

export const galleryImages = [
   {src: Welcome},
   {src: Before,
      alt: "Before"},
   {src: After,
      alt: "After"},
   {src: Before2,
      alt: "Before"},
   {src: After2,
      alt: "After"},
   {src: Communal,
      alt: "Community hub"},
   {src: Communal2,
      alt: "Community hub"},
   {src: Grass},
   {src: Path},
   {src: Path2},
   {src: Path3},
   {src: Plot},
   {src: Plot2},
   {src: Plot3},
   {src: SchoolPlot,
      alt: "One of our Primary School plots"},
   {src: Seats,
      alt: "Special seats for the little ones!"}
];

export const mainImagesInit = [
   {src: infoImgInit,
      id: "info"},
   {src: articlesImgInit,
      id: "articles"},
   {src: aboutImgInit,
      id: "about"}
];

export const aboutImages = {
   mainImg: {
      sm: aboutImgSm,
      md: aboutImgMd,
      lg: aboutImgLg,
      init: aboutImgInit
   },
   Daffodils,
   Flowers,
   People,
   People2,
   Path4,
   Sheds
};

export const adminImages = {
   mainImg: {
      sm: adminImgSm,
      md: adminImgMd,
      lg: adminImgLg,
   }
};

export const homeImages = {
   mainImg: {
      sm: homeImgSm,
      md: homeImgMd,
      lg: homeImgLg
   }
};

export const infoImages = {
   mainImg: {
      sm: infoImgSm,
      md: infoImgMd,
      lg: infoImgLg,
      init: infoImgInit
   },
   textures: {
      grass: grassTexture
   }
};

export const articlesImages = {
   mainImg: {
      sm: articlesImgSm,
      md: articlesImgMd,
      lg: articlesImgLg,
      init: articlesImgInit
   }
};
