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


    'errorTemplatePrefix' => "404.twig",

    'autoLoginAfterAccountActivation' => true,
    'setPasswordSuccessPath' => '/customer/account/login',
    'activateAccountSuccessPath' => '/customer/account/activation-success/',

    'postLogoutRedirect' => '/customer/account/logout/',
    'postLoginRedirect' => '/',

    'generateTransformsBeforePageLoad' => true,
    // Set to 0 if you want users to stay logged in as long as their browser is open
    // 'userSessionDuration' => 0,
//    'rememberedUserSessionDuration' => 'P4W',


    // setPasswordPath

    // 'loginPath' => '/',

    // The secure key Craft will use for hashing and encrypting data
    'securityKey' => App::env('SECURITY_KEY'),

    'aliases' => array(
      '@basePath' => getenv('BASE_PATH'),
      '@baseUrl' => getenv('BASE_URL'),
      '@rootUrl' => getenv('ROOT_URL'),
    ),

    // https://craftcms.com/knowledge-base/enabling-fuzzy-search
    'defaultSearchTermOptions' => array(
      'subLeft' => true,
      'subRight' => true,
    ),

    'limitAutoSlugsToAscii' => true,

    'isSystemLive' => (bool)getenv('IS_SYSTEM_LIVE'),
    'runQueueAutomatically' => (bool)getenv('RUN_QUEUE_AUTOMATICALLY'),
  ],

  // Dev LOCAL environment settings
  'local' => [
    // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
    'devMode' => true,

    // Prevent crawlers from indexing pages and following links
    'disallowRobots' => true,

    'enableTemplateCaching' => false,
    'allowUpdates' => true,
    'backupCommand' => getenv('BACKUP_COMMAND'),
    'restoreCommand' => getenv('RESTORE_COMMAND'),
    // 'isSystemLive' => true,
  ],

  // Staging (pre-production) environment
  'staging' => [
    // Set this to `false` to prevent administrative changes from being made on Staging
    'allowAdminChanges' => true,

    // Don’t allow updates on Staging
    'allowUpdates' => true,

    // Prevent crawlers from indexing pages and following links
    'disallowRobots' => true,

    'enableTemplateCaching' => false,

  ],

  // Production LIVE environment settings
  'live' => [
    // Set this to `false` to prevent administrative changes from being made on Production
    'allowAdminChanges' => false,

    // Don’t allow updates on Production
    'allowUpdates' => false,

    'devMode' => false,

    'enableTemplateCaching' => true,

    'isSystemLive' => true,

  ],
];
