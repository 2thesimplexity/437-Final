document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
      darkModeToggle.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        const customEvent = new CustomEvent('darkmode:toggle', {
        detail: { isChecked },
        bubbles: true,
        cancelable: true
        });
        event.target.dispatchEvent(customEvent);
        event.stopPropagation();
    });
  
    document.body.addEventListener('darkmode:toggle', (event) => {
        const { isChecked } = event.detail;
        if (isChecked) {
        document.body.classList.add('dark-mode');
        } else {
        document.body.classList.remove('dark-mode');
        }
    });
});
  