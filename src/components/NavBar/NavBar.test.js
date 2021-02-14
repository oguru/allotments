import {MemoryRouter} from "react-router-dom";
import {checkProps, findByTestAttr} from "../../../utils/utils";
import {mount, shallow} from "enzyme";
import {cleanup, render} from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import React from "react";
import NavBar from "./NavBar";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";

describe(
   "NavBar tests", () => {
      let component;
      let matchMedia;
      const isActive = jest.fn();

      const fireResize = (width) => {
         window.innerWidth = width;
         window.dispatchEvent(new Event("resize"));
      };

      beforeEach(() => {
         matchMedia = new MatchMediaMock();
         component = mount(<MemoryRouter>
            <NavBar isActive={isActive} />
         </MemoryRouter>);
      });

      afterEach(() => {
         cleanup();
         matchMedia.clear();
      });

      // it(
      //    "should render without errors", () => {
      //       expect(render(component)).toBeTruthy();
      //    }
      // );

      // it(
      //    "should match the snapshot", () => {
      //       expect(component).toMatchSnapshot();
      //    }
      // );

      // it(
      //    "should contain 4 nav links", () => {
      //       expect(findByTestAttr(
      //          component, "navLink"
      //       ).length).toBe(4);
      //    }
      // );

      // it(
      //    "should have a burger menu icon", () => {
      //       expect(findByTestAttr(
      //          component, "burgerIcon"
      //       ).length).toBe(1);
      //    }
      // );

      // test(
      //    "NavBar PropTypes check should not throw a warning", () => {
      //       const expectedProps = {
      //          isActive: jest.fn()
      //       };
      //       const propsErr = checkProps(
      //          NavBar, expectedProps
      //       );
      //       expect(propsErr).toBeUndefined();
      //    }
      // );

      test(
         "temp test", () => {
            console.error(
               "pre-test text: ", findByTestAttr(
                  component, "tempTest"
               ).text()
            );

            fireResize(200);
            component.setProps({});

            const mediaQuery = "(min-width: 768px)";
            const listener = jest.fn();
            const mql = window.matchMedia(mediaQuery);

            mql.addEventListener(
               "change", ev => {
                  console.error(
                     "event: ", ev
                  );
                  // ev.matches && listener()
               }
            );

            act(() => {
               matchMedia.useMediaQuery(mediaQuery);
            });

            console.error(findByTestAttr(
               component, "tempTest"
            ).text());

            // console.error(
            //    mql.matches, mql.media
            // );

            // fireResize(100);
            // component.setProps({});

            // console.error(findByTestAttr(
            //    component, "tempTest"
            // ).text());

            // console.error(window.innerWidth);

         }
      );

      it(
         "should open the mobile navbar when burger menu is clicked", () => {
            // fireResize(700);

            // const closedHeight = findByTestAttr(
            //    component, "navOverlay"
            // ).instance().style.height;

            // console.error(closedHeight);

            // findByTestAttr(
            //    component, "burgerIcon"
            // ).simulate("click");

            // jest.useFakeTimers();

            // setTimeout(
            //    () => {
            //       console.error(findByTestAttr(
            //          component, "navOverlay"
            //       ).instance().style.height);
            //    }, 1500
            // );

            // jest.runAllTimers();

            // console.error(findByTestAttr(
            //    component, "navOverlay"
            // ).instance().style.height);

            // expect(findByTestAttr(
            //    component, "navOverlay"
            // ).instance().style.height).not.toEqual(closedHeight);
         }
      );

      // describe(
      //    "NavBar responsiveness tests", () => {

      //       it(
      //          "should show a burger icon on a mobile viewport only", () => {

      //             expect(findByTestAttr(
      //                component, "burgerIcon"
      //             ).length).toEqual(0);

      //             fireResize(700);

      //             expect(findByTestAttr(
      //                component, "burgerIcon"
      //             ).length).toEqual(1);
      //          }
      //       );
      //    }
      // );
   }
);