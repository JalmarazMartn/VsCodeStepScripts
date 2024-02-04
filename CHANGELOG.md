# Change Log

All notable changes to the "vscodestepsscripts" extension will be documented in this file.

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

### 0.0.21

Remove "Pick and Exec" button and replace it by new "Pcik Next Step" button. This button place in next step a pick from all steps from steps scripts.

### 0.0.22

Remove TSelArguments snippet. Instead Type "Get argument depending on action" to get the same helps.
Create new completion item "Get ExecType".

### 0.0.23

Hide commands outside documents to clean command palette.

### 0.0.25

New configuration set JAMVScodestepsscripts.confirmOnSkip. Open relative paths.

### 0.0.26

New setting JAMVScodestepsscripts.confirmOnSkip did not work. Fixed.

### 0.0.27

Improvements in completion item for script step exec type