# vscodestepsscripts README

This extension has a command to execute in steps these kinds of actions:

- VsCode tasks.
- Open a file to edit or View.
- Execute an installed extension command.

## Create json Step file

In a new and empty json file type snippet "TJAMInitStepFile" and it will bring the format of the scrip file.

The begining is a Description for the script and the start to create steps.
{
    "Description": "Script to guide new version steps",
    "vsCodeSteps": [

## Create a new step

In the file you can create a new step typing snippet TJAMScriptStep. This create the struture of an step, this way:

    [   {           "Description": "Description of the step"},
        {           "scriptExecType": "task / extensionCommand/ openDocument"        },
        {           "scriptArgument": "Argument (depends on scriptExecType)"        }]

## Argument in step

scriptArgument are diferent uses depending "scriptExecType" option:

- task->"label" of the task in tsk.json file in ".vscode" folder. If you want to know more about this subject chek this link https://code.visualstudio.com/docs/editor/tasks.

- extensionCommand->name of an extension command for example "git.commit", "git.push", "al.package". In a future I want to make an extension explorer to show his command and api for vscode devs.  

- openDocument->document path to open and change something before next step.

## Features

Create JSON file with steps configuration, in the file execute command "JAM: Execute current VsCode Script".
You will see a tab with the action step excuted, and a button to execute Nex step until the end all the steps of the file:

![alt text](https://github.com/JalmarazMartn/VsCodeStepScripts/blob/master/images/![alt text](https://github.com/JalmarazMartn/VsCodeStepScripts/blob/master/images/tGetKeys.gif?raw=true)
.png?raw=true)


Snippets TJAMInitStepFile and TJAMScriptStep will help you to build the json scripting json file.

## Requirements

VsCode.

## Extension Settings

## Known Issues

Right now this extension is a bunch of issues!! You have an absolute beta relase in front of you!!
No error control, no enough documentation, and important features planned. But I need this for my work, and need iy published to share it. So I launched this mess and I will improve it in a future.

## Release Notes

This is a very beta release, due to the needs to start using it. Documetation will be extended and features will be improved.
Future release: error control, extension explorer to discover method to execute (and an extra features to explore extensions API).

### 0.0.1

Initial release. Good luck!!!

### 0.0.2

Error control. Do not begin execution on web opening. 
New icon from https://commons.wikimedia.org/wiki/File:DonAdams.jpg
