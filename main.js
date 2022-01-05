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
    if(!localStorage.repository) {
      app.dialogs.showInputDialog("Digite a URL do repositório").then(function ({buttonId, returnValue}) {
        if (buttonId === 'ok') {
          localStorage.repository = returnValue
          if(localStorage.repository) {
            console.log(`cd ${filename} && git init && git add origin ${localStorage.repository}`)
            execute(`cd ${filename} && git init && git add origin ${localStorage.repository}`, (output) => {
                console.log(output);
            });
          }
        }
      })
    }
    if(localStorage.repository) {
      console.log(`cd ${filename} && git add . && git commit -m 'auto' && git push -u origin master`)
      execute(`cd ${filename} && git add . && git commit -m 'auto' && git push -u origin master`, (output) => {
          console.log(output);
      });
    }
  })
}
exports.init = init