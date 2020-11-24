const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
}

const router = async (path) => {

    let root = document.getElementById('root') 

    if (path === 'logout') {   //in case of pressing logout button, we redirect to the login page, after deleting auth in localStorage
        path = 'login'
        navigate(path)  // change to url to login instead of logout
    }
    
    const template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);  // load the template that matches the url 

    let authData = services.getUserData()  

    root.innerHTML = template(authData)  // passing the user data, if none returns false and empty string(for the navbar)

};

const navigate = (path) => {
    history.pushState({}, '', path) // change the url

    router(path) // load the template that responds to this url
}