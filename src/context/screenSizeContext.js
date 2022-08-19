import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";

const ScreenSizeContext = React.createContext();

export const useScreenSize = () => {
   return useContext(ScreenSizeContext);
};

export default function ScreenSizeProvider({children}) {
   ScreenSizeProvider.propTypes = {
      children: PropTypes.node
   };

   const [screenSize, setScreenSize] = useState();
   const [mobileNav, setMobileNav] = useState(false);

   useEffect(() => {
      const mobileNavQuery = window.matchMedia("(max-width: 767px)");
      const mQuerySmall = window.matchMedia("screen and (max-width: 575px)");
      const mQueryLarge = window.matchMedia("screen and (min-width: 992px)");

      const sizeQueries = [
         {size: "sm",
            query: mQuerySmall},
         {size: "lg",
            query: mQueryLarge}
      ];

      handleMediaQuery(sizeQueries);

      mobileNavQuery.addEventListener("change", () => handleChangeNav(mobileNavQuery));
      mQuerySmall.addEventListener("change", () => handleMediaQuery(sizeQueries));
      mQueryLarge.addEventListener("change", () => handleMediaQuery(sizeQueries));

      return () => {
         mobileNavQuery.removeEventListener("change", mobileNavQuery);
         mQuerySmall.removeEventListener("change", mQuerySmall);
         mQueryLarge.removeEventListener("change", mQueryLarge);
      };
   }, []);

   const handleMediaQuery = (mQueries) => {
      for (let i = 0; i < 2; i++) {
         if (mQueries[i].query.matches) {
            setScreenSize(mQueries[i].size);
            return;
         }
      }

      setScreenSize("md");
   };

   const handleChangeNav = (mobileNavQuery) => {
      if (mobileNavQuery.matches) {
         setMobileNav(true);
      } else {
         setMobileNav(false);

      }
   };

   return (
      <ScreenSizeContext.Provider value={{
         screenSize,
         mobileNav
      }}>
         {children}
      </ScreenSizeContext.Provider>
   );
}
