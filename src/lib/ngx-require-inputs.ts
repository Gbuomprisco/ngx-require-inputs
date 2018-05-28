export enum Lifecycle {
    OnInit = 'ngOnInit',
    DoCheck = 'ngDoCheck'
}

export enum Severity {
    Log = 'log',
    Throw = 'throw'
}

export interface Options<T> {
    default?: { [k in keyof T]?: any };
    onDoCheck?: boolean;
    severity?: Severity;
    message?: ((arg: string) => string) | string;
}

const defaults = {
    default: undefined,
    onDoCheck: false,
    severity: Severity.Log,
    message: (arg: string) => `Property "${arg}" is required`
};

const noop = () => { };

export function RequireInputs<T>(
    args: Array<keyof T>,
    opts: Options<T> = defaults
) {
    return function (target) {
        const prototype: T = target.prototype;
        const options: Options<T> = {
            ...defaults,
            ...opts
        };

        const createHookInterceptor = (name: string) => {
            const hook = prototype[name] ? prototype[name].bind(target) : noop;

            prototype[name] = function () {
                const controller = <T>this;

                function checkProperty(arg: string) {
                    if (controller[arg] === undefined) {
                        if (options.default) {
                            controller[arg] = options.default[arg];
                            return;
                        }

                        const message =
                            typeof options.message === 'string'
                                ? options.message
                                : options.message(arg);

                        if (options.severity === Severity.Log) {
                            console.warn(message);
                        } else if (options.severity === Severity.Throw) {
                            throw new Error(message);
                        }
                    }
                }

                // go through props and check each of them
                args.forEach(checkProperty);

                // call user defined hook
                hook();
            };
        };

        createHookInterceptor(Lifecycle.OnInit);

        if (options.onDoCheck) {
            createHookInterceptor(Lifecycle.DoCheck);
        }
    };
}
