<?php
namespace henrik\userguide;
/**
 *
 *
 */

 class Plugin extends \craft\base\Plugin
 {
  public $hasCpSection = true;

  public $hasCpSettings = true;

  public function init()
  {
    $settings = $this->getSettings();
    $this->hasCpSection = $settings->userGuideEnabled;
  }

  protected function createSettingsModel()
  {
    return new \henrik\userguide\models\SettingsModel();
  }

  protected function settingsHtml()
  {
    return \Craft::$app->getView()->renderTemplate("user-guide/_settings", [
      "settings" => $this->getSettings()
    ]);
  }
 }
