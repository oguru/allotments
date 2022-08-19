/* eslint-disable no-import-assign */
/* eslint-disable function-paren-newline */
import * as staticTxtContext from "../../context/staticTxtContext";
import {checkProps, findByTestAttr} from "../../util/utils";
import Hero from "./Hero";
import MatchMediaMock from "jest-matchmedia-mock";
import React from "react";
import {shallow} from "enzyme";

const matchMedia = new MatchMediaMock();

describe("Hero tests", () => {
   let component;
   let useStaticTxtSpy;
   let contextValues;

   const testProps = {
      content: {
         heroSubtitle: "heroSubtitle",
         heroTitle: "heroTitle",
         id: "home",
         image: "/imagepath",
         imageSm: "/smallimagepath",
         imageTint: 0.4,
         smallText: "smallText"
      }
   };

   describe("staticTxt === false tests", () => {

      beforeEach(() => {
         contextValues = {
            staticTxt: {
               home: false,
               about: false
            },
            updateStaticTxt: () => jest.fn()
         };

         useStaticTxtSpy = jest.spyOn(staticTxtContext, "useStaticTxt").mockImplementation(() => contextValues);

         component = shallow(
            <Hero content={testProps.content} />
         );
      });

      afterEach(() => {
         useStaticTxtSpy.mockReset();
      });

      test("Hero PropTypes check should not throw a warning", () => {
         const propsErr = checkProps(Hero, testProps);

         expect(propsErr).toBeUndefined();
      });

      it("should gain different styles if it is a Home Hero", () => {
         const heroCont = findByTestAttr(component, "heroCont");

         expect(heroCont
            .hasClass("homeStyle"))
            .toBe(true);

         component.setProps({content: {...testProps.content,
            id: "about"}});
         component.update();

         expect(findByTestAttr(component, "heroCont")
            .hasClass("homeStyle"))
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

      it("should render a Typist element if the static text value for the page is false", () => {
         expect(findByTestAttr(component, "typistCont").length).toBe(1);
      });
   });

   describe("staticTxt === true tests", () => {
      beforeEach(() => {
         contextValues = {
            staticTxt: {
               home: true,
               about: true
            },
            updateStaticTxt: () => jest.fn()
         };

         useStaticTxtSpy = jest.spyOn(staticTxtContext, "useStaticTxt").mockImplementation(() => contextValues);

         component = shallow(
            <Hero content={testProps.content} />
         );
      });

      afterEach(() => {
         useStaticTxtSpy.mockReset();
      });

      it("should not render a Typist element if the static text value for the page is true", () => {
         expect(findByTestAttr(component, "typistCont").length).toBe(0);
      });
   });
});
