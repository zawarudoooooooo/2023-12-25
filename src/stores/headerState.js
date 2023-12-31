import { defineStore } from "pinia";
import { Transition } from "vue";

export default defineStore("headerState", {
    state: () => ({
        headerColor: Transition,
    }),
    actions: {
        updateHeaderColor(color) {
        this.headerColor = color;
        },
    },
});