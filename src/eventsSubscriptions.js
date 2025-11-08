const vscode = require('vscode');
module.exports = {
    executeConfScript: function (context) { executeConfScript(context) }
}

async function executeConfScript(context) {
    //get configuration param scriptWhenOpenWS
    const config = vscode.workspace.getConfiguration();
    const scriptWhenOpenWS = config.get('JAMVScodestepsscripts.scriptWhenOpenWS');
    if (!scriptWhenOpenWS) {
        return;
    }
    if (scriptWhenOpenWS.trim() === '') {
        return;
    }
    const HTMLView = require('./HTMLView.js');
    const ExecuteScript = require('./ExecuteScript.js');
    const eventScript = await ExecuteScript.getJSONFromDocName(scriptWhenOpenWS);
    HTMLView.ShowStepHTMLView(context, eventScript);
    HTMLView.clearEventScript();
    //execute the script
}
/*
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(e => refreshDiagnostics(e.document, customDiagnostic))
    );
    context.subscriptions.push(
        vscode.workspace.onDidCloseTextDocument(doc => {
            if (getEnableWSDiagnostics) { refreshDiagnostics(doc, customDiagnostic) }
            else { customDiagnostic.delete(doc.uri) }
        })
        //vscode.workspace.onDidCloseTextDocument(doc => customDiagnostic.delete(doc.uri))

    );
    context.subscriptions.push(
        vscode.debug.onDidStartDebugSession(e => parseAllDocs(customDiagnostic))
    );

    //context.subscriptions.push(
    //    vscode.workspace.onDidCloseTextDocument (()=>
    //vscode.workspace.textDocuments.forEach(doc => refreshDiagnostics(doc,customDiagnostic))
    //));*/

