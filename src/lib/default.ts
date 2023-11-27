import { FrameworkWidget } from "./widgets";

export function defaultByType(
  type: FrameworkWidget["template"]
): FrameworkWidget {
  switch (type) {
    case "button": {
      return {
        template: "button",
        widgetFamily: "layout",
        props: {
          text: "Button",
          behaivor: "next_node",
        },
      };
    }
    case "slider": {
      return {
        template: "slider",
        widgetFamily: "response",
        props: {
          minLabel: "Nada",
          maxLabel: "Mucho",
          dataKey: "slider",
          label: "¿Qué tanto te gusta hacer ejercicio físico?",
        },
      };
    }
    case "rich_text": {
      return {
        template: "rich_text",
        widgetFamily: "content",
        props: {
          content: "# Para empezar:",
        },
      };
    }
    case "text_input": {
      return {
        template: "text_input",
        widgetFamily: "response",
        props: {
          label: "¿Cuál es tu nombre?",
          placeholder: "Juan",
          dataKey: "nombre",
          required: true,
        },
      };
    }
    case "rating": {
      return {
        template: "rating",
        widgetFamily: "response",
        props: {
          label: "¿Qué tan bien te sentís?",
          max: 5,
          dataKey: "rating",
          required: true,
        },
      };
    }
    case "checkbox": {
      return {
        template: "checkbox",
        widgetFamily: "response",
        props: {
          label: "¿Qué tipo de carne comes?",
          options: [
            { label: "Res", value: "res" },
            { label: "Cerdo", value: "cerdo" },
            { label: "Pollo", value: "pollo" },
            { label: "Pescado", value: "pescado" },
          ],
          dataKey: "carne-tipo",
          required: true,
        },
      };
    }
    case "single_checkbox": {
      return {
        template: "single_checkbox",
        widgetFamily: "response",
        props: {
          label: "Acepto los terminos y deseo participar.",
          dataKey: "terminos",
          required: true,
          defaultValue: true,
        },
      };
    }
    case "radio": {
      return {
        template: "radio",
        widgetFamily: "response",
        props: {
          label: "¿Cada cuánto comes carne?",
          options: [
            { label: "Nunca", value: "nunca" },
            {
              label: "Menos de una vez a la semana",
              value: "<1",
            },
            { label: "1 o 2 veces por semana", value: "1-2" },
            { label: "3 a 5 veces por semana", value: "3-5" },
            {
              label: "Todos o casi todos los días",
              value: "todos-o-casi-todos-los-dias",
            },
            {
              label: "Todos los días en más de una comida",
              value: "todos-los-dias-mas-de-1",
            },
          ],
          dataKey: "carne-frecuencia",
          required: true,
        },
      };
    }
    case "dropdown": {
      return {
        template: "dropdown",
        widgetFamily: "response",
        props: {
          label: "¿En qué país vivís?",
          options: [
            { label: "Argentina", value: "argentina" },
            { label: "Brasil", value: "brasil" },
            { label: "Chile", value: "chile" },
            { label: "Colombia", value: "colombia" },
            { label: "Ecuador", value: "ecuador" },
            { label: "Paraguay", value: "paraguay" },
            { label: "Perú", value: "peru" },
            { label: "Uruguay", value: "uruguay" },
            { label: "Venezuela", value: "venezuela" },
          ],
          dataKey: "pais",
        },
      };
    }
    case "image": {
      return {
        template: "image",
        widgetFamily: "content",
        props: {
          alt: "Experiment Hub Logo",
          url: "https://cdn.experiment-hub.com/team/experiment-hub-opengraph.png",
        },
      };
    }
    default: {
      return {
        template: "group",
        widgetFamily: "layout",
        props: {
          widgets: [],
          name: "Group",
        },
      };
    }
  }
}
