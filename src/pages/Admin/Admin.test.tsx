import { log } from "console";
import {checkProps, findByTestAttr} from "../../util/utils";
import Admin from "./Admin";
import {mount} from "enzyme";
import ScreenSizeProvider from "../../context/screenSizeContext";
import StaticTxtProvider from "../../context/staticTxtContext";
import ImageSizeProvider from "../../context/imageSizeContext";
import MatchMediaMock from "jest-matchmedia-mock";
import AuthHandler from "../../components/AuthHandler/AuthHandler";
import MockAuthHandler from "../../components/AuthHandler/__mocks__/AuthHandler";
import { act } from "react-dom/test-utils";

const matchMedia = new MatchMediaMock();

jest.mock("../../components/AuthHandler/AuthHandler")

const userName = "TestUser"

jest.mock("../../services/firebase.js", () => ({
   userName: () => userName, 
   signOut: () => null
}))

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

   let component;

   beforeEach(() => {
      jest.useFakeTimers();

      component = mount(<ScreenSizeProvider>
         <ImageSizeProvider>
            <StaticTxtProvider>
               <Admin notices={mockNotices} />
            </StaticTxtProvider>
         </ImageSizeProvider>
      </ScreenSizeProvider>);
   });
   
   it("Should show the login component when a user is not logged in", () => {
      let loginHandler = findByTestAttr(component, "loginHandler");
      let loginWelcomeText = findByTestAttr(component, "loginWelcomeText");
  
      expect(loginHandler.length).toBe(1);
      expect(loginWelcomeText.length).toBe(0);
   })
   
   it("Should show the welcome text when a user logs in", () => {
      const setLoggedInBtn = findByTestAttr(component, "setLoggedIn");
  
      act(() => {
        setLoggedInBtn.simulate("click");
        jest.runAllTimers();
        component.update();
      });

      let loginHandler = findByTestAttr(component, "loginHandler");
      let loginWelcomeText = findByTestAttr(component, "loginWelcomeText");
  
      expect(loginHandler.length).toBe(0);
      expect(loginWelcomeText.length).toBe(1);
   })

   it("Should show the login button and error text when a login error occurs", () => {
      let loginError = findByTestAttr(component, "loginError");

      expect(loginError.length).toBe(0);

      const triggerLoginError = findByTestAttr(component, "loginErrorButton");

      act(() => {
         triggerLoginError.simulate("click");
         jest.runAllTimers();
         component.update();
      });

      let loginHandler = findByTestAttr(component, "loginHandler");
      loginError = findByTestAttr(component, "loginError");
      let loginWelcomeText = findByTestAttr(component, "loginWelcomeText");
  
      expect(loginHandler.length).toBe(1);
      expect(loginError.length).toBe(1);
      expect(loginWelcomeText.length).toBe(0);
   })

   // to be added:

   // an authorised user will see edit/delete boxes and a logout box
   // an unauthorised user will have an error message
   // an authorised user will be able to successfully edit
   // an unauthorised user will not be able to edit the database
});
