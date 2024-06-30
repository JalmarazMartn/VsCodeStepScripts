const vscode = require('vscode');
const okButtonTok = 'OK';
module.exports = {
	executeCustomizedCommand: async function () {
		await executeScriptSteps();
	}
}
async function executeScriptSteps() {
    const scriptsSteps = await selectScriptStep();
	const ExecuteScript = require('./ExecuteScript.js');
	ExecuteScript.SetScriptsSteps(scriptsSteps);
	if (!scriptsSteps.vsCodeSteps)
		{
			return;
		}
	for (let index = 0; index < scriptsSteps.vsCodeSteps.length; index++) {
		if (await vscode.window.showWarningMessage('Execute '+ scriptsSteps.vsCodeSteps[index][0].Description + '?',{modal: true},okButtonTok) == okButtonTok)
		{
			await ExecuteScript.executeScriptStep(index);
		}
	}	
  
}
async function selectScriptStep()
{	const JSONFileURIs = await GetCustomizedCommandItems();
	const ExecuteScript = require('./ExecuteScript.js');  
	let scriptStep = [];
	await vscode.window.showQuickPick(JSONFileURIs).then(async (value) => {
		if (value) {
			scriptStep = await ExecuteScript.getJSONFromDocName(value.description);			
		}
	});
	return scriptStep;
}
async function GetCustomizedCommandItems() {
	var QuikItems = [];
	var FullPathFileJSONS = [];	
	const ExtConf = vscode.workspace.getConfiguration('');
	if (ExtConf) {
		FullPathFileJSONS = ExtConf.get('JAMVScodestepsscripts.customizedCommands');
	}
	for (let index = 0; index < FullPathFileJSONS.length; index++) {
		const element = FullPathFileJSONS[index];
		const ExecuteScript = require('./ExecuteScript.js');  
		const scriptsSteps = await ExecuteScript.getJSONFromDocName(FullPathFileJSONS[index]);
		QuikItems.push({
			"label": scriptsSteps.Description,
			"description": element
		});
	}
	return (QuikItems);
}