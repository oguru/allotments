import React, {useContext, useRef, useState} from "react";
import PropTypes from "prop-types";

const StaticTxtContext = React.createContext();

export const useStaticTxt = () => {
   return useContext(StaticTxtContext);
};

export default function StaticTxtProvider(props) {
   const {children} = props;

   StaticTxtProvider.propTypes = {
      children: PropTypes.object
   };

   const staticTxt = useRef({
      about: false,
      admin: true,
      article: true,
      articles: false,
      home: false,
      info: false
   });
   // const [staticTxt, setStaticTxt] = useState({
   //    about: false,
   //    admin: true,
   //    article: true,
   //    articles: false,
   //    home: false,
   //    info: false
   // });

   const updateStaticTxt = (pageName) => {
      staticTxt.current[pageName] = true;
      // setStaticTxt(prev => {
      //    return {...prev,
      //       [pageName]: true};
      // });
   };

   return (
      <StaticTxtContext.Provider value={{
         staticTxt: staticTxt.current,
         updateStaticTxt
         // setStaticTxt
      }}>{children}</StaticTxtContext.Provider>
   );
}
