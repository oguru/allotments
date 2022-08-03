import React from "react";
import articleStyles from "../components/Article/Article.module.scss";
import globalStyles from "../global.scss";

let count = 0;

const buildEl = (el, article) => {
   const imgCaption = el.caption ? `${"imgCaption"}` : "";

   if (el.floatImage) {
      return (
         <>
            <img
               alt={el.alt}
               className={`
                    ${el.floatDir} 
                    ${imgCaption}`
               }
               key={`${article || "about"}${count++}`}
               src={el.floatImage}
            />
            {el.content.map(subEl => buildEl(subEl))}
         </>
      );
   }

   return (
      <React.Fragment key={count++}>
         {el.subHeading &&
             <h5>{el.subHeading}</h5>
         }
         {el.bold &&
             <p className={`
                ${"bold"} 
                ${"articleTxt"}`
             }>
                {el.bold}
             </p>
         }
         {el.li &&
             <ul className={"ulStyle"}>
                {el.li.map(li => <li key={li}>{li}</li>)}
             </ul>
         }
         {el.liText &&
             <ul className={"liText"}>
                {el.liText.map(liText => <li key={liText}>{liText}</li>)}
             </ul>
         }
         {el.imageSm && el.imageLg &&
                <img
                   alt={el.alt}
                   className={`${"blockImg"} ${imgCaption}`}
                   srcSet={`${el.imageSm} 300w, ${el.imageLg} 1024w`}
                   src={el.imageSm} />
         }
         {el.splitImage &&
             <div className={`
                ${"splitImgCont"} 
                ${imgCaption}`
             }>
                <img
                   alt={el.splitImage.img1.alt}
                   className={"splitImage"}
                   src={el.splitImage.img1.img}
                />
                <img
                   alt={el.splitImage.img2.alt}
                   className={"splitImage"}
                   src={el.splitImage.img2.img}
                />
             </div>
         }
         {el.text &&
             <p className={`
                ${imgCaption} 
                ${"articleTxt"}`
             }>
                {el.text}
             </p>
         }
         {el.link &&
             <a
                className={"articleLink"}
                href={el.link}
                rel="noreferrer"
                target="_blank"
             >
                {el.link}
             </a>
         }
         {el.imageGrid &&
         <div className={"imageGridCont"}>
            {el.imageGrid.map(({img, text, alt}) => {
               return (
                  <div key={img}
                     className="gridBox"
                  >
                     <img className="gridImage" src={img} alt={alt}/>
                     <p className={"imgCaption articleTxt"}>{text || ""}</p>
                  </div>
               );
            })}
         </div>
         }
      </React.Fragment>
   );
};

const getContentJsx = (contentData, articles) => {
   const jsxContent = articles ?
      contentData.map(article => {
         return {
            credit: article.credit,
            id: article.id,
            mainImg: article.mainImg,
            mainImgBox: article.mainImgBox,
            mainImgAlt: article.mainImgAlt,
            path: article.path,
            title: article.title,
            initText: article.content[0].text,
            content: article.content.map(el => buildEl(el, article))
         };
      }) :
      contentData.map(el => buildEl(el));

   return jsxContent;
};

export {getContentJsx};