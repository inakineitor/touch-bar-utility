exports.configuration = [{
  type: 'label',
  label: 'touch-bar-utility rocks! 🎸🤘'
}, {
  type: 'button',
  label: '💅',
  clickDispatchAction: 'atom-beautify:beautify-editor',
  backgroundColor: '#b355d6'
}, {
  type: 'button',
  label: '//',
  clickDispatchAction: 'editor:toggle-line-comments',
  backgroundColor: '#4899a8'
}, {
  type: 'group',
  items: [{
    type: 'popover',
    label: 'Popover',
    items: [{
      type: 'slider',
      label: 'Slider',
      value: 10,
      minValue: 0,
      maxValue: 35,
      change: (newValue) => {
          console.log('Slider value: ' + String(newValue));
      }
    }]
  }, {
    type: 'button',
    label: 'Log to console',
    click: () => {
      console.log('Beep boop');
    },
    backgroundColor: '#e3e262'
  }, {
    type: 'color-picker',
    availableColors: ['#AA7942', '#FF9300', '#00FDFF'],
    selectedColor: '#FF9300',
    change: (color) => {
      atom.notifications.addInfo(String(color));
    }
  }]
}]
