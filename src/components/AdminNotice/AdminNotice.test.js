import {checkProps, findByTestAttr} from "../../util/utils";
import AdminNotice from "./AdminNotice";
import React from "react";
import {mount} from "enzyme";

describe("AdminNotice tests", () => {
   let component;
   let mockNotice = {};

   const mockHandleSave = jest.fn();
   const mockHandleCancel = jest.fn();
   const mockHandleDelete = jest.fn();

   const testProps = {
      handleSave: mockHandleSave,
      newNotice: false,
      handleCancel: mockHandleCancel,
      handleDelete: mockHandleDelete,
      item: mockNotice
   };

   beforeEach(() => {
      mockNotice = {
         date: "26/07/2022",
         desc: "test notice description",
         id: "yPeQtmygeVZFt0Cb898R",
         title: "test notice title"
      };

      component = mount(<AdminNotice
         handleSave={mockHandleSave}
         newNotice={testProps.newNotice}
         handleCancel={mockHandleCancel}
         handleDelete={mockHandleDelete}
         item={mockNotice}
      />);
   });

   test("AdminNotice PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(AdminNotice, testProps);

      expect(propsErr).toBeUndefined();
   });

   it("should render a notice with edit and delete buttons if not adding or editing a notice", () => {
      const noticeEditor = findByTestAttr(component, "noticeEditor");
      const noticeComponent = findByTestAttr(component, "noticeComponent");
      const deleteBtn = findByTestAttr(component, "deleteNoticeBtn");
      const editBtn = findByTestAttr(component, "editNoticeBtn");

      expect(noticeEditor.length).toBe(0);
      expect(noticeComponent.length)
         .toBe(1);
      expect(deleteBtn.length)
         .toBe(1);
      expect(editBtn.length)
         .toBe(1);
   });

   it("should render confirm and cancel delete buttons if a user clicks delete", () => {
      let deleteBtn = findByTestAttr(component, "deleteNoticeBtn");
      let editBtn = findByTestAttr(component, "editNoticeBtn");
      let confirmDeleteBtn = findByTestAttr(component, "confirmDeleteBtn");
      let cancelDeleteBtn = findByTestAttr(component, "cancelDeleteBtn");

      expect(deleteBtn.length)
         .toBe(1);
      expect(editBtn.length)
         .toBe(1);
      expect(confirmDeleteBtn.length)
         .toBe(0);
      expect(cancelDeleteBtn.length)
         .toBe(0);

      deleteBtn.simulate("click");
      component.update();

      deleteBtn = findByTestAttr(component, "deleteNoticeBtn");
      editBtn = findByTestAttr(component, "editNoticeBtn");
      confirmDeleteBtn = findByTestAttr(component, "confirmDeleteBtn");
      cancelDeleteBtn = findByTestAttr(component, "cancelDeleteBtn");

      expect(deleteBtn.length)
         .toBe(0);
      expect(editBtn.length)
         .toBe(0);
      expect(confirmDeleteBtn.length)
         .toBe(1);
      expect(cancelDeleteBtn.length)
         .toBe(1);
   });

   it("should call handleDelete with a notice id if delete and then confirm are clicked", () => {
      const deleteBtn = findByTestAttr(component, "deleteNoticeBtn");

      deleteBtn.simulate("click");

      const confirmDeleteBtn = findByTestAttr(component, "confirmDeleteBtn");

      confirmDeleteBtn.simulate("click");

      expect(mockHandleDelete).toHaveBeenCalledWith(mockNotice.id);
   });

   it("should render the original edit/delete buttons if a user clicks cancel after clicking delete", () => {
      let deleteBtn = findByTestAttr(component, "deleteNoticeBtn");
      let editBtn = findByTestAttr(component, "editNoticeBtn");

      expect(deleteBtn.length)
         .toBe(1);
      expect(editBtn.length)
         .toBe(1);

      deleteBtn.simulate("click");

      let cancelDeleteBtn = findByTestAttr(component, "cancelDeleteBtn");

      cancelDeleteBtn.simulate("click");

      deleteBtn = findByTestAttr(component, "deleteNoticeBtn");
      editBtn = findByTestAttr(component, "editNoticeBtn");
      const confirmDeleteBtn = findByTestAttr(component, "confirmDeleteBtn");
      cancelDeleteBtn = findByTestAttr(component, "cancelDeleteBtn");

      expect(deleteBtn.length)
         .toBe(1);
      expect(editBtn.length)
         .toBe(1);
      expect(confirmDeleteBtn.length)
         .toBe(0);
      expect(cancelDeleteBtn.length)
         .toBe(0);
   });

   it("should render a noticeEditor if adding a new notice", () => {
      component.setProps({
         item: undefined,
         newNotice: true
      });
      component.update();

      const noticeEditor = findByTestAttr(component, "noticeEditor");
      const noticeComponent = findByTestAttr(component, "noticeComponent");

      expect(noticeEditor.length).toBe(1);
      expect(noticeComponent.length)
         .toBe(0);
   });

   it("should render a noticeEditor if a user clicks edit notice", () => {
      let noticeEditor = findByTestAttr(component, "noticeEditor");
      let noticeComponent = findByTestAttr(component, "noticeComponent");
      const editBtn = findByTestAttr(component, "editNoticeBtn");

      expect(noticeEditor.length).toBe(0);
      expect(noticeComponent.length)
         .toBe(1);

      editBtn.simulate("click");

      noticeEditor = findByTestAttr(component, "noticeEditor");
      noticeComponent = findByTestAttr(component, "noticeComponent");

      expect(noticeEditor.length).toBe(1);
      expect(noticeComponent.length)
         .toBe(0);
   });
});