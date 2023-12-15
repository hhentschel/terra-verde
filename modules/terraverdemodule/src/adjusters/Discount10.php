<?php

namespace modules\terraverdemodule\adjusters;

use Craft;
use craft\base\Component;
use craft\commerce\base\AdjusterInterface;
use craft\commerce\elements\Order;

use craft\commerce\models\OrderAdjustment;
use craft\commerce\Model;
use craft\commerce\elements\Variant;

use craft\commerce\Plugin as Commerce;
use craft\commerce\elements\Product;


/*use craft\commerce\services\LineItems;
use craft\commerce\events\LineItemEvent;

use craft\commerce\services\Discounts;
use craft\commerce\events\MatchLineItemEvent;
use craft\commerce\models\Discount;
use craft\commerce\models\LineItem;

use craft\elements\Category;
use craft\elements\Entry;
use craft\helpers\ElementHelper;
use yii\base\Event;*/

class Discount10 extends Component implements AdjusterInterface
{
  const ADJUSTMENT_TYPE = 'discount';
  const DISCOUNTED_PERCENTAGE = .1;

  const DISCOUNTED_RETAIL_USER_GROUP_ID = 2;
  const DISCOUNTED_RETAIL_USER_GROUP_PERCENTAGE = 11;

  public function adjust(Order $order): array
  {
    // Create an array so we can push new Adjustments into it.
    $adjustments = [];

    $user = Craft::$app->getUser()->getIdentity();

    // check if user is in group detailhandel and baechsermarkt
    if ($user && ($user->isInGroup(self::DISCOUNTED_RETAIL_USER_GROUP_ID) || $user->isInGroup(self::DISCOUNTED_RETAIL_USER_GROUP_PERCENTAGE))) {

      foreach ($order->lineItems as $lineItem) {
        $purchasable = $lineItem->getPurchasable(); // Get the Purchasable
        // $product = $purchasable->getProduct(); // Get the Product from the Purchasable

        if ($purchasable instanceof Variant) {
          //get sales applied to products
          $sales = Commerce::getInstance()->getSales()->getSalesForPurchasable($purchasable);

          // if there are no sales applied to a product
          if (empty($sales)) {
            $product = $purchasable->getProduct();

            // product has the lightswitch discount10Available set to true
            if ($product->discount10Available) {

              // if there are more than siy items in cart
              if ($lineItem->qty >= 6) {

                $adjustment = new OrderAdjustment([
                  'type' => self::ADJUSTMENT_TYPE,
                  'description' => '10% Rabatt ab 6 Stk.',
                  // 'amount' => self::DISCOUNT_PRICE * $lineItem->qty,
                  'amount' => ($lineItem->price * self::DISCOUNTED_PERCENTAGE * -1) * $lineItem->qty,
                ]);

                // Make sure the Adjuster knows what Order and LineItem it's supposed to adjust. This also helps calculate stuff in-memory, prior to saving (especially for new LineItems that don't yet have an ID!):
                $adjustment->setOrder($order);
                $adjustment->setLineItem($lineItem);

                // Perhaps most importantly! Push that adjustment into the array, so it gets returned:
                $adjustments[] = $adjustment;
              }
            }
          }
        }
      }
      /*}*/
      // Return that array—it may be empty, if nothing matched!
    }
    return $adjustments;
  }
}
