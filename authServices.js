const apiKey = `AIzaSyAdq6V1PBaLcdy5julMi5PLf7hm5HYUy4U`;

const services = {
    getUserData() {
        let userData = JSON.parse(localStorage.getItem('auth')) || {} // with JSON.parse(localSto...) we get the full auth as an object
        return {
            isAuthenticated: Boolean(userData.idToken),
            email: userData.email || ''
        };
    },

    async login(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: {
            'content-type': 'application/json' 
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        let data = await response.json();
 
        localStorage.setItem('auth', JSON.stringify(data))
        
        return data;
    },

    async register(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json' 
                },
                body: JSON.stringify({
                    email,
                    password
                })
        })

    },


}