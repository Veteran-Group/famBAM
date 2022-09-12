import { saveStatus, checkStatus } from '../login/login.js';

describe(`./src/lib/login/login.js`, () => {
  describe(`saveStatus`, () => {

    it(`should apply the loginstatus to localStorage.getItem('fambamLogin')`, () => {
      localStorage.setItem(`fambamLogin`, `false`);
      let loginstatus = true;
      saveStatus(loginstatus);
      expect(localStorage.getItem(`fambamLogin`)).toBeTruthy();
    });

    it(`should return the loginstatus without changing it`, () => {
      let loginstatus = { status: false };
      expect(saveStatus(loginstatus.status)).toEqual(false);
    })
  })

  describe(`checkStatus`, () => {

    let runCheckStatus = (testStatus) => {
      let testString = `Test login failure alert`;
      let status = checkStatus(testStatus, testString, (callbackStatus) => {
        return !callbackStatus;
      });
      return status;
    }

    // Setting spy to check if alert message works
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    it(`should apply callback if status value is true`, () => {
      let testStatus = true;
      expect(runCheckStatus(testStatus)).toBeFalsy();
    });

    it(`should not apply callback when status value is false`, () => {
      let testStatus = false;
      expect(runCheckStatus(testStatus)).toBeFalsy();
    });

    it(`should alert user with fail message if status value is false`, () => {
      let testStatus = false;
      runCheckStatus(testStatus);
      expect(window.alert).toBeCalledWith(`Test login failure alert`);
    });
  })
})