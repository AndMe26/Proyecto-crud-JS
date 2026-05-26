import "./styles/global.css";
import { renderLogin } from "./views/login.js";
import { renderHome } from "./views/home.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderAdmin } from "./views/admin.js";
import { renderNotFound } from "./views/not-found.js";
import { renderTaskForm } from "./views/task-form.js";
import { renderTasks } from "./views/tasks.js";
import { renderProfile } from "./views/profile.js";
import { renderRegister } from "./views/register.js";



const app = document.getElementById("app");


app.innerHTML = renderHome();






