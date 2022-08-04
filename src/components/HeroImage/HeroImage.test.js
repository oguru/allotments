/* eslint-disable function-paren-newline */
/* eslint-disable no-extra-parens */
import {checkProps, findByTestAttr} from "../../../utils/utils";
import HeroImage from "./HeroImage";
import React from "react";
import mount from "enzyme/mount";
import src from "../../images/articles-main-lg.jpg";
import srcSm from "../../images/articles-main-sm.jpg";

describe("HeroImage tests", () => {
   let component;
   let testProps;

   beforeEach(() => {
      testProps = {
         homeStyle: "homeStyle",
         imageTint: 0.5,
         src,
         srcSm
      };

      component = mount(
         <HeroImage
            homeStyle={testProps.homeStyle}
            imageTint={testProps.imageTint}
            src={testProps.src}
            srcSm={testProps.srcSm}
         />
      );
   });

   test("HeroImage PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(HeroImage, testProps);

      expect(propsErr).toBeUndefined();
   });

   it("should match the snapshot", () => {
      expect(component)
         .toMatchSnapshot();
   });

   it("should have the correct background image inline styles", () => {
      const smBgStyle = findByTestAttr(
         component, "heroImage")
         .at(0)
         .props()
         .style
         .backgroundImage
         .replace(/ /gu, "");

      const smBgString = `linear-gradient(
            rgba(0, 0, 0, ${testProps.imageTint}),
            rgba(0, 0, 0, ${testProps.imageTint})
         ), url(${testProps.srcSm})`
         .replace(/ /gu, "");

      const lgBgStyle = findByTestAttr(
         component, "heroImage")
         .at(1)
         .props()
         .style
         .backgroundImage
         .replace(/ /gu, "");

      const lgBgString = `linear-gradient(
            rgba(0, 0, 0, ${testProps.imageTint}),
            rgba(0, 0, 0, ${testProps.imageTint})
         ), url(${testProps.src})`
         .replace(/ /gu, "");

      expect(smBgStyle).toEqual(smBgString);
      expect(lgBgStyle).toEqual(lgBgString);
   });

   it("should default to 0.3 opacity if no imageTint prop is provided", () => {
      component.setProps({imageTint: null});

      const smBgStyle = findByTestAttr(
         component, "heroImage")
         .at(0)
         .props()
         .style
         .backgroundImage
         .replace(/ /gu, "");

      const smBgString = `linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.3)
         ), url(${testProps.srcSm})`
         .replace(/ /gu, "");

      const lgBgStyle = findByTestAttr(
         component, "heroImage")
         .at(1)
         .props()
         .style
         .backgroundImage
         .replace(/ /gu, "");

      const lgBgString = `linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.3)
         ), url(${testProps.src})`
         .replace(/ /gu, "");

      expect(smBgStyle).toBe(smBgString);
      expect(lgBgStyle).toBe(lgBgString);
   });

   it("should have homeStyle class if homeStyle prop is provided", () => {
      expect(findByTestAttr(component, "heroImage")
         .at(0)
         .hasClass("homeStyle"))
         .toBe(true);
   });
});
