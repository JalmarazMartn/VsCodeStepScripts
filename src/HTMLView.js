const vscode = require('vscode');
module.exports = {

	GetTranslationsHtml: function() {return GetHTMLContent()},
	ShowStepHTMLView: function(context) {ShowStepHTMLView(context)}	
}

function EscapeRegExp(string) {
	return string.replace(/[.*+\-?^${}()|[\]\\\/]/g,'\\$&'); // $& significa toda la cadena coincidente
  }
  function ExecNextStep()
  {
  }
  function ShowStepHTMLView(context)
{
    const WebviewTranslations = vscode.window.createWebviewPanel(
		'Exec Visual Studio Script Step',
		'An explanation',
		vscode.ViewColumn.One,
		{
		  enableScripts: true
		}
	  );
	  WebviewTranslations.webview.onDidReceiveMessage(
		message => {
		  switch (message.command) {
			case 'Next':
				ExecNextStep();
				WebviewTranslations.dispose();
			  return;

			}
        },
        undefined,
        context.subscriptions      
	);
WebviewTranslations.webview.html = GetHTMLContent();	
}
function GetHTMLContent()
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
	<body>
	<button class="button button1" onclick="Next()">Next Step</button>	
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