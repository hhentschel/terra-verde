<?php

namespace modules\terraverdemodule\adjusters;

use Craft;
use craft\base\Component;
use craft\commerce\base\AdjusterInterface;
use craft\commerce\elements\Order;
use craft\commerce\models\OrderAdjustment;
use craft\commerce\Plugin;
use craft\commerce\Model;
use craft\commerce\services\LineItems;
use craft\commerce\events\LineItemEvent;

use yii\base\Event;

// use craft\commerce\elements\Product;
// use craft\commerce\elements\Variant;


//if the amount in the cart is greater than 100$ a discount of 5% is applied.
//if the amount in the cart is greater than 200$ a discount of 10% is applied.

class GiftWrapAdjuster extends Component implements AdjusterInterface
{
        public function adjust(Order $order): array
    {

        $adjustments = [];

      //   if (isset($lineItem->options['giftWrapped']) && $lineItem->options['giftWrapped'] == 'yes') {
      //     $lineItem->price += 20;
      // }

      foreach ($order->getLineItems() as $item) {
        $adjustment = new OrderAdjustment;
        $adjustment->type = 'discount';
        $adjustment->name = '$2 off';
        $adjustment->description = '$2 off everything in the store';
        $adjustment->sourceSnapshot = [ 'data' => 'value']; // This can contain information about how the adjustment came to be
        $adjustment->amount = -2;
        $adjustment->setOrder($order);
        $adjustment->setLineItem($item);

        $adjustments[] = $adjustment;
    }


        return $adjustments;


    }

}
