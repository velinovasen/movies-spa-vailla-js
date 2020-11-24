
function attachNavEventListeners() {
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
    let formData = new FormData(document.forms['login-form'])

    services['login'](formData.get('email'), formData.get('password'))
    .then(data => {
        navigate('home')
    })
}

function onRegisterSubmit(e) {
    e.preventDefault()
    console.log('regni me pacient')
}


attachNavEventListeners()
