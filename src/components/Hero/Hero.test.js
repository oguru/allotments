/* eslint-disable function-paren-newline */
import {render, shallow} from "enzyme";
import Hero from "./Hero";
import React from "react";

describe("Hero tests", () => {
   let component;
   const mockContent = {
      heroSubtitle: "heroSubtitle",
      heroTitle: "heroTitle",
      homepageText: "homepageText",
      image: "/imagepath"
   };

   beforeEach(() => {
      component = shallow(
         <Hero
            content={mockContent}
            homeHero={true}
         />
      );
   });

   it("should render", () => {
      expect(render(component)).toBeTruthy();
   });

});
