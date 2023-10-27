import {findByTestAttr} from "../../util/utils";
import Admin from "./Admin";
import {mount} from "enzyme";
import ScreenSizeProvider from "../../context/screenSizeContext.tsx";
import StaticTxtProvider from "../../context/staticTxtContext";
import ImageSizeProvider from "../../context/imageSizeContext.tsx";
import MatchMediaMock from "jest-matchmedia-mock";
import { act } from "react-dom/test-utils";

const matchMedia = new MatchMediaMock();

jest.mock("../../components/AuthHandler/AuthHandler")

const userName = "TestUser"

const mockSignOut = () => jest.fn();

jest.mock("../../services/firebase.js", () => ({
   userName: () => userName, 
   signOut: () => null,
   auth: {
      currentUser: "TestUser",
      signOut: mockSignOut,
      onAuthStateChanged: () => ({
         user: {
            uid: "TestUser",
         }
      })
   }
}))

describe("Admin tests (default logged out)", () => {
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

   it("Should show the login button and error text when a login error occurs", () => {
      let loginError = findByTestAttr(component, "loginError");

      expect(loginError.length).toBe(0);

      const triggerLoginError = findByTestAttr(component, "loginErrorBtn");

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

      
   it("Should show the welcome text when a user logs in", () => {
      const setLoggedInBtn = findByTestAttr(component, "setLoggedIn");
      let loginWelcomeText = findByTestAttr(component, "loginWelcomeText");
  
      expect(loginWelcomeText.length).toBe(0);

      act(() => {
        setLoggedInBtn.simulate("click");
        jest.runAllTimers();
        component.update();
      });

      let loginHandler = findByTestAttr(component, "loginHandler");
      loginWelcomeText = findByTestAttr(component, "loginWelcomeText");
  
      expect(loginHandler.length).toBe(0);
      expect(loginWelcomeText.length).toBe(1);
   })

   it ("Should show the current readonly notices when a user is logged out", () => {
      const notices = component.find(`[data-test="readOnlyNotice"]`)

      expect(notices.length).toEqual(mockNotices.length)
   })
})
   
describe("Admin tests (default logged in)", () => {
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

      const setLoggedInBtn = findByTestAttr(component, "setLoggedIn");

      act(() => {
         setLoggedInBtn.simulate("click");
         jest.runAllTimers();
         component.update();
      });
   });

   
   it("Should show an add new notice button if they are logged in", () => {
      const addNoticeBtn = findByTestAttr(component, "addNoticeBtn");
      expect(addNoticeBtn.length).toBe(1);
   })

   it("Should show an admin notice editor component if they click on the add notice button after logging in", () => {
      let noticeEditor = findByTestAttr(component, "noticeEditor");

      expect(noticeEditor.length).toBe(0);

      let addNoticeBtn = findByTestAttr(component, "addNoticeBtn");

      act(() => {
         addNoticeBtn.simulate("click");
         jest.runAllTimers();
         component.update();
       });

      addNoticeBtn = findByTestAttr(component, "addNoticeBtn");
      expect(addNoticeBtn.length).toBe(0);

      noticeEditor = findByTestAttr(component, "noticeEditor");
      expect(noticeEditor.length).toBe(1);
   })

   it ("Should show notices with edit/delete buttons when a user is logged out", () => {
      const notices = component.find(`[data-test="adminEditNotice"]`)

      expect(notices.length).toEqual(mockNotices.length)
   })
})
