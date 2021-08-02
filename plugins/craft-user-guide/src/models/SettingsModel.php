<?php
namespace henrik\userguide\models;

use craft\base\Model;
/**
 * Class Name
 */

 class SettingsModel extends Model
 {
   public $userGuideEnabled = true;

   public $notificationEmail = '';

   public $markdownText = '';
 }

