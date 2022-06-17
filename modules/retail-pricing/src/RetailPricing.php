<?php
/**
 * @copyright Copyright (c) PutYourLightsOn
 */

namespace modules\retailpricing;

use Craft;
use craft\commerce\elements\Variant;
use craft\commerce\events\LineItemEvent;
use craft\commerce\models\LineItem;
use craft\commerce\services\LineItems;
use craft\commerce\Plugin as Commerce;
use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module as Module;

class RetailPricing extends Module
{
  const RETAIL_USER_GROUP_ID = 1;

  public function init()
  {
    Craft::setAlias('@modules', __DIR__);

    $user = Craft::$app->getUser()->getIdentity();

    if ($user && $user->isInGroup(self::RETAIL_USER_GROUP_ID)) {
      Event::on(
        LineItems::class,
        LineItems::EVENT_POPULATE_LINE_ITEM,
        function (LineItemEvent $event) {
          $this->_applyRetailPrice($event->lineItem);
        }
      );
    }

    parent::init();
  }

  private function _applyRetailPrice(LineItem $lineItem)
  {
    $purchasable = $lineItem->getPurchasable();

    if (!($purchasable instanceof Variant)) {
      return;
    }

    // get all discounts and get the discount percentage
    foreach (Commerce::getInstance()->discounts->getAllDiscounts() as $discount) {
      /* ?????  'percentDiscount' => $percentDiscount*/
    }


    try {
      $product = $purchasable->getProduct();
      if ($product && $product->priceRetailTrader) {
        $lineItem->salePrice = $product->priceRetailTrader;
        $lineItem->price = $product->priceRetailTrader;
      }
      // if product has a discount applied on it -> apply percentage discount to item price
      if ($product && $product->priceRetailTrader) {

      }


    } catch (InvalidConfigException $exception) {
    }
  }
}
