const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('okra-name', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('no file is open');
            return;
        }

        const document = editor.document;
        const filePath = document.uri.fsPath;
        const dir = path.dirname(filePath);
        const fileName = path.basename(filePath);

        if (fileName.startsWith('114550087_')) {
            vscode.window.showInformationMessage('already renamed');
            return;
        }

        const newFileName = '114550087_' + fileName;
        const newFilePath = path.join(dir, newFileName);

        try {
            fs.renameSync(filePath, newFilePath);
            vscode.window.showInformationMessage('added prefix 114550087_ to file name');
            const newUri = vscode.Uri.file(newFilePath);
            await vscode.window.showTextDocument(newUri);
        } catch (err) {
            vscode.window.showErrorMessage('failed to rename file');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };