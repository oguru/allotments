import {checkProps, findByTestAttr} from "../../../utils/utils";
import MatchMediaMock from "jest-matchmedia-mock";
import MemoryRouter from "react-router-dom/MemoryRouter";
import NavBar from "./NavBar";
import React from "react";
import mount from "enzyme/mount";
import render from "@testing-library/react/render";

describe("NavBar tests", () => {
   let component;
   let matchMedia;
   const isActive = jest.fn();

   beforeEach(() => {
      matchMedia = new MatchMediaMock();
      component = mount(<MemoryRouter>
         <NavBar isActive={isActive} />
      </MemoryRouter>);
   });

   afterEach(() => {
      matchMedia.clear();
   });

   it("should render without errors", () => {
      expect(render(component))
         .toBeTruthy();
   });

   it("should match the snapshot", () => {
      expect(component)
         .toMatchSnapshot();
   });

   it("should have a nav brand/title with the correct title", () => {
      expect(findByTestAttr(component, "navBrand")
         .text())
         .toBe("Stechford Allotments");
   });

   test("nav brand/title should have the correct re-direct path to home", () => {
      expect(findByTestAttr(component, "navBrand")
         .filter("[href='/']")
         .length)
         .toBe(1);
   });

   it("should contain 4 nav links", () => {
      expect(findByTestAttr(component, "navLink")
         .length)
         .toBe(4);
   });

   it("should have the correct re-direct path on each nav link", () => {
      const navLinks = findByTestAttr(component, "navLink");

      expect(navLinks
         .find("[href='/about']")
         .text())
         .toBe("About");

      expect(navLinks
         .find("[href='/']")
         .text())
         .toBe("Home");

      expect(navLinks
         .find("[href='/info']")
         .text())
         .toBe("Info");

      expect(navLinks
         .find("[href='/articles']")
         .text())
         .toBe("Articles");
   });

   it("should have a burger menu icon", () => {
      expect(findByTestAttr(component, "burgerIcon").length).toBe(1);
   });

   test("burger menu icon elements should gain, then lose css class on click", () => {
      const burgerIcon = findByTestAttr(component, "burgerIcon");

      expect(burgerIcon.children(".navCross")
         .length)
         .toBe(0);

      burgerIcon.simulate("click");

      expect(findByTestAttr(component, "burgerIcon")
         .children(".navCross")
         .length)
         .toBe(3);

      burgerIcon.simulate("click");

      expect(findByTestAttr(component, "burgerIcon")
         .children(".navCross")
         .length)
         .toBe(0);
   });

   test("NavBar PropTypes check should not throw a warning", () => {
      const expectedProps = {
         isActive: jest.fn()
      };
      const propsErr = checkProps(NavBar, expectedProps);

      expect(propsErr).toBeUndefined();
   });

   it("should open, then close the mobile navbar when burger menu is clicked twice", () => {
      const navOverlay = findByTestAttr(component, "navOverlay");
      const burgerIcon = findByTestAttr(component, "burgerIcon");
      const closedHeight = navOverlay.instance().style.height;

      burgerIcon.simulate("click");

      expect(navOverlay
         .instance()
         .style
         .height)
         .not.toEqual(closedHeight);

      burgerIcon.simulate("click");

      expect(navOverlay
         .instance()
         .style
         .height)
         .toEqual(closedHeight);
   });

   it("should close the mobile navbar when a link is clicked", () => {
      const navOverlay = findByTestAttr(component, "navOverlay");

      findByTestAttr(component, "burgerIcon")
         .simulate("click");

      const openHeight = navOverlay.instance().style.height;

      findByTestAttr(component, "navLink")
         .find("[href='/about']")
         .simulate("click");

      expect(navOverlay
         .instance()
         .style
         .height)
         .not.toEqual(openHeight);
   });
});