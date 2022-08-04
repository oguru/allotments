/* eslint-disable function-paren-newline */
import {checkProps, findByTestAttr} from "../../../utils/utils";
import {render, shallow} from "enzyme";
import Hero from "./Hero";
import React from "react";

describe("Hero tests", () => {
   let component;
   let testProps;

   beforeEach(() => {
      testProps = {
         content: {
            heroSubtitle: "heroSubtitle",
            heroTitle: "heroTitle",
            image: "/imagepath",
            imageSm: "/smallimagepath",
            imageTint: 0.4,
            smallText: "smallText"
         },
         homeHero: true
      };

      component = shallow(
         <Hero
            content={testProps.content}
            homeHero={true}
         />
      );
   });

   test("Hero PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(Hero, testProps);

      expect(propsErr).toBeUndefined();
   });

   it("should gain the correct styles based on the homeHero prop", () => {
      const heroCont = findByTestAttr(component, "heroCont");

      expect(heroCont
         .hasClass("homeStyles"))
         .toBe(true);

      component.setProps({homeHero: false});

      expect(findByTestAttr(component, "heroCont")
         .hasClass("homeStyles"))
         .toBe(false);
   });

   it("renders title, subtitle and homePage text based on props", () => {
      expect(findByTestAttr(component, "heroHeadText")
         .text())
         .toBe(testProps.content.heroTitle);

      expect(findByTestAttr(component, "hiddenText")
         .text())
         .toBe(testProps.content.heroTitle);

      expect(findByTestAttr(component, "heroSubText")
         .text())
         .toBe(testProps.content.heroSubtitle);

      expect(findByTestAttr(component, "smallText")
         .text())
         .toBe(testProps.content.smallText);
   });
});
