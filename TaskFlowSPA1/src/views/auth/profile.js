import { getCurrentUser, logout } from "../../services/auth.service";
import { actualizarUsuario, eliminarUsuario } from "../../services/users.service";
import { renderRouter } from "../../router/router.js";

export function setupProfile() {
  const saveBtn = document.getElementById("save-profile")
  const deleteBtn = document.getElementById("delete-account")
  const nombre = document.getElementById("name")
  const lastname = document.getElementById("lastname")
  const email = document.getElementById("profile-email")
  const password = document.getElementById("password-new")
  const profileMessage = document.getElementById("profile-message")

  saveBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const usuario = getCurrentUser();

    if (
      !nombre.value.trim() ||
      !lastname.value.trim() ||
      !email.value.trim()
    ) {
      profileMessage.textContent = "Todos los campos son obligatorios excepto la contraseña";
      profileMessage.className = "text-sm font-medium text-red-500";
      return;
    }

    const userUpdated = {

      id: usuario.id,  // aunque no se vaya a modificar se pone el id para que se conserve la id en la database
      name: nombre.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value || usuario.password,
      role: usuario.role
    };

    await actualizarUsuario(usuario.id, userUpdated);
    localStorage.setItem("taskflow_user", JSON.stringify({ ...usuario, ...userUpdated }))
    profileMessage.textContent = "Perfil actualizado correctamente";
    profileMessage.className = "text-sm font-medium text-green-500";
  });

  deleteBtn.addEventListener("click", async (event) => {  //async: permite que la pagina web siga funcionando sin congelarse mientras espera la respuesta
    event.preventDefault();
    const usuario = getCurrentUser();
    await eliminarUsuario(usuario.id);
    logout();
    window.history.pushState({}, "", "/login"); 
    renderRouter();
  });

}
export function renderProfile() {
  const usuario = getCurrentUser();

  return `<div class="min-h-screen bg-sky-50 text-slate-800">
  <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
      <nav class="hidden gap-3 md:flex">
        <a id="go-dashboard" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
        <a id="go-tasks" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
        <a id="go-profile" class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/profile">Perfil</a>
      </nav>
    </div>
  </header>

  <main class="mx-auto max-w-5xl px-6 py-10">
    <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <aside class="rounded-[2rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Cuenta</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight">Mi perfil</h1>
        <p class="mt-4 text-blue-50">El usuario puede actualizar sus datos personales y gestionar su propia cuenta dentro del sistema.</p>
      </aside>

      <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
        <form class="grid gap-5">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="name">Nombre</label>
            <input id="name" type="text" value="${usuario.name}" placeholder="Actualiza tu nombre"  class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="lastname">Apellido</label>
            <input id="lastname" type="text" value="${usuario.lastname}" placeholder="Actualiza tu apellido"  class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-email">Correo</label>
            <input id="profile-email" type="email" value="${usuario.email}" placeholder="Actualiza tu correo" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="password-new">Nueva contrasena</label>
            <input id="password-new" type="password" placeholder="Actualiza tu contrasena" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
          </div>
          <div id="profile-message"></div>
          <div class="flex flex-col gap-3 pt-2 sm:flex-row">
            <button id="save-profile" type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500" href="/profile">Guardar cambios</button>
            <button id="delete-account" class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/login">Eliminar mi cuenta</button>
          </div>
        </form>
      </section>
    </section>
  </main>
</div>`;
}