<?php

namespace terraverde;

use Craft;
use Yii\base\Module;
use craft\commerce\services\OrderAdjustments;
use Yii\base\Event;
use MyAdjuster;

class OrderDiscount extends Module

{
  public function init()

  {
    parent::init();
    Event::on(OrderAdjustments::class, OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS, function(RegisterComponentTypesEvent $event) {

      $event->types[] = OrderAdjuster::class;

    });
  }

}
