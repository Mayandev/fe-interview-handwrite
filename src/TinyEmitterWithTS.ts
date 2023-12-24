export interface EventDict {
  [key: string]: ((...args: any) => any)[];
}

/**
 * @description 简单的发布订阅模式
 */
export class EventRocket {
  eventDict: EventDict = Object.create(null);

  //  发布
  publish<T extends (...args: any) => any = (...args: any) => any>(
    eventName: string,
    cb: T
  ) {
    if (!this.eventDict.hasOwnProperty(eventName)) {
      // 增加发布数组
      Object.assign(this.eventDict, {
        [eventName]: [],
      });
    }

    this.eventDict[eventName].push(cb);

    return this;
  }

  //   订阅
  emit(
    eventName: string,
    ...args: Parameters<(typeof this.eventDict)[string][number]>
  ) {
    const emitted = this.eventDict[eventName];

    if (emitted.length) {
      emitted.forEach((cb) => {
        cb(...args);
      });
    }

    return this;
  }

  //  取消发布
  unpublish<T extends (...args: any) => any = (...args: any) => any>(
    eventName: string,
    cb: T
  ): this {
    const cbIndex = this.eventDict[eventName].indexOf(cb);
    if (cbIndex > -1) {
      this.eventDict[eventName].splice(cbIndex, 1);
    }

    return this;
  }
  //    一次即用
  once<T extends (...args: any) => any = (...args: unknown[]) => unknown>(
    eventName: string,
    cb: T,
    ...args: Parameters<T>
  ) {
    // 执行一次的回调函数
    const listener = () => {
      this.unpublish(eventName, cb);
      cb(...(args as any[]));
    };

    return this.publish(eventName, listener);
  }
}
