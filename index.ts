import readline from "node:readline";
import fs from "fs";

const filePath = "tasks.json";
const currentDate: Date = new Date();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
type Task = {
  id: number;
  description: string;
  status: "Progress" | "Done";
  createdAt: Date;
  updatedAt: Date;
};

function add(arg: string[]): number {
  let len = 1;
  if (fs.existsSync(filePath)) {
    const temp = fs.readFileSync(filePath, "utf-8");
    const task = JSON.parse(temp) as Task[];
    task.push({
      id: task.length + 1,
      description: arg.join(" "),
      status: "Progress",
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    const tasks = JSON.stringify(task, null, 2);
    fs.writeFileSync(filePath, tasks);
    len = task.length;
  } else {
    const task: Task = {
      id: 1,
      description: arg.join(" "),
      status: "Progress",
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    const tasks = JSON.stringify([task], null, 2);
    fs.writeFileSync(filePath, tasks);
  }
  return len;
}
function cmdline() {
  rl.question("task-cli ", (cmds) => {
    const [cmd, ...arg] = cmds.split(" ");
    switch (cmd) {
      case "add":
        let id = add(arg);
        console.log(`Task added successfully (ID: ${id})`);
        cmdline();
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
        rl.close();
        break;
      case "close":
        rl.close();

        break;

      default:
        console.error(`${cmd} not found`);
        cmdline();
        break;
    }
    
  });
}
cmdline();
