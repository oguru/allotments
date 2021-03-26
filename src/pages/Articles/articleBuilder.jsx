import React from "react";
import articleStyles from "../../components/Article/Article.module.scss";

let count = 0;

const buildEl = el => {
   const imgCaption = el.caption ? `${articleStyles.imgCaption}` : "";

   if (el.floatImage) {
      return (
         <>
            <img
               alt={el.alt}
               className={`
                    ${articleStyles[el.floatDir]} 
                    ${imgCaption}`
               }
               key={count++}
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
                ${articleStyles.bold} 
                ${articleStyles.articleTxt}`
             }>
                {el.bold}
             </p>
         }
         {el.li &&
             <ul>
                {el.li.map(li => <li key={li}>{li}</li>)}
             </ul>
         }
         {el.liText &&
             <ul className={articleStyles.liText}>
                {el.liText.map(liText => <li key={liText}>{liText}</li>)}
             </ul>
         }
         {el.imageSm && el.imageLg &&
                <img
                   alt={el.alt}
                   className={`${articleStyles.blockImg} ${imgCaption}`}
                   srcSet={`${el.imageSm} 300w, ${el.imageLg} 1024w`}
                   src={el.imageSm} />
         }
         {el.splitImage &&
             <div className={`
                ${articleStyles.splitImgCont} 
                ${imgCaption}`
             }>
                <img
                   alt={el.splitImage.img1.alt}
                   className={articleStyles.splitImage}
                   src={el.splitImage.img1.img}
                />
                <img
                   alt={el.splitImage.img2.alt}
                   className={articleStyles.splitImage}
                   src={el.splitImage.img2.img}
                />
             </div>
         }
         {el.text &&
             <p className={`
                ${imgCaption} 
                ${articleStyles.articleTxt}`
             }>
                {el.text}
             </p>
         }
         {el.link &&
             <a
                className={articleStyles.articleLink}
                href={el.link}
                rel="noreferrer"
                target="_blank"
             >
                {el.link}
             </a>
         }
      </React.Fragment>
   );
};

const getArticlesJsx = (articleData) => {
   const articles = articleData.map(article => {
      return {
         credit: article.credit,
         id: article.id,
         mainImg: article.mainImg,
         mainImgBox: article.mainImgBox,
         mainImgAlt: article.mainImgAlt,
         path: article.path,
         title: article.title,
         initText: article.content[0].text,
         content: article.content.map(el => buildEl(el))
      };
   });
   return articles;
};

export default getArticlesJsx;