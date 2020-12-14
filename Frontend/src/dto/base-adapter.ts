export interface IAdapter<M, D, P> {
  toModel: (dto: D) => M;
  toPayload?: (model: M) => P;
}

export abstract class BaseAdapter<M, D, P = any>
  implements IAdapter<M, D, P | undefined> {
  toModel(dto: D): M {
    return this.convertToModel(dto);
  }

  toPayload(model: M): P | undefined {
    if (this.convertToPayload) {
      return this.convertToPayload(model);
    } else {
      return undefined;
    }
  }

  protected convertToPayload?(model: M): P;
  protected abstract convertToModel(dto: D): M;
}
