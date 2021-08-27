const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "vscodestepsscripts" is now active!');

	let disposable = vscode.commands.registerCommand('vscodestepsscripts.executeScript', function () {
		vscode.window.showInformationMessage('Hello World from vsCodeStepsScripts!');
	});

	context.subscriptions.push(disposable);
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