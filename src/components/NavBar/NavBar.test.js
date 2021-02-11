import "../../../mocks/matchMedia";
import { MemoryRouter } from "react-router-dom";
import {checkProps, findByTestAttr} from "../../../utils/utils";
import {mount, shallow} from "enzyme";
import {render, cleanup} from "@testing-library/react";
import PropTypes from "prop-types";
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

   it("should render", () => {
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

describe("NavLink Tests", () => {
   let component;

   beforeEach(() => {
      component = shallow(
         <MemoryRouter>
            <NavLink isActive={isActive} />
         </MemoryRouter>
      );
   });

   describe("Checking NavLink PropTypes", () => {

      it("should not throw a warning", () => {
         const expectedProps = {
            closeNav: jest.fn(), 
            isActive: true,
            linkText: "test text", 
            path: "/testpath"
         }
         const propsErr = checkProps(NavBar, expectedProps)
         expect(propsErr).toBeUndefined();
      })
   })
})