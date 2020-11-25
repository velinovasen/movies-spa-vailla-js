
function init_loader() {
    let navTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);

    Handlebars.registerPartial('navbar', navTemplate);     // register the navbar partial

    navigate('home')
}


function addEventHandler(e) {
    e.preventDefault()

    if(!e.target.classList.contains('nav-link') && !e.target.innerText === 'Details' && !e.target.innerText === 'Edit'){      // we check if its a link we need
        return;
    };
    
    let url;    
    if(e.target.innerText === 'Details') {
        url = e.target.getAttribute('href')
        history.pushState({}, '', url)

        router(url.slice(1))
        return;   
    } else if(e.target.innerText === 'Edit') {
        url = e.target.getAttribute('href')
        history.pushState({}, '', url)

        router(url.slice(1))
        return;
    } else {
        try {
            url = new URL(e.target.href)
        } catch {
            url = 'home'
        } 
    }
    // change the url and navi
    history.pushState({}, '', url)
    try {
        router(url.pathname.slice(1))     // make sure we strip the '/' off of the url
    } catch {
        router(url)
    }
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
    let { email } = authServices.getUserData();



    movieServices.addMovie(email, title, description, imageUrl)
    .then(res => {
        navigate('home')
    })

    document.getElementById('movie-title-input').value = '';
    document.getElementById('description-input').value = '';
    document.getElementById('image-url-input').value = '';

}

function editSubmitButton(e) {                          // edit submit button, implement small verification 
    e.preventDefault()

    let formData = new FormData(document.getElementById('edit-movie-form'));

    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl');
    let id = e.target.getAttribute('data-id');

    if (!title || !description || !imageUrl) {
        return;
    }

    movieServices.editMovie(title, description, imageUrl, id)
    .then(res => {
        navigate('home')
    })

}

function onMovieLike(e, id) {               // press like button
    e.preventDefault()
    console.log(e.target)
    console.log(id)
    let { email } = authServices.getUserData();

    movieServices.likeMovie(id, email);
}

init_loader() 
