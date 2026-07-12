Object.defineProperties(String.prototype, {
  upperFirst: {
    value() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
  },
  lowerFirst: {
    value() {
      return this.charAt(0).toLowerCase() + this.slice(1);
    },
  },
});

export {};
