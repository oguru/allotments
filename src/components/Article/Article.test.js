import Article from "./Article";
import React from "react";
import {articlesData} from "../../data/contentData";
import {checkProps} from "../../../utils/utils";
import {getContentJsx} from "../../util/articleBuilder";
import {shallow} from "enzyme";

describe("Article tests", () => {
   const articles = getContentJsx([articlesData[0]], true);

   const testProps = {
      closeArticle: jest.fn,
      content: articles[0]
   };

   test("Article PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(Article, testProps);

      expect(propsErr).toBeUndefined();
   });
});
