# shortcut.js - An easy to use js hotkey library

---

This code is based off an article entitled 'Handling Keyboard Shortcuts in JavaScript' by Benny V A,
which outlines a dependency free hotkey solution that just works. For more information
on the methodology, please refer to the original article located at:

http://www.openjs.com/scripts/events/keyboard_shortcuts/

The changes I made bring things up to date, but the real credit goes to the original author. Thanks for keeping 
knowledge open!

---

### Installation

This source is not currently packaged and is only available at the link above, or with my
personal modifications included here on GitHub. I will include a compressed archive with both the minified
code as well as the prettified code in the releases. From there, just include it in your project
in the <head> section as follows:

```html
<head>
    <meta charset="UTF-8">
    <title>A quick example of usage</title>
    <script src="./shortcut.js"></script>
</head>
```

---

### Usage

(This documentation was pulled from the original source and is attributed to Benny V A)

#### shortcut.add(keyCombo, callback, [{options}])
First Argument : The Shortcut Key Combination - String
The shortcut key combination should be specified in this format ... Modifier[+Modifier..]+Key. More about this in the 
Supported Keys section.

Second Argument : Function to be called - Function
Specify the function here. This function will be called if the shortcut key is pressed. The event variable will be 
passed to it.

Third Argument[OPTIONAL] : Options - Associative Array
This argument must be an associative array with any of these three options...

##### type - String
The event type - can be 'keydown','keyup','keypress'. Default: 'keydown'
##### disable_in_input - Boolean
If this is set to true, keyboard capture will be disabled in input and textarea fields. If these elements have focus, 
the keyboard shortcut will not work. This is very useful for single key shortcuts. Default: false
##### target - DOM Node
The element that should be watched for the keyboard event. Default : document
##### propagate - Boolean
Allow the event to propagate? Default : false
##### keycode - Integer
Watch for this keycode. For eg., the keycode '65' is 'a'.

```javascript
    shortcut.add("Ctrl+B",function() {
    alert("The bookmarks of your browser will show up after this alert...");
},{
    'type':'keydown',
    'propagate':true,
    'target':document
});
```

#### shortcut.remove(keyCombo)
Just one argument - the shortcut combination that was attached to a function earlier. Make sure that this is exactly the 
same string that you used while adding the shortcut.

---

### Supported Keys

The shortcut keys should be specified in this format ...

```Modifier[+Modifier..]+Key```

Example...

```Ctrl+A```

The valid modifiers are:

Ctrl
Alt
Shift
Meta

You can specify a sequence without a modifier as well - like this...

```javascript 
shortcut.add("X",function() {
  alert("Hello!");
});
```

The valid Keys are...
* All alpha/numeric keys - abc...xyz,01..89
* Special Characters - Every special character on a standard keyboard can be accessed.
* Special Keys...
* Tab
* Space
* Return
* Enter
* Backspace
* Scroll_lock
* Caps_lock
* Num_lock
* Pause
* Insert
* Home
* Delete
* End
* Page_up
* Page_down
* Left
* Up
* Right
* Down
* F1
* F2
* F3
* F4
* F5
* F6
* F7
* F8
* F9
* F10
* F11
* F12

These keys are case insensitive - so don't worry about using the correct case.