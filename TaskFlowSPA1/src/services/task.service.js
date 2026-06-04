

const API_URL = "http://localhost:3000/tasks"

export async function crearTarea(tarea) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarea)
    });
    if (!response.ok) throw new Error("Error al crear tarea");
    return await response.json()
}

export async function obtenerTareas(userId) {
    const response = await fetch(`${API_URL}?userId=${userId}`)
    if (!response.ok) throw new Error("Error al obtener tareas")
    return await response.json();
}

export async function actualizarTarea(id, datos) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
    if (!response.ok) throw new Error("Error al actualizar tarea");
    return await response.json();
}

export async function eliminarTarea(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error("Error al eliminar tarea");
    return await response.json();
}

export async function obtenerTarea(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener tarea");
    return await response.json();
}