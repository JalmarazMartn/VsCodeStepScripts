const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "vscodestepsscripts" is now active!');

	let disposableExecuteStep = vscode.commands.registerCommand('vscodestepsscripts.executeScript', function () {
		//const executeSteps = require('./src/ExecuteScript');				
		//executeSteps.executeScriptSteps(context);
		const htmlView = require('./src/HTMLViewTest.js');
		htmlView.ShowStepHTMLView(context);
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