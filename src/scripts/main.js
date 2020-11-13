/**
 * Use this file for main application handling and initializing of modules
 */

// imports
import SingletonExample from './modules/singleton-example.js';
import RegularExample from './modules/regular-example.js';
import { MultipleExportClass, MultipleExportConst as xy, getSingletonId } from './modules/multiple-export-example.js';

// use singleton
const singletonA = SingletonExample;
const singletonB = SingletonExample;
console.log(`should be true: ${singletonA.getId() === singletonB.getId()}`); // should be true
console.log(`should also be true: ${singletonA.getId() === getSingletonId()}`); // should be true (also with singleton used in multiple-export-example)

// use regular
const regularA = new RegularExample();
const regularB = new RegularExample();
console.log(`should be false: ${regularA.getId() === regularB.getId()}`); // should be false

// use multiple exports
const multipleExportClass = new MultipleExportClass();
console.log(multipleExportClass.getId());
console.log(xy);
