import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	TextControl,
	TextareaControl,
	ToggleControl,
} from "@wordpress/components";
import "./style.scss";
import "./editor.scss";

export default function Edit({ attributes, setAttributes, clientId }) {
	const { maxHeight, readMoreText, readLessText, svgIcon, showFade, buttonColor } =
		attributes;
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const blockProps = useBlockProps({
		style: {
			"--truncate-max-height": `${maxHeight}px`,
			"--truncate-button-color": buttonColor,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Truncation Settings", "flashblocks-truncate-content")}
					initialOpen={true}
				>
					<ToggleControl
						label={__("Show fade effect", "flashblocks-truncate-content")}
						checked={showFade}
						onChange={(value) => setAttributes({ showFade: value })}
					/>
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
					panelId={clientId}
					settings={[
						{
							colorValue: buttonColor,
							label: __("Button", "flashblocks-truncate-content"),
							onColorChange: (value) =>
								setAttributes({ buttonColor: value }),
							isShownByDefault: true,
							resetAllFilter: () =>
								setAttributes({ buttonColor: undefined }),
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
