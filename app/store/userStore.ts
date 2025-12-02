// store/counterStore.ts
import { Store } from "@tanstack/store";

export interface CounterState {
  count: number;
}

export const counterStore = new Store<CounterState>({
  count: 0,
});

// Actions – bularni componentdan chaqirasan
export const increment = () =>
  counterStore.setState((state) => ({ count: state.count + 1 }));
export const decrement = () =>
  counterStore.setState((state) => ({ count: state.count - 1 }));
export const reset = () => counterStore.setState({ count: 0 });
export const setValue = (value: number) =>
  counterStore.setState({ count: value });
