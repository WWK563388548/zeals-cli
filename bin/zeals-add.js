#!/usr/bin/env node 
// A library of interactive command line 
const inquirer = require('inquirer')
// Change the style of commadLine
const chalk = require('chalk')
const fs = require('fs')
// Read template.json from root
const tplObj = require(`${__dirname}/../template`)

// Adding interactive question and validation
let question = [
  {
    name: "name",
    type: 'input',
    message: "Please input the template name",
    validate (val) {
      if (val === '') {
        return 'Name is required!'
      } else if (tplObj[val]) {
        return 'Template has already existed!'
      } else {
        return true
      }
    }
  },
  {
    name: "url",
    type: 'input',
    message: "Please input the template address/url",
    validate (val) {
      if (val === '') return 'The url is required!'
      return true
    }
  }
]

inquirer
  .prompt(question).then(answers => {
    // answers is user's input(an object)
    let { name, url } = answers;
    // filter of unicode
    tplObj[name] = url.replace(/[\u0000-\u0019]/g, '')
    // Write template information into template.json
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err => {
      if (err) console.log(err)
      console.log('\n')
      console.log(chalk.green('Added successfully!\n'))
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(tplObj)
      console.log('\n')
    })
  })