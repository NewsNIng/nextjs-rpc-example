const ServiceClassMap = new Map<string, any>();
const rpcMap = new Map<string, any>();

// RPC register
export function Rpc(
  symbolService: Symbol,
  options: {
    lazy?: boolean;
  } = {
    lazy: false,
  }
) {
  return (ServiceClass: any) => {
    const serviceName = symbolService.toString();
    if (!ServiceClassMap.has(serviceName)) {
      ServiceClassMap.set(serviceName, ServiceClass);
    }
    if (options.lazy !== true) {
      rpcMap.set(serviceName, new ServiceClass());
    }
  };
}

export function rpcGet(symbolService: Symbol | string) {
  const serviceName =
    typeof symbolService === "symbol"
      ? symbolService.toString()
      : (symbolService as string);

  if (rpcMap.has(serviceName)) {
    return rpcMap.get(serviceName);
  }

  if (ServiceClassMap.has(serviceName)) {
    const ServiceClass = ServiceClassMap.get(serviceName);
    rpcMap.set(serviceName, new ServiceClass());
    return rpcMap.get(serviceName);
  }

  throw Error("[rpcGet]: please check Service.");
}

export const Inject = (services?: any[]) => {
  console.log("[Inject Services]: ", services);
  // return (target: Function) => {
  //   return target;
  // };
};

const isServer = typeof window === "undefined";

export function getService<T>(symbolService: Symbol): T {
  if (isServer) {
    // Server
    return rpcGet(symbolService);
  } else {
    // Client
    return new Proxy(Object.create(null), {
      get(target, p, receiver) {
        return (...args: any[]) => {
          const body = {
            s: symbolService.toString(),
            m: p,
            a: args,
          };
          return fetch(`/_rpc?d=${encodeURIComponent(JSON.stringify(body))}`, {
            method: "GET",
            // body: JSON.stringify(body),
            credentials: "omit",
          }).then((res) => res.json());
        };
      },
    });
  }
}
