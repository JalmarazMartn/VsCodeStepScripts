const vscode = require('vscode');
let CurrentStep = -1;
var scriptsSteps = {};
module.exports = {
	ShowStepHTMLView: function(context) {ShowStepHTMLView(context)}	
}

function EscapeRegExp(string) {
	return string.replace(/[.*+\-?^${}()|[\]\\\/]/g,'\\$&'); // $& significa toda la cadena coincidente
  }
 async function ShowStepHTMLView(context)
{
    const ExecuteScript = require('./ExecuteScript.js');
    CurrentStep = -1;
    scriptsSteps = await ExecuteScript.getJSONFromCurrentDoc();
    const WebviewSteps = vscode.window.createWebviewPanel(    
		'Exec Visual Studio Script Steps',
		scriptsSteps.Description,
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
        if (CurrentStep >= scriptsSteps.vsCodeSteps.length)
        {
          WebviewSteps.dispose();
          return;
        }
        ExecuteCurrentStep();
        WebviewSteps.webview.html = GetHTMLContent(GetCurrentDescription(CurrentStep),GetCurrentDescription(CurrentStep+1));
			  return;
			}
        },
        undefined,
        context.subscriptions      
	);
ExecuteCurrentStep();
WebviewSteps.webview.html = GetHTMLContent(GetCurrentDescription(CurrentStep),GetCurrentDescription(CurrentStep+1));
}

function GetHTMLContent(currScripStepdescription='',nextScripStepdescription='')
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
	<body><br>Executed: ` +
  currScripStepdescription +
  `</br><br>Next: ` +
  nextScripStepdescription +  
	`</br><button class="button button1" onclick="Next()">Next Step</button>	
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
function GetCurrentDescription(index=0)
{
  if (index == -1)
  {
    return 'Begin with Next Button';
  }
  var vsCodeSteps = scriptsSteps.vsCodeSteps;
	const vsCodeStep = vsCodeSteps[index];
  if (vsCodeStep)
  {return vsCodeStep[0].Description;}
  return 'Finish';
}
function ExecuteCurrentStep()
{  
  if (CurrentStep < 0)
  {
    return;
  }
  const ExecuteScript = require('./ExecuteScript.js');
  ExecuteScript.SetScriptsSteps(scriptsSteps);
  ExecuteScript.executeScriptStep(CurrentStep);
}