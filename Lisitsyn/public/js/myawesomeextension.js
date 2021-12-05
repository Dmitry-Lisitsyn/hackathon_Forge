class MyAwesomeExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this._group = null;
        this._button = null;
    }

    load() {
        console.log('MyAwesomeExtensions has been loaded');
        return true;
    }

    unload() {
        // Clean our UI elements if we added any
        if (this._group) {
            this._group.removeControl(this._button);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
        }
        console.log('MyAwesomeExtensions has been unloaded');
        return true;
    }

    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        this._group = this.viewer.toolbar.getControl('allMyAwesomeExtensionsToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('allMyAwesomeExtensionsToolbar');
            this.viewer.toolbar.addControl(this._group);
        }

        // Add a new button to the toolbar group
        this._button = new Autodesk.Viewing.UI.Button('myAwesomeExtensionButton');
        var i = false;
        this._button.onClick = (ev) => {
            i = !i
            var button1 = new Autodesk.Viewing.UI.Button('red-bunny');
            button1.onClick = function(e) {
                var red = new THREE.Vector4(1, 0, 0, 0.5);
                viewer.setThemingColor(3,red);
            };
            button1.addClass('red-bunny');
            button1.setToolTip('Red Bunny');
          
            // Button 2
            var button2 = new Autodesk.Viewing.UI.Button('green-bunny');
            button2.onClick = function(e) {
                var green = new THREE.Vector4(0, 0.5, 0, 0.5);
                viewer.setThemingColor(3,green);
            };
            button2.addClass('green-bunny');
            button2.setToolTip('Green Bunny');
        
             // Button 3
             var button3 = new Autodesk.Viewing.UI.Button('blue-bunny');
             button3.onClick = function(e) {
                var blue = new THREE.Vector4(0, 0, 0.5, 0.5);
                viewer.setThemingColor(3,blue);
             };
             button3.addClass('blue-bunny');
             button3.setToolTip('Blue Bunny');

            
            // SubToolbar
            if(i == true){
            this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar');
            this.subToolbar.addControl(button1);
            this.subToolbar.addControl(button2);
            this.subToolbar.addControl(button3);
          
            viewer.toolbar.addControl(this.subToolbar);
            }else{
                viewer.toolbar.removeControl(this.subToolbar);

            }
        };
        this._button.setToolTip('Choose Color');
        this._button.addClass('myAwesomeExtensionIcon');
        this._group.addControl(this._button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('MyAwesomeExtension', MyAwesomeExtension);
