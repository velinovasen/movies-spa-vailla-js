const routes = {
    'login': 'login-form-template',
    'register': 'register-form-template',
    'logout': 'logout-form-template',

}

const router = async (path) => {

    let root = document.getElementById('root')
    
    const template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);

    root.innerHTML = template(template)

};

function attachEventListeners() {
    document.querySelector('.navigation').addEventListener('click', addEventHandler)
};

function addEventHandler(e) {
    e.preventDefault()
    
    // we check if its a link we need
    if(!e.target.classList.contains('nav-link')){ 
        return;
};
    const url = new URL(e.target.href)
    //smenqvame url-a
    history.pushState({}, '', url)

    router(url.pathname.slice(1))
};

function onLoginSubmit(e) {
    e.preventDefault()
    console.log('submitni formata')
}

function onRegisterSubmit(e) {
    e.preventDefault()
    console.log('regni me pacient')
}
attachEventListeners()