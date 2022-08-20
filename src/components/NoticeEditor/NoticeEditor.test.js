import React from "react";
import {render} from "@testing-library/react";
import NoticeEditor from "./NoticeEditor";
import {mount} from "enzyme";
import {checkProps, findByTestAttr} from "../../util/utils";

describe("NoticeEditor tests", () => {
   let component;

   const testProps = {
      handleSave: () => jest.fn(),
      handleCancel: () => jest.fn(),
      item: {
         id: "323f3f34fsdgerv",
         desc: "test notice",
         title: "test notice title",
         date: "24/2/21"
      }
   };

   beforeEach(() => {
      component = mount(<NoticeEditor
         item={testProps.item}
         handleSave={testProps.handleSave}
         handleCancel={testProps.handleCancel}
      />);

   });

   test("NoticeEditor PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(NoticeEditor, testProps);

      expect(propsErr).toBeUndefined();
   });
});
