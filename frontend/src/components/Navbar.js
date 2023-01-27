import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Navbar = ({ setLoggedIn, setJson, loggedIn, json }) => {
    const { logout } = useLogout({ setLoggedIn, setJson });
    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    {loggedIn && <div>
                        <span>{json.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>}
                    {!loggedIn && <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>}
                </nav>
            </div >
        </header >
    );
}

export default Navbar;