/**
 * Shared: save-side toggle button markup.
 * Used by both truncate-content and accordion-content save components.
 */
import { RawHTML } from "@wordpress/element";

export function SaveToggle({ blockClass, label, svgIcon }) {
	return (
		<button
			className={`${blockClass}__toggle`}
			type="button"
			aria-expanded="false"
		>
			{label}
			{svgIcon && (
				<RawHTML className={`${blockClass}__icon`}>
					{svgIcon}
				</RawHTML>
			)}
		</button>
	);
}
