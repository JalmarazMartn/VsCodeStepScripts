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

	let getExtensions = vscode.commands.registerCommand('vscodestepsscripts.getExtensions', function () {
		let extensionsInfo = require('./src/extensionsInfo.js');
		extensionsInfo.GetExtensions();
	});
	context.subscriptions.push(getExtensions);

	let WriteFromFolderDialog = vscode.commands.registerCommand('vscodestepsscripts.WriteFromFolderDialog', function () {
		let ArgumentCompletion = require('./src/ArgumentCompletion.js');
		ArgumentCompletion.WriteFolderDialogResultInCurrentEditPostion();
	});
	context.subscriptions.push(WriteFromFolderDialog);

	let WriteFromFileDialog = vscode.commands.registerCommand('vscodestepsscripts.WriteFromFileDialog', function () {
		let ArgumentCompletion = require('./src/ArgumentCompletion.js');
		ArgumentCompletion.WriteFileDialogResultInCurrentEditPostion();
	});
	context.subscriptions.push(WriteFromFileDialog);


	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		{ language: 'json', scheme: 'file' },

		{
			// eslint-disable-next-line no-unused-vars
			provideCompletionItems(document, position) {
				const ArgumentCompletion = require('./src/ArgumentCompletion.js');
				return ArgumentCompletion.SelectArguments();
			}
		},
		'tSelArguments' // trigger
	));

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