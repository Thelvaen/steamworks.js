/** @type {import('steamworks.js')} */
const steamworks = require('steamworks.js');
const client = steamworks.init(480);
console.log(client);

const SteamCallback = steamworks.SteamCallback;
//nativeBinding.callback.SteamCallback;

document.body.requestFullscreen();
const playerName = client.localplayer.getName();
const playerId = client.localplayer.getSteamId(); // 7656119803423333
document.getElementById('name').innerText = playerName;

document.getElementById('activateOverlay').addEventListener('click', function () {
    client.overlay.activateDialogToUser(playerId)
});

input_init = client.input.init();
if (input_init) {
    console.log('Steam Input initialized');
}
else {
    console.log('Steam Input not initialized');
}

console.log(client.input);

manifest_loaded = client.input.setInputActionManifestFilePath('/home/tmandel/steamworks.js/test/electron/portal2_actions.vdf');

if (manifest_loaded) {
    console.log('Manifest loaded');
    const actionset = client.input.getActionSet('FPSControls');
    const menuset = client.input.getActionSet('MenuControls');
    console.log(actionset + " " + menuset);
    const attack = client.input.getDigitalAction('attack');
    const Jump = client.input.getDigitalAction('Jump');
    const duck = client.input.getAnalogAction('duck');
}
else {
    console.log('Manifest not loaded');
    console.log(client.input.getActionSet('FPSControls'));
    console.log(client.input.getActionSet('MenuControls'));
}

const handle = client.callback.register(SteamCallback.GameOverlayActivated, (value) => {
    console.log("Overlay status : " + value);
});

setTimeout(() => {
    handle.disconnect();
}, 3000);


setInterval(() => {
    if (manifest_loaded)
        {
        controllers.forEach(controller => {
            controller.activateActionSet(actionset);
            console.log('attack: ' + controller.isDigitalActionPressed(attack));
            console.log('Jump: ' + controller.isDigitalActionPressed(Jump));
            console.log('duck: ' + controller.getAnalogActionVector(duck));
            });
        }
}, 66)

//     console.clear()

//     const controllers = client.input.getControllers()
//     console.log('Controllers: ' + controllers.length)

//     controllers.forEach(controller => {
//         controller.activateActionSet(actionset)

//         console.log('============')
//         console.log('Affirm: ' + controller.isDigitalActionPressed(select))
//         console.log('Cancel: ' + controller.isDigitalActionPressed(cancel))
//         console.log('Control: ' + JSON.stringify(controller.getAnalogActionVector(menu)))
//     })
// }, 66)
