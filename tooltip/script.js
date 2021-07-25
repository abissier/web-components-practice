const template = document.createElement('template');
template.innerHTML = `

<style>
.tooltip-container {
    display: inline-block;
    position: relative;
    z-index: 2;
}

img {
    width:  1em;
    cursor: pointer;
}

.cancel {
    display: none;
}

.notify-container {
    position: absolute;
    bottom: 125%;
    z-index: 9;
    width: 300px;
    background: white;
    box-shadow: 5px 5px 10px rgba(0,0,0,.1);
    font-size: .8em;
    border-radius: .5em;
    padding: 1em;
    transform: scale(0);
    transform-origin: bottom left;
    transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
}
</style>

<div class="tooltip-container">
    <img src="css/alert.png" class="alert">
    <img src="css/exit.png" class="cancel">

    <div class="notify-container">
        My tooltip container

    </div>

</div>

`

class PopupNotify extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');

        if(expandState == true) {
            tooltip.style.transform == 'scale(1)';
            alert.style.display = 'none';
            cancel.style.display = 'block';
            expandState = 'false';
        } else {
            tooltip.style.transform == 'scale(0)';
            alert.style.display = 'block';
            cancel.style.display = 'none';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
            this.tooltip(true)
        });

        this.shadowRoot.querySelector('.cancel').addEventListener('click', () => {
            this.tooltip(false)
        });

        if (this.getAttribute('tip_background')) {
            this.shadowRoot.querySelector('.notify-container').style.background = this.getAttribute('tip_background');
        } 

        if (this.getAttribute('tip_color')) {
            this.shadowRoot.querySelector('.notify-container').style.color = this.getAttribute('tip_color');
        } 
    }
};



window.customElements.define('popup-notify', PopupNotify)