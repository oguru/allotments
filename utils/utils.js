/* eslint-disable */
import checkPropTypes from "check-prop-types";

export const findByTestAttr = (component, attr) => {
   const wrapper = component.find(`[data-test="${attr}"]`).hostNodes();
   return wrapper;
};

export const checkProps = (component, expectedProps) => {
   const propsErr = checkPropTypes(
      component.propTypes,
      expectedProps,
      "props",
      component.name
   );
   return propsErr;
};