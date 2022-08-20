import NoticeEditor from "./NoticeEditor";
import {checkProps} from "../../util/utils";

describe("NoticeEditor tests", () => {
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

   test("NoticeEditor PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(NoticeEditor, testProps);

      expect(propsErr).toBeUndefined();
   });
});
