import { getCurrentUser } from "../../services/auth.service.js";
import { obtenerTareas, eliminarTarea } from "../../services/task.service.js";
import { renderRouter } from "../../router/router.js";

export async function setupTasks() {
  const usuario = getCurrentUser();
  const tasks = await obtenerTareas(usuario.id);
  const taskslist = document.getElementById("task-list");

  taskslist.innerHTML = tasks.map(task => `
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${task.status}</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-900">${task.title}</h2>
          <p class="mt-3 max-w-2xl text-slate-600">${task.description}</p>
        </div>
        <div class="flex gap-3">
          <button class="btn-edit rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" data-id="${task.id}">Editar</button>
          <button class="btn-delete rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" data-id="${task.id}">Eliminar</button>
        </div>
      </div>
    </article>
  `).join("");


  document.querySelectorAll(".btn-edit").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      window.history.pushState({}, "", `/task-form?id=${id}`);
      renderRouter();
    });
  });

  document.querySelectorAll(".btn-delete").forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      await eliminarTarea(id);
      renderRouter();
    })
  })

}
export function renderTasks() {
  return `<div class="min-h-screen bg-sky-50 text-slate-800">
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a id="go-dashboard" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a id="go-tasks" class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/tasks">Tareas</a>
          <a id="go-profile" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
          <a id="go-admin" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
          <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar las tareas del usuario autenticado.</p>
        </div>
        <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/task-form">Crear tarea</a>
      </section>

      <section class="mt-8 grid gap-4" id="task-list">
        
      </section>
    </main>
</div>`;
}