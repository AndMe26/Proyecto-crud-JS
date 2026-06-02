// aqui se define el enrutamiento de la aplicacion, se importan las funciones de cada vista y se asignan a cada ruta

import { notFoundView, routes } from "./routes.js";
import { isAuthenticated, getCurrentUser } from "../services/auth.service.js";

export function renderRouter() {
    const app = document.getElementById("app")
    if (!app) {
        return;
    }

    const currentPath = window.location.pathname;   //obtiene la ruta actual ej: home , dashboard

    const route = routes[currentPath] ?? notFoundView;  // busca la ruta 
    

    if(route.requiresAuth && !isAuthenticated()) {            //requiresAuth: Requiere login.  isAuthenticated: esta el usuario logueado
        window.history.pushState({},"","/login");             // si la ruta requiere autenticacion y el usuario no esta autenticado, redirige al login                
        return renderRouter()                                 // Renderiza el login
    }

    const usuario = getCurrentUser();
    
    if(route.requiredRole) {
        if (usuario.role !== route.requiredRole){
            window.history.pushState({}, "", "/dashboard");
            return renderRouter();
        }
    }

    app.innerHTML = route.render();

    if (route.setup) {
        route.setup();
    }
}

export function initRouter() {
    document.body.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        if (!link) {
            return;
        }
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("/")) {
            return;
        }
        event.preventDefault();
        window.history.pushState({}, "", href);
        renderRouter();
    });

    window.addEventListener("popstate", renderRouter);
    renderRouter();

}