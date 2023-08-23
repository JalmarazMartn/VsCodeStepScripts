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
	getJSONFromDocName: async function (DocName = '') {
		return await getJSONFromDocName(DocName);
	},
	SetScriptsSteps: function (NewScriptsSteps) {
		SetScriptsSteps(NewScriptsSteps)
	},
	PickAndExecuteScriptStep: async function () {
		PickAndExecuteScriptStep();
	},
	PickStepNumber: async function () {
		return await PickStepNumber();
	}
};
async function executeScriptSteps() {
	scriptsSteps = await getJSONFromCurrentDoc();
	if (!scriptsSteps.vsCodeSteps) {
		//get a file name with dialog
		let fileName = await vscode.window.showOpenDialog({
			canSelectFiles: true,
			canSelectFolders: false,
			canSelectMany: false,
			openLabel: 'Select a file',
			filters: { 'JSON': ['json'] }
		});
		scriptsSteps = await getJSONFromDocName(fileName[0].fsPath);
	}

	//const vsCodeSteps = scriptsSteps.vsCodeSteps;
	//for (let index = 0; index < vsCodeSteps.length; index++) {
	//    await executeScriptStep(index);
	//}
	let firstStep = 0;
	executeScriptStep(firstStep);
}
async function getJSONFromCurrentDoc() {
	var currEditor = vscode.window.activeTextEditor;
	//currEditor.document.fileName;
	if (!currEditor) {
		return;
	}
	return (getJSONFromDocName(currEditor.document.fileName));
}
async function getJSONFromDocName(DocName = '') {
	let Document = await vscode.workspace.openTextDocument(DocName);
	const JSONFromDoc = JSON.parse((Document.getText()));
	return (JSONFromDoc);
}

async function executeScriptStep(index = 0) {
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
		case 'executeCommandShell':
			await executeCommandShell(vsCodeStep[2].scriptArgument);
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
async function executeCommandShell(commendShell = '') {
	createTaskWithoutWriteTaskJson('On the air', commendShell, '', '', '$tsc', []);
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
		if (!fileExists(documentPath)) {
			documentPath = getCurrentWorkspaceFolder() + '\\' + documentPath;
		};
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
//function create a new vscode task and run it without write task.json
async function createTaskWithoutWriteTaskJson(taskName = '', taskCommand = '', taskArgs = '', taskGroup = '', taskProblemMatcher = '$tsc', taskProblemMatcherType = []) {

	let task = new vscode.Task(
		{
			type: 'shell',
			command: taskCommand,
			args: taskArgs,
			group: taskGroup,
			problemMatcher: taskProblemMatcher,
			problemMatcherType: taskProblemMatcherType
		},
		vscode.TaskScope.Workspace,
		taskName,
		'task',
		new vscode.ShellExecution(taskCommand)
	);
	vscode.tasks.executeTask(task);
}
//new funtion: check if file with complete file path exists
function fileExists(filePath) {
	const fs = require('fs');
	try {
		fs.accessSync(filePath, fs.constants.F_OK);
	} catch (err) {
		return false;
	}
	return true;
}
function getCurrentWorkspaceFolder() {
	let workspaceFolders = vscode.workspace.workspaceFolders;
	if (workspaceFolders) {
		return workspaceFolders[0].uri.fsPath;
	}
}
//function that gives a pick in the command pallet the list of all steps in the current script
async function PickAndExecuteScriptStep() {
	let stepNumber = await PickStepNumber();
	executeScriptStep(stepNumber);

}
async function PickStepNumber() {
	let vsCodeSteps = scriptsSteps.vsCodeSteps;
	let ScriptStepsToPick = [];
	let stepNumber = -1;
	for (let index = 0; index < vsCodeSteps.length; index++) {
		ScriptStepsToPick.push(`Step ${index + 1} - ${vsCodeSteps[index][0].Description}`);
	}
	await vscode.window.showQuickPick(ScriptStepsToPick).then(async (value) => {
		if (value) {
			//Create a regexp to find the number of the step
			let regexp = /Step (\d+) /;
			stepNumber = parseInt(regexp.exec(value)[1]) - 1;
		}
	});
	return stepNumber;
}
