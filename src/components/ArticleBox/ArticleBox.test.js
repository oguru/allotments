import {checkProps, findByTestAttr, findMultipleByTestAttr} from "../../util/utils";
import {mount, shallow} from "enzyme";
import ArticleBox from "./ArticleBox";
import React from "react";
import {articlesData} from "../../data/contentData";
import {getContentJsx} from "../../util/articleBuilder";

describe("ArticleBox tests", () => {
   let component;
   const handleShowArticleMock = jest.fn();
   const article = getContentJsx([articlesData[0]], true)[0];
   const testProps = {
      handleShowArticle: handleShowArticleMock,
      previewImg: article.mainImg.box,
      previewImgAlt: article.mainImgAlt,
      text: article.initText,
      title: article.title
   };

   describe("Mount tests", () => {
      beforeEach(() => {
         component = mount(<ArticleBox
            handleShowArticle={handleShowArticleMock}
            previewImg={testProps.previewImg}
            previewImgAlt={testProps.previewImgAlt}
            text={testProps.text}
            title={testProps.title}
         />);
      });

      it("should change the line count immediately on hover", () => {
         let articleBoxText = findByTestAttr(component, "articleBoxText");
         const articleBoxMain = findByTestAttr(component, "articleBoxMain");

         const webkitLineClampInit = articleBoxText
            .props().style.WebkitLineClamp;

         articleBoxMain.simulate("mouseenter");

         articleBoxText = findByTestAttr(component, "articleBoxText");

         const webkitLineClampHover = articleBoxText
            .props().style.WebkitLineClamp;

         expect(webkitLineClampInit).toBeTruthy();
         expect(webkitLineClampHover).toBeTruthy();
         expect(webkitLineClampHover).not.toEqual(webkitLineClampInit);
      });

      it("should change the line count back only when animation has ended after unhovering", () => {
         let articleBoxText;
         const articleBoxMain = findByTestAttr(component, "articleBoxMain");

         articleBoxText = findByTestAttr(component, "articleBoxText");
         const webkitLineClampInit = articleBoxText.props().style.WebkitLineClamp;

         articleBoxMain.simulate("mouseenter");

         articleBoxText = findByTestAttr(component, "articleBoxText");
         const webkitLineClampHover = articleBoxText.props().style.WebkitLineClamp;

         articleBoxMain.simulate("mouseleave");

         articleBoxText = findByTestAttr(component, "articleBoxText");
         const webkitLineClampUnhover = articleBoxText.props().style.WebkitLineClamp;

         findByTestAttr(component, "articleBoxTextCont").simulate("transitionEnd");

         articleBoxText = findByTestAttr(component, "articleBoxText");
         const webkitLineClampPostTimers = articleBoxText.props().style.WebkitLineClamp;

         expect(webkitLineClampHover).not.toEqual(webkitLineClampInit);
         expect(webkitLineClampHover).toEqual(webkitLineClampUnhover);
         expect(webkitLineClampInit).toEqual(webkitLineClampPostTimers);
      });
   });

   describe("Shallow tests", () => {
      beforeEach(() => {
         component = shallow(<ArticleBox
            handleShowArticle={handleShowArticleMock}
            previewImg={testProps.previewImg}
            previewImgAlt={testProps.previewImgAlt}
            text={testProps.text}
            title={testProps.title}
         />);
      });

      test("ArticleBox PropTypes check should not throw a warning", () => {
         const propsErr = checkProps(ArticleBox, testProps);

         expect(propsErr).toBeUndefined();
      });

      it("should add the correct css classes on hover", () => {
         let arrowUpIcon;
         let elements;
         const testAttributeNames = ["readMoreText", "articleBoxBot", "articleBoxTextCont", "articleBoxImage"];

         arrowUpIcon = component.find(`.arrowUp`);
         elements = [...findMultipleByTestAttr(component, testAttributeNames), arrowUpIcon];

         elements.forEach((el) => {
            expect(el.hasClass("articlePreview")).toBe(false);
         });

         component.simulate("mouseenter");

         arrowUpIcon = component.find(`.arrowUp`);
         elements = [...findMultipleByTestAttr(component, testAttributeNames), arrowUpIcon];

         elements.forEach((el) => {
            expect(el.hasClass("articlePreview")).toBe(true);
         });
      });

      it("should trigger handleShowArticle on click", () => {
         const articleBox = findByTestAttr(component, "articleBoxMain");

         articleBox.simulate("click");

         expect(handleShowArticleMock).toHaveBeenCalled();
      });
   });
});
