const vscode = require('vscode');
const { executeScriptSteps } = require('./ExecuteScript.js');
let CurrentStep = 0;
var scriptsSteps = {};
module.exports = {
	ShowStepHTMLView: function(context) {ShowStepHTMLView(context)}	
}

function EscapeRegExp(string) {
	return string.replace(/[.*+\-?^${}()|[\]\\\/]/g,'\\$&'); // $& significa toda la cadena coincidente
  }
  async function ExecNextStep(context,index)
  {
    const ExecuteScript = require('./ExecuteScript.js');
    let nextIndex = index + 1;
    await ExecuteScript.executeScriptStep(context,nextIndex);
  }
 async function ShowStepHTMLView(context)
{
    const ExecuteScript = require('./ExecuteScript.js');
    scriptsSteps = await ExecuteScript.getJSONFromCurrentDoc();
    const WebviewSteps = vscode.window.createWebviewPanel(    
		'Exec Visual Studio Script Step',
		'Exec Visual Studio Script Step',
		vscode.ViewColumn.One,
		{
		  enableScripts: true
		}
	  );
	  WebviewSteps.webview.onDidReceiveMessage(
		message => {
		  switch (message.command) {
			case 'Next':
				//ExecNextStep(context,index);
				//WebviewTranslations.dispose();
        //ShowStepHTMLView(context,scriptsSteps,index);
        CurrentStep = CurrentStep + 1;
        WebviewSteps.webview.html = GetHTMLContent('ahora es ' + GetCurrentDescription());
			  return;

			}
        },
        undefined,
        context.subscriptions      
	);
WebviewSteps.webview.html = GetHTMLContent(GetCurrentDescription());
}

function GetHTMLContent(currScripStepdescription='')
{
	let FinalTable = '';
	FinalTable = 	`
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
    </style>
    </head>   	    
	<body>` +
  currScripStepdescription +
	`<button class="button button1" onclick="Next()">Next Step</button>	
    <Script>
    function Next() {
        const vscode = acquireVsCodeApi();
      vscode.postMessage({
        command: "Next",
        text: "Nothing"
      });
      }
    </Script>    
	
  </body>
  </html>   	
	`
	return FinalTable;
}
function GetCurrentDescription()
{
  var vsCodeSteps = scriptsSteps.vsCodeSteps;
	const vsCodeStep = vsCodeSteps[CurrentStep];
  return vsCodeStep[0].Descripton;
}