/**
 * Shared: button color picker for InspectorControls group="color".
 */
import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";

export function ButtonColorInspector({ clientId, buttonColor, setAttributes, textDomain }) {
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	return (
		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				__experimentalIsRenderedInSidebar
				panelId={clientId}
				settings={[{
					colorValue: buttonColor,
					label: __("Button", textDomain),
					onColorChange: (value) => setAttributes({ buttonColor: value }),
					isShownByDefault: true,
					resetAllFilter: () => setAttributes({ buttonColor: undefined }),
				}]}
				{...colorGradientSettings}
			/>
		</InspectorControls>
	);
}
