import * as Yup from 'yup';

export const transporteValidations = Yup.object({
    fechaInicio: Yup.date().min(new Date(), "Fecha/Hora de inicio debe ser mayor a fecha/hora actual").required("¡Campo obligatorio!"),
    fechaFin: Yup.date().min(fechaFin > fechaInicio, "Fecha de finalización debe ser mayor a fecha de inicio"),
    kmRecorridos: Yup.number().min(1,"Kilometros debe de ser mayor a 0").required("¡Campo obligatorio!"),
    origen: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    destino: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    matricula: Yup.string().required("¡Campo obligatorio!"),
    cliente: Yup.string().required("¡Campo obligatorio!")
})