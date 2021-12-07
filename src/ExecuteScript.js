const vscode = require('vscode');
var scriptsSteps = {};
module.exports = {
	executeScriptSteps: async function () {
		await executeScriptSteps();
	},
	executeScriptStep: async function (index
	) {
		await executeScriptStep(index);
	},
	getJSONFromCurrentDoc: async function () {
		return await getJSONFromCurrentDoc();
	},
	SetScriptsSteps: function (NewScriptsSteps) {
		SetScriptsSteps(NewScriptsSteps)
	}
};
async function executeScriptSteps() {
	scriptsSteps = await getJSONFromCurrentDoc();
	//const vsCodeSteps = scriptsSteps.vsCodeSteps;
	//for (let index = 0; index < vsCodeSteps.length; index++) {
	//    await executeScriptStep(index);
	//}
	let firstStep = 0;
	executeScriptStep(firstStep);
}
async function getJSONFromCurrentDoc() {
	var currEditor = vscode.window.activeTextEditor;
	currEditor.document.fileName;
	return (getJSONFromDocName(currEditor.document.fileName));
}
async function getJSONFromDocName(DocName = '') {
	let Document = await vscode.workspace.openTextDocument(DocName);
	const JSONFromDoc = JSON.parse((Document.getText()));
	return (JSONFromDoc);
}

async function executeScriptStep(index) {
	var vsCodeSteps = scriptsSteps.vsCodeSteps;
	const vsCodeStep = vsCodeSteps[index];
	switch (vsCodeStep[1].scriptExecType) {
		case 'task':
			await executeTask(vsCodeStep[2].scriptArgument);
			break;
		case 'extensionCommand':
			await executeExtensionCommand(vsCodeStep[2].scriptArgument);
			break;
		case 'openDocument':
			await openDocument(vsCodeStep[2].scriptArgument);
			break;
		case 'openExternal':
			await openExternal(vsCodeStep[2].scriptArgument);
			break;
		default:
			ShowErrorPanel(`Unkown scriptExecType: ${vsCodeStep[1].scriptExecType}`);
			break;
	};	
}
async function executeTask(taskLabel = '') {
	try {
		let execution = await vscode.commands.executeCommand('workbench.action.tasks.runTask', taskLabel);
	}
	catch (error) {
		vscode.window.showErrorMessage(error.message);
	}
}
async function executeExtensionCommand(commandName = '') {
	try {
		let execution = await vscode.commands.executeCommand(commandName);
	}
	catch (error) {
		ShowErrorPanel(error.message);
	}
}
async function openDocument(documentPath = '') {
	try {

		let doc = await vscode.workspace.openTextDocument(documentPath);
		await vscode.window.showTextDocument(doc);
	}
	catch (error) {
		ShowErrorPanel(error.message);
	}
}
async function openExternal(elementPath = '') {
	try {
		vscode.env.openExternal(vscode.Uri.parse(elementPath));
	}
	catch (error) {
		ShowErrorPanel(error.message);
	}
}
function ShowErrorPanel(errMessage = '') {
	let ErrorExec = vscode.window.createOutputChannel('ErrorExcec');
	ErrorExec.appendLine(errMessage);
	ErrorExec.show();
	vscode.window.showErrorMessage(errMessage);
}
function SetScriptsSteps(NewScriptsSteps) {
	scriptsSteps = NewScriptsSteps;
}
