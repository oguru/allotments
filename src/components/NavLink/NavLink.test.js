import React from "react";
import NavLink from "./NavLink";
import {MemoryRouter} from "react-router-dom";
import {checkProps, findByTestAttr} from "../../../utils/utils";
import {cleanup, render} from "@testing-library/react";
import {mount, shallow} from "enzyme";

describe("NavLink tests", () => {
   let component;

   beforeEach(() => {
      component = shallow(<MemoryRouter>
         <NavLink isActive={true} />
      </MemoryRouter>);
   });

   afterEach(cleanup);

   it("should render without errors", () => {
      expect(render(component)).toBeTruthy();
   });

   it("should match the snapshot", () => {
      expect(component).toMatchSnapshot();
   });

   test("NavLink PropTypes check should not throw a warning", () => {
      const expectedProps = {
         closeNav: jest.fn(),
         isActive: true,
         linkText: "test text",
         path: "/testpath"
      };
      const propsErr = checkProps(NavLink, expectedProps);
      expect(propsErr).toBeUndefined();
   });
});
