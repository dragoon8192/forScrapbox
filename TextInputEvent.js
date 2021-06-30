import { scrapboxDOM } from "../UserScript:ScrapboxDOM/script.js";
export class KeyboardEventManager {
    #eventTarget;
    constructor(eventTarget) {
        this.#eventTarget = eventTarget;
    }
    keyDownUp(keyboardEventInit) {
        const patch = {
            bubbles: true,
            cancelable: true,
        };
        const pKeyboardEventInit = Object.assign(Object.create(keyboardEventInit), patch);
        const keyboardEventDown = new KeyboardEvent("keydown", pKeyboardEventInit);
        const keyboardEventUp = new KeyboardEvent("keyup", pKeyboardEventInit);
        this.#eventTarget.dispatchEvent(keyboardEventDown);
        this.#eventTarget.dispatchEvent(keyboardEventUp);
        return this;
    }
    async insertText(text, { wait = 1 } = {}) {
        this.#eventTarget.focus();
        this.#eventTarget.value = text;
        const uiEvent = new UIEvent("input");
        this.#eventTarget.dispatchEvent(uiEvent);
        await this.sleep(wait);
        return this;
    }
    sleep(msec) {
        return(new Promise(resolve => setTimeout(resolve,msec)));
    }
}

export const keyboardEventManager = new KeyboardEventManager(scrapboxDOM.textInput);
