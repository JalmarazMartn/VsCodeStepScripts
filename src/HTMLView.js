const vscode = require('vscode');
module.exports = {
	ShowStepHTMLView: function(context,scriptsSteps,index) {ShowStepHTMLView(context,scriptsSteps,index)}	
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
 function ShowStepHTMLView(context,scriptsSteps,index)
{
  var vsCodeSteps = scriptsSteps.vsCodeSteps;
	const currScripStep = vsCodeSteps[index];	

    const WebviewTranslations = vscode.window.createWebviewPanel(
    
		'Exec Visual Studio Script Step',
		currScripStep[0].Description,
		vscode.ViewColumn.One,
		{
		  enableScripts: true
		}
	  );
	  WebviewTranslations.webview.onDidReceiveMessage(
		message => {
		  switch (message.command) {
			case 'Next':
				ExecNextStep(context,index);
				WebviewTranslations.dispose();
        ShowStepHTMLView(context,scriptsSteps,index);
			  return;

			}
        },
        undefined,
        context.subscriptions      
	);
WebviewTranslations.webview.html = GetHTMLContent(currScripStep[0].Description);
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