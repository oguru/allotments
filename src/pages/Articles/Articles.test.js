import {checkProps, findByTestAttr} from "../../util/utils";
import Articles from "./Articles";
import ImageSizeProvider from "../../context/imageSizeContext.tsx";
import MatchMediaMock from "jest-matchmedia-mock";
import React from "react";
import ScreenSizeProvider from "../../context/screenSizeContext.tsx";
import StaticTxtProvider from "../../context/staticTxtContext.tsx";
import {act} from "react-dom/test-utils";
import {articlesData} from "../../data/contentData";
import {getContentJsx} from "../../util/articleBuilder";
import {mount} from "enzyme";

const matchMedia = new MatchMediaMock();

describe("Articles tests", () => {
   const articles = getContentJsx([articlesData[0], articlesData[1]], true);
   let component;

   const testProps = {
      articles
   };

   beforeEach(() => {
      jest.useFakeTimers();

      component = mount(<ScreenSizeProvider>
         <ImageSizeProvider>
            <StaticTxtProvider>
               <Articles articlesJsx={articles} />
            </StaticTxtProvider>
         </ImageSizeProvider>
      </ScreenSizeProvider>);
   });

   test("Articles PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(Articles, testProps);

      expect(propsErr).toBeUndefined();
   });

   it("should display the correct article when the article box is clicked", () => {
      const articleBox = findByTestAttr(component, "articleBoxMain");

      act(() => {
         articleBox.first().simulate("click");
         jest.runAllTimers();
         component.update();
      });

      const currentArticle = findByTestAttr(component, "article");
      const boxArticleTitle = findByTestAttr(component, "articleBoxTitle").first().text();
      const matchingArticle = currentArticle.findWhere(node => {
         return node.type() === "h4" && node.text() === boxArticleTitle;
      });

      expect(matchingArticle.length).toBe(1);
   });

   it("should apply the correct styles to animate between the main articles page and an article, and back again", () => {
      const articleBox = findByTestAttr(component, "articleBoxMain");
      let articlesCont = findByTestAttr(component, "articlesContainer");

      expect(articlesCont.hasClass("slideRight")).toBe(true);

      act(() => {
         articleBox.first().simulate("click");
         jest.runAllTimers();
         component.update();
      });

      articlesCont = findByTestAttr(component, "articlesContainer");

      expect(articlesCont.hasClass("slideRight")).toBe(false);
      expect(articlesCont.hasClass("slideLeft")).toBe(true);
   });

   it("should keep the articles page mounted whilst a user is viewing a single article", () => {
      const articlesMain = findByTestAttr(component, "articlesMain");
      const articleBox = findByTestAttr(component, "articleBoxMain");

      expect(articlesMain.length).toBe(1);

      act(() => {
         articleBox.first().simulate("click");
         jest.runAllTimers();
         component.update();
      });

      expect(articlesMain.length).toBe(1);
   });

   it("should unmount the article after a user clicks back to return to the main articles page", () => {
      const articleBox = findByTestAttr(component, "articleBoxMain");
      let currentArticle = findByTestAttr(component, "article");

      expect(currentArticle.length).toBe(0);

      act(() => {
         articleBox.first().simulate("click");
         jest.runAllTimers();
         component.update();
      });

      currentArticle = findByTestAttr(component, "article");

      expect(currentArticle.length).toBe(1);

      const backArrow = findByTestAttr(component, "backArrowCont");

      act(() => {
         backArrow.first().simulate("click");
         jest.runAllTimers();
         component.update();
      });

      currentArticle = findByTestAttr(component, "article");

      expect(currentArticle.length).toBe(0);
   });

   // to do:

   // it("should scroll to the top of the article when viewed", () => {
   //    const articleBox = findByTestAttr(component, "articleBoxMain");
   //    let articlesPageCont = findByTestAttr(component, "articlesPageContainer");

   //    articlesPageCont.simulate("scroll", {target: {scrollTop: 100}});

   //    articlesPageCont = findByTestAttr(component, "articlesPageContainer");

   //    act(() => {
   //       articleBox.first().simulate("click");
   //    });

   //    act(() => jest.runAllTimers());

   //    component.update();

   //    expect(useRefSpy).toHaveBeenCalledWith(0);
   // });

   // should scroll back to the position the articles page was before the user clicked on the article box, once they click back to close the article
});
