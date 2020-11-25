const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'addmovie': 'add-movie-template',
    'details': 'movie-details-template',
    'edit': 'edit-movie-template',
}

const router = async (fullPath) => {
    let path;
    let search;
    let id;
    let param;
    let searchText;
    try {
        [path, search] = fullPath.split('?')
        path = path.slice(1)
        searchText = search.split('=')[1];
    } catch {
    [path, id, param] = fullPath.split('/');
    }
    let root = document.getElementById('root');
    let templateData = authServices.getUserData(); 

    if (path === 'logout') {   //in case of pressing logout button, we redirect to the login page, after deleting auth in localStorage
        path = 'login'
        navigate(path)  // change to url to login instead of logout
    }

    let movie;
    let templateId = routes[path] // get the ID from the document

    switch (path) {
        case 'logout':
            path = 'login'                     // if its logout change the path to login
            return navigate(path);
        case 'home':
            if (searchText) {
                movie = await movieServices.getMovieSearch(searchText) // we get the movie we search
                templateData.movies = {movie};
                break
            } else {
            templateData.movies = await movieServices.getAll() // get all Movies and assign them into the templateData
            break
            }
        case 'details':
            movie = await movieServices.getOne(id)
            Object.assign(templateData, movie, {id});         // assign the movie to the templateData

            let { localId } = authServices.getUserData()
            try {
            let hasLiked = Boolean(Object.keys(movie.likes).find(key => key == localId));   // check if the user has liked the post already
            templateData.hasLiked = hasLiked
            let totalLikes = 0;
            Object.keys(movie.likes).forEach(key => totalLikes += 1);
            templateData.totalLikes = totalLikes;
            } catch(error) {
                console.log(error)
            }
            if (param == 'edit') { 
                templateId = 'edit-movie-template'
            }
            break;                          // assign the movie to the template data
        default:
            break
        }
    let template;
    try {
    template = Handlebars.compile(document.getElementById(templateId).innerHTML); // get the html
    } catch {
        template = Handlebars.compile(document.getElementById('home-template').innerHTML);
    }
    console.log(templateData)
    root.innerHTML = template(templateData)  // passing the user data, if none returns false and empty string(for the navbar)

};

const navigate = (path) => {
    history.pushState({}, '', path) // change the url

    router(path) // load the template that responds to this url
}

