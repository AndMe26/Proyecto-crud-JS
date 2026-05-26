// aqui se definen las rutas de la aplicacion
import { renderHome } from "../views/home.js";
import { renderLogin } from "../views/login.js";
import { renderDashboard } from "../views/dashboard.js";
import { renderAdmin } from "../views/admin.js";
import { renderNotFound } from "../views/not-found.js";
import { renderProfile } from "../views/profile.js";
import { renderRegister } from "../views/register.js";
import { renderTasks } from "../views/tasks.js";
import { renderTaskForm } from "../views/task-form.js";


const routes = {
    "/": {
        render: renderHome,
        requiresAuth: false,
    },
    "/login": {
        render: renderLogin,
        setup: setupLogin,
        requiresAuth: false,
        redirectIfAuth: true,
    },
    "/dashboard": {
        render: renderDashboard,
        setup: setupDashboard,
        requiresAuth: true,
    },
    "/admin": {
        render: renderAdmin,
        setup: setupAdmin,
        requiresAuth: true,
        requiredRole: "admin",
    },
    "/not-found": {
        render: renderNotFound,
        setup: setupNotFound,
    },
    "/profile": {
        render: renderProfile,
        setup: setupProfile,
        requiresAuth: true,
    },
    "/register": {
        render: renderRegister,
        setup: setupRegister,
        requiresAuth: false,
        redirectIfAuth: true,
    },
    "/tasks": {
        render: renderTasks,
        setup: setupTasks,
        requiresAuth: true,
    },
    "/task-form": {
        render: renderTaskForm,
        setup: setupTaskForm,
        requiresAuth: true,
    },
}

export const notFoundView = renderNotFound;