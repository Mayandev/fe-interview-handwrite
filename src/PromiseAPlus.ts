// https://www.talkinghightech.com/en/implementing-a-javascript-promise/

/* eslint-disable prettier/prettier */
export enum MyPromiseState {
  pending,
  resolved,
  rejected,
}
export type MyPromiseInitiator<T> = (
  resolve: (val: T) => any,
  reject: (error: any) => any
) => any;

export class MyPromise<T> {
  private state: MyPromiseState = MyPromiseState.pending;
  private value: T | undefined;
  private reason: any;
  private onResolvedCallbacks: ((value: T) => void)[] = [];
  private onRejectedCallbacks: ((reason: any) => void)[] = [];

  constructor(executor: MyPromiseInitiator<T>) {
    executor(
      this.onCallbackResolved.bind(this),
      this.onCallbackFailed.bind(this)
    );
  }

  then(
    onFulfilled: (value: T) => T | void,
    onRejected?: (reason: any) => any
  ): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      if (this.state === MyPromiseState.resolved) {
        resolve(onFulfilled(this.value as T) as T);
      }
      if (this.state === MyPromiseState.rejected) {
        reject(this.reason);
      }
      if (this.state === MyPromiseState.pending) {
        this.onResolvedCallbacks.push((value) => {
          resolve(onFulfilled(value) as T);
        });
        onRejected && this.onRejectedCallbacks.push(onRejected);
      }
    });
  }

  catch(onRejected: (reason: any) => void) {
    if (this.state === MyPromiseState.rejected) {
      onRejected(this.reason);
    }
    if (this.state === MyPromiseState.pending) {
      this.onRejectedCallbacks.push(onRejected);
    }
  }

  private onCallbackResolved(value: T) {
    queueMicrotask(() => {
      if (this.state !== MyPromiseState.pending) return this.value;
      this.value = value;
      this.state = MyPromiseState.resolved;
      // Now update all the other registered callbacks that are waiting for this promise to resolve
      this.onResolvedCallbacks.forEach((callback) => callback(value));
      this.onResolvedCallbacks = [];
    });
  }

  private onCallbackFailed(reason: any) {
    queueMicrotask(() => {
      if (this.state !== MyPromiseState.pending) return this.reason;
      this.reason = reason;
      this.state = MyPromiseState.rejected;
      this.onRejectedCallbacks.forEach((callback) => callback(reason));
      this.onRejectedCallbacks = [];
    });
  }
}
