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
            return getTreeItemArrayFromJSON(value);
        }
        else {
            return getTreeItemArrayFromJSON(this._jsonData);
        }

    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
}

function getTreeItemArrayFromJSON(JSONData) {
    let itemArray = [];
    let names = [];
    if (JSONData) {
        names = Object.getOwnPropertyNames(JSONData);
    }
    let i = -1;
    for (var key in JSONData) {
        i = i + 1;
        if (names[i]) {
            console.log(names[i]);
        }
        const value = JSONData[key];
        console.log(value);
        //const label = key + ': ' + JSON.stringify(value);
        const label = JSON.stringify(value);
        if (typeof value === 'object') {
            itemArray.push(new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.Collapsed));
        }
        else {
            if (JSONData.hasOwnProperty(key)) {
                itemArray.push(new vscode.TreeItem(JSON.stringify(value), vscode.TreeItemCollapsibleState.None));
            }
        }
    }
    return itemArray;
}

function GetKeyLiteralStringFromJson(jsonData) {
    for (var key in jsonData) {
        const value = jsonData[key];
        if (typeof value === 'object') {
            return GetKeyLiteralStringFromJson(value);
        }
        else {
            if (jsonData.hasOwnProperty(key)) {
                return key;
            }
        }
    }
}