"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const run_1 = require("./run");
commander_1.program
    .option('--single')
    .option('--all')
    .option('--help')
    .option('-excludeStatus <status>', 'Exclude status code')
    .option('--withExternal', 'Check external links', false);
commander_1.program.parse();
const options = commander_1.program.opts();
if (options.help) {
    const help = fs_1.default.readFileSync(path_1.default.join(__dirname, 'help.txt'), 'utf-8');
    console.log(help);
    process.exit(0);
}
if (!options.single && !options.all) {
    console.log('Please provide an option --single or --all');
    process.exit(1);
}
const url = commander_1.program.args[0];
if (!url) {
    console.log(chalk_1.default.red('Please provide an URL'));
    process.exit(1);
}
(0, run_1.run)(options, url).catch((e) => {
    console.error(e.message);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUV4QixrREFBMEI7QUFDMUIsK0JBQTRCO0FBRTVCLG1CQUFPO0tBQ0osTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUNoQixNQUFNLENBQUMseUJBQXlCLEVBQUUscUJBQXFCLENBQUM7S0FDeEQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFBO0FBRTFELG1CQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFaEIsTUFBTSxPQUFPLEdBQW1CLG1CQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFL0MsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZixNQUFNLElBQUksR0FBRyxZQUFFLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNuQixDQUFDO0FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO0lBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDbkIsQ0FBQztBQUVELE1BQU0sR0FBRyxHQUFHLG1CQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzNCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUE7SUFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNuQixDQUFDO0FBRUQsSUFBQSxTQUFHLEVBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDbkIsQ0FBQyxDQUFDLENBQUEifQ==