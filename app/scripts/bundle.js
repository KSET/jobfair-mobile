#!/usr/bin/env node

const _ = require('lodash');
const fs = require('fs-extra');
const AppBundler = require('./classes/app-bundler');
// eslint-disable-next-line import/no-unresolved
const commandLineArgs = require('command-line-args');
const path = require('path');
const validateArgsWithConfig = require('./helpers/validate-args-with-config');

const cli = commandLineArgs([
  { name: 'platform', type: String },
  { name: 'outputDirectory', type: String },
]);

const cliArgs = cli.parse();
const configPath = path.resolve('config.json');
const config = fs.readJsonSync(configPath);
validateArgsWithConfig(cliArgs, config);

// merge command line arguments and config.json
const buildConfig = _.merge(config, cliArgs);
const bundler = new AppBundler(buildConfig);

bundler.createReactNativeBundle()
  .catch(() => process.exit(1));
