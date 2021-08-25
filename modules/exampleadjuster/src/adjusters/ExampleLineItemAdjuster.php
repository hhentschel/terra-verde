<?php
/**
 * Example Adjuster Module
 *
 * A simplest-case `AdjusterInterface` implementation.
 *
 * @link      https://oof.studio
 * @copyright Copyright (c) 2018 oof. LLC.
 */

namespace modules\exampleadjuster\adjusters;

use craft\commerce\base\AdjusterInterface;
use craft\commerce\elements\Order;
use craft\commerce\models\OrderAdjustment;

use modules\exampleadjuster\Example as ExampleModule;

/**
 * Example Adjuster
 *
 * 5% discount on all line items.
 *
 * @author oof. Studio <hello@oof.studio>
 * @since 0.1
 */
class ExampleLineItemAdjuster implements AdjusterInterface
{
    // Constants
    // =========================================================================

    /**
     * The discount adjustment type.
     */
    const ADJUSTMENT_TYPE = 'In Geschenkpapier einwickeln';
    const GIFTWRAP_PRICE = 6.00;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    // public function adjust(Order $order): array
    // {
    //     $adjustments = [];
    //     foreach ($order->lineItems as $lineItem)
    //     {
    //         $adjustment = $this->_getEmptyOrderAdjustmentFor($order);
    //         $adjustment->lineItemId = $lineItem->id;

    //         // Calculate Price difference:
    //         $basePrice = $lineItem->getSubtotal();
    //         $discountAmount = $basePrice * -0.05;

    //         $adjustment->amount = $discountAmount;

    //         $adjustments[] = $adjustment;
    //     }

    //     return $adjustments;
    // }

    public function adjust(Order $order): array
    {
        // Create an array so we can push new Adjustments into it.
        $adjustments = [];

        foreach ($order->lineItems as $lineItem)
         {
            if(isset($lineItem->options['giftWrapped']) && $lineItem->options['giftWrapped'] == 'yes'){
                // Ok, so we've identified that the option exists and needs an Adjustment applied to it. Let's stub the model:
                $adjustment = new OrderAdjustment([
                    // Don't worry, you can have "positive" discounts, and this handle doesn't show up anywhere in the front-end.
                    'type' => self::ADJUSTMENT_TYPE,
                    'name' => 'Gift Wrap',
                    'description' => 'You’ve requested gift-wrapping for this item.',
                    // Set the price, multiplying by the quantity (or not, your choice!)
                    'amount' => self::GIFTWRAP_PRICE * $lineItem->qty,
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

    // Private Methods
    // =========================================================================

    private function _getEmptyOrderAdjustmentFor(Order $order)
    {
        $adjustment = new OrderAdjustment();
        $adjustment->type = self::ADJUSTMENT_TYPE;
        $adjustment->name = '5% Discount';
        $adjustment->orderId = $order->id;
        $adjustment->description = 'A discount for nice people, like you!';
        $adjustment->sourceSnapshot = [
            'examplePrivateProp' => 'Criteria you want to make sure you have access to, in case you have to recalculate, later!'
        ];

        return $adjustment;
    }
}
