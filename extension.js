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

  let i = 1;
  let disposable = vscode.commands.registerCommand('extension.addComment', function (fn) {
    // The code you place here will be executed every time your command is executed

    console.log(`第${i}次调用`);
    i++;
    // Display a message box to the user
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      // const selection = editor.selection;


      // // 获取
      // // const position = editor.selection.active;
      // const selection = editor.selection;
      // // const selectedText = editor.document.getText(selection);

      // const commentedText = addComment();

      // editor.edit((editBuilder) => {
      //   editBuilder.replace(selection, commentedText);
      // }).then(() => {
      //   // 获取替换后的文本位置
      //   const startPosition = selection.start;
      //   const endPosition = startPosition.translate(0, commentedText.length);

      //   // 创建一个新的编辑器选择，选中替换后的文本
      //   const newSelection = new vscode.Selection(startPosition, endPosition);

      //   // 设置新的选择
      //   editor.selection = newSelection;
      //   editor.revealRange(newSelection);
      // });
      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);

      // 替换选中文本为新文本
      const newText = `This is the new text\nqweqweqe\n${i}`;

      editor.edit(editBuilder => {
        editBuilder.replace(selection, newText);
        const newSelection = new vscode.Selection(selection.start, selection.end.with(selection.end.line, selection.end.character + newText.length));

        // 将新的选择设置为编辑器的当前选择
        editor.selection = newSelection;
      })
    }
    // vscode.window.showInformationMessage('Hello World from vsc_funny_annotation!');
  });

  context.subscriptions.push(disposable);
}


// 查询找制定文件中的注释
function readBetweenEmptyLines(filePath, startEmptyLine, endEmptyLine) {
  const lines = [];
  let emptyLineCount = 0;
  let isInsideRange = false;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileLines = fileContent.split('\n');

  for (let i = 0; i < fileLines.length; i++) {
    const line = fileLines[i];
    if (line.trim() == '') {
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

  return lines.join('');
}

function addComment() {
  // 在这里添加你的注释逻辑
  // 这是一个简单的示例，将代码用注释符号括起来
  let randNum = parseInt(Math.random() * 3) + 1;
  const fileContent = readBetweenEmptyLines('C:\\Users\\15326\\Desktop\\vsc-funny-annotation\\test.txt', randNum, randNum + 1);
  return fileContent + "\n";
}



// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  addComment,
  deactivate
}
