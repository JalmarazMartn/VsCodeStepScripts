const vscode = require('vscode');
module.exports = {
	executeTransSteps: async function (
	) {
		await executeScriptSteps();
	}
};
async function executeScriptSteps() {
	const scriptsSteps = getJSONFromCurrentDoc();
    const vsCodeSteps = scriptsSteps.vsCodeSteps;
    for (let index = 0; index < vsCodeSteps.length; index++) {
        console.log(vsCodeSteps[index]);
    }		

}
function getJSONFromCurrentDoc() {
	var currEditor = vscode.window.activeTextEditor;
	let CurrDoc = currEditor.document;
	const JSONFromDoc = JSON.parse((CurrDoc.getText()));
	return (JSONFromDoc);
}
