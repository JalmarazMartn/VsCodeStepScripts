const vscode = require('vscode');
module.exports = {
    GetExtensions:
        function () {
            GetExtensions();
        }
};
async function GetExtensions() {
    let AllExtensions = vscode.extensions.all;
    let extensionsString = '[';
    for (var i = 0; i < AllExtensions.length; i++) {
        const Extension = AllExtensions[i];
        //get contributes form app.json extension info
        const extensionContributes = Extension.packageJSON.contributes;
        if (i > 0 ){ extensionsString += ',' }
        extensionsString = extensionsString + '"' + Extension.id +'"';
        if (extensionContributes) {
            extensionsString = extensionsString + ',' + JSON.stringify(extensionContributes);
        }
    }
    extensionsString += ']';
    const savePath = await vscode.window.showSaveDialog({
        defaultUri: vscode.Uri.file('/extensionsInfo.json'),
        saveLabel: 'Save Extensions',
        filters: {
            'JSON': ['json']
        }
    });

    const fs = require('fs');
    fs.writeFile(savePath.fsPath, extensionsString, function (err) {
        if (err) {
            vscode.window.showErrorMessage('Error saving file:' + err);
        }
    });

}
async function GetALExtension(ExtensionId = '') {
    try {
        const ALExtension = vscode.extensions.getExtension(ExtensionId);
        if (!(ALExtension.isActive)) { ALExtension.activate }
        const ALAPI = ALExtension.exports;
        console.log(ALExtension);
        if (ALAPI) {
            console.log('Extension =========>' + ExtensionId);
            console.log(ALAPI);
            if (ExtensionId == 'martonsagi.al-object-designer') {
                const APIObject1 = await ALAPI.ALObjectCollector;
                console.log('ALObjectCollector:');
                console.log(APIObject1);
                console.log('ALObjectCollector: Methods');
                console.log(getMethods(APIObject1));
            }
        }
    }
    catch (error) {
        //console.log(error);
        return;
    }
}
const getMethods = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}
