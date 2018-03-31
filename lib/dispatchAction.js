'use babel';

const NotificationManager = atom.notifications;
const PackageManager = atom.packages;

const listOfSystemPackages = ['editor', 'pane']

function dispatchAction(compositeEvent, eventTarget) {

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
  switch (process.platform) {
    case 'darwin':
      desInstallation = "Atom → Preferences";
      break;
    default: // win32 and linux
      desInstallation = "File → Settings"
      break;
  }

  if (!PackageManager.getAvailablePackageNames().includes(atomPackage) && !listOfSystemPackages.includes(atomPackage)) {
    NotificationManager.addError("The package '" + atomPackage + "' is not installed", {
      dismissable: true,
      description: "Please install it by going to " + desInstallation + " → Install and then restart Atom"
    });
  } else if (PackageManager.isPackageDisabled(atomPackage) && !listOfSystemPackages.includes(atomPackage)) {
    NotificationManager.addError("The package '" + atomPackage + "' is not enabled", {
      dismissable: true,
      description: "Please enable it by going to " + desInstallation + " → Packages and clicking the Enable button that corresponds to '" + atomPackage + "' and restart Atom"
    });
  } else {
    if ((!PackageManager.isPackageLoaded(atomPackage) || !PackageManager.isPackageActive(atomPackage)) && !listOfSystemPackages.includes(atomPackage)) {
      NotificationManager.addError("The package '" + atomPackage + "' is not loaded or activated", {
        dismissable: true,
        description: "Please activate it by going to to Packages → " + atomPackage + " and clicking in any of the side options. From that point forward, the TouchBar Beautify function will work"
      });
    }

    if (listOfSystemPackages.includes(atomPackage)) {
      if (atomPackage == 'editor') {
        emitEvent('editor', atomPackage, packageEvent);
      } else {
        emitEvent(eventTarget, atomPackage, packageEvent);
      }
    } else {
      PackageManager.activatePackage(atomPackage).then(function(value) {
        clog(atomPackage + ':' + packageEvent + ' event dispatched');

        emitEvent(eventTarget, atomPackage, packageEvent)
      }, function(reason) {
        NotificationManager.addFatalError("The package '" + atomPackage + "' did not activate correctly", {
          dismissable: true,
          detail: reason
        });
      });
    }
  }
}

function emitEvent(eventTarget, atomPackage, packageEvent) {
  if (eventTarget == 'editor') {
    let atomActiveTextEditor = atom.views.getView(atom.workspace.getActiveTextEditor());
    if (atomActiveTextEditor) {
      atom.commands.dispatch(atomActiveTextEditor, atomPackage + ":" + packageEvent);
    } else {
      NotificationManager.addError("There are no active text editors open");
    }
  } else {
    atom.commands.dispatch(atom.views.getView(atom.workspace), atomPackage + ":" + packageEvent);
  }
}

function cdbug(message) {
  console.debug({
    package: 'touch-bar-utility',
    message: message
  });
}

function clog(message) {
  console.log({
    package: 'touch-bar-utility',
    message: message
  });
}

export { dispatchAction };
