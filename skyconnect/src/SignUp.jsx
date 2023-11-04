import {Link, useNavigate} from "react-router-dom";
export default function SignUp() {
    
    

    return (
    <div className="main">
      <div>
        <div className="left">
            <div className="intro">
                <h1>Welcome to SkyConnect</h1>
                <p>
                SkyConnect is a platform where you can connect with people and
                exchange ideas.
                </p>
            </div>
        <div>

          </div>
        </div>
        <div className="right">
          <div className="signup-form">
            Sign up here
            <input
              type="text"
              label="First Name"
              id="firstname-input"
              aria-label="name input"
              placeholder="enter first name"
              
                          />
            <input
              type="text"
              label="Last Name"
              id="lastname-input"
              aria-label="name input"
              placeholder="enter last name"
              
             
            />
            <input
              type="text"
              label="Email Address"
              id="email-input"
              aria-label="email input"
              placeholder="enter email"
             
            
            />
            <input
              type="password"
              label="Create Password"
              id="password-input"
              aria-label="password input"
              placeholder="enter password"
              
              
            />
            <input
              type="password"
              label="Confirm Password"
              id="confirm-password"
              aria-label="confirm password"
              placeholder="confirm password"
              
              
            />
            <button className="register-btn" >
              Register
            </button>
            <p>
              Existing user? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    );
}
