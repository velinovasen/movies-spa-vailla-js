
function init_loader() {
    let navTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);

    Handlebars.registerPartial('navbar', navTemplate);     // register the navbar partial

    navigate('home')
}


function addEventHandler(e) {
    e.preventDefault()
    console.log(e.target.getAttribute('href'))

    if(!e.target.classList.contains('nav-link') && !e.target.innerText === 'Details'){      // we check if its a link we need
        return;
    };
    
    let url;    
    if(e.target.innerText === 'Details') {
        url = e.target.getAttribute('href')
        history.pushState({}, '', url)

        router(url.slice(1))
        return;   
    } else {
        url = new URL(e.target.href) || 'home' 
    }
    // change the url and navi
    history.pushState({}, '', url)

    router(url.pathname.slice(1))     // make sure we strip the '/' off of the url
};


function onLoginSubmit(e) {
    e.preventDefault()
    let formData = new FormData(document.forms['login-form'])

    authServices.login(formData.get('email'), formData.get('password')) // login 
    .then(data => {
        navigate('home')                        // redirect us to the home pages
    })
}


function onRegisterSubmit(e) {
    e.preventDefault()
    
    let formData = new FormData(document.forms['register-form'])

    let email = formData.get('email');
    let password = formData.get('password');
    let password2 = formData.get('repeatPassword')

    if (password !== password2) {
        return;
    }

    authServices.register(email, password)
    .then(res => 
        authServices.login(email, password) // login 
    .then(data => {
        navigate('home')                        // redirect us to the home pages
    }))
}


function logOut() {
    localStorage.removeItem('auth')
}


function addMovieButton(event) {
    event.preventDefault()

    history.pushState({}, '', '/addmovie')

    let root = document.getElementById('root');

    const template = Handlebars.compile(document.getElementById('add-movie-template').innerHTML);

    let authData = authServices.getUserData()

    root.innerHTML = template(authData)

}


function onAddSubmitButton(event) {
    event.preventDefault()

    let formData = new FormData(document.getElementById('add-movie-form'))

    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl')

    if (!title || !description || !imageUrl) {
        return;
    }

    movieServices.addMovie(title, description, imageUrl)
    .then(res => {
        navigate('home')
    })

    document.getElementById('movie-title-input').value = '';
    document.getElementById('description-input').value = '';
    document.getElementById('image-url-input').value = '';

}


init_loader()
