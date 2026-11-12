/** Type guard that checks the shape of a value read from storage. */
export type StorageValidator<T> = (value: unknown) => value is T;
