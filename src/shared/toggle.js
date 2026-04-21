/**
 * Shared: delegated toggle click handler.
 * Swaps label text and aria-expanded, calls onExpand/onCollapse callbacks.
 */
export function initToggle(blockSel, toggleSel, { onExpand, onCollapse }) {
	document.addEventListener("click", (e) => {
		const btn = e.target.closest(toggleSel);
		if (!btn) return;
		const block = btn.closest(blockSel);
		if (!block) return;

		const willExpand = !block.classList.contains("is-expanded");

		const updateLabel = (expanded) => {
			const t = btn.firstChild;
			if (t?.nodeType === Node.TEXT_NODE) {
				t.textContent = expanded
					? (block.dataset.readLess || "Read Less")
					: (block.dataset.readMore || "Read More");
			}
			btn.setAttribute("aria-expanded", String(expanded));
		};

		if (willExpand) {
			onExpand(block, updateLabel);
		} else {
			onCollapse(block, updateLabel);
		}
	});
}
