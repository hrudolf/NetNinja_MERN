const useLogout = ({ setLoggedIn, setJson }) => {

    const logout = () => {
        //remove user.storage
        localStorage.removeItem('user');
        setLoggedIn(false);
        setJson('');
    }

    return { logout };
}

export default useLogout;