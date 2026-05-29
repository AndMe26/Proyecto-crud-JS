// aqui se definen las rutas de la aplicacion
import { renderHome } from "../views/home.js";
import { renderLogin,setupLogin } from "../views/auth/login.js";
import { renderDashboard } from "../views/app/dashboard.js";
import { renderAdmin } from "../views/admin/admin.js";
import { renderNotFound } from "../views/not-found.js";
import { renderProfile } from "../views/auth/profile.js";
import { renderRegister, setupRegister } from "../views/auth/register.js";
import { renderTasks } from "../views/tasks/tasks.js";
import { renderTaskForm } from "../views/tasks/task-form.js";



export const routes = {
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
        requiresAuth: true,
    },
    "/admin": {
        render: renderAdmin,
        requiresAuth: true,
        requiredRole: "admin",
    },
    "/not-found": {
        render: renderNotFound,
    },
    "/profile": {
        render: renderProfile,
        requiresAuth: true,
    },
    "/register": {
        render: renderRegister,
        requiresAuth: false,
        redirectIfAuth: true,
        setup: setupRegister
    },
    "/tasks": {
        render: renderTasks,
        requiresAuth: true,
    },
    "/task-form": {
        render: renderTaskForm,
        requiresAuth: true,
    },
}

export const notFoundView = renderNotFound;