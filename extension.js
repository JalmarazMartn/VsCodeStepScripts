const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "vscodestepsscripts" is now active!');

	let disposableExecuteStep = vscode.commands.registerCommand('vscodestepsscripts.executeScript', function () {
		//const executeSteps = require('./src/ExecuteScript');				
		//executeSteps.executeScriptSteps(context);
		const htmlView = require('./src/HTMLView.js');
		htmlView.ShowStepHTMLView(context);
	});

	context.subscriptions.push(disposableExecuteStep);
	const treeView = require('./src/treeview.js');
	const executeSteps = require('./src/ExecuteScript.js');	
	//register the tree view from module treeview.js
	let disposableTreeView = vscode.commands.registerCommand('vscodestepsscripts.treeView', function () {
		executeSteps.getJSONFromCurrentDoc().then(function (data) {
			treeView.createTreeView(data);
		});
	});
	context.subscriptions.push(disposableTreeView);

			// @ts-ignore
	exports.activate = activate;
}
// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	// @ts-ignore
	activate,
	deactivate
}