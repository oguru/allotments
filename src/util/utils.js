/* eslint-disable */
import checkPropTypes from "check-prop-types";

export const findByTestAttr = (component, attr) => {
   const wrapper = component.find(`[data-test="${attr}"]`).hostNodes();
   return wrapper;
};

export const findMultipleByTestAttr = (component, attrArray ) => {
   return attrArray.map(attr => {
      const el = findByTestAttr(component, attr);
      
      return el;
   })
}

export const checkProps = (component, expectedProps) => {
   const propsErr = checkPropTypes(
      component.propTypes,
      expectedProps,
      "props",
      component.name
   );
   
   return propsErr;
};

export const formatDate = (date) => {
   const shortDate =
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

   return shortDate;
};