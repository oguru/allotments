const AuthHandler = ({setLoggedIn, loggedIn = false, setLoginError}) => (
    <div data-test="loginHandler">
       <button data-test="setLogout" onClick={() => setLoggedIn(false)}>Logout</button>
       <button data-test="setLoggedIn" onClick={() => setLoggedIn(true)}>Login</button>
       <button data-test="loginErrorBtn" onClick={() => setLoginError(true)}>Error</button>
    </div>
 )

 export default AuthHandler;