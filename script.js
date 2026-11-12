const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const list = document.querySelector(".list");

const url =
  "https://script.google.com/macros/s/AKfycbzG_5De9rEXQrTa-Bl44XpuAXDIhKwse115D_GgfJphnPU5Foxeg8Jx46TMTD79nlEU/exec";

const contactForm = document.forms["contact-form"];
const formStatus = document.getElementById("form-status");

// =========================
// Mobile Menu
// =========================

menu.addEventListener("click", function () {
  list.style.right = "0";
});

close.addEventListener("click", function () {
  list.style.right = "-160px";
});

// =========================
// Tabs
// =========================

tabLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    tabLinks.forEach((link) => {
      link.classList.remove("active");
    });

    tabContents.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    this.classList.add("active");

    const target = document.querySelector(this.getAttribute("href"));

    target.classList.add("active-tab");
  });
});

// =========================
// Contact Form
// =========================

const submitButton = document.getElementById("submit-btn");

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxxJtrqm9CweNRaSVQ4NOvAvtfaZP-VQIqFv7RMPEYfdffuUI-sdv9JsHTXtoIoPDHx/exec";

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const formData = new FormData(contactForm);

    // Button change
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Clear previous status
    formStatus.textContent = "";

    fetch(scriptURL, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.result === "success") {

            formStatus.textContent = "Message sent successfully! ✓";
            formStatus.style.color = "#00ff00";

            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);

            contactForm.reset();

        } else {

            formStatus.textContent =
                "Something went wrong. Please try again.";

            formStatus.style.color = "#ff5555";
        }

    })
    .catch(error => {

        console.error("Error:", error);

        formStatus.textContent =
            "Something went wrong. Please try again.";

        formStatus.style.color = "#ff5555";

    })
    .finally(() => {

        submitButton.disabled = false;
        submitButton.textContent = "Submit";

    });

});
