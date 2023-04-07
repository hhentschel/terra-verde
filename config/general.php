<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

return [
  // Global settings
  '*' => [
    'devMode' => (getenv('DEV_MODE') === "true") ? true : false,
    // Default Week Start Day (0 = Sunday, 1 = Monday...)
    'defaultWeekStartDay' => 1,

    // Whether generated URLs should omit "index.php"
    'omitScriptNameInUrls' => true,

    // Control panel trigger word
    'cpTrigger' => 'aceto',

    'useEmailAsUsername' => true,


    // Error template path
    'errorTemplatePrefix' => '_',

    'autoLoginAfterAccountActivation' => true,
    'setPasswordSuccessPath' => '/customer/account/login',
    'activateAccountSuccessPath' => '/customer/account/activation-success/',

    'postLogoutRedirect' => '/customer/account/logout/',
    'postLoginRedirect' => '/',

    'generateTransformsBeforePageLoad' => true,
    'userSessionDuration' => '0',


    // setPasswordPath

    // 'loginPath' => '/',

    // The secure key Craft will use for hashing and encrypting data
    'securityKey' => App::env('SECURITY_KEY'),

    'aliases' => array(
      '@basePath' => getenv('BASE_PATH'),
      '@baseUrl' => getenv('BASE_URL'),
      '@rootUrl' => getenv('ROOT_URL'),
      '@web' => getenv('WEB_URL'),
    ),

    // https://craftcms.com/knowledge-base/enabling-fuzzy-search
    'defaultSearchTermOptions' => array(
      'subLeft' => true,
      'subRight' => true,
    ),

    'limitAutoSlugsToAscii' => true,


    'runQueueAutomatically' => (bool)getenv('RUN_QUEUE_AUTOMATICALLY'),
  ],

  // Dev LOCAL environment settings
  'development' => [
    // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
    'devMode' => (getenv('DEV_MODE') === "true") ? true : false,

    // Prevent crawlers from indexing pages and following links
    'disallowRobots' => true,

    'enableTemplateCaching' => false,
    'allowUpdates' => true,
    'backupCommand' => getenv('BACKUP_COMMAND'),
    'restoreCommand' => getenv('RESTORE_COMMAND'),

  ],

  // Staging (pre-production) environment
  'staging' => [

    'devMode' => (getenv('DEV_MODE') === "true") ? true : false,

    // Set this to `false` to prevent administrative changes from being made on Staging
    'allowAdminChanges' => true,

    // Don’t allow updates on Staging
    'allowUpdates' => true,

    // Prevent crawlers from indexing pages and following links
    'disallowRobots' => true,

    'enableTemplateCaching' => false,

  ],

  // Production LIVE environment settings
  'production' => [

    'devMode' => (getenv('DEV_MODE') === "true") ? true : false,
    
    // Set this to `false` to prevent administrative changes from being made on Production
    'allowAdminChanges' => false,

    // Don’t allow updates on Production
    'allowUpdates' => false,

    'devMode' => (getenv('DEV_MODE') === "true") ? true : false,

    'enableTemplateCaching' => false,

  ],
];
