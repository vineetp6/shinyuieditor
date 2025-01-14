import { nodeInfoFactory } from "../nodeInfoFactory";

export const output_text = nodeInfoFactory<{
  outputId: string;
}>()({
  id: "textOutput",
  r_info: {
    fn_name: "textOutput",
    package: "shiny",
    output_bindings: {
      renderScaffold: {
        fn_name: "renderText",
        fn_body: `"Hello, World"`,
      },
    },
  },
  py_info: {
    fn_name: "ui.output_text",
    package: "shiny",
    output_bindings: {
      renderScaffold: {
        fn_name: "@render.text",
        fn_body: `"Hello, World"`,
      },
    },
  },
  title: "Text Output",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      inputType: "id",
      label: "Output ID",
      defaultValue: "textOutput",
    },
  },
  category: "Outputs",
  description: `
  Render a reactive output variable as text within an application page. 
  Usually paired with \`renderText()\`.
  `,
});
