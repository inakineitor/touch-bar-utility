# Touch Bar Utility

<div class="alert alert-warning" role="alert">
  <strong>Beware</strong> This package only works with Atom >=v1.19
</div>
<br>
An Atom package that allows you to assign custom actions to Touch Bar components.

## Usage
1.  Go to File → Settings → Packages
2.  Find touch-bar-utility and click on the card **but not on the name of the package**
3.  Go to Settings and edit the Buttons entry with a JSON array of Touch Bar components
    *   A component has the following format: {"type": "&lt;typeOfElement&gt;"\[, ...\]}

## Touch Bar Components

### TouchBarButton (type: "button")
 Name of variable     | Type of variable | Optional | Description
 ---------------------|------------------|----------|----------------------------------------------------
 label                | **String**       | _Yes_    | Button text.
 backgroundColor      | **String**       | _Yes_    | Button background color in hex format, i.e #ABCDEF.
 pathOfIcon           | **String**       | _Yes_    | Path to button icon.
 iconPosition         | **String**       | _Yes_    | Can be left, right or overlay.
 click                | **Function**     | _Yes_    | Function to call when the button is clicked.
 clickDispatchAction  | **String**       | _Yes_    | Event from another package that you want to execute when button is clicked. It will override the click property. It must be in the following format: "&lt;package-name&gt;:&lt;event-name&gt;" without quotation marks.
 dispatchActionTarget | **String**       | _Yes_    | Can have a value of 'workspace' or 'editor'. It defaults to 'workspace'. _For proper functioning of the pane commands, set the target to 'editor'_
 insertString      | **String**       | _Yes_    | Character to be inserted in the active editor when the button is pressed. It will override the clickDispatchAction property.

### TouchBarColorPicker (type: "color-picker")
 Name of variable | Type of variable | Optional | Description                                                        | Return values | Return values type | Return values description
 -----------------|------------------|----------|--------------------------------------------------------------------|---------------|--------------------|-------------------------------------------------
 availableColors  | **String[]**     | _Yes_    | Array of hex color strings to appear as possible colors to select.
 selectedColor    | **String**       | _Yes_    | The selected hex color in the picker, i.e #ABCDEF.
 change           | **Function**     | _Yes_    | Function to call when a color is selected.                         | color         | **String**         | The color that the user selected from the picker

### TouchBarGroup (type: "group")
 Name of variable | Type of variable      | Optional | Description
 -----------------|-----------------------|----------|-----------------------------
 items            | **Array of elements** | _No_     | Items to display as a group.
### TouchBarLabel (type: "label")
 Name of variable | Type of variable     | Optional | Description
 -----------------|----------------------|----------|--------------------------------
 label            | **String**           | _Yes_    | Text to display.
 textColor        | **String**           | _Yes_    | Hex color of text, i.e #ABCDEF.

### TouchBarPopover (type: "popover")
 Name of variable | Type of variable          | Optional | Description
 -----------------|---------------------------|----------|--------------------------------------------------------------------------------------------------
 label            | **String**                | _Yes_    | Popover button text.
 pathOfIcon       | **String**                | _Yes_    | Popover button icon.
 items            | **Array of elements**     | _Yes_    | Items to display in the popover.
 showCloseButton  | **Boolean**               | _Yes_    | true to display a close button on the left of the popover, false to not show it. Default is true.

### TouchBarSlider (type: "slider")
 Name of variable | Type of variable | Optional | Description                                  | Return values | Return values type | Return values description
 -----------------|------------------|----------|----------------------------------------------|---------------|--------------------|-----------------------------------------------
 label            | **String**       | _Yes_    | Label text.
 value            | **Integer**      | _Yes_    | Selected value.
 minValue         | **Integer**      | _Yes_    | Minimum value.
 maxValue         | **Integer**      | _Yes_    | Maximum value.
 change           | **Function**     | _Yes_    | Function to call when the slider is changed. | newValue      | **Number**         | The value that the user selected on the Slider

### TouchBarSpacer (type: "spacer")
 Name of variable | Type of variable | Optional | Description                          | Options  | Options description
 -----------------|------------------|----------|--------------------------------------|----------|----------------------------
 size             | **String**       | _Yes_    | Size of spacer, possible values are: | small    | Small space between items.
 ||||large|Large space between items.
 ||||flexible|Take up all available space.

## Images
### Touch Bar with Sample Configuration
![The screenshot of the Touch Bar with the sample configuration](https://raw.githubusercontent.com/inakineitor/touch-bar-utility/master/images/sample-configuration/touch-bar-capture.png)
