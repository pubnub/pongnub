
#jquery.qrcode.js

在[jquery-qrcode][1]基础上修改，使用可参看[jquery-qrcode][1]的[demo][2]

依赖[jQuery](http://jquery.com/)
依赖[qrcode-generator](https://github.com/dqmmpb/qrcode-generator)

## 安装
bower安装
```javascript
  bower install --save jquery.qrcode.js
```
## 特性
相对于[jquery-qrcode][1]的[demo][2]，本例添加了mPad用来控制中间logo或label的padding空白

## 使用
```javascript
$(selector).qrcode(options);
```
Options
```javascript
{
    // render method: 'canvas', 'image' or 'div'
    render: 'canvas',

    // version range somewhere in 1 .. 40
    minVersion: 1,
    maxVersion: 40,

    // error correction level: 'L', 'M', 'Q' or 'H'
    ecLevel: 'L',

    // offset in pixel if drawn onto existing canvas
    left: 0,
    top: 0,

    // size in pixel
    size: 200,

    // code color or image element
    fill: '#000',

    // background color or image element, null for transparent background
    background: null,

    // content
    text: 'no text',

    // corner radius relative to module width: 0.0 .. 0.5
    radius: 0,

    // quiet zone in modules
    quiet: 0,

    // modes
    // 0: normal
    // 1: label strip
    // 2: label box
    // 3: image strip
    // 4: image box
    mode: 0,

    mSize: 0.1,
    mPosX: 0.5,
    mPosY: 0.5,
    mPad: 0.01,
    // blank
    // 0: blank
    // 1: Real padding
    mBlank: 0,

    label: 'no label',
    fontname: 'sans',
    fontcolor: '#000',

    image: null
}

```


[1]: https://larsjung.de/jquery-qrcode/ "jquery-qrcode"
[2]: https://larsjung.de/jquery-qrcode/latest/demo "jquery-qrcode-demo"
