
function init_loader() {
    let navTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);

    Handlebars.registerPartial('navbar', navTemplate);     // register the navbar partial

    navigate('home')
}


function addEventHandler(e) {
    e.preventDefault()
    
    if(!e.target.classList.contains('nav-link')){      // we check if its a link we need
        return;
    };

    const url = new URL(e.target.href) || '/home'   // change the url and navi
    //smenqvame url-a
    history.pushState({}, '', url)

    router(url.pathname.slice(1))     // make sure we strip the '/' off of the url
};


function onLoginSubmit(e) {
    e.preventDefault()
    let formData = new FormData(document.forms['login-form'])

    services.login(formData.get('email'), formData.get('password')) // login 
    .then(data => {
        navigate('home')                        // redirect us to the home pages
    })
}


function onRegisterSubmit(e) {
    e.preventDefault()
    
    let formData = new FormData(document.forms['register-form'])

    services.register(formData.get('email'), formData.get('password'))
    .then(res => 
    services.login(formData.get('email'), formData.get('password')) // login 
    .then(data => {
        navigate('home')                        // redirect us to the home pages
    }))
}


function logOut() {
    localStorage.removeItem('auth')
}


init_loader()
