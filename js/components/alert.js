export default class Alert {
    constructor(alertId) {
        this.alert = document.querySelector(`#${alertId}`);
    }

    show(message) {
        this.alert.classList.remove("d-none");
        this.alert.textContent = message;
    }

    hide() {
        this.alert.classList.add("d-none");
    }
}
