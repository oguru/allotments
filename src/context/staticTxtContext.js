import React, {useContext, useRef} from "react";
import PropTypes from "prop-types";

const StaticTxtContext = React.createContext();

export const useStaticTxt = () => {
   return useContext(StaticTxtContext);
};

export default function StaticTxtProvider({children}) {
   const staticTxt = useRef({
      about: false,
      admin: true,
      article: true,
      articles: false,
      home: false,
      info: false
   });

   const updateStaticTxt = (pageName) => {
      staticTxt.current[pageName] = true;
   };

   return (
      <StaticTxtContext.Provider value={{
         staticTxt: staticTxt.current,
         updateStaticTxt
      }}>
         {children}
      </StaticTxtContext.Provider>
   );
}

StaticTxtProvider.propTypes = {
   children: PropTypes.arrayOf(PropTypes.node)
};