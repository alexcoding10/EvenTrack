export const CARD_COLORS = [
    {
        bgColor: "#FF5733",   // color de fondo
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#8E44AD",    // color de fondo
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#28B463",    // color de fondo
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#F1C40F",    // color de fondo
        textColor: "#000000",  // color de texto
    },
    {
        bgColor: "#3498DB",    // color de fondo (azul brillante)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#2ECC71",    // color de fondo (verde brillante)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#F39C12",    // color de fondo (amarillo dorado)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#E74C3C",    // color de fondo (rojo brillante)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#9B59B6",    // color de fondo (púrpura)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#1ABC9C",    // color de fondo (verde azulado)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#16A085",    // color de fondo (verde océano)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#D35400",    // color de fondo (naranja oscuro)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#C0392B",    // color de fondo (rojo oscuro)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#BDC3C7",    // color de fondo (gris claro)
        textColor: "#000000",  // color de texto
    },
    {
        bgColor: "#34495E",    // color de fondo (gris oscuro azulado)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#F8C471",    // color de fondo (amarillo cálido)
        textColor: "#000000",  // color de texto
    },
    {
        bgColor: "#D5DBDB",    // color de fondo (gris claro)
        textColor: "#000000",  // color de texto
    },
    {
        bgColor: "#A3E4D7",    // color de fondo (verde menta claro)
        textColor: "#000000",  // color de texto
    },
    {
        bgColor: "#F7DC6F",    // color de fondo (amarillo pastel)
        textColor: "#000000",  // color de texto
    },
    {
        bgColor: "#F5B7B1",    // color de fondo (rosa claro)
        textColor: "#000000",  // color de texto
    },
    {
        bgColor: "#85929E",    // color de fondo (gris azulado)
        textColor: "#ffffff",  // color de texto
    },
    {
        bgColor: "#7FB3D5",    // color de fondo (azul claro)
        textColor: "#ffffff",  // color de texto
    }
];

export const getCardColorByIndex = (index: number) => {
    // Usar el módulo para asegurar que el índice esté dentro del rango de CARD_COLORS
    const colorIndex = index % CARD_COLORS.length;
    return CARD_COLORS[colorIndex];
};