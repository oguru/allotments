import aboutImg from "./prince-abid-iy1k44aa4uq-unsplash.jpg";
import aboutImgSm from "./prince-abid-iy1k44aa4uq-unsplash-sm.jpg";
import articlesImg from "./dana-devolk-n_0wi_oruce-unsplash.jpg";
import articlesImgSm from "./dana-devolk-n_0wi_oruce-unsplash-sm.jpg";
import homeImg from "./randy-fath-ey6g0z_fs0-unsplash.jpg";
import infoImg from "./thom-holmes-3w9aalszgo0-unsplash.jpg";
import infoImgSm from "./thom-holmes-3w9aalszgo0-unsplash-sm.jpg";

const imagesInitial = [
   {src: homeImg,
      alt: "home"},
   {src: infoImgSm,
      alt: "info"},
   {src: articlesImgSm,
      alt: "articles"},
   {src: aboutImgSm,
      alt: "about"}
];

const imagesLg = [
   {src: infoImg,
      alt: "info"},
   {src: articlesImg,
      alt: "articles"},
   {src: aboutImg,
      alt: "about"}
];

export {imagesInitial, imagesLg};