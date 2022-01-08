<?php

namespace Craft;

use Commerce\Adjusters\Commerce_AdjusterInterface;

class Pricemod_Adjuster implements Commerce_AdjusterInterface {

    public function adjust(Commerce_OrderModel &$order, array $lineItems = []){

        $myAdjuster = new Commerce_OrderAdjustmentModel();

        $weight = $order->totalWeight;

        $amount = $weight / 2; // Your calc from weight units to currency units

        $order->baseShippingCost += $amount;

        $myAdjuster->type = 'shipping';
        $myAdjuster->name = 'Cart Shipping Cost';
        $myAdjuster->description = 'Half the weight to dollars shipping cpst';
        $myAdjuster->amount = $amount;
        $myAdjuster->orderId = $order->id;
        $myAdjuster->optionsJson = ['lineItemsAffected' => null];
        $myAdjuster->included = false;

        return [$myAdjuster];

    }

}