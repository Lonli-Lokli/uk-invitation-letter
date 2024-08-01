import { createEvent, createStore, sample } from "effector";

export const openFormClicked = createEvent();
export const closeClicked = createEvent();

// stores
export const $isOpen = createStore(false);

sample({
    clock: openFormClicked,
    fn: () => true,
    target: $isOpen
})

sample({
    clock: closeClicked,
    fn: () => false,
    target: $isOpen
})