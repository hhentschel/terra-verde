<?php

namespace terraverde;

use Craft;
use craft\web\twig\variables\Cp;
use craft\Events\RegisterCpNavItemsEvent;
use Yii\base\Module;
use craft\commerce\services\OrderAdjustments;
use Yii\base\Event;
use MyAdjuster;

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

    Event::on(OrderAdjustments::class, OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS, function(RegisterComponentTypesEvent $event) {

      $event->types[] = OrderAdjuster::class;

    });
  }

}
