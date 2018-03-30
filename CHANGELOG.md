### 0.1.0 - First Release
*   First commit, so all current features were added

### 0.2.0 - Tiny Update
*   Replaced the Sample Configuration image with an update one
*   Updated the button labeler. Now, if the label of a button is blank in the configuration, the Touch Bar will show the name of the action called when pressed
*   Added an author entry to package.json

### 0.3.0 - package.json Update
*   Added keywords to package.json
*   Now the package activates when atom starts

## 1.0.0 - 1.0.0
*   Updated repository in package.json
*   Change version number to 1.0.0 to publish to apm

#### 1.0.1 - Deleted unnecessary code from touch-bar-utility.js

#### 1.0.2 - apm publishing error
#### 1.0.3 - apm publishing error

#### 1.0.4 - Bug fixes
*   Fixed label generator
*   Fixed various other bugs
*   Corrected in CHANGELOG.md the title commit 1.0.0

#### 1.0.5/6 - apm publishing error

#### 1.0.7/8/9 - Updated README.md

### 1.1.0 - UI improvement
*   Added custom errors for different operating systems

#### 1.1.1 - Atom version check no precedes OS check

#### 1.1.2 - apm bug

#### 1.1.3 - apm bug

#### 1.1.4 . apm bug

#### 1.1.5 - Added the cdbug() method

## 2.0.0 - Total overhaul
*   Corrected supported versions in package.json
*   Added "touchbar" all together to the search words
*   The package is now configured using JSON
*   Updated instructions in README.md
*   Touch bar elements now supported
    *   TouchBarButton
    *   TouchBarColorPicker
    *   TouchBarGroup
    *   TouchBarLabel
    *   TouchBarPopover
    *   TouchBarSlider
    *   TouchBarSpacer

#### 2.0.1 - Bug fixes
*   Removed '()' from touch-bar-utility.js 211:50-52

#### 2.0.2 - Bug fixes
*   Added ')' to touch-bar-utility.js 216:167

#### 2.0.3 - Bug fixes
*   Fixed ReferenceError in touch-bar-utility.js 160:27-39

#### 2.0.4 - Bug fixes
*   Adjusted default configuration

#### 2.0.5 - Bug fixes
*   Beautified touch-bar-utility.js
*   Removed line 335

#### 2.0.6 - Bug fixes
*   Updated the configurations instructions

#### 2.0.7 - Bug fixes
*   Fixed a button's dispatchPackageAction error
*   Updated button's documentation in the README.md file

#### 2.0.8 - Bug fixes
*   Added check before creating nativeImage from path

#### 2.0.9 - Bug fixes
*   Nested the button's dispatch event in another function.
*   Enabled TOOT's testing feature.

#### 2.0.10 - Bug fixes
*   Fixed support for native images
*   Improved performance by removing unnecessary functions
*   Fixed issue where the dispatch call was being passed to the wrong target
*   Updated README.md

#### 2.0.11 - apm bug

### 2.1.0 - Touch Bar auto-update
*   The Touch Bar now updates automatically when the configuration is changed

### 2.2.0 - Modified button properties
*   The atom package action dispatch target can now be explicitly configured
*   Added Touch Bar screenshot to README.md

### 2.3.0 - Added support for editor actions
*   The button can now toggle editor actions
*   Removed Atom 1.19.0 beta warning
*   Updated the default settings and the sample configuration Touch Bar screenshot

#### 2.3.1 - Bug fixes
*   Arrays now work

### 2.5.0 - Modified settings' options
*   Added a button that allows the user to disable the TouchBar
*   Now one can trigger the event that updates the Touch Bar without the need to reload the window

#### 2.5.1 - Amended error in documentation
*   Replaced 'insertCharacter' with 'insertString'

## 3.0.0 - Redesigned configuration system
*   Modified default configuration so as to show a bit of every component available
*   Completely redesigned the configuration system
*   Updated README.md to reflect these changes
*   Fixed a few bugs
*   Added a bit more information to the README.md file
*   Updated the default Touch Bar screenshots

#### 3.0.1 - Changed name
*   The package name was changed from 'touch-bar-utility' to 'touchbar-utility' in an SEO effort

#### 3.0.2 - Bug fixes
*   Solved problems related to the name change
*   Updated the package's description to reflect new functionality

### 3.1.0 - Modified settings' options
*   Moved dispatchAction to its own file
*   Fixed dispatchAction for some packages that previously did not work
*   The dispatchAction function can now be called from the configuration
*   Changed label in settings
*   Removed TOOT
*   Added the template for a future function that will allow the manipulation of the Touch Bar from other packages
