<?php

namespace modules\terraverdemodule\adjusters;

use Craft;
use craft\base\Component;
use craft\commerce\base\AdjusterInterface;
use craft\commerce\elements\Order;
// use craft\commerce\elements\Discount;
use craft\commerce\models\OrderAdjustment;
use craft\commerce\Plugin;
use craft\commerce\Model;
use craft\commerce\services\LineItems;
use craft\commerce\events\LineItemEvent;

use yii\base\Event;

class ShippingAdjuster extends Component implements AdjusterInterface
{
    const SHIPPING_PRICE = ;

    public function adjust(Order $order): array
    {
        $adjustments = [];

          if(isset($order->totalWeight > '5')){
              $adjustment = new OrderAdjustment([

                  $weight = $order->totalWeight;

                  $amount = $weight / 2; // Your calc from weight units to currency units

                  $order->baseShippingCost += $amount;

              ]);

              $adjustment->setOrder($order);
              $adjustment->setLineItem($lineItem);

              $adjustments[] = $adjustment;
          }

        return $adjustments;
    }
}
