<?php

namespace terraverde;

use Craft;
use craft\web\twig\variables\Cp;
use craft\Events\RegisterCpNavItemsEvent;
use Yii\base\Module;
use Yii\base\Event;

class CQControlPanel extends Module

{
  public function init()

  {
    Craft::setAlias( '@cqcontrolpanel', __Dir__);
    parent::init();
    Event::on(
      Cp::class,
      Cp::EVENT_REGISTER_CP_NAV_ITEMS,
      function (RegisterCpNavItemsEvent $event) {
        $event->navItems[] = [
          'url' => 'entries/aboutUsStructure',
          'label' => 'Ueber uns',
          'icon' => '@cqcontrolpanel/web/img'
        ];
      }
    );
  }

}
