import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	withColors,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	TextControl,
	TextareaControl,
} from "@wordpress/components";
import "./style.scss";
import "./editor.scss";

function Edit({
	attributes,
	setAttributes,
	buttonColor,
	setButtonColor,
}) {
	const { maxHeight, readMoreText, readLessText, svgIcon, customButtonColor } =
		attributes;
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const buttonColorValue = buttonColor?.slug
		? `var(--wp--preset--color--${buttonColor.slug})`
		: customButtonColor;

	const blockProps = useBlockProps({
		style: {
			"--truncate-max-height": `${maxHeight}px`,
			"--truncate-button-color": buttonColorValue,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Truncation Settings", "flashblocks-truncate-content")}
					initialOpen={true}
				>
					<RangeControl
						label={__("Content Height (px)", "flashblocks-truncate-content")}
						value={maxHeight}
						onChange={(value) => setAttributes({ maxHeight: value })}
						min={30}
						max={500}
						step={5}
					/>
					<TextControl
						label={__("Read More Text", "flashblocks-truncate-content")}
						value={readMoreText}
						onChange={(value) =>
							setAttributes({ readMoreText: value })
						}
					/>
					<TextControl
						label={__("Read Less Text", "flashblocks-truncate-content")}
						value={readLessText}
						onChange={(value) =>
							setAttributes({ readLessText: value })
						}
					/>
					<TextareaControl
						label={__("SVG Icon", "flashblocks-truncate-content")}
						help={__("Paste SVG markup for the toggle icon. Leave blank for no icon.", "flashblocks-truncate-content")}
						value={svgIcon}
						onChange={(value) =>
							setAttributes({ svgIcon: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					__experimentalIsRenderedInSidebar
					settings={[
						{
							colorValue: buttonColor?.color,
							label: __("Button", "flashblocks-truncate-content"),
							onColorChange: setButtonColor,
							isShownByDefault: true,
							resetAllFilter: () => setButtonColor(undefined),
						},
					]}
					{...colorGradientSettings}
				/>
			</InspectorControls>
			<div {...blockProps}>
				<div className="wp-block-flashblocks-truncate-content__body">
					<InnerBlocks />
				</div>
				<span className="wp-block-flashblocks-truncate-content__toggle">
					{readMoreText}
					{svgIcon && (
						<span
							className="wp-block-flashblocks-truncate-content__icon"
							dangerouslySetInnerHTML={{ __html: svgIcon }}
						/>
					)}
				</span>
			</div>
		</>
	);
}

export default withColors({ buttonColor: "button-color" })(Edit);
