const vscode = require('vscode');
const HTMLView = require('./src/HTMLView');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "vscodestepsscripts" is now active!');

	let disposableExecuteStep = vscode.commands.registerCommand('vscodestepsscripts.executeScript', function () {
		const HTMlView = require('./src/HTMLView.js');
		HTMLView.ShowStepHTMLView(context);
		return;
		const executeSteps = require('./src/ExecuteScript');				
		executeSteps.executeScriptSteps();
	});

	context.subscriptions.push(disposableExecuteStep);
}
// @ts-ignore
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	// @ts-ignore
	activate,
	deactivate
}