import { getCurrentUser, logout } from "../../services/auth.service.js"
import { obtenerTareas } from "../../services/task.service.js";


export function renderDashboard() {
    const usuario = getCurrentUser();
    return `
<div class="min-h-screen bg-sky-50 text-slate-800">
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
            <nav class="hidden gap-3 md:flex">
                <a id="go-dashboard" class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/dashboard">Dashboard</a>
                <a id="go-tasks" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
                <a id="go-profile" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
                <a id="go-admin" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
                <a id="btn-logout" class="rounded-full px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/login">Logout</a>
            </nav>
        </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
        <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard principal</p>
            <h1 class="mt-3 text-4xl font-black tracking-tight">Bienvenida, ${usuario.name}.</h1>
            <p class="mt-4 max-w-2xl text-blue-50">Resumen general del trabajo del usuario, accesos rapidos y estado actual de productividad.</p>
        </section>

        <section class="mt-8 grid gap-4 md:grid-cols-3">
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <p class="text-sm text-slate-500">Tareas activas</p>
                <p id="count-activas" class="mt-3 text-4xl font-black text-blue-700">...</p>
            </article>
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <p class="text-sm text-slate-500">Completadas</p>
                <p id="count-completadas" class="mt-3 text-4xl font-black text-blue-700">...</p>
            </article>
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <p class="text-sm text-slate-500">Pendientes hoy</p>
                <p id="count-hoy" class="mt-3 text-4xl font-black text-blue-700">...</p>
            </article>
        </section>

        <section class="mt-8">
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
                    <a class="text-sm font-semibold text-blue-700 hover:text-blue-600" href="/tasks">Ver tareas</a>
                </div>
                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                    <a id="go-tasksform" class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/task-form">
                        <p class="text-sm font-semibold text-blue-600">Crear</p>
                        <h3 class="mt-2 text-lg font-bold text-slate-900">Nueva tarea</h3>
                    </a>
                    <a id="go-profile" class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/profile">
                        <p class="text-sm font-semibold text-blue-600">Cuenta</p>
                        <h3 class="mt-2 text-lg font-bold text-slate-900">Editar perfil</h3>
                    </a>
                </div>
            </article>
        </section>
    </main>
</div>`;
}

export async function setupDashboard() {
    const usuario = getCurrentUser();
    const tasks = await obtenerTareas(usuario.id)
    const hoy = new Date().toISOString().split("T")[0];

    const activas = tasks.filter(task => task.status === "En progreso").length;
    const completadas = tasks.filter(task => task.status === "Completada").length;
    const hoypendientes = tasks.filter(task => task.status === "Pendiente" && task.date === hoy).length;

    document.getElementById("count-activas").textContent = activas;
    document.getElementById("count-completadas").textContent = completadas;
    document.getElementById("count-hoy").textContent = hoypendientes;

    const logoutButton = document.getElementById("btn-logout")

    logoutButton.addEventListener("click", () => {
        logout();
    });

}