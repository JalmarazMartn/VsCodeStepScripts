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
    //var treeView = 
    vscode.window.createTreeView('treeView', { treeDataProvider: new TreeDataProvider(jsonData) });
    //return treeView;
}
//create tree view data provider from JSON data
class TreeDataProvider {
    constructor(jsonData) {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this._jsonData = jsonData;
        console.log(this._jsonData);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            //return element.children;
            return [new vscode.TreeItem(JSON.stringify(this._jsonData), vscode.TreeItemCollapsibleState.None)];
        }
        else {
            const JSONItem = new vscode.TreeItem(JSON.stringify(this._jsonData), vscode.TreeItemCollapsibleState.Collapsed);
            return [JSONItem];            
        }
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
}