/*
 * @name: 
 * @msg: 
 * @param: 
 * @return: 
 */
/*
 * @name: 
 * @msg: 
 * @param: 
 * @return: 
 */
/*
 * @name: 
 * @msg: 
 * @param: 
 * @return: 
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const readline = require('readline');


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
            // const selection = editor.selection;

            const position = editor.selection.active;

            const commentedText = addComment();

            editor.edit((editBuilder) => {
                editBuilder.insert(position, commentedText);
            });
        }
		// vscode.window.showInformationMessage('Hello World from vsc_funny_annotation!');
	});

	context.subscriptions.push(disposable);
}

// function readFile(filename) {
//   try {
//     const data = fs.readFileSync(filename, 'utf8');
//     return data;
//   } catch (err) {
//     console.error('读取文件时发生错误:', err);
//     return null;
//   }
// }

function readBetweenEmptyLines(filePath, startEmptyLine, endEmptyLine) {
  const lines = [];
  let emptyLineCount = 0;
  let isInsideRange = false;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileLines = fileContent.split('\n');

  for (let i = 0; i < fileLines.length; i++) {
    const line = fileLines[i];
    if (line.trim() === '') {
      emptyLineCount++;
      if (emptyLineCount === startEmptyLine) {
        isInsideRange = true;
      } else if (emptyLineCount === endEmptyLine + 1) {
        isInsideRange = false;
        break;
      }
    }

    if (isInsideRange) {
      lines.push(line);
    }
  }

  return lines.join('');
}

function addComment() {
    // 在这里添加你的注释逻辑
    // 这是一个简单的示例，将代码用注释符号括起来

    const fileContent = readBetweenEmptyLines('D:\\Desktop\\vsc_funny_annotation\\test.txt',1,2);
    console.log(fileContent)
    return fileContent+"\n";
}



// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	addComment,
	deactivate
}
