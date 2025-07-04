document.addEventListener("DOMContentLoaded", () => {
	const faqItems = document.querySelectorAll(".wp-block-create-block-faq .faq");

	faqItems.forEach((faq) => {
		const toggleBtn = faq.querySelector(":scope > div");
		const answer = faq.querySelector("p");

		if (!toggleBtn) return;

		toggleBtn.addEventListener("click", () => {
			faq.classList.toggle("active");
		});
	});
});
