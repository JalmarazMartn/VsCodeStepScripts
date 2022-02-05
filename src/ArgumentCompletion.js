const vscode = require('vscode');
const commandName = 'tGetArguments';
module.exports = {
	GetArguments: function()
	{
		return(GetArguments());
	}

}
async function GetArguments()
{	
	const commandCompletion = new vscode.CompletionItem(commandName);
	commandCompletion.kind = vscode.CompletionItemKind.Snippet;
    commandCompletion.filterText = commandName;
    commandCompletion.label = commandName;	
	commandCompletion.insertText = new vscode.SnippetString(await GetArgumentsFromType());
	commandCompletion.detail = 'Ease the use of arguments';
	commandCompletion.documentation = ''; 
	return [commandCompletion];
}
async function GetArgumentsFromType()
{
	return await GetExtensionsCommands();
}
async function GetExtensionsCommands()
{
	let ExtensionCommands = '';
	const extensionInfo = require('./extensionsInfo.js');
	const ExtensionsString = await extensionInfo.GetExtensionsString();
	//load extensionstring into JSON
	const JSONExtensions = JSON.parse(ExtensionsString);
	//loop through json getting all values of key "command"
	for(let i = 0; i < JSONExtensions.length; i++)
	{
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
function convertElementToSnippetText(SourceElement='')
{
	let ConvertedElement = '"' + SourceElement + '"';
	// @ts-ignore
	ConvertedElement = ConvertedElement.replaceAll('"','\"');
	// @ts-ignore
	ConvertedElement = ConvertedElement.replaceAll(',','\\,');
	// @ts-ignore
	ConvertedElement = ConvertedElement.replaceAll(')','');
	return ConvertedElement;
}