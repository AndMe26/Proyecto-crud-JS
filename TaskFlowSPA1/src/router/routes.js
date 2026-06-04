// aqui se definen las rutas de la aplicacion
import { renderHome } from "../views/home.js";
import { renderLogin, setupLogin } from "../views/auth/login.js";
import { renderDashboard, setupDashboard } from "../views/app/dashboard.js";
import { renderAdmin, setupAdmin } from "../views/admin/admin.js";
import { renderNotFound } from "../views/not-found.js";
import { renderProfile, setupProfile } from "../views/auth/profile.js";
import { renderRegister, setupRegister } from "../views/auth/register.js";
import { renderTasks , setupTasks } from "../views/tasks/tasks.js";
import { renderTaskForm , setupTaskForm } from "../views/tasks/task-form.js";



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
        setup: setupDashboard
    },
    "/admin": {
        render: renderAdmin,
        setup: setupAdmin,
        requiresAuth: true,
        requiredRole: "ADMIN",
    },
    "/not-found": {
        render: renderNotFound,
    },
    "/profile": {
        render: renderProfile,
        requiresAuth: true,
        setup: setupProfile
    },
    "/register": {
        render: renderRegister,
        requiresAuth: false,
        redirectIfAuth: true,
        setup: setupRegister
    },
    "/tasks": {
        render: renderTasks,
        setup: setupTasks,
        requiresAuth: true
    },
    "/task-form": {
        render: renderTaskForm,
        requiresAuth: true,
        setup: setupTaskForm
    },
}

export const notFoundView = {
    render: renderNotFound,
}