'use strict';


/**
 * @module Plan
 * @name Plan
 * @description A representation of written set of activities and procedures
 * that outlines(or guides) what stakeholders and others should do in
 * emergency(or disaster) event.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @licence MIT
 * @since  0.1.0
 * @version 0.2.0
 * @example
 *
 * const { app } = require('@lykmapipo/plan');
 * app.start();
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];


/* extract information from package.json */
const info = _.merge({}, _.pick(pkg, fields));


/* export package(module) info */
exports.info = info;


/* import models */
const Plan = require(path.join(__dirname, 'lib', 'plan.model'));
const Activity = require(path.join(__dirname, 'lib', 'activity.model'));
const Procedure = require(path.join(__dirname, 'lib', 'procedure.model'));


/* export models */
exports.Plan = Plan;
exports.Activity = Activity;
exports.Procedure = Procedure;


/* import routers */
const planRouter =
  require(path.join(__dirname, 'lib', 'plan.http.router'));
const activityRouter =
  require(path.join(__dirname, 'lib', 'activity.http.router'));


/* export plan router */
exports.planRouter = planRouter;
exports.activityRouter = activityRouter;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    app.mount(planRouter);
    app.mount(activityRouter);
    return app;
  }
});
