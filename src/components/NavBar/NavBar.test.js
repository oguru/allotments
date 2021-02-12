import "../../../mocks/matchMedia";
import "jest-styled-components"
import {MemoryRouter} from "react-router-dom";
import {checkProps, findByTestAttr} from "../../../utils/utils";
import {mount, shallow} from "enzyme";
import {cleanup, render} from "@testing-library/react";
import React from "react";
import NavBar from "./NavBar";

describe("NavBar tests", () => {
   let component;
   const isActive = jest.fn();

   beforeEach(() => {
      component = mount(
         <MemoryRouter>
            <NavBar isActive={isActive} />
         </MemoryRouter>
      );
   });

   afterEach(cleanup);

   it("should render without errors", () => {
      expect(render(component)).toBeTruthy();
   });

   it("should match the snapshot", () => {
      expect(component).toMatchSnapshot();
   });

   it("should contain 4 nav links", () => {
      expect(findByTestAttr(component, "navLink")).toBe(4);
   });

   it("should have a burger menu icon", () => {
      expect(findByTestAttr(component, "burgerIcon")).toBe(1);
   });

   test("NavBar PropTypes check should not throw a warning", () => {
      const expectedProps = {
         isActive: jest.fn()
      };
      const propsErr = checkProps(NavBar, expectedProps)
      expect(propsErr).toBeUndefined();
   })

   // it("should add navbar links when burger menu is clicked", () => {
   //    expect(component.find(".navLinkBar").length).toBe(0);
   //    component.find(".burgerIcon").simulate("click");
   //    expect(component.find(".navLinkBar").length).toBe(1);
   // });
});