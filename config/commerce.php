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

    'activeCartDuration' => 172800, // 48 hours

    'allowCheckoutWithoutPayment' => true,

    'pdfAllowRemoteImages' => true,

    'autoSetCartShippingMethodOption' => false,

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

    'activeCartDuration' => 172800, // 48 hours

  ],
];
