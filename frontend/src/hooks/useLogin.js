import { useState } from "react";

const useLogin = ({ setLoggedIn, setJson }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('api/user/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            //save the user to local storage (email, JWT)
            localStorage.setItem('user', JSON.stringify(json));

            //update the auth context oops XD
            setLoggedIn(true);
            setJson(json);
            setIsLoading(false);
        }
    }

    return { login, isLoading, error }
}

export default useLogin;