const vscode = require('vscode');
const commandArgName = 'Get argument depending on action';
const regexExecType = /"\s*scriptExecType\s*"\s*:\s*"\s*(.*)\s*"/;
module.exports = {
	SelectArguments: function () {
		return (SelectArguments());
	},
	SelectExecType: function()
	{
		return (SelectExecType())
	},
	WriteFileDialogResultInCurrentEditPostion: async function () {
		await WriteFileDialogResultInCurrentEditPostion();
	},
	WriteFolderDialogResultInCurrentEditPostion: async function () {
		await WriteFolderDialogResultInCurrentEditPostion();
	}	
}

async function SelectArguments() {
	if (!isEditingScriptArgument())
	{
		return;
	}
	const ScriptExecType = GetScriptExecType();
	const SelectFileDialogOption = (ScriptExecType === 'openDocument') || (ScriptExecType === 'openExternal');
	const commandCompletion = new vscode.CompletionItem(commandArgName);
	commandCompletion.kind = vscode.CompletionItemKind.Snippet;
	commandCompletion.filterText = commandArgName;
	commandCompletion.label = commandArgName;
	if (SelectFileDialogOption) {
		let SnippetcommandName = 'vscodestepsscripts.WriteFromFileDialog';
		if (ScriptExecType == 'openExternal') {
			SnippetcommandName = 'vscodestepsscripts.WriteFromFolderDialog';
		}
		commandCompletion.command = {
			command: SnippetcommandName,
			title: '',
			arguments: []
		}
		commandCompletion.insertText = commandArgName;
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
	else {
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
	ConvertedElement = ConvertedElement.replaceAll('\\', '/');

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
			const match = regexExecType.exec(text);
			if (match) {
				return match[1];
			}
		}
		return '';
	}

}
function isEditingScriptExecType() {
	return existsTextCurrLine('scriptExecType');
}
function isEditingScriptArgument()
{
	return existsTextCurrLine('scriptArgument');
}
function existsTextCurrLine(textToSearch='')
{
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return false
	}
	const document = editor.document;
	//get current position line in document
	const currentlineNumber = editor.selection.start.line;
	const currLine = document.lineAt(currentlineNumber);
	const lineText = currLine.text;

	if (lineText.search(textToSearch) >= 0) {
		return true
	}
	return false;
}
async function WriteFileDialogResultInCurrentEditPostion() {
	InsertTextInCurrentEditPostion(convertElementToSnippetText(await GetFileDialogResult(false)));
}
async function WriteFolderDialogResultInCurrentEditPostion() {
	InsertTextInCurrentEditPostion(convertElementToSnippetText(await GetFileDialogResult(true)));
}

async function InsertTextInCurrentEditPostion(NewText = '') {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const document = editor.document;
	if (!document) {
		return;
	}

	const WSEdit = new vscode.WorkspaceEdit;
	const currentlineNumber = editor.selection.start.line;
	const currentline = document.lineAt(currentlineNumber);
	const currentlineText = currentline.text;
	const commandNameStart = currentlineText.indexOf(commandArgName);
	if (commandNameStart === -1) {
		// @ts-ignore
		NewText = NewText.replaceAll('"', '');
	}
	else {
		const newStartPosition = new vscode.Position(currentlineNumber, commandNameStart);
		const newEndPosition = new vscode.Position(currentlineNumber, commandNameStart + commandArgName.length);
		WSEdit.delete(document.uri, new vscode.Range(newStartPosition, newEndPosition));
	}
	WSEdit.insert(document.uri, editor.selection.end, NewText);
	await vscode.workspace.applyEdit(WSEdit);
}
async function SelectExecType() {
	let commandCompletion = [];
	if (!isEditingScriptExecType())
	{
		return;
	}
    commandCompletion.push(new vscode.CompletionItem(convertElementToSnippetText("task"), vscode.CompletionItemKind.Constant));
		commandCompletion.push(new vscode.CompletionItem(convertElementToSnippetText("extensionCommand"), vscode.CompletionItemKind.Constant));
	commandCompletion.push(new vscode.CompletionItem(convertElementToSnippetText("openDocument"), vscode.CompletionItemKind.Constant));
	commandCompletion.push(new vscode.CompletionItem(convertElementToSnippetText("openExternal"), vscode.CompletionItemKind.Constant));
	commandCompletion.push(new vscode.CompletionItem(convertElementToSnippetText("executeCommandShell"), vscode.CompletionItemKind.Constant));		
    return commandCompletion;
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
