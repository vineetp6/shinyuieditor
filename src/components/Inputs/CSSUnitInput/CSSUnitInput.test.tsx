import { useState } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { CSSMeasure } from "../../../CSSMeasure";

import { CSSUnitInput } from ".";

function UseCssUnitInput({ initialValue }: { initialValue: CSSMeasure }) {
  const [value, setValue] = useState<CSSMeasure>(initialValue);

  return <CSSUnitInput value={value} onChange={setValue} />;
}

test("Initializes properly", () => {
  render(<CSSUnitInput value={"3rem"} onChange={(newVal) => {}} />);
  expect(screen.getByLabelText("value-count")).toHaveValue(3);
  expect(screen.getByLabelText("value-unit")).toHaveValue("rem");
});

test("Can show a subset of units", () => {
  render(
    <CSSUnitInput
      value={"3rem"}
      units={["rem", "px"]}
      onChange={(newVal) => {}}
    />
  );

  expect(screen.queryByText(/rem/i)).toBeTruthy();
  expect(screen.queryByText(/px/i)).toBeTruthy();
  expect(screen.queryByText(/auto/i)).toBeFalsy();
  expect(screen.queryByText(/fr/i)).toBeFalsy();
});

test("Auto units will disable the count input", () => {
  render(<UseCssUnitInput initialValue={"1px"} />);

  const countInput = screen.getByLabelText("value-count");
  const unitInput = screen.getByLabelText("value-unit");

  expect(countInput).not.toBeDisabled();
  expect(unitInput).toHaveValue("px");

  userEvent.selectOptions(screen.getByLabelText("value-unit"), "auto");
  expect(countInput).toBeDisabled();
  expect(unitInput).toHaveValue("auto");
});