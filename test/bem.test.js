import React from "react";
import { shallow } from "enzyme";
import { bem } from "../src/bem";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("bem", () => {
  test("creates correct BEM classes", () => {
    const BEM = bem("alert");
    expect(`${BEM}`).toBe("alert");
    expect(`${BEM.element("wrap")}`).toBe("alert__wrap");

    expect(`${BEM.element("wrap").modifier("warning")}`).toBe(
      "alert__wrap alert__wrap--warning"
    );
    expect(`${BEM.modifier("warning")}`).toBe("alert alert--warning");
  });

  test("allows for array modifiers", () => {
    const BEM = bem("alert")
      .e("text")
      .m(["active", undefined, null, "red"]);

    expect(`${BEM}`).toBe("alert__text alert__text--active alert__text--red");
  });

  test("allows for object modifiers", () => {
    let BEM;

    BEM = bem("alert")
      .e("text")
      .m({
        active: true,
        jumbo: true,
        inactive: false
      });

    expect(`${BEM}`).toBe("alert__text alert__text--active alert__text--jumbo");

    BEM = bem("alert").m({
      active: false,
      jumbo: false
    });

    expect(`${BEM}`).toBe("alert");
  });

  test("renders classes for partial curry", () => {
    const Dummy = () => (
      <div className={bem("my-component").modifier("floating")}>
        <div className={bem("my-component").element("button")} />
        <div
          className={bem("my-component")
            .element("button")
            .modifier("warning")}
        />
      </div>
    );

    const $wrapper = shallow(<Dummy />);

    [
      ".my-component",
      ".my-component--floating",
      ".my-component.my-component--floating",
      ".my-component__button",
      ".my-component__button--warning",
      ".my-component__button.my-component__button--warning"
    ].forEach(selector => {
      expect($wrapper.find(selector).exists()).toBe(true);
    });

    expect($wrapper.find(".my-component__button").length).toBe(2);
  });

  test("bem.toSelector", () => {
    const block = bem("my-component");
    expect(block.toSelector()).toBe(".my-component");

    const element = block.element("button");
    expect(element.toSelector()).toBe(".my-component__button");

    const modifiedBlock = block.modifier("floating");
    expect(modifiedBlock.toSelector()).toBe(
      ".my-component.my-component--floating"
    );

    const modifiedElement = element.modifier("warning");
    expect(modifiedElement.toSelector()).toBe(
      ".my-component__button.my-component__button--warning"
    );

    const modifiedBlockElement = modifiedBlock.element("button");
    expect(modifiedBlockElement.toSelector()).toBe(
      ".my-component__button.my-component__button--floating"
    );

    const modifiedModifiedBlockElement = modifiedBlockElement.modifier(
      "success"
    );
    expect(modifiedModifiedBlockElement.toSelector()).toBe(
      ".my-component__button.my-component__button--success"
    );
  });
});
