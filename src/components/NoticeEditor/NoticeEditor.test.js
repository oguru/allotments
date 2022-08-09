import React from "react";
import {render} from "@testing-library/react";
import NoticeEditor from "./NoticeEditor";

describe("NoticeEditor tests", () => {
   it("should render", () => {
      expect(render(<NoticeEditor />)).toBeTruthy();
   });

   // it("should call handleSave with the correct details if a user clicks save whilst editing a notice", () => {
   //    let noticeEditor = findByTestAttr(component, "noticeEditor");
   //    // let noticeComponent = findByTestAttr(component, "noticeComponent");
   //    const editBtn = findByTestAttr(component, "editNoticeBtn");

   //    editBtn.simulate("click");

   //    noticeEditor = findByTestAttr(component, "noticeEditor");
   //    noticeComponent = findByTestAttr(component, "noticeComponent");

   //    expect(noticeEditor.length).toBe(1);
   //    expect(noticeComponent.length)
   //       .toBe(0);
   // });
});
