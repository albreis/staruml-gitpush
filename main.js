const exec = require('child_process').exec;
function execute(command, callback) {
    exec(command, (error, stdout, stderr) => { 
        callback(stdout); 
    });
};
function init() {
  app.commands.register('gitpush:deploy', function(){
    app.commands.execute('html-export:export')
  })
  app.project.on('html-exported', filename => {
    console.log('teste', filename)
    if(!localStorage[filename]) {
      app.dialogs.showInputDialog("Digite a URL do repositório").then(function ({buttonId, returnValue}) {
        if (buttonId === 'ok') {
          localStorage[filename] = returnValue
          if(localStorage[filename]) {
            console.log(`cd ${filename} && cd .. && git init && git add origin ${localStorage[filename]}`)
            execute(`cd ${filename} && cd .. && git init && git add origin ${localStorage[filename]}`, (output) => {
                console.log(output);
            });
          }
        }
      })
    }
    if(localStorage[filename]) {
      console.log(`cd ${filename} && cd .. && git add . && git commit -m 'auto' && git push -u origin master`)
      execute(`cd ${filename} && cd .. && git add . && git commit -m 'auto' && git push -u origin master`, (output) => {
          console.log(output);
      });
    }
  })
}
exports.init = init