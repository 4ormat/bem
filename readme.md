# BEM

A small utility for creating old-school BEM classes, especially in a React context.

## Quickstart

Given a component definition

```
import { bem } from "bem";

export const AlertBar = ({ level, message }) => {
  const b = bem("alert-bar");

  return (
    <div className={b.e("wrapper")}>
      <p className={b.e("message").m(level)}>{message}</p>
    </div>
  );
};
```

Rendering

```
<AlertBar message="Hello!" level="warning" />
```

Yields

```
<div class="alert-bar__wrapper">
  <p class="alert-bar__message alert-bar__message--warning">Hello!</p>
</div>
```

## Examples

### Simple Elements
- `bem('alert-bar').e('wrapper')` yields `"alert-bar__wrapper"`

### String Modifiers
- `bem('alert-bar').m('warning')` yields `"alert-bar alert-bar--warning"`
- `bem('alert-bar').e('wrapper').m('warning')` yields `"alert-bar__wrapper alert-bar__wrapper--warning"`

### Array Modifiers
- `bem('alert-bar').m(['warning', 'condensed'])` yields `"alert-bar alert-bar--warning alert-bar--condensed"`
- `bem('alert-bar').e('wrapper').m(['warning', 'condensed'])` yields `"alert-bar__wrapper alert-bar__wrapper--warning" alert-bar__wrapper--condensed`

### Object Modifiers
- `bem('alert-bar').m({ warning: true, condensed: true })` yields `"alert-bar alert-bar--warning alert-bar--condensed"`
- `bem('alert-bar').e('wrapper').m({ warning: true, expanded: false })` yields `"alert-bar__wrapper alert-bar__wrapper--warning"`
