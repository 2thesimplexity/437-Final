// app/src/store.ts
export namespace Store {
    export interface Provider<M, Msg> extends HTMLElement {
      update: Update<M, Msg>;
      model: M;
      dispatch(msg: Msg): void;
    }
    
    export class Provider<M, Msg> extends HTMLElement {
      private _model: M;
      private _update: Update<M, Msg>;
  
      constructor(update: Update<M, Msg>, model: M) {
        super();
        this._update = update;
        this._model = model;
      }
  
      connectedCallback() {
        // Additional initialization if needed
      }
  
      dispatch(msg: Msg) {
        this._update(msg, this.apply.bind(this));
      }
  
      private apply(updateFn: (model: M) => M) {
        this._model = updateFn(this._model);
        this.render();
      }
  
      private render() {
        // Implement rendering logic here
      }
    }
  
    export type Update<M, Msg> = (msg: Msg, apply: ApplyFn<M>) => void;
    export type ApplyFn<M> = (updateFn: (model: M) => M) => void;
  }
  