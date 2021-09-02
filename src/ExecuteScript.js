const vscode = require('vscode');
var DocName = '';
module.exports = {
	executeScriptSteps: async function (
	) {
		await executeScriptSteps();
	}
};
async function executeScriptSteps() {	
	const scriptsSteps = await getJSONFromCurrentDoc();
    const vsCodeSteps = scriptsSteps.vsCodeSteps;
    for (let index = 0; index < vsCodeSteps.length; index++) {
        await executeScriptStep(index);
    }		
}
async function getJSONFromCurrentDoc() {
	var currEditor = vscode.window.activeTextEditor;
	DocName = currEditor.document.fileName;
	return (getJSONFromDocName(DocName));
}
async function getJSONFromDocName(DocName='') {	
	let Document = await vscode.workspace.openTextDocument(DocName);
	const JSONFromDoc = JSON.parse((Document.getText()));
	return (JSONFromDoc);
}

async function executeScriptStep(index=0)
{
	const scriptsSteps = await getJSONFromDocName(DocName);
    const vsCodeSteps = scriptsSteps.vsCodeSteps;
	const vsCodeStep = vsCodeSteps[index];
	switch(vsCodeStep[1].scriptExecType) {
		case 'task':
		  	await executeTask(vsCodeStep[2].scriptArgument);
		  	break;
		case 'extensionCommand':
			await executeExtensionCommand(vsCodeStep[2].scriptArgument);
			break;
		case 'openDocument':
			await openDocument(vsCodeStep[2].scriptArgument);
			break;
		};
		await vscode.window.showInformationMessage(vsCodeStep[0].Descripton,{modal:false},'Excecute Next Step');
}
async function executeTask(taskLabel='')
{	
	vscode.commands.executeCommand('workbench.action.tasks.runTask',taskLabel);
}
async function executeExtensionCommand(commandName='')
{	
	vscode.commands.executeCommand(commandName);
}
async function openDocument(documentPath='')
{		
	let doc = await vscode.workspace.openTextDocument(documentPath);
	vscode.window.showTextDocument(doc);
}
