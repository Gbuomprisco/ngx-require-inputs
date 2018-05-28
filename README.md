# ngx-require-inputs

Decorator for declarative enforcing of Angular component inputs

## Install

    npm i -d ngx-require-inputs

## Basic Usage

```javascript
import { RequireInputs } from 'ngx-require-inputs';

@RequireInputs<PersonComponent>(['name'])
@Component({
  selector: 'person',
  // config ...
})
export class PersonComponent {
  @Input() public name: string;
}
```

Calling the component with the following HTML will console.warn that "name" has not been defined

```html
<person></person>
```

But this will not:

```html
<person [name]="'Giancarlo'"></person
```

## Config

Options interface:

```
{
    default?: { [k in keyof T]?: any };
    onDoCheck?: boolean;
    severity?: Severity ('throw' | 'log');
    message?: ((arg: string) => string) | string;
}
```

- default: object of properties to assign a default value to the options required. This will not log an error.
- onDoCheck: this will also run the validation on every change, rather than only on ngOnInit. To make this work with AOT, make sure you do define ngDoCheck in your component, even if empty.
- severity: by default the log will only be a warning, but if set as 'throw' (or Severity.Throw), the runtime will throw an error instead. Useful in dev mode.
- message: Either a string or a function that takes the property name. By default it is `(arg: string) => Property "${arg}" is required`.

### Example

```javascript
import { RequireInputs, Severity } from 'ngx-require-inputs';

@RequireInputs<PersonComponent>(['name'], {
  default: {
    name: 'Me'
  },
  onDoCheck: true,
  severity: Severity.Throw,
  message: (arg: string) => `Ehi, ${arg} is required!`
})
@Component({
  selector: 'person'
})
export class PersonComponent {
  @Input() public name: string;

  ngOnInit() {
    console.log('On Init called');
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
  }
}

```
