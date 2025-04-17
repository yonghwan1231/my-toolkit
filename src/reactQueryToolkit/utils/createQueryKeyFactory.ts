type FlattenKeysType<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? K | FlattenKeysType<T[K]> : never
    }[keyof T]
  : never

type FlattenMappingType<T> = {
  [K in FlattenKeysType<T>]: string[]
}

export const createQueryKeyFactory = <T extends Record<string, unknown>>(
  apis: T,
  domain: string,
): FlattenMappingType<T> => {
  const result = {} as FlattenMappingType<T>
  const traverse = (obj: Record<string, unknown>, path: string[]): void => {
    for (const key in obj) {
      const value = obj[key]
      result[key as FlattenKeysType<T>] = [...path, key]
      traverse(value as Record<string, unknown>, [...path, key])
    }
  }
  traverse(apis, [domain])
  return result
}
