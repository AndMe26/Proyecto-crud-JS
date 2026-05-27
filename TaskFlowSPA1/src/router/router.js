// aqui se define el enrutamiento de la aplicacion, se importan las funciones de cada vista y se asignan a cada ruta

import { notFoundView, routes } from "./routes.js";

export function renderRouter() {
    const app = document.getElementById("app")
    if (!app) {
        return;
    }

    const currentPath = window.location.pathname;

    const route = routes[currentPath] ?? notFoundView;

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
        if (!href || href.startsWith("/")) {
            return;
        }
        event.preventDefault();
        window.history.pushState({}, "", href);
        renderRouter();
    });

    window.addEventListener("popstate", renderRouter);
    renderRouter();

}