import {useNavigate} from 'react-router-dom';


export function LandingPage() {

    const navigate = useNavigate();
    function handleSignIn() {
        navigate('/login');
    }

    return (
        <div>
        <h1>Landing Page</h1>

        <button onClick={handleSignIn}> Sign In </button>
        <button> Sign Up </button>
        <button> Using LinkedIn </button>
        </div>
    );


}
