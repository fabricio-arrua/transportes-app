import * as Yup from 'yup';

export const tecnicoValidations = Yup.object({
    usuario: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    pass: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    nombre: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    especializacion: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
})