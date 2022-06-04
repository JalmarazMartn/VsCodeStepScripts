# vscodestepsscripts README

This extension executes scripts with several steps, that performs these three kind of actions:

- VsCode tasks.
- Open a file to edit or View.
- Execute an installed extension command.
- Open an external element: a website or a folder.
- Execute a direct shell command in the terminal P.E. copy 'MyFile.txt'.

You must give the script of step in a json format. You can compose it following intructions bellow.

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

If you are in a new step, in Argument setup you can use snippet "TSelArguments" to set the argument of the step.

The behavior of this snippet is conditioned by the "scriptExecType" of the step:

- task. It will show the task names in task.json file in ".vscode" folder, to select one.

- extensionCommand. It will show all intalled extension commands, to select one.

- openDocument. It will display a file dialog, and writes selected path in argument value.

- openExternal. Same above but with a folder.

- executeCommandShell. There is no any help for this exec type.

## Features

You can create JSON file with steps configuration and when complete the file, execute command "JAM: Execute current VsCode Script".
Then you will see a tab with the action step excuted, and a button to execute next step until the end all the steps of the .json file:

![alt text](https://github.com/JalmarazMartn/VsCodeStepScripts/blob/master/images/NextStep.png?raw=true)

Snippets TJAMInitStepFile and TJAMScriptStep will help you to build the json scripting file.

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

## Known Issues

## Release Notes

### 0.0.1

Beta Release. Good luck!!!

### 0.0.2

Improved, with error control. Do not begin execution on web opening. 
New icon from https://commons.wikimedia.org/wiki/File:DonAdams.jpg

### 0.0.3

Fixing issues

### 0.0.4

Fixing issues

### 0.0.5

Skip Next button.

### 0.0.6

Confirm message for Skip Next button. If not does not skip step.

### 0.0.7

Create new step execution option openExternal. Beta release of JSON explorer with tree view.

### 0.0.9

Complete json explorer.

### 0.0.10

Show error message if exec step command is unknown.

### 0.0.11

- Show all commands from installed extensions, and save them in a json file.
- Fix an error in this featre: Show error message if exec step command is unknown.

### 0.0.12

TSelArguments snippet to help arguments setting in each step.

### 0.0.13

command "JAM: Open a file dialog and write selection in document" and command "JAM: Open a folder dialog and write selection in document".

### 0.0.14

New exec type: executeCommandShell. With this type you can execute a command in the terminal. The argument is the command to execute.

### 0.0.15

If there is no open editor with json step file, the extension will open it with a file dialog.

### 0.0.16

if in Opendocument step is not detailed the doc path, the extension will try to open it with the workspace root. So, you can only type "app.json" if the file is in the root of the workspace, avoiding to type all the path. This way you can re-use the steps json file in many workspaces.

### 0.0.17

New snippet "tpowwerShellExcution" to write a command shell state to execute a ps1 file.

### 0.0.18

New button in HTML view "Pick and Exec".

#### 0.0.19

Is posible I miss what I did in this realease. Sorry to few, few people that uses this crazy extension.

### 0.0.20

Fix script step snippet error, did not display options in execution type.