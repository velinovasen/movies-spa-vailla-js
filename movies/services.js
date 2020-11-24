const apiKey = `AIzaSyCMmPch9Fw9u4XO8HTIe8t4znSmIQa_pnw`;
const databaseURL = 'https://movies-2-5af54.firebaseio.com/';


const authServices = {
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

const movieServices = {
    async addMovie(title, description, imageUrl) {
        const response = await fetch(databaseURL + '.json', {
            method: "POST",
            body: JSON.stringify({title, description, imageUrl})
        })

        const data = await response.json()
        console.log(data);
    },

    async getAll() {
        const response = await fetch(databaseURL + '.json')

        const data = await response.json()

        console.log(data)
        return data;
    }
}