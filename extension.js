// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const { start } = require("repl");

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

  let disposable = vscode.commands.registerCommand(
    "extension.addComment",
    function () {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;

        // 替换选中文本为新文本
        const commentedText = addComment();

        editor
          .edit((editBuilder) => {
            editBuilder.replace(selection, commentedText);
          })
          .then(() => {
            const startPosition = selection.start;
            const endPosition = editor.selection.active;
            const newSelection = new vscode.Selection(startPosition, endPosition);

            // 设置新的选择
            editor.selection = newSelection;
            editor.revealRange(newSelection);
          });
      }
    }
  );

  context.subscriptions.push(disposable);
}

// 查询找制定文件中的注释
function readBetweenEmptyLines(filePath, startEmptyLine, endEmptyLine) {
  const lines = [];
  let emptyLineCount = 0;
  let isInsideRange = false;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const fileLines = fileContent.split("\n");

  for (let i = 0; i < fileLines.length; i++) {
    const line = fileLines[i];
    if (line.trim() == "") {
      emptyLineCount++;
      if (emptyLineCount === startEmptyLine) {
        isInsideRange = true;
      } else if (emptyLineCount === endEmptyLine) {
        isInsideRange = false;
        break;
      }
    }

    if (isInsideRange) {
      lines.push(line);
    }
  }

  return lines.join("");
}

function addComment() {
  // 在这里添加你的注释逻辑
  // 这是一个简单的示例，将代码用注释符号括起来
  let randNum = parseInt(Math.random() * 3) + 1;
  const fileContent = readBetweenEmptyLines(
    'D:\\Desktop\\vsc_funny_annotation\\test.txt',
    randNum,
    randNum + 1
  );
  return fileContent + "\n";
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  addComment,
  deactivate,
};
