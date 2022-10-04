// noinspection JSDeprecatedSymbols

/**
 * Copyright (C) 2012 by Binny V A http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Copyright (C) 2021 by Houdinii (aka Houd1n11) houdinii1985@gmail.com
 *
 *  Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee
 *  is hereby granted.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
 *  INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
 *  FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
 *  OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT
 *  OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 *  https://github.com/houdinii/shortcut.js
 *  Version: 2.02.A
 *  By Houdinii
 *  License: BSD
 *
 *  http://www.openjs.com/scripts/events/keyboard_shortcuts/
 *  Version : 2.01.B
 *  By Binny V A
 *  License : BSD
 */

shortcut = {
    //All the shortcuts are stored in this array
    'all_shortcuts':{},
    'add': function(shortcut_combination,callback,opt) {
        //Provide a set of default options
        const default_options = {
            'type':'keydown',
            'propagate':false,
            'disable_in_input':false,
            'target':document,
            'keycode':false
        }
        if(!opt) opt = default_options;
        else {
            for(let dfo in default_options) {
                if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
            }
        }

        let ele = opt.target;
        if(typeof opt.target == 'string') ele = document.getElementById(opt.target.toString());
        shortcut_combination = shortcut_combination.toLowerCase();
        let func = function(e) {
            // using window.event even though depreciated as it is only used to ensure an event is passed through.
            // noinspection JSDeprecatedSymbols
            e = e || window.event;
            //Don't enable shortcut keys in Input, Textarea fields if this option is set
            if(opt['disable_in_input']) {
                let element;
                if(e.target) element=e.target;
                    // Event.srcElement was originally an IE alias and is now depreciated. Suppressed warning. Suppressed
                // depreciation warning on .srcElement for same reason.
                else { // noinspection JSUnresolvedVariable,JSDeprecatedSymbols
                    if(e.window.eventsrcElement) element=e.srcElement;
                }
                if(element.nodeType===3) element=element.parentNode;

                if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') return;
            }

            //Find Which key is pressed
            let code;
            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;
            if( code == 32 || (code >= 48 && code <= 90) || (code >= 96 && code <= 111) || (code >= 186 && code <= 192) || (code >= 219 && code <= 222)) { 
                var character = String.fromCharCode(code).toLowerCase();}

            if(code === 188) character=","; //If the user presses , when the type is onkeydown
            if(code === 190) character="."; //If the user presses , when the type is onkeydown

            let keys = shortcut_combination.split("+");
            // Key Pressed - counts the number of valid key presses
            // if it is same as the number of keys, the shortcut function is invoked
            let kp = 0;

            //Work around for stupid Shift key bug created by using lowercase
            // as a result the shift+num combination was broken
            let shift_nums = {
                "`":"~",
                "1":"!",
                "2":"@",
                "3":"#",
                "4":"$",
                "5":"%",
                "6":"^",
                "7":"&",
                "8":"*",
                "9":"(",
                "0":")",
                "-":"_",
                "=":"+",
                ";":":",
                "'":"\"",
                ",":"<",
                ".":">",
                "/":"?",
                "\\":"|"
            }

            //Special Keys - and their codes
            let special_keys = {
                'esc':27,
                'escape':27,
                'tab':9,
                'space':32,
                'return':13,
                'enter':13,
                'backspace':8,

                'scrolllock':145,
                'scroll_lock':145,
                'scroll':145,
                'capslock':20,
                'caps_lock':20,
                'caps':20,
                'numlock':144,
                'num_lock':144,
                'num':144,

                'pause':19,
                'break':19,

                'insert':45,
                'home':36,
                'delete':46,
                'end':35,

                'pageup':33,
                'page_up':33,
                'pu':33,

                'pagedown':34,
                'page_down':34,
                'pd':34,

                'left':37,
                'up':38,
                'right':39,
                'down':40,

                'f1':112,
                'f2':113,
                'f3':114,
                'f4':115,
                'f5':116,
                'f6':117,
                'f7':118,
                'f8':119,
                'f9':120,
                'f10':121,
                'f11':122,
                'f12':123
            }

            let modifiers = {
                shift: { wanted:false, pressed:false},
                ctrl : { wanted:false, pressed:false},
                alt  : { wanted:false, pressed:false},
                meta : { wanted:false, pressed:false}	//Meta is Mac specific
            };

            if(e.ctrlKey)	modifiers.ctrl.pressed = true;
            if(e.shiftKey)	modifiers.shift.pressed = true;
            if(e.altKey)	modifiers.alt.pressed = true;
            if(e.metaKey)   modifiers.meta.pressed = true;

            let k;
            for(let i=0; k=keys[i],i<keys.length; i++) {
                //Modifiers
                if(k === 'ctrl' || k === 'control') {
                    kp++;
                    modifiers.ctrl.wanted = true;

                } else if(k === 'shift') {
                    kp++;
                    modifiers.shift.wanted = true;

                } else if(k === 'alt') {
                    kp++;
                    modifiers.alt.wanted = true;
                } else if(k === 'meta') {
                    kp++;
                    modifiers.meta.wanted = true;
                } else if(k.length > 1) {
                    //If it is a special key
                    if(special_keys[k] === code) kp++;

                } else if(opt['keycode']) {
                    if(opt['keycode'] === code) kp++;

                } else { //The special keys did not match
                    if(character === k) kp++;
                    else {
                        if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                            character = shift_nums[character];
                            if(character === k) kp++;
                        }
                    }
                }
            }

            if(kp === keys.length &&
                modifiers.ctrl.pressed === modifiers.ctrl.wanted &&
                modifiers.shift.pressed === modifiers.shift.wanted &&
                modifiers.alt.pressed === modifiers.alt.wanted &&
                modifiers.meta.pressed === modifiers.meta.wanted) {
                callback(e);

                if(!opt['propagate']) { //Stop the event
                    //e.cancelBubble is supported by IE - this will kill the bubbling process.
                    e.cancelBubble = true;
                    e.returnValue = false;

                    //e.stopPropagation works in Firefox.
                    if (e.stopPropagation) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    return false;
                }
            }
        }
        this.all_shortcuts[shortcut_combination] = {
            'callback':func,
            'target':ele,
            'event': opt['type']
        };
        //Attach the function with the event. Note .attachEvent is an IE only thing, suppressed warning
        if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
        else { // noinspection JSUnresolvedVariable
            if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
            else ele['on'+opt['type']] = func;
        }
    },

    //Remove the shortcut - just specify the shortcut and I will remove the binding
    'remove':function(shortcut_combination) {
        shortcut_combination = shortcut_combination.toLowerCase();
        let binding = this.all_shortcuts[shortcut_combination];
        delete(this.all_shortcuts[shortcut_combination])
        if(!binding) return;
        let type = binding['event'];
        let ele = binding['target'];
        // assist the typecast
        if (!ele.detachEvent) ele.detachEvent = {};
        let callback = binding['callback'];
        if(ele.detachEvent) ele.detachEvent('on'+type, callback);
        else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
        else ele['on'+type] = false;
    }
}
