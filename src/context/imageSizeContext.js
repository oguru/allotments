import React, {useContext, useRef} from "react";
import PropTypes from "prop-types";
import {useScreenSize} from "./screenSizeContext";

const ImageSizeContext = React.createContext();

export const useImageSize = () => {
   return useContext(ImageSizeContext);
};

export default function ImageSizeProvider({children}) {
   const {screenSize} = useScreenSize();
   const maxLoadedImageSize = useRef({
      home: screenSize
   });

   const sizeValues = {
      sm: 1,
      md: 2,
      lg: 3
   };

   const getImageSize = (entity) => {
      const currentSize = maxLoadedImageSize.current[entity];
      const currentVal = sizeValues[currentSize] || 0;
      const newVal = sizeValues[screenSize];

      if (!currentSize || newVal > currentVal) {
         maxLoadedImageSize.current[entity] = screenSize;
         return screenSize;
      }

      return currentSize;
   };

   return (
      <ImageSizeContext.Provider value={{
         getImageSize
      }}>
         {children}
      </ImageSizeContext.Provider>
   );
}

ImageSizeProvider.propTypes = {
   children: PropTypes.node
};