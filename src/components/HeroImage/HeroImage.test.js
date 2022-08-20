/* eslint-disable function-paren-newline */
/* eslint-disable no-extra-parens */
import {checkProps, findByTestAttr} from "../../util/utils";
import HeroImage from "./HeroImage";
import React from "react";
import image from "../../images/main/articles/articles-main-lg.jpg";
import imageInit from "../../images/main/articles/articles-main-sm.jpg";
import mount from "enzyme/mount";

describe("HeroImage tests", () => {
   let component;
   let testProps;

   beforeEach(() => {
      testProps = {
         homeStyle: "homeStyle",
         imageTint: 0.5,
         image,
         imageInit
      };

      component = mount(
         <HeroImage
            homeStyle={testProps.homeStyle}
            imageTint={testProps.imageTint}
            image={testProps.image}
            imageInit={testProps.imageInit}
         />
      );
   });

   test("HeroImage PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(HeroImage, testProps);

      expect(propsErr).toBeUndefined();
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
         ), url(${testProps.imageInit})`
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
         ), url(${testProps.image})`
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
         ), url(${testProps.imageInit})`
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
         ), url(${testProps.image})`
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

   it("should not render the init div if no initImage is supplied", () => {
      component.setProps({imageInit: null});
      const heroImage = findByTestAttr(component, "heroImage");
      expect(heroImage.length).toBe(1);
      expect(heroImage.hasClass("initImg")).toBe(false);
   });
});
