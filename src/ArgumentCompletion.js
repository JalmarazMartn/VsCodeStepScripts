const vscode = require('vscode');
const commandName = 'tSelArguments';
module.exports = {
	SelectArguments: function () {
		return (SelectArguments());
	},
	WriteFileDialogResultInCurrentEditPostion: async function () {
		await WriteFileDialogResultInCurrentEditPostion();
	},
	WriteFolderDialogResultInCurrentEditPostion: async function () {
		await WriteFolderDialogResultInCurrentEditPostion();
	}
}

async function SelectArguments() {
	const ScriptExecType = GetScriptExecType();
	const SelectFileDialogOption = (ScriptExecType === 'openDocument') || (ScriptExecType === 'openExternal');
	const commandCompletion = new vscode.CompletionItem(commandName);
	commandCompletion.kind = vscode.CompletionItemKind.Snippet;
	commandCompletion.filterText = commandName;
	commandCompletion.label = commandName;
	if (SelectFileDialogOption) {
		let commandName = 'vscodestepsscripts.WriteFromFileDialog';
		if (ScriptExecType == 'openExternal') {
			commandName = 'vscodestepsscripts.WriteFromFolderDialog';
		}
		commandCompletion.command = {
			command: commandName,
			title: '',
			arguments: []
		}		
		commandCompletion.insertText = '';
	}
	else {
		commandCompletion.insertText = new vscode.SnippetString(await GetArgumentsFromType());
	}
	commandCompletion.detail = 'Ease the use of arguments';
	commandCompletion.documentation = '';
	return [commandCompletion];
}
async function GetArgumentsFromType() {
	//switch on scriptExecType
	const ScriptExecType = GetScriptExecType();
	if (ScriptExecType == 'extensionCommand') {
		return await GetExtensionsCommands();
	}
	else
	{
		if (ScriptExecType == 'task') {
			return await GetWorkspaceTasks();
		}
	}
}
async function GetExtensionsCommands() {
	let ExtensionCommands = '';
	const extensionInfo = require('./extensionsInfo.js');
	const ExtensionsString = await extensionInfo.GetExtensionsString();
	//load extensionstring into JSON
	const JSONExtensions = JSON.parse(ExtensionsString);
	//loop through json getting all values of key "command"
	for (let i = 0; i < JSONExtensions.length; i++) {
		//ExtensionCommands += convertKeyElementToSnippetText(JSONExtensions[i].command);
		//get array from {JessAlmarazMartin.vsCodeScriptStepsExecution: Array(3)}				
		for (var key in JSONExtensions[i]) {
			const ExtensionCommandsArray = JSONExtensions[i][key];
			for (var j = 0; j < ExtensionCommandsArray.length; j++) {
				if (ExtensionCommands !== '') {
					ExtensionCommands = ExtensionCommands + ',';
				}
				ExtensionCommands += convertElementToSnippetText(ExtensionCommandsArray[j].command);
			}
		}

	}
	ExtensionCommands = '${1|' + ExtensionCommands + '|}';
	return ExtensionCommands;
}
function convertElementToSnippetText(SourceElement = '') {
	let ConvertedElement = '"' + SourceElement + '"';
	// @ts-ignore
	ConvertedElement = ConvertedElement.replaceAll('"', '\"');
	// @ts-ignore
	ConvertedElement = ConvertedElement.replaceAll(',', '\\,');
	// @ts-ignore
	ConvertedElement = ConvertedElement.replaceAll(')', '');
	// @ts-ignore	
	ConvertedElement = ConvertedElement.replaceAll('\\','/');

	return ConvertedElement;
}
function GetScriptExecType() {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const document = editor.document;
		//get current position line in document
		const currentlineNumber = editor.selection.start.line;

		for (let i = currentlineNumber; i > 0; i--) {
			const line = document.lineAt(i - 1);
			const text = line.text;
			const regex = /"\s*scriptExecType\s*"\s*:\s*"\s*(.*)\s*"/;
			const match = regex.exec(text);
			if (match) {
				return match[1];
			}
		}
		return '';
	}

}
async function WriteFileDialogResultInCurrentEditPostion() {
	InsertTextInCurrentEditPostion(convertElementToSnippetText(await GetFileDialogResult(false)));
}
async function WriteFolderDialogResultInCurrentEditPostion() {
	InsertTextInCurrentEditPostion(convertElementToSnippetText(await GetFileDialogResult(true)));
}

async function InsertTextInCurrentEditPostion(NewText='')
{
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const document = editor.document;
	if (!document) {
		return;
	}

	const WSEdit = new vscode.WorkspaceEdit;
	WSEdit.insert(document.uri,editor.selection.end,NewText);
	await vscode.workspace.applyEdit(WSEdit);
}


async function GetFileDialogResult(selectFolder = false) {
	//set openFile
	return vscode.window.showOpenDialog({
		canSelectFiles: !selectFolder,
		canSelectFolders: selectFolder,
		canSelectMany: false,
		openLabel: 'Open'
	}).then(fileUri => {
		if (fileUri) {
			const filePath = fileUri[0].fsPath.toString();
			return filePath;
		}
		return '';
	});
}
async function GetWorkspaceTasks() {
	const tasks = await vscode.tasks.fetchTasks();
	//iterate in tasks and retuns an array of task names
	let taskNames = '';
	for (let i = 0; i < tasks.length; i++) {
		if (taskNames !== '') {
			taskNames = taskNames + ',';
		}

		taskNames = taskNames + convertElementToSnippetText(tasks[i].name);
	}
	taskNames = '${1|' + taskNames + '|}';
	return taskNames;
}
