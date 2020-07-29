#!/usr/bin/env node 
const program = require('commander')

/* 
* Define current version
* Define usage
* Define commands
*/
program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('add', 'add a new template')
  .command('delete', 'delete a template')
  .command('list', 'list all the templates')
  .command('init', 'generate a new project from a template')
  
// Resolve command line params
program.parse(process.argv)