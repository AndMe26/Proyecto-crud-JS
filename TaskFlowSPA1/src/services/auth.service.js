import { obtenerUsuarios } from "./users.service";

const STORAGE_KEY = "taskflow_user";

export async function login(email, password) {
    
    const usuario = await obtenerUsuarios(email)
    if (!usuario) {
        return {
             success: true,
             message: "Usuario no encontrado"
        };
    };

    if (usuario.password !== password){

        return {
            success: false,
            message: "contraseña incorrecta"
        };
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(usuario)
    );

    return{
        success: true,
        user: usuario
    }

}

export function logout() {
    localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(){
    const usuarioGuardado = localStorage.getItem(STORAGE_KEY);

    if (!usuarioGuardado) {
        return null;

    }
    return JSON.parse(usuarioGuardado);
}

export function isAuthenticated(){
    return !!getCurrentUser();
}