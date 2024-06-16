import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import { ProgramOtpions } from './@types/cli.types';
import chalk from 'chalk';
import { run } from './run';

program
  .name('SEO-checker')
  .version('1.0.0')
  .option('--single')
  .option('--all')
  .option('--help')
  .option('--sitemap', 'Check sitemap only')
  .option('-excludeStatus <status>', 'Exclude status code')
  .option('--withExternal', 'Check external links', false)

program.parse();

const options: ProgramOtpions = program.opts();

if (options.help) {
    const help = fs.readFileSync(path.join(__dirname, 'help.txt'), 'utf-8')
    console.log(help)
    process.exit(0)
}

if (!options.single && !options.all && !options.sitemap) {
    console.log('Please provide an option --single, --all or --sitemap')
    process.exit(1)
}

const url = program.args[0]
if (!url) {
    console.log(chalk.red('Please provide an URL'))
    process.exit(1)
}

run(options, url).catch((e) => {
    console.error(e.message)
    process.exit(1)
})
