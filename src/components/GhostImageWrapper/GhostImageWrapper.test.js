import GhostImageWrapper from "./GhostImageWrapper";
import InfoMainImg from "../../images/info-main.jpg";
import React from "react";
import {findByTestAttr} from "../../util/utils";
import {mount} from "enzyme";

describe("GhostImageWrapper tests", () => {
   let component;

   const testProps = {
      alt: "test alt",
      classes: "test-class",
      src: InfoMainImg
   };

   it("it should show a loader and hide the image by adding the correct CSS classes if  isLoading === true", () => {
      const isLoading = true;
      React.useState = jest.fn().mockReturnValue([isLoading, {}]);

      component = mount(<GhostImageWrapper
         alt={testProps.alt}
         classes={testProps.classes}
         src={testProps.src}
      />);

      const wrapperImage = findByTestAttr(component, "wrapperImage");

      expect(findByTestAttr(component, "loaderCont")
         .length)
         .toBe(1);

      expect(findByTestAttr(component, "imageWrapperBackground")
         .length)
         .toBe(1);

      expect(wrapperImage
         .hasClass("wrapperImageLoaded"))
         .toBe(false);

      expect(wrapperImage
         .hasClass("wrapperImageInit"))
         .toBe(true);
   });

   it("it should not render the loader and show the image by adding the correct CSS classes if isLoading === false", () => {
      const isLoading = false;
      React.useState = jest.fn().mockReturnValue([isLoading, {}]);

      component = mount(<GhostImageWrapper
         alt={testProps.alt}
         classes={testProps.classes}
         src={testProps.src}
      />);

      const wrapperImage = findByTestAttr(component, "wrapperImage");

      expect(findByTestAttr(component, "loaderCont")
         .length)
         .toBe(0);

      expect(findByTestAttr(component, "imageWrapperBackground")
         .length)
         .toBe(0);

      expect(wrapperImage
         .hasClass("wrapperImageLoaded"))
         .toBe(true);

      expect(wrapperImage
         .hasClass("wrapperImageInit"))
         .toBe(false);
   });
});
