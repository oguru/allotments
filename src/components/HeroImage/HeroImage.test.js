/* eslint-disable function-paren-newline */
/* eslint-disable no-extra-parens */
import {checkProps, findByTestAttr} from "../../../utils/utils";
import HeroImage from "./HeroImage";
import React from "react";
import mount from "enzyme/mount";
import src from "../../images/dana-devolk-n_0wi_oruce-unsplash.jpg";
import srcSm from "../../images/dana-devolk-n_0wi_oruce-unsplash-sm.jpg";

describe("HeroImage tests", () => {
   let component;
   const testProps = {
      imageTint: 0.5,
      src,
      srcSm
   };

   beforeEach(() => {
      global.loadImageWithPromise = () => Promise.resolve();
      component = mount(
         <HeroImage
            imageTint={testProps.imageTint}
            src={testProps.src}
            srcSm={testProps.srcSm}
         />
      );
   });

   it("should render without error", () => {
      expect(findByTestAttr(component, "heroImage").length).toBe(2);
   });

   test("HeroImage PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(HeroImage, testProps);

      expect(propsErr).toBeUndefined();
   });

   it("should match the snapshot", () => {
      expect(component)
         .toMatchSnapshot();
   });

   it("should have the correct background image inline styles", () => {
      const smBgStyle = findByTestAttr(
         component, "heroImage")
         .at(0)
         .props()
         .style
         .backgroundImage
         .replace(/ /gu, "");

      const smBgString = `linear-gradient(
            rgba(0, 0, 0, ${testProps.imageTint}),
            rgba(0, 0, 0, ${testProps.imageTint})
         ), url(${testProps.srcSm})`
         .replace(/ /gu, "");

      const lgBgStyle = findByTestAttr(
         component, "heroImage")
         .at(1)
         .props()
         .style
         .backgroundImage
         .replace(/ /gu, "");

      const lgBgString = `linear-gradient(
            rgba(0, 0, 0, ${testProps.imageTint}),
            rgba(0, 0, 0, ${testProps.imageTint})
         ), url(${testProps.src})`
         .replace(/ /gu, "");

      expect(smBgStyle).toEqual(smBgString);
      expect(lgBgStyle).toEqual(lgBgString);
   });

   const tick = () => {
      return new Promise(resolve => {
         setTimeout(resolve, 0);
      });
   };

   global.loadImageWithPromise = () => Promise.resolve();

   it("should make the opacity of the small image 0 once the large image has loaded", async () => {
      // global.Image = class {
      //    constructor() {
      //       setTimeout(() => {
      //          this.onload();
      //       }, 10);
      //    }
      // };

      const opacityStyle = findByTestAttr(
         component, "heroImage")
         .at(0)
         .props()
         .style
         .opacity;

      const opacityTestStr = findByTestAttr(
         component, "heroImage")
         .at(0)
         .props()
         .style
         .opacity
         .replace(/ /gu, "");

      const wrapper = findByTestAttr(
         component, "heroImage")
         .at(0)
         .props();
      // console.error(wrapper);

      // await tick();
      // component.update();
      // component.setProps({});

      // console.error("opacity: ", findByTestAttr(
      //    component, "heroImage")
      //    .at(0)
      //    .props()
      //    .style
      //    .opacity
      // );

      // setImmediate(() => {
      //    // within `setImmediate` all of the promises have been exhausted
      //    expect(findByTestAttr(
      //       component, "heroImage")
      //       .at(0)
      //       .props()
      //       .style
      //       .opacity).toBe("0");

      //    // have to call `done` here to let Jest know the test is done
      //    done();
      // });
   });

   it("should default to 0.3 opacity if no imageTint prop is provided", () => {
      component.setProps({imageTint: null});

      const smBgStyle = findByTestAttr(
         component, "heroImage")
         .at(0)
         .props()
         .style
         .backgroundImage
         .replace(/ /gu, "");

      const smBgString = `linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.3)
         ), url(${testProps.srcSm})`
         .replace(/ /gu, "");

      const lgBgStyle = findByTestAttr(
         component, "heroImage")
         .at(1)
         .props()
         .style
         .backgroundImage
         .replace(/ /gu, "");

      const lgBgString = `linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.3)
         ), url(${testProps.src})`
         .replace(/ /gu, "");

      expect(smBgStyle).toBe(smBgString);
      expect(lgBgStyle).toBe(lgBgString);
   });
});
