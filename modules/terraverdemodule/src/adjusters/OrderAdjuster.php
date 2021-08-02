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

class OrderAdjuster extends Component implements AdjusterInterface
{
        public function adjust(Order $order): array
    {

        $adjustments = [];

        if ($order->itemSubtotal > 100) {

                $adjustment = new OrderAdjustment;
                $adjustment->type = 'discount';
                $adjustment->sourceSnapshot = [ 'data' => 'value' ];


            // if the amount in the cart is greater than 100$ a discount of 5% is applied.
            if ($order->itemSubtotal >= 100 && $order->itemSubtotal < 200) {

                 $adjustment->amount = ($order->itemSubtotal * .05 * -1);
                 $adjustment->name = 'Order $100 or more';
                 $adjustment->description = '5% off';

            }

            // if the amount in the cart is greater than 200$ a discount of 10% is applied.

             if ($order->itemSubtotal >= 200){
                   $adjustment->amount = ($order->itemSubtotal * .10 * -1);
                   $adjustment->name = 'Order $200 or more';
                   $adjustment->description = '10% off';


            }
                    $adjustment->setOrder($order);


              $adjustments[] = $adjustment;
          }
        return $adjustments;


    }

}
