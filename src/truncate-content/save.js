import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { RawHTML } from "@wordpress/element";

export default function save({ attributes }) {
	const {
		maxHeight,
		readMoreText,
		readLessText,
		svgIcon,
		buttonColor,
		customButtonColor,
	} = attributes;

	const buttonColorValue = buttonColor
		? `var(--wp--preset--color--${buttonColor})`
		: customButtonColor;

	const blockProps = useBlockProps.save({
		style: {
			"--truncate-max-height": `${maxHeight}px`,
			"--truncate-button-color": buttonColorValue,
		},
		"data-read-more": readMoreText,
		"data-read-less": readLessText,
	});

	return (
		<div {...blockProps}>
			<div className="wp-block-flashblocks-truncate-content__body">
				<InnerBlocks.Content />
			</div>
			<button
				className="wp-block-flashblocks-truncate-content__toggle"
				type="button"
				aria-expanded="false"
			>
				{readMoreText}
				{svgIcon && (
					<RawHTML className="wp-block-flashblocks-truncate-content__icon">
						{svgIcon}
					</RawHTML>
				)}
			</button>
		</div>
	);
}
