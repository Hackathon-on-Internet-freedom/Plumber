export const stateToObject = <T>(
  props: { [key in keyof T]: [Readonly<T[key]>, (v: T[key]) => void] }
) => {
  const obj = {} as T;
  Object.keys(props).forEach((key) => {
    const tkey = key as keyof T;
    Object.defineProperty(obj, tkey, {
      get: () => props[tkey][0],
      set: (v) => {
        try {
          props[tkey][1](v);
        } catch (error) {
          console.log(error);
        }
      },
    });
  });
  return obj;
};

export const bindMethods = <ObjectProps, Methods>(
  obj: ObjectProps,
  props: { [key in keyof Methods]: (data: ObjectProps) => Methods[key] }
) => {
  Object.keys(props).forEach((key) => {
    const tkey = key as keyof Methods;
    Object.defineProperty(obj, tkey, { get: () => props[tkey](obj) });
  });
  return obj as ObjectProps & Methods;
};
