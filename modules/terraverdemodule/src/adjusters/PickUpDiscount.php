<?php

namespace modules\terraverdemodule\adjusters;

use Craft;
use craft\base\Component;
use craft\commerce\base\AdjusterInterface;
use craft\commerce\elements\Order;
use craft\commerce\models\OrderAdjustment;
use craft\commerce\Plugin;
use craft\commerce\Model;
// use craft\commerce\elements\Product;
// use craft\commerce\elements\Variant;
// use craft\commerce\services\LineItems;


//if the amount in the cart is greater than 100$ a discount of 5% is applied.
//if the amount in the cart is greater than 200$ a discount of 10% is applied.

class PickUpDiscount extends Component implements AdjusterInterface
{
        public function adjust(Order $order): array
    {

        $adjustments = [];

        if ($order->shippingMethodHandle == 'B2C_pickUpAtStore' ) {

          $adjustment = new OrderAdjustment;
          $adjustment->type = 'Rabat';
          $adjustment->sourceSnapshot = [ 'data' => 'value' ];

          $adjustment->amount = ($order->itemSubtotal * .05 * -1);
          $adjustment->name = 'Abholung';
          $adjustment->description = '5%';

          $adjustment->setOrder($order);

          $adjustments[] = $adjustment;

        }


        return $adjustments;


    }

}
