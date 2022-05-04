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

class GiftNoteAdjuster extends Component implements AdjusterInterface
{
    const ADJUSTMENT_TYPE = 'Zusatzoption';
    const GIFTWRAP_PRICE = 2.50;

    public function adjust(Order $order): array
    {
        // Create an array so we can push new Adjustments into it.
        $adjustments = [];

        foreach ($order->lineItems as $lineItem)
        {

          if(isset($lineItem->options['giftNote']) && $lineItem->options['giftNote'] == 'yes'){
              // Ok, so we've identified that the option exists and needs an Adjustment applied to it. Let's stub the model:
              $adjustment = new OrderAdjustment([
                  // Don't worry, you can have "positive" discounts, and this handle doesn't show up anywhere in the front-end.
                  'type' => self::ADJUSTMENT_TYPE,
                  // 'name' => 'Gift Wrap',
                  'description' => 'Grusskarte',
                  // Set the price, multiplying by the quantity (or not, your choice!)
                  // 'amount' => self::GIFTWRAP_PRICE * $lineItem->qty,
                  'amount' => self::GIFTWRAP_PRICE,
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
