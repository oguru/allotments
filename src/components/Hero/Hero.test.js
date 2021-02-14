import {render, shallow} from "enzyme";
import React from "react";
import Hero from "./Hero";

describe("Hero tests", () => {
   let component;

   beforeEach(() => {
      component = shallow(<Hero
         content={
            "heroSubtitle",
            "heroTitle",
            "homepageText",
            "image"
         }
         isActive={true}
      />);
   });

   it("should render", () => {
      expect(render(component)).toBeTruthy();
   });

});
