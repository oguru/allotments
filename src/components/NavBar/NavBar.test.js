/* eslint-disable function-paren-newline */
import * as screenSizeContext from "../../context/screenSizeContext";
import {checkProps, findByTestAttr} from "../../util/utils";
import {MemoryRouter} from "react-router-dom";
import NavBar from "./NavBar";
import React from "react";
import mount from "enzyme/mount";

describe("NavBar tests", () => {
   let component;
   let testProps;
   let contextValues;
   let useScreenSizeSpy;
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

   describe("mobileNav === true tests", () => {

      beforeEach(() => {
         testProps = {
            routes: testRoutes
         };

         contextValues = {
            screenSize: "sm",
            mobileNav: true
         };

         useScreenSizeSpy = jest.spyOn(screenSizeContext, "useScreenSize").mockImplementation(() => contextValues);

         component = mount(
            <MemoryRouter>
               <NavBar routes={testProps.routes} />
            </MemoryRouter>);
      });

      afterEach(() => {
         useScreenSizeSpy.mockReset();
      });

      test("NavBar PropTypes check should not throw a warning", () => {
         const propsErr = checkProps(NavBar, testProps);

         expect(propsErr).toBeUndefined();
      });

      it("should have a nav brand/title with the correct title", () => {
         expect(findByTestAttr(component, "navBrand")
            .text())
            .toBe("Francis Rd Allotments");
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

      it("should have a burger menu icon if mobileNav === true", () => {
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

   describe("mobileNav === false tests", () => {

      beforeEach(() => {
         testProps = {
            routes: testRoutes
         };

         contextValues = {
            screenSize: "sm",
            mobileNav: false
         };

         useScreenSizeSpy = jest.spyOn(screenSizeContext, "useScreenSize").mockImplementation(() => contextValues);

         component = mount(
            <MemoryRouter>
               <NavBar routes={testProps.routes} />
            </MemoryRouter>);
      });

      afterEach(() => {
         useScreenSizeSpy.mockReset();
      });

      it("should not render a burger menu icon if mobileNav === false", () => {
         expect(findByTestAttr(component, "burgerIcon").length).toBe(0);
      });
   });
});