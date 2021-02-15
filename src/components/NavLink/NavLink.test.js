import {checkProps, findByTestAttr} from "../../../utils/utils";
import {cleanup, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import NavLink from "./NavLink";
import React from "react";
import {mount} from "enzyme";

describe("NavLink tests", () => {
   let component;
   const testProps = {
      closeNav: jest.fn(),
      isActive: false,
      linkText: "test text",
      path: "/testpath"
   };

   beforeEach(() => {
      component = mount(<MemoryRouter>
         <NavLink
            closeNav={testProps.closeNav}
            isActive={testProps.isActive}
            linkText={testProps.linkText}
            path={testProps.path}
         />
      </MemoryRouter>);
   });

   afterEach(cleanup);

   it("should render without errors", () => {
      expect(render(component))
         .toBeTruthy();
   });

   it("should match the snapshot", () => {
      expect(component)
         .toMatchSnapshot();
   });

   test("NavLink PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(NavLink, testProps);

      expect(propsErr).toBeUndefined();
   });

   it("should gain the correct CSS style if isActive === true", () => {
      expect(findByTestAttr(component, "navLink")
         .hasClass("activeLink"))
         .toBe(false);

      component.setProps({
         children: React
            .cloneElement(
               component
                  .props()
                  .children
               , {isActive: true}
            )
      });

      expect(findByTestAttr(component, "navLink")
         .hasClass("activeLink"))
         .toBe(true);
   });

   it("should call closeNav when a link is clicked", () => {
      findByTestAttr(component, "navLink").simulate("click");

      expect(testProps.closeNav.mock.calls.length).toBe(1);
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
