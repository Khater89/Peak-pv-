const form = document.querySelector("#lead-form");
if (form) {
    form.addEventListener("submit", () => {
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = "Saving your request…";
        document.querySelector("#form-status").textContent =
            "Please wait while your request is saved.";
        // Native navigation preserves server validation and works without JavaScript.
        window.setTimeout(() => {
            button.disabled = false;
            button.innerHTML =
                'Send consultation request <span aria-hidden="true"><svg class="arrow" aria-hidden="true"><use href="/icons.svg#arrow"/></svg></span>';
            document.querySelector("#form-status").textContent =
                "If this page has not changed, the save is unconfirmed. You can retry safely.";
        }, 15000);
    });
}
window.addEventListener("pageshow", () => {
    const button = form?.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = false;
        button.innerHTML =
            'Send consultation request <span aria-hidden="true"><svg class="arrow" aria-hidden="true"><use href="/icons.svg#arrow"/></svg></span>';
    }
});
document.querySelector("#error-summary")?.focus();
