/* globals $, Sammy */

import home from "./controllers/home.js"
import about from "./controllers/about.js"
import register, { registerPost } from "./controllers/register.js" // default, { others... } functions from file
import login, { loginPost, logout } from "./controllers/login.js"
import catalog from "./controllers/catalog.js"
import details from "./controllers/details.js"
import create, { createPost } from "./controllers/create.js"
import edit from "./controllers/edit.js"


window.addEventListener("load", () => {

    // Sammy's context === this (Sammy.Application)
    // Allows new registrations
    const app = Sammy('#main', function (context) {

        // Register Handlebars extension
        this.use('Handlebars', 'hbs');

        // Create user data storage in "app" scope
        this.userData = {
            // loggedIn: true,
            loggedIn: false,
            hasTeam: false
        };

        // Sammy's context === this (Sammy.EventContext)
        // Gets information about the location
        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/about', about);

        this.get('#/register', register);

        this.get('#/login', login);

        this.get('#/logout', logout);

        this.get('#/catalog', catalog);

        // Everything after "catalogue/" is put in params.id
        this.get('#/catalog/:id', details);

        this.get('#/create', create);

        this.get('#/edit/:id', edit);

        // Needed to avoid Sammy's async function problem
        this.post('#/register', (context) => { registerPost.call(context); });

        this.post('#/login', (context) => { loginPost.call(context); });

        this.post('#/create', (context) => { createPost.call(context); });
    });

    app.run();
});
