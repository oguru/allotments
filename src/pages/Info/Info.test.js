/* eslint-disable */ 
import * as plotDataImport from "../../data/plotData";
 import {checkProps, findByTestAttr} from "../../util/utils";
import Info from "./Info";
import MatchMediaMock from "jest-matchmedia-mock";
import React from "react";
import StaticTxtProvider from "../../context/staticTxtContext";
import {mount} from "enzyme";
import ImageSizeProvider from "../../context/imageSizeContext.tsx";
import ScreenSizeProvider from "../../context/screenSizeContext.tsx";

const matchMedia = new MatchMediaMock();

describe("Info tests", () => {
   let component;
   const mockNotices = [
      {
         date: "26/07/2022",
         desc: "test notice description",
         id: "yPeQtmygeVZFt0Cb898R",
         title: "test notice title"
      },
      {
         date: "28/07/2022",
         desc: "test notice description 2",
         id: "sfsdf£f3f33f4dfdf",
         title: "test notice title 2"
      }
   ];

   const testProps = {
      notices: mockNotices
   };

   const mockPlotData = {
      min: {
         price: {
            normal: 51,
            oap: 27
         },
         size: {
            m: "Up to 80m",
            yd: "Up to 100yd"
         }
      },
      sm: {
         price: {
            normal: 63,
            oap: 33
         },
         size: {
            m: "85 - 167m",
            yd: "101 - 200yd"
         }
      },
      st: {
         price: {
            normal: 93,
            oap: 48
         },
         size: {
            m: "168 - 334m",
            yd: "201 - 400yd"
         }
      }
   };

   plotDataImport.plotData = mockPlotData;

   beforeEach(() => {
      component = mount(
      <ScreenSizeProvider>
         <ImageSizeProvider>
            <StaticTxtProvider>
               [<Info notices={testProps.notices} />]
            </StaticTxtProvider>
         </ImageSizeProvider>
      </ScreenSizeProvider>);
   });

   test("Info PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(Info, testProps);

      expect(propsErr).toBeUndefined();
   });

   it("should add the correct css classes depending on what plot size button is selected", () => {
      const minPlotButton = findByTestAttr(component, "minPlotButton");
      const smPlotButton = findByTestAttr(component, "smPlotButton");
      const stPlotButton = findByTestAttr(component, "stPlotButton");

      minPlotButton.simulate("click");
      component.update();

      let plotBackgroundTop = findByTestAttr(component, "plotBackgroundTop");
      let plotBackgroundBot = findByTestAttr(component, "plotBackgroundBot");

      expect(plotBackgroundBot.hasClass("plotStandardIn")).toBe(false);
      expect(plotBackgroundTop.hasClass("plotMin")).toBe(true);

      smPlotButton.simulate("click");
      component.update();

      plotBackgroundTop = findByTestAttr(component, "plotBackgroundTop");
      plotBackgroundBot = findByTestAttr(component, "plotBackgroundBot");

      expect(plotBackgroundBot.hasClass("plotStandardIn")).toBe(false);
      expect(plotBackgroundTop.hasClass("plotSm")).toBe(true);

      stPlotButton.simulate("click");
      component.update();

      plotBackgroundTop = findByTestAttr(component, "plotBackgroundTop");
      plotBackgroundBot = findByTestAttr(component, "plotBackgroundBot");

      expect(plotBackgroundBot.hasClass("plotStandardIn")).toBe(true);
      expect(plotBackgroundTop.hasClass("plotSm")).toBe(false);
      expect(plotBackgroundTop.hasClass("plotmin")).toBe(false);
   });

   it("should apply the correct styles to highlight an option button that is selected", () => {
      let minPlotButton = findByTestAttr(component, "minPlotButton");
      let smPlotButton = findByTestAttr(component, "smPlotButton");
      let stPlotButton = findByTestAttr(component, "stPlotButton");
      let yardsButton = findByTestAttr(component, "yardsButton");
      let metreButton = findByTestAttr(component, "metreButton");

      minPlotButton.simulate("click");
      yardsButton.simulate("click");
      component.update();

      minPlotButton = findByTestAttr(component, "minPlotButton");
      smPlotButton = findByTestAttr(component, "smPlotButton");
      stPlotButton = findByTestAttr(component, "stPlotButton");
      yardsButton = findByTestAttr(component, "yardsButton");
      metreButton = findByTestAttr(component, "metreButton");

      expect(minPlotButton.hasClass("btnActive")).toBe(true);
      expect(smPlotButton.hasClass("btnActive")).toBe(false);
      expect(stPlotButton.hasClass("btnActive")).toBe(false);
      expect(yardsButton.hasClass("btnActive")).toBe(true);
      expect(metreButton.hasClass("btnActive")).toBe(false);

      smPlotButton.simulate("click");
      metreButton.simulate("click");
      component.update();

      minPlotButton = findByTestAttr(component, "minPlotButton");
      smPlotButton = findByTestAttr(component, "smPlotButton");
      stPlotButton = findByTestAttr(component, "stPlotButton");
      yardsButton = findByTestAttr(component, "yardsButton");
      metreButton = findByTestAttr(component, "metreButton");

      expect(minPlotButton.hasClass("btnActive")).toBe(false);
      expect(smPlotButton.hasClass("btnActive")).toBe(true);
      expect(stPlotButton.hasClass("btnActive")).toBe(false);
      expect(yardsButton.hasClass("btnActive")).toBe(false);
      expect(metreButton.hasClass("btnActive")).toBe(true);

      stPlotButton.simulate("click");
      component.update();

      minPlotButton = findByTestAttr(component, "minPlotButton");
      smPlotButton = findByTestAttr(component, "smPlotButton");
      stPlotButton = findByTestAttr(component, "stPlotButton");

      expect(minPlotButton.hasClass("btnActive")).toBe(false);
      expect(smPlotButton.hasClass("btnActive")).toBe(false);
      expect(stPlotButton.hasClass("btnActive")).toBe(true);
   });

   it("should display the correct information to the user based on which buttons are selected", () => {
      const minPlotButton = findByTestAttr(component, "minPlotButton");
      const smPlotButton = findByTestAttr(component, "smPlotButton");
      const stPlotButton = findByTestAttr(component, "stPlotButton");
      const yardsButton = findByTestAttr(component, "yardsButton");
      const metreButton = findByTestAttr(component, "metreButton");

      minPlotButton.simulate("click");
      yardsButton.simulate("click");
      component.update();

      let plotSizeInfo = findByTestAttr(component, "plotSizeInfo");
      let plotPriceNormal = findByTestAttr(component, "plotPriceNormal");
      let plotPriceOap = findByTestAttr(component, "plotPriceOap");

      expect(plotSizeInfo.text()).toBe(`Size: ${mockPlotData.min.size.yd}²`);
      expect(plotPriceNormal.text()).toBe(`Normal Price: £${mockPlotData.min.price.normal}`);
      expect(plotPriceOap.text()).toBe(`OAP Price: £${mockPlotData.min.price.oap}`);

      smPlotButton.simulate("click");
      metreButton.simulate("click");
      component.update();

      plotSizeInfo = findByTestAttr(component, "plotSizeInfo");
      plotPriceNormal = findByTestAttr(component, "plotPriceNormal");
      plotPriceOap = findByTestAttr(component, "plotPriceOap");

      expect(plotSizeInfo.text()).toBe(`Size: ${mockPlotData.sm.size.m}²`);
      expect(plotPriceNormal.text()).toBe(`Normal Price: £${mockPlotData.sm.price.normal}`);
      expect(plotPriceOap.text()).toBe(`OAP Price: £${mockPlotData.sm.price.oap}`);

      stPlotButton.simulate("click");
      component.update();

      plotSizeInfo = findByTestAttr(component, "plotSizeInfo");
      plotPriceNormal = findByTestAttr(component, "plotPriceNormal");
      plotPriceOap = findByTestAttr(component, "plotPriceOap");

      expect(plotSizeInfo.text()).toBe(`Size: ${mockPlotData.st.size.m}²`);
      expect(plotPriceNormal.text()).toBe(`Normal Price: £${mockPlotData.st.price.normal}`);
      expect(plotPriceOap.text()).toBe(`OAP Price: £${mockPlotData.st.price.oap}`);
   });
});
