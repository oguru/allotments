/* eslint-disable function-paren-newline */
import {checkProps, findByTestAttr} from "../../../utils/utils";
import MatchMediaMock from "jest-matchmedia-mock";
import {MemoryRouter} from "react-router-dom";
import NavBar from "./NavBar";
import React from "react";
import mount from "enzyme/mount";
import {render} from "@testing-library/react";

describe("NavBar tests", () => {
   let component;
   let matchMedia;
   const testRoutes = [
      {
         path: "/",
         name: "Home"
      },
      {
         path: "/about",
         name: "About"
      }
   ];

   beforeEach(() => {
      matchMedia = new MatchMediaMock();
      component = mount(
         <MemoryRouter>
            <NavBar
               isLargeScreen={false}
               routes={testRoutes}
            />
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

   it("should render 2 nav links from the testRoutes prop", () => {
      expect(findByTestAttr(component, "navLink")
         .length)
         .toBe(2);
   });

   it("should put the correct re-direct path on each nav link", () => {
      const navLinks = findByTestAttr(component, "navLink");

      expect(navLinks
         .find("[href='/about']")
         .text())
         .toBe("About");

      expect(navLinks
         .find("[href='/']")
         .text())
         .toBe("Home");
   });

   it("should send 'activeLink' or an empty string prop to each NavLink based on the current path", () => {
      const navLink = findByTestAttr(component, "navLink");

      expect(navLink
         .filter("[href='/about']")
         .hasClass("activeLink"))
         .toBe(false);

      expect(navLink
         .filter("[href='/']")
         .hasClass("activeLink"))
         .toBe(true);
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
         isLargeScreen: true,
         routes: testRoutes
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