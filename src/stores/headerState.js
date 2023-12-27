import { defineStore } from "pinia";

export default defineStore("headerState", {
    state: () => ({
        headerColor: "#E9D2A6",
    }),
    actions: {
        updateHeaderColor(color) {
        this.headerColor = color;
        },
    },
});