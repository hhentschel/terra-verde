<?php

namespace modules\terraverdemodule\adjusters;

use Craft;
use craft\base\Component;
use craft\commerce\base\AdjusterInterface;
use craft\commerce\elements\Order;

use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;
use craft\commerce\models\OrderAdjustment;
use craft\commerce\Plugin;
use craft\commerce\Model;
use craft\commerce\services\LineItems;
use craft\commerce\events\LineItemEvent;

use craft\commerce\services\Discounts;
use craft\commerce\events\MatchLineItemEvent;
use craft\commerce\models\Discount;
use craft\commerce\models\LineItem;

use craft\elements\Category;
use craft\elements\Entry;
use craft\helpers\ElementHelper;
use yii\base\Event;

class Discount10 extends Component implements AdjusterInterface
{
  const ADJUSTMENT_TYPE = 'discount';
  const DISCOUNT_PRICE = .1;

  // const DISCOUNTED_PERCENTAGE = 10;

  const DISCOUNTED_RETAIL_USER_GROUP_ID = 2;
  const DISCOUNTED_RETAIL_USER_GROUP_PERCENTAGE = 11;

  public function adjust(Order $order): array
  {
    // Create an array so we can push new Adjustments into it.
    $adjustments = [];

    $user = Craft::$app->getUser()->getIdentity();

    if ($user && ($user->isInGroup(self::DISCOUNTED_RETAIL_USER_GROUP_ID) || $user->isInGroup(self::DISCOUNTED_RETAIL_USER_GROUP_PERCENTAGE))) {

      /*      $discountField = Craft::$app->getFields()->getFieldByHandle('applyDiscount10Percent6Pieces'); //use Craft
            $discountFieldColumn = ElementHelper::fieldColumnFromField($discountField); //use craft\helpers\ElementHelper
            $allowedCategoryIds = Category::find()
              ->where([$discountFieldColumn => ['=', true]])
              ->ids();*/


      /*$lightSwitchField = Craft::$app->getFields()->getFieldByHandle('discount10Available');
      $lightSwitchFieldColumn = ElementHelper::fieldColumnFromField($lightSwitchField); //use craft\helpers\ElementHelper
      $lightSwitchFieldColumnStatus = Product::find()
        ->where([$lightSwitchFieldColumn => ['=', true]]);

      Craft::dd($lightSwitchFieldColumnStatus);*/


      // TEST check if lightswitch is true
      /*
      $product = $lineItem->getPurchasable();

      if ($product && $product->hasField('discount10Available')) {
        $lightswitchValue = $product->getFieldValue('discount10Available');
        if ($lightswitchValue) {
          // logic for when the lightswitch is true
        }
      }
      */

      //TEST getting cat id of product
      /*
      $categories = $product->getProductType()->getCategories();
        $categoryID = [];

        foreach ($categories as $category) {
          $categoryID[] = $category->id;
        }
      */
      // $discountPercentage = self::DISCOUNTED_PERCENTAGE;

      foreach ($order->lineItems as $lineItem) {
        $purchasable = $lineItem->getPurchasable(); // Get the Purchasable
        $product = $purchasable->getProduct(); // Get the Product from the Purchasable

        if ($product->discount10Available) {
          // Get the associated purchasable (usually a Product)
          //  $product = $lineItem->getPurchasable();

          /*if (in_array($categoryIdsRelatedToVariant, $allowedCategoryIds)) {*/

          if ($lineItem->qty >= 6) {

            // $discount = $product * ($discountPercentage / 100);
            // Ok, so we've identified that the option exists and needs an Adjustment applied to it. Let's stub the model:
            $adjustment = new OrderAdjustment([
              // Don't worry, you can have "positive" discounts, and this handle doesn't show up anywhere in the front-end.
              'type' => self::ADJUSTMENT_TYPE,
              // 'name' => 'Gift Wrap',
              'description' => '10% Rabatt ab 6 Stk. TEST',
              // 'amount' => self::DISCOUNT_PRICE * $lineItem->qty,
              'amount' => ($lineItem->price * self::DISCOUNT_PRICE * -1) * $lineItem->qty,
            ]);

            // Make sure the Adjuster knows what Order and LineItem it's supposed to adjust. This also helps calculate stuff in-memory, prior to saving (especially for new LineItems that don't yet have an ID!):
            $adjustment->setOrder($order);
            $adjustment->setLineItem($lineItem);

            // Perhaps most importantly! Push that adjustment into the array, so it gets returned:
            $adjustments[] = $adjustment;
            /*}*/
          }

        }
      }
      // var_dump($adjustments);
      // Return that array—it may be empty, if nothing matched!
    }
    return $adjustments;
  }
}
