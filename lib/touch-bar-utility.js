'use babel';

import {
  CompositeDisposable
} from 'atom';

//Importing it the regular way doesn't work. I don't know why.
const NotificationManager = atom.notifications;
const PackageManager = atom.packages;
const Workspace = atom.workspace;

import {
  TouchBar,
  NativeImage
} from 'remote';

const hasTouchBar = TouchBar ? true : false;

export default {

  touchBarUtilityView: null,
  modalPanel: null,
  subscriptions: null,

  config: {
    buttons: {
      title: 'Buttons',
      description: 'Here you must specify the buttons that you want appearing on your Touch Bar. If you don\' know how, follow the instructions in below (or in the README.md file).',
      type: 'string',
      default: '[{type: "button", label: "Beautify Editor", clickDispatchAction: "atom-beautify:beautify:editor"}]'
    }
  },

  activate(state) {

    atom.commands.add('atom-workspace', {
      'touch-bar-utility:toot': () => this.toot()
    })

    cdbug('activated');
    cdbug('Has Touch Bar: ' + hasTouchBar);
    if (TouchBar) {
      configureButtons(atom.config.get('touch-bar-utility.buttons'), function(err, items) {
        if(err) {
          NotificationManager.addError("The JSON renderer produced and error. Please check you configuration", {
            dismissable: true,
            detail: err
          });
        } else {
          let touchBar = new TouchBar(items);
          atom.getCurrentWindow().setTouchBar(touchBar);
        }
      });
    } else {
      let description = '';
      if(atom.appVersion == '1.19.0'){
        switch(process.platform){
          case 'darwin':
            description = "<h2><strong>Solution</strong></h2>You are running macOS, so you can install the [Touch Bar Simulator <img src=\"https://sindresorhus.com/touch-bar-simulator/assets/images/logo.png\" width=\"100\">](https://sindresorhus.com/touch-bar-simulator/)<br><strong>At least the TOOT function works 😌</strong>";
            break;

          default:
            description = "You aren't running macOS, so there is no solution. I'm sorry 😥<br><strong>At least the TOOT function works 😌</strong>";
            break;
        }
      } else {
        description = "<h2><strong>Solution</strong></h2>To use this package you must be using Atom Beta v1.19<br>You are now using Atom v" + atom.appVersion + "<br><strong>At least the TOOT function works 😌</strong>";
      }

      NotificationManager.addError('This computer does not have a Touch Bar 🙁', {
        dismissable: true,
        description: description
      });
    }
  },

  deactivate() {

  },

  serialize() {

  },

  toot() {
    clog('TOOT');
    let first = true;
    let notification = NotificationManager.addInfo('TOOT TOOT', {
      buttons: [{
        className: 'btn btn-success',
        onDidClick: function() {
          notification.dismiss();
          if (first) {
            NotificationManager.addInfo('Roger that');
            first = false;
          }
        },
        text: 'TOOT'
      }]
    });
  }

};

function dispatchAction(compositeEvent) {
  let firstSplit = compositeEvent.split(':');
  const atomPackage = firstSplit[0];
  const packageEvent = firstSplit[1];

  cdbug('------------------------------------');
  cdbug(atomPackage);
  cdbug('Available: ' + PackageManager.getAvailablePackageNames().includes(atomPackage));
  cdbug('Enabled: ' + !PackageManager.isPackageDisabled(atomPackage));
  cdbug('Loaded: ' + PackageManager.isPackageLoaded(atomPackage));
  cdbug('Activated: ' + PackageManager.isPackageActive(atomPackage));

  let desInstallation = '';
  switch(process.platform){
    case 'darwin':
      desInstallation = "Atom → Preferences";
      break;
    default: // win32 and linux
      desInstallation = "File → Settings"
      break;
  }

  if (!PackageManager.getAvailablePackageNames().includes(atomPackage)) {
    NotificationManager.addError("The package '" + atomPackage + "' is not installed", {
      dismissable: true,
      description: "Please install it by going to " + desInstallation + " → Install and restart Atom"
    });
  } else if (PackageManager.isPackageDisabled(atomPackage)) {
    NotificationManager.addError("The package '" + atomPackage + "' is not enabled", {
      dismissable: true,
      description: "Please enable it by going to " + desInstallation + " → Packages and clicking the Enable button that corresponds to '" + atomPackage + "' and restart Atom"
    });
  } else {
    if (!PackageManager.isPackageLoaded(atomPackage) || !PackageManager.isPackageActive(atomPackage)) {
      NotificationManager.addError("The package '" + atomPackage + "' is not loaded or activated", {
        dismissable: true,
        description: "Please activate it by going to to Packages → " + atomPackage + " and clicking in any of the side options. From that point forward, the TouchBar Beautify function will work"
      });
    }

    PackageManager.activatePackage(atomPackage).then(function(value) {
      clog(atomPackage + ':' + packageEvent + ' event dispatched');
      atom.commands.dispatch(atom.views.getView(atom.workspace), atomPackage + ":" + packageEvent);
    }, function(reason) {
      NotificationManager.addFatalError("The package '" + atomPackage + "' did not activate correctly", {
        dismissable: true,
        detail: reason
      });
    });
  }
}

function clog(message) {
  console.log({
    package: 'touch-bar-utility',
    message: message
  });
}

function cdbug(message) {
  console.debug({
    package: 'touch-bar-utility',
    message: message
  });
}

function configureButtons(config, callback) {
  const {
    TouchBarButton,
    TouchBarColorPicker,
    TouchBarGroup,
    TouchBarLabel,
    TouchBarPopover,
    TouchBarScrubber,
    TouchBarSegmentedControl,
    TouchBarSlider,
    TouchBarSpacer
  } = TouchBar

  try {
    let itemsConfig = JSON.parse(configString);
    let items = [];

    itemsConfig.forEach(function(element) {
      let touchBarElement;
      switch(element.type) {
        case 'button':
          if(element.label && typeof element.label !== 'string') return callback(new Error("The button's label must be a string"));
          if(element.backgroundColor && typeof element.backgroundColor !== 'string') return callback(new Error("The button's backgroundColor must be a string"));
          if(element.pathOfIcon && typeof element.pathOfIcon !== 'string') return callback(new Error("The button's pathOfIcon must be a a string path pointing to PNG or JPEG file"));
          if(element.pathOfIcon && !element.iconPosition) return callback(new Error('If a button has an icon, it requires an iconPosition'));
          if(element.pathOfIcon && element.iconPosition && typeof element.iconPosition !== 'string') return callback(new Error("The button's iconPosition must be a string"));
          if(element.pathOfIcon && element.iconPosition && !(element.iconPosition == 'left' || element.iconPosition == 'overlay' || element.iconPosition == 'right')) return callback(new Error("The button's iconPosition can only be 'left', 'right' or 'overlay'"));
          if(element.click && typeof element.click !== 'function') return callback(new Error("The buttons's 'click' element must be a function"));

          if(element.clickDispatchAction && typeof element.clickDispatchAction !== 'string') return callback(new Error("The button's clickDispatchAction must be a string"));
          let clickFunc;
          if(element.clickDispatchAction) {
            clickFunc = dispatchAction()
          }

          touchBarElement = new TouchBarButton({
            label: element.label,
            backgroundColor: element.backgroundColor,
            icon: NativeImage.createFromPath(element.pathOfIcon),
            iconPosition: element.iconPosition,
            click: element.clickDispatchAction ? dispatchelement.clickDispatchAction : element.click // The clickDispatchAction will override the function of the 'click' element
          });
          break;

        case 'color-picker':
          if(element.availableColors && (!(element.availableColors instanceof Array) || !(element.availableColors.every(function(i){ return typeof i === "string" }))) return callback(new Error("The color-picker's availableColors must be a string of arrays"));
          if(element.selectedColor && typeof element.selectedColor !== 'string') return callback(new Error("The color-picker's selectedColor must be a string"));
          if(element.change && typeof element.change !== 'function') return callback(new Error("The color-picker's change must be a function"));

          touchBarElement = new TouchBarColorPicker({
            availableColors: element.availableColors,
            selectedColor: element.selectedColor,
            change: element.change
          });
          break;

        case 'group':
          if(!element.items || typeof element.items !== 'object' || element.items.name != 'TouchBar') return callback(new Error("The touch-bar-group's items must be an array of elements"));

          this.configureButtons(element.items, function(err, items) {
            if(err) {
              return callback(err);
            } else {
              if(items.length == 0) return callback(new Error('A Touch Bar group must contain at least one item'));
              touchBarElement = new TouchBarGroup({
                items: new TouchBar(items)
              });
            }
          });
          break;

        case 'label':
          if(element.label && typeof element.label !== 'string') return callback(new Error("The labels's label (text) must be a string"));
          if(element.textColor && typeof element.textColor !== 'string') return callback(new Error("The labels's textColor must be a string"));

          touchBarElement = new TouchBarLabel({
            label: element.label,
            textColor: element.textColor
          });
          break;

        case 'popover':
          if(element.label && typeof element.label !== 'string') return callback(new Error("The popover's label must be a string"));
          if(element.pathOfIcon && typeof element.pathOfIcon !== 'string') return callback(new Error("The popover's pathOfIcon must be a a string path pointing to PNG or JPEG file"));
          if(element.items && (typeof element.items !== 'object' || element.items.name != 'TouchBar')) return callback(new Error("The popover's items must be an array of elements"));
          if(element.showCloseButton && typeof element.showCloseButton !== 'boolean') return callback(new Error("The popover's showCloseButton must be a boolean"));

          this.configureButtons(element.items, function(err, items) {
            if(err) {
              return callback(err);
            } else {
              touchBarElement = new TouchBarPopover({
                label: element.label,
                icon: NativeImage.createFromPath(element.pathOfIcon),
                items: new TouchBar(items),
                showCloseButton: element.showCloseButton
              });
            }
          });

          break;

        /*case 'scrubber':
          if(typeof element.select != 'function') return callback(new Error("The 'select' element of a touch-bar-scrubber must be a function"));
          if(typeof element.select != 'function') return callback(new Error("The 'select' element of a touch-bar-scrubber must be a function"));
          touchBarElement = new TouchBarScrubber({
            items: , // MISSING
            select: typeof element.select == 'function' ? element.select : undefined,
            highlight: typeof element.highlight == 'function'(highlightedIndex) => {

            },
            selectedStyle: ,
            overlayStyle: ,
            showArrowButtons: ,
            mode: ,
            continuous:
          });
          break;

        case 'segmented-control':
          if(element.segmentStyle && !(element.segmentStyle == 'automatic' || element.segmentStyle == 'rounded' || element.segmentStyle == 'textured-rounded' || element.segmentStyle == 'round-rect' || element.segmentStyle == 'textured-square' || element.segmentStyle == 'capsule' || element.segmentStyle == 'small-square' || element.segmentStyle == 'separated')) return callback(new Error("The button's iconPosition can only be 'automatic', 'rounded', 'textured-rounded', 'round-rect', 'textured-square', 'capsule', 'small-square' or 'separated'"));
          if(element.mode && !(element.mode == 'single' || element.mode == 'multiple' || element.mode == 'buttons')) return callback(new Error("The segmented-control's selectedIndex mus be an integer number"));
          if(!(element.segments instanceof Array) || !(element.availableColor.every(function(i){ return typeof i === "string" })) return callback(new Error("The color-picker's availableColors must be a string of arrays"));
          if(element.selectedIndex && !(typeof element.selectedIndex === 'number' || Number.isInteger(element.selectedIndex))) return callback(new Error("The slider's minValue must be an integer number"));
          if(typeof element.change != 'function') return callback(new Error("The 'change' element of a segmented-control must be a function"));

          touchBarElement = new TouchBarSegmentedControl({
            segmentStyle: elements.segmentStyle,
            mode: elements.mode,
            segments: ,
            selectedIndex: elements.selectedIndex,
            change: elements.change
          });
          break;*/

        case 'slider':
          if(element.label && typeof element.label !== 'string') return callback(new Error("The slider's label must be a string"));
          if(element.value && !(typeof element.value === 'number' || Number.isInteger(element.value))) return callback(new Error("The slider's value must be an integer number"));
          if(element.minValue && !(typeof element.minValue === 'number' || Number.isInteger(element.minValue))) return callback(new Error("The slider's minValue must be an integer number"));
          if(element.maxValue && !(typeof element.maxValue === 'number' || Number.isInteger(element.maxValue))) return callback(new Error("The slider's maxValue must be an integer number"));
          if(element.change && typeof element.change != 'function') return callback(new Error("The 'change' element of a TouchBarSlider must be a function"));

          touchBarElement = new TouchBarSlider({
            label: element.label,
            value: element.value,
            minValue: element.minValue,
            maxValue: element.maxValue,
            change: element.change
          });
          break;

        case 'spacer':
          if(element.size && !(element.size == 'small' || element.size == 'flexible' || element.size == 'large')) return callback(new Error("The spacer's size can only be 'small', 'flexible' or 'large'"));

          touchBarElement = new TouchBarSpacer({
            size: element.size
          });
          break;

        default:
          if(element.type === undefined) {
            return callback(new Error("The type of Touch Bar element isn't defined doesn't exist"));
          } else {
            return callback(new Error("The type of Touch Bar element '" + element.type + "' doesn't exist"));return callback(new Error("The type of Touch Bar element '" + elemnt.type + "' doesn't exist"));
          }
          break;
      }

      items.push(touchBarElement);
    });

    return callback(null, items);
  } catch(e) {
    return callback(e);
  }
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
