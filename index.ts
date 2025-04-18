import readline from 'node:readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function cmdline() {   
    rl.question("task-cli ", cmds =>{
        const [cmd,...arg] = cmds.split(' ')
        switch (cmd) {
            case "add":
                
                break;
            case "update":
                
                break;
            case "delete":
                
                break;
            case "mark-in-progress":
                
                break;
            case "mark-done":
                
                break;
            case "list":
                
                break;
            case "exit":
                
                break;
            case "close":
                
                break;
        
            default:
                console.error(`${cmd} not found`)
                break;
            }
        cmdline();
    })
}
cmdline()
