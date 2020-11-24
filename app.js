const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'logout': 'logout-form-template',

}

const router = async (path) => {

    let root = document.getElementById('root')
    
    const template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);

    root.innerHTML = template(template)

};

const navigate = (path) => {
    history.pushState({}, '', path)

    router(path)
}