import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridApp from "components/shiny-ui/GridApp";
import React from "react";
import { TemplatedGridProps } from "utils/parseGridTemplateAreas";

const mainLayout: TemplatedGridProps = {
  areas: [
    ["title", "title"],
    ["settings", "plot"],
    ["footer", "footer"],
  ],
  rowSizes: ["100px", "350px", "30px"],
  colSizes: ["250px", "1fr"],
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/GridApp",
  component: GridApp,
} as ComponentMeta<typeof GridApp>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GridApp> = (args) => (
  <GridApp {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  layout: mainLayout,
  labelAreas: true,
  panels: {
    title: {
      componentName: "titlePanel",
      componentProps: { title: "My App" },
    },
    settings: {
      componentName: "sliderInput",
      componentProps: { name: "My slider!", height: "100%", width: "100%" },
    },
    plot: {
      componentName: "plotOutput",
      componentProps: { name: "My Plot!" },
    },
  },
};