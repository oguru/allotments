import React, {useContext, useRef} from "react";
import PropTypes from "prop-types";

type StaticTxtProviderProps = {
   children: JSX.Element[];
 }
 
 type StaticTxt = {
   [key: string]: boolean;
 }
 
 type StaticTxtContextValue = {
   staticTxt: StaticTxt;
   updateStaticTxt: (pageName: string) => void;
 }
 

const StaticTxtContext = React.createContext<StaticTxtContextValue>(
   {} as StaticTxtContextValue
);

export const useStaticTxt = () => {
   return useContext(StaticTxtContext);
};

export default function StaticTxtProvider({
   children
}: StaticTxtProviderProps) {
   const staticTxt = useRef<StaticTxt>({
      about: false,
      admin: true,
      article: true,
      articles: false,
      home: false,
      info: false
   });

   const updateStaticTxt = (pageName: string) => {
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
