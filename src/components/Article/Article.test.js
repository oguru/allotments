import Article from "./Article";
import React from "react";
import {articlesData} from "../../data/contentData";
import {checkProps} from "../../util/utils";
import {getArticleContent} from "../../util/articleBuilder";
import {shallow} from "enzyme";

describe("Article tests", () => {
   const article = getArticleContent([articlesData[0]])[0];

   const testProps = {
      closeArticle: jest.fn,
      content: article
   };

   test("Article PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(Article, testProps);

      expect(propsErr).toBeUndefined();
   });
});
