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

      'activeCartDuration' => 86400,

      'allowCheckoutWithoutPayment' => true,

      'pdfAllowRemoteImages' => true,

      // orderReferenceFormat
    ],

    // Dev environment settings
    'dev' => [

    ],

    // Staging environment settings
    'staging' => [

    ],

    // Production environment settings
    'production' => [

    ],
];
