function copyText(button) {
    const pre = button.parentElement.querySelector("pre");
    const text = pre.innerText;

    navigator.clipboard.writeText(text).then(() => {
        const original = button.innerText;
        button.innerText = "Copied!";
        setTimeout(() => {
            button.innerText = original;
        }, 1200);
    });
}
