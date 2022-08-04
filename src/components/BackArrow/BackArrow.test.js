import {checkProps, findByTestAttr} from "../../../utils/utils";
import BackArrow from "./BackArrow";
import React from "react";
import {shallow} from "enzyme";

describe("BackArrow tests", () => {
   let component;
   let testProps;

   beforeEach(() => {
      testProps = {
         arrowStyle: "Light",
         handleClick: jest.fn
      };

      component = shallow(<BackArrow
         arrowStyle={testProps.arrowStyle}
         handleClick={testProps.handleClick}
      />);
   });

   test("BackArrow PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(BackArrow, testProps);

      expect(propsErr).toBeUndefined();
   });

   it("should gain the correct styles based on the arrowStyle prop", () => {
      let backBorder = findByTestAttr(component, "backBorder");

      expect(backBorder
         .hasClass("backBorderLight"))
         .toBe(true);

      component.setProps({arrowStyle: "Dark"});
      backBorder = findByTestAttr(component, "backBorder");

      expect(backBorder
         .hasClass("backBorderLight"))
         .toBe(false);

      expect(backBorder
         .hasClass("backBorderDark"))
         .toBe(true);
   });

   it("should change styles correctly onMouseEnter and onMouseLeave", () => {
      const backArrowCont = findByTestAttr(component, "backArrowCont");
      let backBorder = findByTestAttr(component, "backBorder");

      expect(backBorder
         .hasClass("backHoverLight"))
         .toBe(false);

      backArrowCont.simulate("mouseenter");
      backBorder = findByTestAttr(component, "backBorder");

      expect(backBorder
         .hasClass("backHoverLight"))
         .toBe(true);

      backArrowCont.simulate("mouseleave");
      backBorder = findByTestAttr(component, "backBorder");

      expect(backBorder
         .hasClass("backHoverLight"))
         .toBe(false);
   });
});
