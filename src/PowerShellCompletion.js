const vscode = require('vscode');
const commandName = 'tpowwerShellExcution';
module.exports = {
    GetPowerShellExecution: function () {
        return (GetPowerShellExecution());
    }
};
async function GetPowerShellExecution() {
	const commandCompletion = new vscode.CompletionItem(commandName);
	commandCompletion.kind = vscode.CompletionItemKind.Snippet;
	commandCompletion.filterText = commandName;
	commandCompletion.label = commandName;
	commandCompletion.insertText = new vscode.SnippetString(await GetPowerShellFileCmd());
	commandCompletion.detail = 'Ease the use of arguments';
	commandCompletion.documentation = 'Select powershell file to execute when dialog raises';
    let SnippetcommandName = 'vscodestepsscripts.WriteFromFileDialog';
    commandCompletion.command = {
        command: SnippetcommandName,
        title: '',
        arguments: []
    }		

	return [commandCompletion];
}
async function GetPowerShellFileCmd() {

    const PSFile = '${1:}';    
    const PSArguments = '${2:Argument}';
    return `"powershell -executionpolicy bypass -File '${PSFile}' '${PSArguments}'"`;
}
