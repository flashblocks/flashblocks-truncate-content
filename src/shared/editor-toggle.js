/**
 * Shared: editor toggle preview + keyboard handler.
 * Used by both truncate-content and accordion-content edit components.
 */
import { createElement } from "@wordpress/element";

export function TogglePreview({ blockClass, onToggle, label, svgIcon }) {
	return createElement(
		"span",
		{
			className: `${blockClass}__toggle`,
			onClick: onToggle,
			role: "button",
			tabIndex: 0,
			onKeyDown: (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onToggle();
				}
			},
		},
		label,
		svgIcon
			? createElement("span", {
				className: `${blockClass}__icon`,
				dangerouslySetInnerHTML: { __html: svgIcon },
			})
			: null,
	);
}
