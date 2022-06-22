const vscode = require('vscode');
module.exports = {
    replacestring: function () {
        //get current vscode document
        let document = vscode.window.activeTextEditor.document;

        return (replaceString(document,'Item','Nothing'));
    }
};
//function to replace a regexp to another regexp in a vscode text document
function replaceString(document, regexp, replace) {
    let text = document.getText();
    let newText = text.replace(regexp, replace);
    //update the document
    document.edit(editBuilder => {
        editBuilder.replace(new vscode.Range(document.positionAt(0), document.positionAt(text.length)), newText);
    }).then(() => {
        //replace the text
        document.save();
    }).catch(err => {
        console.log(err);
    });
}