/* eslint-disable function-paren-newline */
import {checkProps, findByTestAttr} from "../../util/utils";
import {MemoryRouter} from "react-router-dom";
import NavLink from "./NavLink";
import React from "react";
import mount from "enzyme/mount";

describe("NavLink tests", () => {
   let component;
   const testProps = {
      handleCloseNav: jest.fn(),
      linkStyle: "",
      linkText: "test text",
      path: "/testpath"
   };

   beforeEach(() => {
      component = mount(
         <MemoryRouter>
            <NavLink
               handleCloseNav={testProps.handleCloseNav}
               linkStyle={testProps.linkStyle}
               linkText={testProps.linkText}
               path={testProps.path}
            />
         </MemoryRouter>);
   });

   it("should match the snapshot", () => {
      expect(component)
         .toMatchSnapshot();
   });

   test("NavLink PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(NavLink, testProps);

      expect(propsErr).toBeUndefined();
   });

   it("should gain the correct CSS style if linkStyle === 'activeLink'", () => {
      expect(findByTestAttr(component, "navLink")
         .hasClass("activeLink"))
         .toBe(false);

      component.setProps({
         children: React
            .cloneElement(
               component
                  .props()
                  .children
               , {linkStyle: "activeLink"}
            )
      });

      expect(findByTestAttr(component, "navLink")
         .hasClass("activeLink"))
         .toBe(true);
   });

   it("should call handleCloseNav when a link is clicked", () => {
      findByTestAttr(component, "navLink").simulate("click");

      expect(testProps.handleCloseNav.mock.calls.length).toBe(1);
   });

   it("should display render linkText and path props correctly", () => {
      expect(findByTestAttr(component, "navLink")
         .find(`[href="${testProps.path}"]`)
         .length)
         .toBe(1);

      expect(findByTestAttr(component, "navLink")
         .text())
         .toBe(testProps.linkText);
   });
});
