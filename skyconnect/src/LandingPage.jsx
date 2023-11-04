import {useNavigate} from 'react-router-dom';

export function LandingPage() {

    const navigate = useNavigate();
    function handleSignIn() {
        navigate('/login');
    }
    const handleSignUp = () =>{
        console.log("Sign Up Clicked!")
        navigate('/signup');
    }

    return (
        <div>
            <h1>Landing Page</h1>

            <button onClick={handleSignIn}> Sign In </button>
            <button onClick={handleSignUp}> Sign Up </button>
            <button> Using LinkedIn </button>
        </div>
    );


}
