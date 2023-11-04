
export default function SignIn() {

    return (
        <div className="main">
      <div className="intro">
        <h1>Welcome back to SkyConnect</h1>
        <p>
          
        </p>
      </div>
      <div className="login-form">
        <h3>Login Here</h3>
        <input
          type="text"
          label="Email Address"
          id="login-email"
          aria-label="Email address"
          placeholder="email address"
          
        />

        <input
          type="password"
          label="Password"
          placeholder="password"
          id="login-password"
          aria-label="Password"
          
          
        />
        <button className="login-btn" >
          Login
        </button>
        <div>
          <p>New User?</p>
          
        </div>
      </div>
    </div>
    );
}