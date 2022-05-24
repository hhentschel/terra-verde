<?php
/**
 * @copyright Copyright (c) PutYourLightsOn
 */

namespace modules\retailpricing;

use Craft;
use craft\commerce\services\OrderAdjustments;
use craft\events\RegisterComponentTypesEvent;
use modules\retailpricing\adjusters\RetailAdjuster;
use yii\base\Event;
use yii\base\Module as Module;

class RetailPricing extends Module
{
    public function init()
    {
        Craft::setAlias('@modules', __DIR__);

        Event::on(
            OrderAdjustments::class,
            OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = RetailAdjuster::class;
            }
        );

        parent::init();
    }
}
