const expiryPeriod = 15 * 60 * 1000; //5 minutes
export class StorageCache {
  suffixKey: string | null;
  prefixKey: string | null;

  constructor(prefixKey: string, suffixKey = "") {
    this.suffixKey = suffixKey;
    this.prefixKey = prefixKey;
  }
  getKey() {
    if (this.suffixKey) {
      return `${this.prefixKey}-${this.suffixKey}`;
    } else {
      return this.prefixKey;
    }
  }

  getObject() {
    try {
      const parms = this.getKey();
      const data = parms && localStorage.getItem(parms);
      const obj = data && JSON.parse(data);
      return {
        ...obj,
        is_valid: Date.now() - obj.timestamp < expiryPeriod,
      };
    } catch (err) {
      return { value: {}, is_valid: false };
    }
  }

  getArray() {
    try {
      const parms = this.getKey();
      const data = parms && localStorage.getItem(parms);
      const obj = data && JSON.parse(data);
      return {
        ...obj,
        is_valid: Date.now() - obj.timestamp < expiryPeriod,
      };
    } catch (err) {
      return { value: [], is_valid: false };
    }
  }

  set(value: any) {
    try {
      const obj = { value, timestamp: Date.now() };
      const _key = this.getKey();
      if (_key) localStorage.setItem(_key, JSON.stringify(obj));
    } catch (err) {
      console.error("set", err);
      throw new Error("Cannot Store");
    }
  }

  reset() {
    ///////remove all items
    try {
      ////////////////////////
      const { prefixKey } = this;
      if (prefixKey) localStorage.removeItem(prefixKey);
      //keys from suffix keys
      const keys = Object.keys(localStorage).filter(
        (key) => prefixKey && key.indexOf(prefixKey) == 0
      );

      ///remove all items
      for (const key of keys) {
        localStorage.removeItem(key);
      }
      //////////////////////////
    } catch (err) {
      console.error("reset", err);
    }
  }
}
