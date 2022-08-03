import Article from "./Article";
import React from "react";
import {articlesData} from "../../data/contentData";
import {checkProps} from "../../../utils/utils";
import {getContentJsx} from "../../util/articleBuilder";
import {shallow} from "enzyme";

describe("Article tests", () => {
   const article = getContentJsx([articlesData[0]], true)[0];

   const testProps = {
      closeArticle: jest.fn,
      content: article
   };

   test("Article PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(Article, testProps);

      expect(propsErr).toBeUndefined();
   });
});
