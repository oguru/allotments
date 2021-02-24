/* eslint-disable function-paren-newline */
import {mount, render, shallow} from "enzyme";
import App from "./App";
import MatchMediaMock from "jest-matchmedia-mock";
import {MemoryRouter} from "react-router-dom";
import React from "react";
import {findByTestAttr} from "../utils/utils";

const matchMedia = new MatchMediaMock();

describe("App shallow tests", () => {
   let component;

   beforeEach(() => {
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
      expect(findByTestAttr(component, "footer")
         .length)
         .toBe(1);
   });

   it("should contain a navbar", () => {
      expect(component.find("NavBar")
         .length)
         .toBe(1);
   });
});

describe("App mount tests", () => {
   let component;

   beforeEach(() => {
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

   it("it should show a loader and hide the main content if isLoading === true", () => {
      expect(findByTestAttr(component, "loaderCont")
         .length)
         .toBe(1);

      expect(findByTestAttr(component, "pageComponent")
         .find("Transition")
         .children()
         .length)
         .toBe(0);
   });

   it("should have an image pre-cache container with css class to hide", () => {
      expect(findByTestAttr(component, "preCacheHidden")
         .hasClass("preCacheHidden"))
         .toBe(true);
   });
});