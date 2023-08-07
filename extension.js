// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('VScode插件"vsc-funny-annotation"已被激活!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.addComment', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            const commentedText = addComment(selectedText);

            editor.edit((editBuilder) => {
                editBuilder.replace(selection, commentedText);
            });
        }
		vscode.window.showInformationMessage('Hello World from vsc_funny_annotation!');
	});

	context.subscriptions.push(disposable);
}

function addComment(text) {
    // 在这里添加你的注释逻辑
    // 这是一个简单的示例，将代码用注释符号括起来
    return `/* ${text} */`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	addComment,
	deactivate
}
