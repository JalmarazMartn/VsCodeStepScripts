const { request } = require('http');
const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
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

	let disposableCustomCommand = vscode.commands.registerCommand('vscodestepsscripts.execCustomCommand', function () {
		//const executeSteps = require('./src/ExecuteScript');				
		//executeSteps.executeScriptSteps(context);
		const customCommand = require('./src/customizedCommand.js');
		customCommand.executeCustomizedCommand();
	});
	context.subscriptions.push(disposableCustomCommand);

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
		'' // trigger
	));

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		{ language: 'json', scheme: 'file' },
		{
			// eslint-disable-next-line no-unused-vars
			provideCompletionItems(document, position) {
				const ArgumentCompletion = require('./src/ArgumentCompletion.js');
				return ArgumentCompletion.SelectExecType();
			}
		},
		'' // trigger
	));

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		{ language: 'json', scheme: 'file' },

		{
			// eslint-disable-next-line no-unused-vars
			provideCompletionItems(document, position) {
				const PowerShellCompletion = require('./src/PowerShellCompletion.js');
				return PowerShellCompletion.GetPowerShellExecution();
			}
		},
		'tpowwerShellExcution' // trigger
	));
	const eventSusbscription = require('./src/eventsSubscriptions.js');
	eventSusbscription.executeConfScript(context);
	

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