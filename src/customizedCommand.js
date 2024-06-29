const vscode = require('vscode');
module.exports = {
	executeCustomizedCommand: async function () {
		await executeScriptSteps();
	}
}
async function executeScriptSteps() {
    const scriptsSteps = await selectScriptStep();
}
async function selectScriptStep()
{	const JSONFileURIs = GetFullPathFileJSONS();
	const ExecuteScript = require('./ExecuteScript.js');  
	await vscode.window.showQuickPick(JSONFileURIs).then(async (value) => {
		if (value) {
			return await ExecuteScript.getJSONFromDocName(value);
		}
	});
}
function GetFullPathFileJSONS() {
	var FullPathFileJSONS = [];
	const ExtConf = vscode.workspace.getConfiguration('');
	if (ExtConf) {
		FullPathFileJSONS = ExtConf.get('JAMVScodestepsscripts.customizedCommands');
	}
	return (FullPathFileJSONS);
}
