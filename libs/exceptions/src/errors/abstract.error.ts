export interface ErrorDetail {
  field: string;
  message: string;
}

export interface IAbstractError {
  readonly details: ErrorDetail[];
}
