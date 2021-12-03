# vscodestepsscripts README

This extension executes scripts with several steps, that performs these three kind of actions:

- VsCode tasks.
- Open a file to edit or View.
- Execute an installed extension command.
- Open an external element: a website or a folder.

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
        {           "scriptExecType": "task / extensionCommand/ openDocument"        },
        {           "scriptArgument": "Argument (depends on scriptExecType)"        }]

## Argument in step

scriptArgument have diferent definitions depending "scriptExecType" options:

- task->"label" of the task in tsk.json file in ".vscode" folder. If you want to know more about this subject chek this link https://code.visualstudio.com/docs/editor/tasks.

- extensionCommand->name of an extension command for example "git.commit", "git.push", "al.package". In a future I want to make an extension explorer to show their commands and its api for vscode devs.  

- openDocument->document path to open it and change something before next step.

- openExternal->url to open in browser or folder address to open it in file explorer.

## Features

You can create JSON file with steps configuration and when complete the file, execute command "JAM: Execute current VsCode Script".
Then you will see a tab with the action step excuted, and a button to execute next step until the end all the steps of the .json file:

![alt text](https://github.com/JalmarazMartn/VsCodeStepScripts/blob/master/images/NextStep.png?raw=true)

Snippets TJAMInitStepFile and TJAMScriptStep will help you to build the json scripting file.

### JSON in tree view

with command "JAM: show current JSON in treeview" you can see the current json file in editor in a tree view. The tree view panel is shown in extension panel, at the bottom. With the title "EXPLORE JSON OBJECT". Not visible by default. The final (future) goal is to show installed extensions information, this way you can see the commands and their api.

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