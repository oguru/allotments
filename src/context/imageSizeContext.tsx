import React, {useContext, useRef} from "react";
import {useScreenSize} from "./screenSizeContext";
import {ChildrenProps, ImageSizes} from "../types.js";

type Page = "about" | "info" | "articles" | "home";

type HandleImageSize = (entity: Page) => ImageSizes;

type StoredImageSizes = {
   home: ImageSizes;
   about?: ImageSizes;
   info?: ImageSizes;
   articles?: ImageSizes;
}

type ImageSizeContextValue = {
   handleImageSize: HandleImageSize
}

type ScreenSizeValues = {
   sm: 1,
   md: 2,
   lg: 3
}

const ImageSizeContext = React.createContext<ImageSizeContextValue>(
   {} as ImageSizeContextValue
);

export const useImageSize = () => {
   return useContext(ImageSizeContext);
};

const ImageSizeProvider: React.FC<ChildrenProps> = ({children}) => {
   const {screenSize} = useScreenSize();
   const maxLoadedImageSize = useRef<StoredImageSizes>({
      home: screenSize,
   });

   const SCREEN_SIZE_VAL_MAP: ScreenSizeValues = {
      sm: 1,
      md: 2,
      lg: 3
   };

   const handleImageSize: HandleImageSize = (pageName) => {
      const currentSize = maxLoadedImageSize.current[pageName];
      const currentVal = currentSize ? 
         SCREEN_SIZE_VAL_MAP[currentSize] : 0;
      const newVal = SCREEN_SIZE_VAL_MAP[screenSize];

      if (!currentSize || newVal > currentVal) {
         maxLoadedImageSize.current[pageName] = screenSize;
         return screenSize;
      }

      return currentSize;
   };

   return (
      <ImageSizeContext.Provider value={{
         handleImageSize
      }}>
         {children}
      </ImageSizeContext.Provider>
   );
}

export default ImageSizeProvider;