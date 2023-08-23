const vscode = require('vscode');
let CurrentStep = -1;
var scriptsSteps = {};
module.exports = {
  ShowStepHTMLView: function (context) { ShowStepHTMLView(context) }
}

function EscapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\\/]/g, '\\$&'); // $& significa toda la cadena coincidente
}
async function ShowStepHTMLView(context) {
  const ExecuteScript = require('./ExecuteScript.js');
  CurrentStep = -1;
  scriptsSteps = await ExecuteScript.getJSONFromCurrentDoc();
	if (!scriptsSteps) {
		await fillJSONFromFavorites();
	}
  if (!scriptsSteps) {
    //get a file name with dialog
    let fileName = await vscode.window.showOpenDialog({
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: false,
      openLabel: 'Select a file'
    });
    scriptsSteps = await ExecuteScript.getJSONFromDocName(fileName[0].fsPath);
  }
  const WebviewSteps = vscode.window.createWebviewPanel(
    'Exec Visual Studio Script Steps',
    scriptsSteps.Description,
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }
  );
  WebviewSteps.webview.onDidReceiveMessage(
    async function (message) {
      const IsSkipMessageCommand = message.command.indexOf('Skip') > -1;
      const IsNextMessageCommand = message.command.indexOf('Next') > -1;
      const IsPickScriptStepToExecuteMessageCommand = message.command.indexOf('PickScriptStepToExecute') > -1;
      CurrentStep = CurrentStep + 1;
      if (CurrentStep >= scriptsSteps.vsCodeSteps.length) {
        WebviewSteps.dispose();
        return;
      }
      if (IsSkipMessageCommand) {
        const ConfirmationSkipMessage = 'Do you want to skip step"' + GetCurrentDescription(CurrentStep) + '"?';
        //if (vscode.window.showInformationMessage(ConfirmationSkipMessage,{modal:true}, 'Yes', 'No') == 'No') {
        vscode.window.showInformationMessage(ConfirmationSkipMessage, { modal: true }, 'Yes', 'No').then(
          (resolve) => {
            if (resolve == 'No') {
              CurrentStep = CurrentStep - 1;                                          
            }
            WebviewSteps.webview.html = GetHTMLContent(GetCurrentDescription(CurrentStep), GetCurrentDescription(CurrentStep + 1));
          });
      } else if (IsNextMessageCommand) {
        ExecuteCurrentStep();
      }
      else if (IsPickScriptStepToExecuteMessageCommand) {
        //PickScriptStepToExecute();
        //CurrentStep = CurrentStep - 1;
        //WebviewSteps.dispose();
        CurrentStep = await PickStepNumber()-1;
      }
      WebviewSteps.webview.html = GetHTMLContent(GetCurrentDescription(CurrentStep), GetCurrentDescription(CurrentStep + 1));        
    },
    undefined,
    context.subscriptions
  );
  ExecuteCurrentStep();
  WebviewSteps.webview.html = GetHTMLContent(GetCurrentDescription(CurrentStep), GetCurrentDescription(CurrentStep + 1));
}

function GetHTMLContent(currScripStepdescription = '', nextScripStepdescription = '') {
  let FinalTable = '';
  FinalTable = `
    <html>   	    
	<head>
    <style>
    .button {
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }    
    .button1 {background-color: #4CAF50;}
    .button2 {background-color: #D2691E;}
    .button3 {background-color: #FFD700;}
    </style>
    </head>   	    
	<body><br>Executed: ` +
    currScripStepdescription +
    `</br><br>Next: ` +
    nextScripStepdescription +
    `</br><button class="button button1" onclick="Next()">Next Step</button>	
  <button class="button button2" onclick="Skip()">Skip Next</button>
  <button class="button button3" onclick="PickScriptStepToExecute()">Pick Next Step</button>
    <Script>
    function Next() {
        const vscode = acquireVsCodeApi();
      vscode.postMessage({
        command: "Next",
        text: "Nothing"
      });
      }
      function Skip() {
        const vscode = acquireVsCodeApi();
      vscode.postMessage({
        command: "Skip",
        text: "Nothing"
      });
      }
      function PickScriptStepToExecute() {
        const vscode = acquireVsCodeApi();
      vscode.postMessage({
        command: "PickScriptStepToExecute",
        text: "Nothing"
      });
      }
      </Script>    
	
  </body>
  </html>   	
	`
  return FinalTable;
}
function GetCurrentDescription(index = 0) {
  if (index == -1) {
    return 'Begin with Next Button';
  }
  var vsCodeSteps = scriptsSteps.vsCodeSteps;
  const vsCodeStep = vsCodeSteps[index];
  if (vsCodeStep) { return vsCodeStep[0].Description; }
  return 'Finish';
}
function ExecuteCurrentStep() {
  if (CurrentStep < 0) {
    return;
  }
  const ExecuteScript = require('./ExecuteScript.js');
  ExecuteScript.SetScriptsSteps(scriptsSteps);
  ExecuteScript.executeScriptStep(CurrentStep);
}
function PickScriptStepToExecute()
{
  const ExecuteScript = require('./ExecuteScript.js');
  ExecuteScript.SetScriptsSteps(scriptsSteps);
  ExecuteScript.PickAndExecuteScriptStep();
}
async function PickStepNumber()
{
  const ExecuteScript = require('./ExecuteScript.js');
  ExecuteScript.SetScriptsSteps(scriptsSteps);  
  return await ExecuteScript.PickStepNumber();
}
function ConfirmationModalMessage(message) {
  return new Promise((resolve, reject) => {
    vscode.window.showInformationMessage(message, { modal: true }, 'Yes', 'No').then(resolve);
  });
}
async function fillJSONFromFavorites() {
  const ExecuteScript = require('./ExecuteScript.js');  
	const JSONFileURIs = GetFullPathFileJSONS();
	if (JSONFileURIs) {
		if (JSONFileURIs.length == 1)
		{
			scriptsSteps = await ExecuteScript.getJSONFromDocName(JSONFileURIs[0]);
			return scriptsSteps;
		}
		await vscode.window.showQuickPick(JSONFileURIs).then(async (value) => {
			if (value) {
				scriptsSteps = await ExecuteScript.getJSONFromDocName(value);
			}
		});
	}
}
function GetFullPathFileJSONS() {
	var FullPathFileJSONS = [];
	const ExtConf = vscode.workspace.getConfiguration('');
	if (ExtConf) {
		FullPathFileJSONS = ExtConf.get('JAMVScodestepsscripts.FavoritesScripts');
	}
	return (FullPathFileJSONS);
}