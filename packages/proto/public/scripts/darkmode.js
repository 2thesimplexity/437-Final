class DarkModeToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Create the template for the component
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
            .dark-mode-toggle {
            display: flex;
            align-items: center;
            cursor: pointer;
            }
            .dark-mode-toggle input {
            margin-right: 0.5em;
            }
        </style>
        <label class="dark-mode-toggle">
            <input type="checkbox" id="dark-mode-checkbox" autocomplete="off" />
            Dark mode
        </label>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Bind event listener to the checkbox
        this.checkbox = this.shadowRoot.getElementById('dark-mode-checkbox');
        this.checkbox.addEventListener('change', this.toggleDarkMode.bind(this));
    }

    connectedCallback() {
        // Initialize the checkbox state based on the current dark mode
        this.checkbox.checked = document.body.classList.contains('dark-mode');
    }

    toggleDarkMode(event) {
        const isChecked = event.target.checked;
        const customEvent = new CustomEvent('darkmode:toggle', {
        detail: { isChecked },
        bubbles: true,
        cancelable: true
        });
        this.dispatchEvent(customEvent);

        if (isChecked) {
        document.body.classList.add('dark-mode');
        } else {
        document.body.classList.remove('dark-mode');
        }
    }
}

customElements.define('dark-mode-toggle', DarkModeToggle);
