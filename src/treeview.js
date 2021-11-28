const vscode = require('vscode');
module.exports = {
    createTreeView:
        function (jsonData) {
            //return createTreeView(jsonData); 
            createTreeView(jsonData);
        }
};
//create vscode tree view from JSON data
function createTreeView(jsonData) {
    vscode.window.registerTreeDataProvider('treeView', new TreeDataProvider(jsonData));
    vscode.window.createTreeView('treeView', { treeDataProvider: new TreeDataProvider(jsonData) });
}
//create tree view data provider from JSON data
class TreeDataProvider {
    constructor(jsonData) {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this._jsonData = jsonData;
    }
    getTreeItem(element) {
        //return element;
        const value = JSON.parse(element.label);

        if (typeof value === 'object') {
            return new vscode.TreeItem(GetKeyLiteralStringFromJson(value), vscode.TreeItemCollapsibleState.Collapsed);
        }
        else {
            return new vscode.TreeItem(JSON.stringify(value), vscode.TreeItemCollapsibleState.None);
        }
    }
    getChildren(element) {
        if (element) {
            //return element.children;
            //return [new vscode.TreeItem(JSON.stringify(this._jsonData), vscode.TreeItemCollapsibleState.None)];
            const value = JSON.parse(element.label);
            return getTreeItemArrayFromJSON(value, false);
        }
        else {
            return getTreeItemArrayFromJSON(this._jsonData, true);
        }

    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
}

function getTreeItemArrayFromJSON(JSONData, AddKey = false) {
    let itemArray = [];
    let names = [];
    if (JSONData) {
        names = Object.getOwnPropertyNames(JSONData);
    }
    let i = -1;
    for (var key in JSONData) {
        i = i + 1;
        const value = JSONData[key];
        //const label = key + ': ' + JSON.stringify(value);
        let label = JSON.stringify(value);
        if (names[i]) {
            //console.log(names[i]);
            const objName = '{"' + names[i] + '": ';
            if (getObjectNameFromJSONObject(JSONData) !== names[i] || AddKey) {
                label = objName + label + '}';
            }
        }
        console.log('..');
        console.log('content==>' + i + ' ' + label);
        if (typeof value === 'object') {
            itemArray.push(new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.Collapsed));
        }
        else {
            //if (JSONData.hasOwnProperty(key)) {
            itemArray.push(new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.None));
            //}
        }
    }
    return itemArray;
}

function GetKeyLiteralStringFromJson(jsonData) {
    const names = Object.getOwnPropertyNames(jsonData);
    for (var key in jsonData) {
        const value = jsonData[key];
        return key;
        console.log('.');
        console.log('content==>' + key + ' ' + JSON.stringify(value));
        if (names[0]) {
            console.log('name==>' + names[0]);
            return names[0];
        }
        if (typeof value === 'object') {
            //return GetKeyLiteralStringFromJson(value);
            //if (names[0]) {
            //    console.log('name==>' + names[0]);
            //    return names[0];
            //}
        }
        //if (jsonData.hasOwnProperty(key)) {
        //    return key;
        //}
        //return key;
    }
}
function getObjectNameFromJSONObject(jsonData) {
    const names = Object.getOwnPropertyNames(jsonData);
    if (names[0]) {
        return names[0];
    }
    return '';
}