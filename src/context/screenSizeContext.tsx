import React, {useContext, useEffect, useState} from "react";
import {ChildrenProps, ImageSizes} from "../types";

interface ScreenSizeContextValue {
   screenSize: ImageSizes;
   mobileNav: boolean;
}

type SizeQueries = {
   size: ImageSizes,
   query: MediaQueryList
}[]

const ScreenSizeContext = React.createContext<ScreenSizeContextValue>({} as ScreenSizeContextValue);

export const useScreenSize = () => {
   return useContext(ScreenSizeContext);
};

const ScreenSizeProvider: React.FC<ChildrenProps> = ({children}) => {
   const [screenSize, setScreenSize] = useState("sm");
   const [mobileNav, setMobileNav] = useState(false);

   useEffect(() => {
      const mobileNavQuery = window.matchMedia("(max-width: 767px)");
      const mQuerySmall = window.matchMedia("screen and (max-width: 575px)");
      const mQueryLarge = window.matchMedia("screen and (min-width: 992px)");

      const sizeQueries: SizeQueries = [
         {size: "sm",
            query: mQuerySmall},
         {size: "lg",
            query: mQueryLarge}
      ];

      handleMediaQuery(sizeQueries);
      handleSetNav(mobileNavQuery);

      mobileNavQuery.addEventListener("change", () => handleSetNav(mobileNavQuery));
      mQuerySmall.addEventListener("change", () => handleMediaQuery(sizeQueries));
      mQueryLarge.addEventListener("change", () => handleMediaQuery(sizeQueries));

      return () => {
         mobileNavQuery.removeEventListener("change", () => handleSetNav(mobileNavQuery));
         mQuerySmall.removeEventListener("change", () => handleMediaQuery(sizeQueries));
         mQueryLarge.removeEventListener("change", () => handleMediaQuery(sizeQueries));
      };
   }, []);

   const handleMediaQuery = (mQueries: SizeQueries) => {
      for (let i = 0; i < 2; i++) {
         if (mQueries[i].query.matches) {
            setScreenSize(mQueries[i].size);
            return;  
         }
      }

      setScreenSize("md");
   };

   const handleSetNav = (mobileNavQuery: MediaQueryList) => {
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

export default ScreenSizeProvider;