import { ComponentMeta, ComponentStory } from "@storybook/react";
import UiPanel from "components/shiny-ui/UiPanel";
import React from "react";
import { uniqueMatrixElements } from "utils/array-helpers";
import { AreaLabeledGridHolder } from "../../GridHolder";

const layoutAreas = [["a", "b"]];
const uniqueAreas = uniqueMatrixElements(layoutAreas);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/UiPanel",
  component: UiPanel,
  argTypes: {
    area: {
      control: { type: "select", options: uniqueAreas },
    },
  },
} as ComponentMeta<typeof UiPanel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UiPanel> = (args) => (
  <AreaLabeledGridHolder
    areas={layoutAreas}
    rowSizes={"400px"}
    colSizes={"400px"}
    gapSize={"1rem"}
  >
    <UiPanel {...args} />
  </AreaLabeledGridHolder>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  area: uniqueAreas[0],
};

export const Slider = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Slider.args = {
  area: uniqueAreas[0],
  componentDefinition: {
    componentName: "sliderInput",
    componentProps: {
      min: 0,
      max: 10,
      val: 5,
    },
  },
};