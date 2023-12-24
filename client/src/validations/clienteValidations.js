import * as Yup from 'yup';

export const clienteValidations = Yup.object({
    documento: Yup.string().max(15, "15 caracteres máximo").required("¡Campo obligatorio!"),
    nombreCompleto: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    direccion: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    telefono: Yup.number().matches("[0-9]{8-12}", "Formato incorrecto, ingrese entre 8 a 12 digitos").required("¡Campo obligatorio!")
})