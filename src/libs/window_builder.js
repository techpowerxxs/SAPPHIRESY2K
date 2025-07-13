// window_builder.js — DOM42 core

class DOM42 {
  constructor(win) {
    this.win = win;
  }
  add(widget) {
    this.win.el.body.appendChild(widget.elem);
  }
  remove(widget) {
    this.win.el.body.removeChild(widget.elem);
  }
}

function $window42(config) {
  const win = document.createElement("div");
  win.className = "window";
  win.style.width = config.width + "px";
  win.style.height = config.height + "px";
  win.style.position = "absolute";
  win.style.top = "100px";
  win.style.left = "100px";
  win.innerHTML = config.html || "";

  document.body.appendChild(win);

  return new DOM42({ el: { body: win } });
}



const $widget = {
  msr: 'px',

  positionBy(type) {
    const units = { pixel: 'px', relative: '%' };
    this.msr = units[type] || 'px';
  },

  Button(text) {
    const elem = document.createElement('button');
    elem.innerText = text;

    return {
      elem,
      onClick(callback) {
        this.elem.onclick = callback;
      },
      setPosition(x, y, w, h) {
        Object.assign(this.elem.style, {
          position: 'absolute',
          top: y + $widget.msr,
          left: x + $widget.msr,
          ...(w !== undefined && { width: w + $widget.msr }),
          ...(h !== undefined && { height: h + $widget.msr })
        });
      },
      setStyle(styleObj) {
        Object.assign(this.elem.style, styleObj);
      }
    };
  },

  Label(text, size) {
    const elem = document.createElement('p');
    elem.innerText = text;
    if (size !== undefined) {
      elem.style.fontSize = size + $widget.msr;
    }

    return {
      elem,
      setPosition(x, y) {
        Object.assign(this.elem.style, {
          position: 'absolute',
          top: y + $widget.msr,
          left: x + $widget.msr
        });
      },
      setStyle(styleObj) {
        Object.assign(this.elem.style, styleObj);
      }
    };
  },

  Entry(size) {
    const elem = document.createElement('textarea');
    if (size !== undefined) {
      elem.style.fontSize = size + $widget.msr;
    }

    return {
      elem,
      setPosition(x, y, w, h) {
        Object.assign(this.elem.style, {
          position: 'absolute',
          top: y + $widget.msr,
          left: x + $widget.msr,
          ...(w !== undefined && { width: w + $widget.msr }),
          ...(h !== undefined && { height: h + $widget.msr })
        });
      },
      setText(text) {
        this.elem.value = text;
      },
      getText() {
        return this.elem.value;
      },
      setStyle(styleObj) {
        Object.assign(this.elem.style, styleObj);
      }
    };
  },

  Input(type = "text", size) {
    const elem = document.createElement('input');
    elem.type = type;
    if (size !== undefined) {
      elem.style.fontSize = size + $widget.msr;
    }

    return {
      elem,
      setPosition(x, y, w, h) {
        Object.assign(this.elem.style, {
          position: 'absolute',
          top: y + $widget.msr,
          left: x + $widget.msr,
          ...(w !== undefined && { width: w + $widget.msr }),
          ...(h !== undefined && { height: h + $widget.msr })
        });
      },
      setText(text) {
        this.elem.value = text;
      },
      getText() {
        return this.elem.value;
      },
      setStyle(styleObj) {
        Object.assign(this.elem.style, styleObj);
      }
    };
  },

  Section() {
    const elem = document.createElement('div');
    Object.assign(elem.style, {
      border: '2px inset',
      overflow: 'auto'
    });

    return {
      elem,
      el: { body: elem }, // compatible with DOM42 layout
      setPosition(x, y, w, h) {
        Object.assign(this.elem.style, {
          position: 'absolute',
          top: y + $widget.msr,
          left: x + $widget.msr,
          ...(w !== undefined && { width: w + $widget.msr }),
          ...(h !== undefined && { height: h + $widget.msr })
        });
      },
      setStyle(styleObj) {
        Object.assign(this.elem.style, styleObj);
      }
    };
  }
};

// ✅ Module-ready exports
export { DOM42, $window42, $widget };
