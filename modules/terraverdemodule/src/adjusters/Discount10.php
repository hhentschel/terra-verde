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

use craft\commerce\services\Discounts;
use craft\commerce\events\MatchLineItemEvent;
use craft\commerce\models\Discount;
use craft\commerce\models\LineItem;

use yii\base\Event;

class Discount10 extends Component implements AdjusterInterface
{
    const ADJUSTMENT_TYPE = 'Rabatt';
    const DISCOUNT_PRICE = .1;

    public function adjust(Order $order): array
    {
        // Create an array so we can push new Adjustments into it.
        $adjustments = [];

        foreach ($order->lineItems as $lineItem)
        {

          if($lineItem->qty >= 6) {
              // Ok, so we've identified that the option exists and needs an Adjustment applied to it. Let's stub the model:
              $adjustment = new OrderAdjustment([
                  // Don't worry, you can have "positive" discounts, and this handle doesn't show up anywhere in the front-end.
                  'type' => self::ADJUSTMENT_TYPE,
                  // 'name' => 'Gift Wrap',
                  'description' => '10% Rabatt ab 6 Stk.',
                  // Set the price, multiplying by the quantity (or not, your choice!)
                  'amount' => self::DISCOUNT_PRICE * $lineItem->qty,
                  // 'amount' => self::DISCOUNT_PRICE,
              ]);

              // Make sure the Adjuster knows what Order and LineItem it's supposed to adjust. This also helps calculate stuff in-memory, prior to saving (especially for new LineItems that don't yet have an ID!):
              $adjustment->setOrder($order);
              $adjustment->setLineItem($lineItem);

              // Perhaps most importantly! Push that adjustment into the array, so it gets returned:
              $adjustments[] = $adjustment;
          }

        }

        // Return that array—it may be empty, if nothing matched!
        return $adjustments;
    }
}
