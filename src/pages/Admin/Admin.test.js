import {checkProps} from "../../util/utils";

describe("Admin tests", () => {
   const mockNotices = [
      {
         date: "14/4/2021",
         desc: "test notice desc 1",
         id: "Bg4hze8twynWE2jhsAoS",
         title: "test notice 1"
      },
      {
         date: "15/4/2021",
         desc: "test notice desc 2",
         id: "F473gBGbrh45gGSBHtbd",
         title: "test notice 2"
      }
   ];

   test("AdminNotice PropTypes check should not throw a warning", () => {
      const propsErr = checkProps(mockNotices, mockNotices);

      expect(propsErr).toBeUndefined();
   });

   // to be added:

   // a user can log in using google
   // an authorised user will see edit/delete boxes and a logout box
   // an unauthorised user will have an error message
   // an authorised user will be able to successfully edit
   // an unauthorised user will not be able to edit the database
});
