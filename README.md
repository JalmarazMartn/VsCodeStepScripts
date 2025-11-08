# vscodestepsscripts README

This extension executes scripts with several steps, that performs these three kind of actions:

- VsCode tasks.
- Open a file to edit or View.
- Execute an installed extension command.
- Open an external element: a website or a folder.
- Execute a direct shell command in the terminal P.E. copy 'MyFile.txt'.

You must give the script of step in a json format. You can compose it following intructions bellow.

Another feature of the extension is to open a custom script when you open a workspace, if you set the script path in configuration parameter "JAMVScodestepsscripts.scriptWhenOpenWS".

## Create json Step file

In a new and empty json file type snippet "TJAMInitStepFile" and it will bring the format of the scrip file.

The begining is a Description for the script and the start to create steps.
{
    "Description": "Script to guide new version steps",
    "vsCodeSteps": [

## Create a new step

In the file you can create a new step typing snippet TJAMScriptStep. This create the struture of an step, this way:

    [   {           "Description": "Description of the step"},
        {           "scriptExecType": "task / extensionCommand/ openDocument/ openExternal/ executeCommandShell"        },
        {           "scriptArgument": "Argument (depends on scriptExecType)"        }]

## Argument in step

scriptArgument have diferent definitions depending "scriptExecType" options:

- task->"label" of the task in tsk.json file in ".vscode" folder. If you want to know more about this subject chek this link https://code.visualstudio.com/docs/editor/tasks.

- extensionCommand->name of an extension command for example "git.commit", "git.push", "al.package". In a future I want to make an extension explorer to show their commands and its api for vscode devs.  

- openDocument->document path to open it and change something before next step.

- openExternal->url to open in browser or folder address to open it in file explorer.

- executeCommandShell->command to execute in the terminal. You must write e dos command shell here. Example: "Del MyFile.txt"

## Snippet to help arguments selection

![alt text](https://github.com/JalmarazMartn/VsCodeStepScripts/blob/master/images/selectCommand.gif?raw=true)


If you are in a new step, in Argument setup you can use completion item "Get argument depending on action" to set the argument of the step.

The behavior of this snippet is conditioned by the "scriptExecType" of the step:

- task. It will show the task names in task.json file in ".vscode" folder, to select one.

- extensionCommand. It will show all intalled extension commands, to select one.

- openDocument. It will display a file dialog, and writes selected path in argument value.

- openExternal. Same above but with a folder.

- executeCommandShell. There is no any help for this exec type.

In adition, to select ExecType can be used completion item "Get ExecType". This will show distint exec type options to select one.
## Features

You can create JSON file with steps configuration and when complete the file, execute command "JAM: Execute current VsCode Script".
Then you will see a tab with the action step excuted, and a button to execute next step until the end all the steps of the .json file:

![alt text](https://github.com/JalmarazMartn/VsCodeStepScripts/blob/master/images/tscriptstepExecution.gif?raw=true)

Snippets TJAMInitStepFile and TJAMScriptStep will help you to build the json scripting file.

### Files precedence

It is very important to clear what is the execution precedence when we raise the "JAM: Execute current VsCode Script" command. Depending the editor situation and extension configuration, the executed script file taken for the command will be:

* Priority one. Open document in current editor.
* If there is no json open document in the editor, the executed script will be the one configured in configuration parameter "JAMVScodestepsscripts.FavoritesScripts". If there are more than one favorites a quick pick will make you able to choose one.
* If there is not any open document in the editor and we haven't configured favorites in setup, a dialog will be shown to pick a json script to execute.

### JSON in tree view

with command "JAM: show current JSON in treeview" you can see the current json file in editor in a tree view. The tree view panel is shown in extension panel, at the bottom. With the title "EXPLORE JSON OBJECT". Not visible by default. The final (future) goal is to show installed extensions information, this way you can see the commands and their api.

### Show all commands from all installed extensions

With the command "JAM: Get installed extensions command info and save to JSON file" you can save in a json file all the commands from all installed extensions, trough a file dialog.

### Command "JAM: Open a file dialog and write selection in document"

This command will open a file dialog and write the selected file in document position.

### Command "JAM: Open a folder dialog and write selection in document"

This command will open a folder dialog and write the selected folder in document position.

### Snippet "tpowwerShellExcution"

This snippet helps us to write a powershell statement from command shell terminal execution. In other words, a powershell file execution from ms-dos command shell. The steps are:

    1. Works inside a json file, a task.json or our own script step file.
    2. Write tpowwerShellExcution in the file.
    3. Write command statement to ejecute it and open a dialog to select the PS1 file.

## Requirements

VsCode.

## Extension Settings

This extension contributes the following settings:

* `JAMVScodestepsscripts.FavoritesScripts`: You can set here json script file paths to have a sort of shortcut to these scripts. For further explanations read "Files precedence".

* `JAMVScodestepsscripts.confirmOnSkip`: Ask confirm before skip an step

* `JAMVScodestepsscripts.scriptWhenOpenWS`: Set a script file to be executed when a workspace is opened.

## Known Issues

## Release Notes

