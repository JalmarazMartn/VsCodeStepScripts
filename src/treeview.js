const vscode = require('vscode');
let labelNumber = 0;
let labelArray = [];

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
        labelNumber = 0;
        labelArray = [];
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this._jsonData = jsonData;
    }
    getTreeItem(element) {
        //return element;        
        const value = getJSONObjectFromlabelID(element.label);
        let labelName = getLabelNameFromLabelId(element.label);
        if (typeof value === 'object') {
            return new vscode.TreeItem(labelName, vscode.TreeItemCollapsibleState.Collapsed);    
        }
        else {
            labelName = '"' + labelName + '": ';
            return new vscode.TreeItem(labelName + JSON.stringify(value), vscode.TreeItemCollapsibleState.None);
        }
    }
    getChildren(element) {
        if (element) {            
            const value = getJSONObjectFromlabelID(element.label);
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
    let labelName = '';
    const names = Object.getOwnPropertyNames(JSONData);
    if (names[0]) {
        labelName = names[0];
    }
    let nameNumber = 0;
    for (var key in JSONData) {
        if (names[nameNumber]) {
            labelName = names[nameNumber];
        }
        else {
            labelName = key;
        }
        nameNumber = nameNumber + 1;
        const value = JSONData[key];        
        console.log('.');
        console.log(value);
        const labelID = pushJSONObjectToArray(value,labelName);    
        if (typeof value === 'object') {                        
            itemArray.push(new vscode.TreeItem(labelID, vscode.TreeItemCollapsibleState.Collapsed));
        }
        else {
            itemArray.push(new vscode.TreeItem(labelID, vscode.TreeItemCollapsibleState.None));
        }
    }
    return itemArray;
}

function pushJSONObjectToArray(jsonData,labelName='') {
    labelNumber = labelNumber + 1;
    const labelID = 'label' + labelNumber;    
    const finalLabel = {
        "labelID": labelID,
        "labelData": JSON.stringify(jsonData),        
        "labelName": labelName
    };
    labelArray.push(finalLabel);
    return labelID;
}
function getJSONObjectFromlabelID(labelID) {
    for (var i = 0; i < labelArray.length; i++) {
        if (labelArray[i].labelID === labelID) {
            return JSON.parse(labelArray[i].labelData);            
        }
    }
    return null;
}
function getLabelNameFromLabelId(labelID) {
    for (var i = 0; i < labelArray.length; i++) {
        if (labelArray[i].labelID === labelID) {
            return labelArray[i].labelName;            
        }
    }
    return '';    
}