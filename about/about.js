BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    if (document.getElementById("customLoadingScreenDiv")) {
        document.getElementById("customLoadingScreenDiv").style.display = "initial";
        return;
    }
    this._loadingDiv = document.createElement("div");
    this._loadingDiv.id = "customLoadingScreenDiv";
    this._loadingDiv.innerHTML = "LOADING YOUR STUFFSSSS";
    var customLoadingScreenCss = document.createElement('style');
    customLoadingScreenCss.type = 'text/css';
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        background-color: #3797a4;
        color: white;
        font-size:50px;
        text-align:center;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
    this._resizeLoadingUI();
    window.addEventListener("resize", this._resizeLoadingUI);
    document.body.appendChild(this._loadingDiv);
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
    document.getElementById("customLoadingScreenDiv").style.display = "none";
    console.log("Loaded");
}

var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function() {

    var scene   = new BABYLON.Scene(engine);
    var scale   = 0.1, MeshWriter, text;
    var camera  = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI/4, 50, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
    light.intensity = 0.5;

    write();
    return scene;

    function write () {
        Writer = BABYLON.MeshWriter(scene, {scale:scale,defaultFont:"Arial"});
        text  = new Writer(
            abouttext,
            {
                "anchor": "center",
                "letter-height": 40,
                "color": "#1C3870",
                "position": {
                    "z": 70
                }
            }
        );
    }

    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener("resize", function () {
        engine.resize();
    });
};


initFunction = async function() {
    var asyncEngineCreation = async function() {
        try {
            return createDefaultEngine();
        } catch(e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    };

    engine = await asyncEngineCreation(); if (!engine) throw 'engine should not be null.'; scene = createScene();};
initFunction().then(() => {sceneToRender = scene
                          engine.runRenderLoop(function () { if (sceneToRender &&
                                                                 sceneToRender.activeCamera) { sceneToRender.render(); } });
                         });
// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
