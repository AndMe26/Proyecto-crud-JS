export async function crearUsuario(usuario) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) {
        throw new Error('Error al crear usuario');
    }
    return await response.json();
}

export async function obtenerUsuarios() {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
        throw new Error('Error al obtener usuarios');
    }
    return await response.json();

}

export async function obtenerUsuario(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    if (!response.ok) {
        throw new Error('Error al obtener usuario');
    }
    const usuarios = await response.json();
    return usuarios.length > 0 ? usuarios[0] : null;
}

export async function actualizarUsuario(id, datosActualizados) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
    });
    if (!response.ok) {
        throw new Error('Error al actualizar usuario');
    }
    return await response.json();
}

export async function actuzalizarRolUsuario(id, nuevoRol) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: nuevoRol })
    });
    if (!response.ok) {
        throw new Error('Error al actualizar rol del usuario');
    }
    return await response.json();
}

export async function eliminarUsuario(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Error al eliminar usuario');
    }
    return await response.json();
}
