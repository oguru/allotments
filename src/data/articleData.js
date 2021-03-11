// import prep1img from "../images/art-1-main.jpg";
// import prep1thumb from "../images/art-1-main-sm.jpg";
// import soilPrep from "../images/art-1-soil-prep.jpg";
import {articleImages} from "../images/imageImports";

const img = articleImages;

const template = {
   id: 1,
   title: "",
   credit: "",
   mainImg: art1Mainimg,
   mainImgThumb: art1Mainthumb,
   mainImgAlt: "",
   path: "/articles/",
   content: [
      {
         text: "",
         subHeading: "",
         li: ["", ""],
         floatImage: img.art1PhTest,
         floatDir: "Right",
         alt: "Soil Ph Testing",
         content: [
            {
            }
         ]
      }
   ]
};

const articleData = [
   {
      id: 1,
      title: "Preparing A New Garden Plot",
      credit: "Article provided by homegardenseedassociation.com",
      mainImg: img.art1Mainimg,
      mainImgThumb: img.art1Mainthumb,
      mainImgAlt: "Dug soil",
      path: "/articles/new-plot",
      content: [
         {
            text: "Eliminating weeds and getting the soil ready for your flowers and vegetables are important first steps in growing a successful garden. Time spent in preparation reduces the time you'll have to spend maintaining and weeding your garden over the course of the growing season."
         },
         {
            subHeading: "Tools and Materials",
            li: ["String and wooden stakes", "Spade", "Glyphosate herbicide (optional)", "Hoe or mattock", "Steel garden rake", "Soil testing sample kit", "Soil amendments, as required", "Garden fork or rototiller"]
         },
         {
            floatImage: img.art1SoilPrep,
            floatDir: "Left",
            alt: "Soil preparation",
            content: [
               {
                  subHeading: "Choose the Spot",
                  text: "Vegetable gardens and most flowerbeds require at least 6 hours of full sun each day. Choose a level spot—either natural or terraced—that has well-drained soil, if possible. Thick grass or vigorous weed growth usually indicate soil drainage and nutrient levels that will support healthy garden plants."
               }
            ]
         },
         {
            subHeading: "Mark the Boundaries",
            text: "Outline the new garden plot with string and stakes, a hose, or a line of powdered limestone."
         },
         {
            subHeading: "Eliminate the Competition",
            text: "Remove existing lawn by slicing under the sod with a spade and cutting it into manageable pieces. Add the pieces to your compost or use it to patch bare spots elsewhere. Kill weeds with glyphosate herbicide, pull them by hand, or chop them with a hoe or mattock and rake them up. If time permits, you can smother grass and weeds with old carpeting or black plastic anchored to the ground. For best results, leave the covering in place for several weeks of hot weather."
         },
         {
            floatImage: img.art1PhTest,
            floatDir: "Right",
            alt: "Soil Ph Testing",
            content: [
               {
                  subHeading: "Test the Soil",
                  text: "Send a sample of garden soil to a private or cooperative extension office soil-testing lab for nutrient and pH analysis. Call the lab or a local garden center for a collection kit and instructions on how to collect the sample. Test results will tell you which minerals and pH amendments your soil needs to grow healthy vegetables and flowers."
               },
               {
                  subHeading: "Add Amendments",
                  text: "Adjust the soil pH (its measure of acidity or alkalinity) by adding ground limestone or sulfur as recommended by the soil test results. Improve the soil fertility, clay soil drainage, and sandy soil water holding capacity by adding organic material, such as compost, well-rotted livestock manure, or composted fir bark. Apply a 1- to 2-inch layer of organic material over the garden."
               }
            ]
         },
         {
            subHeading: "Turn the Soil",
            text: "Work the amendments into the top 6 to 12 inches of soil with a rototiller or garden fork. Break up large clods and remove rocks and roots. Work the soil only when it is dry enough to crumble easily after squeezing, never when it is saturated with water."
         },
         {
            subHeading: "Tips",
            text: "The best time to eliminate weeds and grass is the season before you plan to plant your garden. You can do it just prior to planting, too, but may have more weeds pop up throughout the growing season.Do-it-yourself soil test kits work best for detecting the soil pH, but give only a rough idea of the nutrient levels. Professional tests provide more thorough and accurate information and recommendations."
         }
      ]
   },
   {
      id: 2,
      title: "How Does Gardening Build Health",
      credit: "Article provided by homegardenseedassociation.com",
      mainImg: art1Mainimg,
      mainImgThumb: art1Mainthumb,
      mainImgAlt: "",
      path: "/articles/build-health",
      content: [
         {
            text: "",
            subHeading: "",
            li: ["", ""],
            floatImage: img.art1PhTest,
            floatDir: "Right",
            alt: "Soil Ph Testing",
            content: [
               {
               }
            ]
         }
      ]
   };
];

export {articleData};