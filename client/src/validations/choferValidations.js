import * as Yup from 'yup';

export const choferValidations = Yup.object({
    usuario: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    contrasenia: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    nombre: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    licencia: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    telefono: Yup.number().matches("[0-9]{8-12}", "Formato incorrecto, ingrese entre 8 a 12 digitos").required("¡Campo obligatorio!")
})