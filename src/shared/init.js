/**
 * Shared: hide toggle button when content already fits without clipping.
 *
 * @param {string} blockSel  — block selector
 * @param {string} bodySel   — body selector
 * @param {string} toggleSel — toggle selector
 */
export function hideToggleWhenFits(blockSel, bodySel, toggleSel) {
	document.querySelectorAll(blockSel).forEach((el) => {
		const body = el.querySelector(bodySel);
		const toggle = el.querySelector(toggleSel);
		if (body && toggle && body.scrollHeight <= body.clientHeight) {
			toggle.hidden = true;
			el.classList.add("is-fully-visible");
		}
	});
}
