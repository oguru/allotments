/* eslint-disable function-paren-newline */
import {checkProps, findByTestAttr} from "../utils/utils";
import App from "./App";
import MatchMediaMock from "jest-matchmedia-mock";
import {MemoryRouter} from "react-router-dom";
import React from "react";
import {render} from "@testing-library/react";
import {mount, shallow} from "enzyme";

describe("App shallow tests", () => {
   let component;

   beforeEach(() => {
      const matchMedia = new MatchMediaMock();
      component = shallow(
         <MemoryRouter>
            <App/>
         </MemoryRouter>
      ).children().dive();
   });

   it("should match the snapshot", () => {
      expect(component)
         .toMatchSnapshot();
   });

   it("should contain a footer", () => {
      expect(findByTestAttr(component, "footer").length).toBe(1);
   });

   it("should contain a navbar", () => {
      expect(component.find("NavBar").length).toBe(1);
   });
});

describe("App mount tests", () => {
   let component;

   beforeEach(() => {
      const matchMedia = new MatchMediaMock();
      component = mount(
         <MemoryRouter>
            <App/>
         </MemoryRouter>
      );
   });

   it("should render without errors", () => {

      expect(render(component))
         .toBeTruthy();
   });

   it("should render one static page component at a time", () => {
      expect(findByTestAttr(component, "pageComponent")
         .find("Transition")
         .children()
         .length)
         .toBe(1);
   });
});