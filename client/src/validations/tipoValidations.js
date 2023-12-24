import * as Yup from 'yup';

export const tipoValidations = Yup.object({
    idTipo: Yup.string().matches("[A-Z]{5}[0-9]{2}", "Formato incorrecto, ej: ABCDE12" ).required("¡Campo obligatorio!"),
    descripcion: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    dimensiones: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    ejes: Yup.number().min(0).max(6).required("¡Campo obligatorio!"),
    carga: Yup.number().min(1,"Carga debe de ser mayor a 0").required("¡Campo obligatorio!"),
    carga: Yup.number().min(1,"Combustible debe de ser mayor que 0").required("¡Campo obligatorio!")
})